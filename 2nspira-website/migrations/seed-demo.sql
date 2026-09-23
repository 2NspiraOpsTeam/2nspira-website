-- DEMO/TEST DATA ONLY. No real client or payment information.
INSERT OR IGNORE INTO organization VALUES
('org_demo_manufacturing','Demo Manufacturing Client','Demo Manufacturing Client LLC',1,'billing@demo-manufacturing.example','(555) 010-1001','100 Demo Way, Buffalo, NY','2026-08-01T12:00:00Z','2026-09-20T12:00:00Z'),
('org_demo_property','Demo Property Management Client','Demo Property Management Client LLC',1,'billing@demo-property.example','(555) 010-1002','200 Sample Avenue, Queens, NY','2026-08-01T12:00:00Z','2026-09-20T12:00:00Z');

INSERT OR IGNORE INTO service VALUES
('svc_app','Application Development','Custom operational software, workflow design, and integration delivery.','development'),
('svc_host','Managed Hosting','Managed application hosting, monitoring, and platform maintenance.','hosting'),
('svc_qbo','QBO Integration','QuickBooks Online integration and operational data exchange.','integration'),
('svc_advisory','Technology Advisory Retainer','Ongoing technology leadership, planning, and executive advisory.','advisory'),
('svc_web','Website Development','Strategy, design, implementation, and launch of a modern public website.','development');

INSERT OR IGNORE INTO engagement VALUES
('eng_mfg_app','org_demo_manufacturing','svc_app','active','fixed_project',NULL,10000,'USD','2026-08-15',NULL,'2026-10-01'),
('eng_mfg_host','org_demo_manufacturing','svc_host','active','recurring','Monthly',325,'USD','2026-08-15','2027-08-15','2026-10-15'),
('eng_mfg_qbo','org_demo_manufacturing','svc_qbo','active','fixed_project',NULL,2500,'USD','2026-09-01',NULL,NULL),
('eng_prop_web','org_demo_property','svc_web','completed','fixed_project',NULL,8500,'USD','2026-05-01',NULL,NULL),
('eng_prop_adv','org_demo_property','svc_advisory','active','hourly','Hourly',225,'USD','2026-06-01','2027-06-01','2026-10-01'),
('eng_prop_host','org_demo_property','svc_host','active','recurring','Monthly',225,'USD','2026-06-01','2027-06-01','2026-10-01');

INSERT OR IGNORE INTO invoice VALUES
('inv_mfg_1004','org_demo_manufacturing','eng_mfg_app','2N-1004','2026-09-15','2026-10-01','due',4000,0,4000,4000,'USD'),
('inv_mfg_1003','org_demo_manufacturing','eng_mfg_host','2N-1003','2026-09-01','2026-09-15','paid',325,0,325,0,'USD'),
('inv_mfg_1002','org_demo_manufacturing','eng_mfg_app','2N-1002','2026-08-15','2026-08-30','paid',3000,0,3000,0,'USD'),
('inv_prop_2003','org_demo_property','eng_prop_host','2N-2003','2026-09-01','2026-09-15','paid',225,0,225,0,'USD'),
('inv_prop_2002','org_demo_property','eng_prop_adv','2N-2002','2026-08-31','2026-09-15','paid',1800,0,1800,0,'USD');

INSERT OR IGNORE INTO invoice_line_item VALUES
('line_1004_1','inv_mfg_1004','Manufacturing operations application — milestone 2',1,4000,4000),
('line_1003_1','inv_mfg_1003','Managed hosting — September 2026',1,325,325),
('line_1002_1','inv_mfg_1002','Manufacturing operations application — discovery and foundation',1,3000,3000),
('line_2003_1','inv_prop_2003','Managed hosting — September 2026',1,225,225),
('line_2002_1','inv_prop_2002','Technology advisory — 8 hours',8,225,1800);

INSERT OR IGNORE INTO payment_method_reference (id,organization_id,provider,provider_reference,type,brand,last_four,expiration_month,expiration_year,is_default,status,created_at) VALUES
('pm_mfg_card','org_demo_manufacturing','demo','demo_pm_mfg_card','card','Visa','4242',12,2028,1,'active','2026-08-15T12:00:00Z'),
('pm_mfg_bank','org_demo_manufacturing','demo','demo_pm_mfg_bank','bank_account','Chase','8915',NULL,NULL,0,'active','2026-08-15T12:00:00Z'),
('pm_prop_card','org_demo_property','demo','demo_pm_prop_card','card','Mastercard','4444',8,2028,1,'active','2026-06-01T12:00:00Z');

INSERT OR IGNORE INTO payment (id,organization_id,invoice_id,payment_method_reference_id,provider,provider_transaction_reference,amount,currency,status,paid_at) VALUES
('pay_mfg_1003','org_demo_manufacturing','inv_mfg_1003','pm_mfg_card','demo','demo_txn_mfg_1003',325,'USD','settled','2026-09-12T14:30:00Z'),
('pay_mfg_1002','org_demo_manufacturing','inv_mfg_1002','pm_mfg_bank','demo','demo_txn_mfg_1002',3000,'USD','settled','2026-08-27T16:00:00Z'),
('pay_prop_2003','org_demo_property','inv_prop_2003','pm_prop_card','demo','demo_txn_prop_2003',225,'USD','settled','2026-09-10T11:00:00Z');

-- Memberships are resolved after Better Auth creates the demo users.
INSERT OR IGNORE INTO organization_membership
SELECT 'mem_mfg_owner','org_demo_manufacturing',id,'account_owner','2026-09-01T12:00:00Z' FROM user WHERE email='peter@demo.2nspira.com';
INSERT OR IGNORE INTO organization_membership
SELECT 'mem_prop_owner','org_demo_property',id,'account_owner','2026-09-01T12:00:00Z' FROM user WHERE email='alex@demo.2nspira.com';

INSERT OR IGNORE INTO billing_authorization
SELECT 'auth_mfg_auto','org_demo_manufacturing','pm_mfg_card','Charge recurring hosting invoices on their due date',1,'2026-08-15T12:00:00Z',id,NULL FROM user WHERE email='peter@demo.2nspira.com';
