import copy
import datetime as dt
import json
import pathlib
import tempfile
import unittest
from gate import validate, consume, Rejected

class ApprovalTests(unittest.TestCase):
    def setUp(self):
        self.now=dt.datetime(2026,11,7,4,tzinfo=dt.timezone.utc)
        self.packet=dict(repository='2NspiraOpsTeam/example',pr=10,sha='a'*40,environment='production',action='deploy',nonce='approval-test-0001')
        self.pr=dict(number=10,state='open',draft=False,user={'id':2},base={'ref':'main','repo':{'full_name':self.packet['repository']}},head={'sha':'a'*40,'repo':{'full_name':self.packet['repository']}})
        self.reviews=[dict(id=4,user={'id':1,'login':'owner'},state='APPROVED',commit_id='a'*40,body=json.dumps(self.packet),submitted_at='2026-11-07T03:00:00Z')]
        self.runs=[dict(id=5,head_sha='a'*40,path='.github/workflows/verify.yml',repository={'full_name':self.packet['repository']},event='pull_request',run_number=5,status='completed',conclusion='success')]
    def check(self):
        return validate(self.packet,self.pr,self.reviews,self.runs,owner_login='owner',owner_id=1,workflow_path='.github/workflows/verify.yml',now=self.now)
    def test_exact_packet(self): self.assertEqual(self.check()['review_id'],4)
    def test_stale_head(self):
        self.pr['head']['sha']='b'*40
        with self.assertRaises(Rejected):self.check()
    def test_stale_review(self):
        self.reviews[0]['commit_id']='b'*40
        with self.assertRaises(Rejected):self.check()
    def test_unauthorized(self):
        self.reviews[0]['user']['id']=3
        with self.assertRaises(Rejected):self.check()
    def test_comment_not_approval(self):
        self.reviews[0]['state']='COMMENT'
        with self.assertRaises(Rejected):self.check()
    def test_self_approval(self):
        self.pr['user']['id']=1
        with self.assertRaises(Rejected):self.check()
    def test_revocation(self):
        r=copy.deepcopy(self.reviews[0]);r.update(id=6,state='CHANGES_REQUESTED');self.reviews.append(r)
        with self.assertRaises(Rejected):self.check()
    def test_dismissed(self):
        self.reviews[0]['state']='DISMISSED'
        with self.assertRaises(Rejected):self.check()
    def test_failed_latest_check(self):
        r=copy.deepcopy(self.runs[0]);r.update(id=6,run_number=6,conclusion='failure');self.runs.append(r)
        with self.assertRaises(Rejected):self.check()
    def test_missing_trusted_check(self):
        self.runs[0]['path']='untrusted.yml'
        with self.assertRaises(Rejected):self.check()
    def test_expired(self):
        self.reviews[0]['submitted_at']='2026-11-01T01:00:00Z'
        with self.assertRaises(Rejected):self.check()
    def test_wrong_action(self):
        self.reviews[0]['body']=json.dumps({**self.packet,'action':'merge'})
        with self.assertRaises(Rejected):self.check()
    def test_duplicate_and_replay(self):
        with tempfile.TemporaryDirectory() as d:
            db=pathlib.Path(d)/'test.sqlite';receipt=self.check();consume(db,receipt)
            with self.assertRaises(Rejected):consume(db,receipt)
            with self.assertRaises(Rejected):consume(db,{**receipt,'nonce':'different-nonce-0002'})

if __name__=='__main__':unittest.main()
