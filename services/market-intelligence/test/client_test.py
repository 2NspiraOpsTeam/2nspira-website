import importlib.util, unittest, urllib.request
from pathlib import Path
spec=importlib.util.spec_from_file_location('client',Path(__file__).parent.parent/'scripts/client.py')
client=importlib.util.module_from_spec(spec);spec.loader.exec_module(client)
class RedirectTest(unittest.TestCase):
 def test_authenticated_redirects_never_forward_token(self):
  req=urllib.request.Request('https://trusted.invalid',headers={'Authorization':'Bearer synthetic-test-only'})
  for destination in ['http://other.invalid','https://other.invalid','https://trusted.invalid/moved']:
   with self.assertRaisesRegex(RuntimeError,'redirects are forbidden'):
    client.NoRedirect().redirect_request(req,None,302,'moved',{},destination)
if __name__=='__main__':unittest.main()
