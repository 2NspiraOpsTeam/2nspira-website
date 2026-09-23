# 2Nspira Client Portal UX Design Specification

**Version:** 1.0  
**Date:** 2026-09-22  
**Author:** Maya  
**Status:** Implementation-ready for Adam  

---

## Executive Summary

This specification defines the user experience for the 2Nspira Client Portal—a premium, calm, and trustworthy platform where clients can manage their entire relationship with us in one place. The portal emphasizes clarity, transparency, and control over billing and services.

**Core Principle:** *"My relationship with 2Nspira, clearly organized and under control."*

---

## 1. UX Principles

### 1.1 Primary Values
- **Premium:** Refined typography, generous whitespace, subtle elevation
- **Calm:** Uncluttered surfaces, restrained color palette, no flashy animations
- **Trustworthy:** Transparent payment information, secure processing indicators
- **Modern:** Contemporary design language matching 2nspira.com
- **Simple:** Intuitive navigation, clear hierarchies, minimal cognitive load
- **Transparent:** Clear status indicators, honest communication about charges

### 1.2 What It Is NOT
- ❌ A billing portal bolted onto a marketing website
- ❌ An accounting system interface
- ❌ A bank dashboard clone
- ❌ Stripe/QuickBooks copied into our brand

### 1.3 Financial Trust Cues (Use Sparingly)
- Masked payment details (e.g., "Chase •••• 8915")
- Secure processing badges (provider-agnostic messaging)
- Authorization timestamps for autopay
- Advance-charge reminders with clear timelines
- Easy controls for payment methods and autopay

### 1.4 Zelle Positioning
- Treated as a separate/manual payment option
- Not positioned for recurring automated charges unless verified later
- Clearly distinguished from ACH/card autopay options

---

## 2. Navigation Architecture

### 2.1 Primary Navigation (Horizontal)
```
[Overview] [Services] [Billing] [Invoices] [Payment Methods] [Account]
```

**Recommendation:** Keep Billing and Payment Methods separate for clarity. Users want to see all their billing info at a glance, then drill into payment methods as a distinct concern.

### 2.2 Secondary Navigation (Sub-menus)
- **Billing** → Balance, Charges, Statements
- **Payment Methods** → Add, Manage, Remove
- **Account** → Profile, Notifications, Support

### 2.3 Mobile Navigation
- Hamburger menu with same structure
- Quick actions: Pay Now, Next Charge, Settings
- Bottom sheet for adding payment methods

---

## 3. Page-by-Page Specifications

### 3.1 First Login / Welcome State

#### 3.1.1 Purpose
Reassure new clients and establish their identity within the portal.

#### 3.1.2 Visual Layout
```
┌─────────────────────────────────────────────┐
│  2Nspira Client Portal                      │
├─────────────────────────────────────────────┤
│                                             │
│      [Organization Logo/Name]               │
│      Welcome to your portal                 │
│                                             │
│  We've created an account for:              │
│  "Your Company Name"                        │
│                                             │
│  Active Services:                           │
│  • Technology Advisory Retainer             │
│  • Website Hosting                          │
│                                             │
│  To get started, please add a payment       │
│  method so we can process your recurring    │
│  charges.                                    │
│                                             │
│  [Add Payment Method]                       │
│  OR                                        │
│  I already have one on file →                │
│                                             │
└─────────────────────────────────────────────┘
```

#### 3.1.3 Copy Examples
- "Welcome to your relationship with 2Nspira"
- "You're all set—just add a payment method when you're ready"
- "We'll never store your full card number or account details"

#### 3.1.4 Empty States
```
No payment method on file
─────────────────────────
You can add a bank account (ACH) or card securely through our
partner. This is optional—you can pay manually anytime.

[Add Bank Account]    [Add Card]
```

---

### 3.2 Dashboard / Overview

#### 3.2.1 Purpose
Executive summary answering the 8 primary questions immediately upon login.

#### 3.2.2 Visual Layout
```
┌─────────────────────────────────────────────────────┐
│ Organization Name                                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│   CURRENT BALANCE: $0.00                           │
│                                                     │
│   NEXT PAYMENT                                      │
│   ┌──────────────────────────────────────────────┐ │
│   │ Service          │ Amount      │ Date        │ │
│   │ Technology Retainer | $225.00    │ Sep 30    │ │
│   │ Payment: Chase ••••8915   │ Autopay: ON     │ │
│   └──────────────────────────────────────────────┘ │
│                                                     │
│   ACTIVE SERVICES (2)                               │
│   • Technology Advisory Retainer — Active           │
│   • Website Hosting — Active                        │
│                                                     │
│   RECENT ACTIVITY                                   │
│   • Paid Invoice #2026-085 ($450.00) — Aug 15      │
│   • Payment processed via Chase ••••8915           │
│                                                     │
├─────────────────────────────────────────────────────┤
│ [Pay Now]  [Manage Autopay]  [View Invoice #2026-085]│
└─────────────────────────────────────────────────────┘
```

#### 3.2.3 Key Metrics Display
1. Organization Name (header)
2. Active Services Count
3. Current Balance
4. Next Payment:
   - Service name
   - Amount
   - Payment date
   - Payment method
   - Autopay status
5. Recent Invoices/Payments list

#### 3.2.4 Primary Actions (Ordered)
1. **Pay Now** — Quick invoice payment
2. **Manage Payment Method** — Add/change/remove
3. **Manage Autopay** — Enable/disable settings
4. **View Latest Invoice** — Download/view

#### 3.2.5 Mobile Adaptation
- Stack vertically: Balance → Next Payment → Services → Recent Activity
- Cards with clear touch targets
- Bottom action bar for primary actions

---

### 3.3 Services Page

#### 3.3.1 Purpose
Help clients understand what services they have, their status, and billing terms.

#### 3.3.2 Visual Layout
```
┌─────────────────────────────────────────────┐
│ Services                                    │
├─────────────────────────────────────────────┤
│                                             │
│ [✓] Technology Advisory Retainer            │
│     Status: Active                          │
│     Billing: ACH (Chase ••••8915)          │
│     Rate: $225/month                        │
│     Started: Sep 1, 2024                   │
│     Retails: Auto-renews                    │
│     Next Bill: Sep 30                       │
│                                             │
│ [✓] Website Hosting                         │
│     Status: Active                          │
│     Billing: Credit Card (Visa ••••4242)   │
│     Amount: $50/month                       │
│     Started: Jan 15, 2025                  │
│     Retails: Auto-renews                    │
│     Next Bill: Sep 30                       │
│                                             │
└─────────────────────────────────────────────┘
```

#### 3.3.3 Service Types
- **Recurring Services:** Retainers, hosting, subscriptions
- **Project-Based:** Development work, custom applications
- **AI Enablement:** Separate line item or bundled

#### 3.3.4 Status Indicators
- ✓ Active
- ⏸️ Paused (with pause date)
- ❌ Cancelled (with cancellation date and reason)
- ⚠️ In Review (new enrollments)

#### 3.3.5 Mobile Adaptation
- Vertical card layout
- Swipe to access service details
- Touch to edit billing preferences

---

### 3.4 Billing Page

#### 3.4.1 Purpose
Central hub for all billing-related information and actions.

#### 3.4.2 Visual Layout
```
┌─────────────────────────────────────────────┐
│ Billing                                     │
├─────────────────────────────────────────────┤
│                                             │
│ CURRENT BALANCE: $0.00                     │
│                                             │
│ NEXT CHARGE                                  │
│ ┌─────────────────────────────────────────┐ │
│ │ Service      │ Amount   │ Date          │ │
│ │ Tech Retainer│ $225    │ Sep 30        │ │
│ │ Payment: Chase ••••8915                 │ │
│ │ Autopay: ON                             │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ STATUS BREAKDOWN                              │
│ Generated:   2 invoices      $0.00           │
│ Scheduled:   1 charge        $225.00         │
│ Paid:        8 charges       $1,200.00       │
│ Unpaid:      0 invoices      $0.00           │
│                                             │
│ RECENT CHARGES                                │
│ • Sep 30 — Tech Retainer — Pending           │
│ • Aug 30 — Website Hosting — Paid            │
│ • Jul 30 — Tech Retainer — Paid              │
│                                             │
├─────────────────────────────────────────────┤
│ [Update Autopay]    [Change Payment Method]   │
└─────────────────────────────────────────────┘
```

#### 3.4.3 Status Definitions
- **Invoice Generated:** Document created, payment not yet due
- **Scheduled Charge:** Payment set to process automatically
- **Payment Processing:** Transaction submitted to provider
- **Settled Payment:** Funds successfully transferred
- **Unpaid Invoice:** Overdue or manually paid invoice

#### 3.4.4 Timeline View (Optional)
```
Sep        Aug    Jul
───────────────────────
   [?] → [$] → [✓]  Tech Retainer
                  → Paid Sep 15
[?] → [$] → [✓]  Website Hosting
         → Autopay enabled
```

#### 3.4.5 Mobile Adaptation
- Timeline view becomes horizontal scroll or stacked cards
- Swipe left on charges to pay manually
- Pull down for upcoming charges summary

---

### 3.5 Save a Payment Method

#### 3.5.1 Purpose
Securely add ACH or card payment methods with clear trust messaging.

#### 3.5.2 Visual Layout
```
┌─────────────────────────────────────────────┐
│ Add Payment Method                          │
├─────────────────────────────────────────────┤
│                                             │
│ Step 1: Choose Payment Type                 │
│ ┌───────────────────┐ ┌───────────────────┐ │
│ │   Bank Account    │ │  Credit/Debit    │ │
│ │     (ACH)         │ │      Card         │ │
│ │                   │ │                   │ │
│ │   [Select Image]  │ │   [Select Image]  │ │
│ └───────────────────┘ └───────────────────┘ │
│                                             │
│ Step 2: Verify (via Secure Provider)        │
│ ─────────────────────────────────────────── │
│ Your details are handled by our payment     │
│ partner. We never store full card numbers.  │
│                                             │
│ [Proceed to Verification]                   │
│                                             │
│ Step 3: Confirm                            │
│ ┌─────────────────────────────────────────┐ │
│ │ Bank: Chase ••••8915                    │ │
│ │ Card: Visa ••••4242                     │ │
│ │ Set as default? [✓]                     │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ This method will be used for autopay        │
│ and future charges.                         │
│                                             │
│ [Save Method]      [Remove]                 │
└─────────────────────────────────────────────┘
```

#### 3.5.3 Security Messaging
- "Your full card number is never stored by us"
- "We use encrypted tokenization through our payment provider"
- "This information is protected and cannot be accessed by us or others"

#### 3.5.4 Verification Flow
1. User selects payment type
2. Redirect to secure provider (Stripe/Square/etc.)
3. Provider handles verification via micro-deposits or 3DS
4. Return with tokenized payment method
5. Display masked info only after setup

#### 3.5.5 Actions Available
- Add new payment method
- Set as default
- Replace existing method
- Remove payment method (with warning)

---

### 3.6 Autopay Enrollment

#### 3.6.1 Purpose
Clear, trust-building flow for authorizing recurring automatic charges.

#### 3.6.2 Visual Layout
```
┌─────────────────────────────────────────────┐
│ Enable Automatic Payments                    │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Service Being Billed:                   │ │
│ │ Technology Advisory Retainer            │ │
│ │ Amount: $225/month                      │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Billing Frequency: Monthly              │ │
│ │ Next Scheduled Charge: Sep 30           │ │
│ │ Payment Method: Chase ••••8915         │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ ADVANCE NOTICE                           │ │
│ ────────────────────────────────────────── │
│ │ You'll receive an email reminder 3 days  │
│ │ before each charge. You can view the     │
│ │ status anytime in your billing portal.   │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ AUTHORIZATION                            │ │
│ ────────────────────────────────────────── │
│ │ By enabling autopay, you authorize      │ │
│ │ 2Nspira to charge your selected payment │
│ │ method on the scheduled date.           │
│ │                                         │
│ │ You can disable this at any time by     │
│ │ visiting your billing settings.          │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ [ ] I understand and agree to the       │ │
│ │ terms above, and authorize 2Nspira to   │
│ │ charge my payment method as described.  │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [Enable Autopay]                            │
│                                             │
│ Already have autopay enabled →               │
│ View Settings                                 │
└─────────────────────────────────────────────┘
```

#### 3.6.3 Trust Elements
- Clear service and amount details
- Explicit advance notice policy (3 days)
- Authorization language prominently displayed
- Easy-to-find disable option mentioned upfront
- No hidden links or tiny text

#### 3.6.4 Consent Requirements
- Must check "I understand" checkbox
- Cannot skip or bypass authorization
- Must confirm payment method before enabling
- Requires one-time confirmation

#### 3.6.5 Mobile Adaptation
- Simplified flow with larger touch targets
- Pull-to-dismiss for verbose text
- Biometric auth option for re-enrollment

---

### 3.7 Upcoming Charge View

#### 3.7.1 Purpose
Pre-charge status showing what's coming and allowing updates.

#### 3.7.2 Visual Layout
```
┌─────────────────────────────────────────────┐
│ Upcoming Charge                              │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Status: Scheduled                       │ │
│ │ Service: Technology Advisory Retainer   │ │
│ │ Amount: $225.00                         │ │
│ │ Date: September 30, 2026                │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Payment Method: Chase ••••8915         │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Notification:                           │ │
│ │ You'll be reminded on Sep 27           │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ACTIONS                                     │
│ ───────                                     │
│ [View Service Details]                      │
│ [Update Payment Method]                      │
│ [Contact Support]                            │
│                                             │
│ ─────────────────────────────────────────── │
│ Note: This charge will process automatically│
│ unless you change your payment settings.    │
│                                             │
└─────────────────────────────────────────────┘
```

#### 3.7.3 Status Indicators
- **Scheduled:** Payment queued for automatic processing
- **Processing:** Transaction submitted to provider
- **Paid:** Funds transferred successfully
- **Failed:** Requires action (update method or pay manually)
- **Returned:** Initial success but later returned by bank

#### 3.7.4 Actions
- View service details
- Update payment method before charge
- Contact support if questions arise
- Disable autopay if not desired

---

### 3.8 Advance Notification Experience

#### 3.8.1 Email Template
```
Subject: Your upcoming 2Nspira payment on September 30

Hi {Organization Name},

Your next automatic payment is scheduled for tomorrow (September 30).

Payment Details:
─────────────────
Service: Technology Advisory Retainer
Amount: $225.00
Date: September 30, 2026
Payment Method: Chase ••••8915

If you'd like to view your billing portal or make changes:
https://portal.2nspira.com/settings/billing

See you tomorrow!

The 2Nspira Team
```

#### 3.8.2 Portal Notification (Same-Day)
```
┌─────────────────────────────────────────────┐
│ Upcoming Charge Reminder                     │
├─────────────────────────────────────────────┤
│                                             │
│ Tomorrow (Sep 30), we'll charge           │
│ $225.00 for Technology Advisory            │
│                                             │
│ [View Details]    [Make Changes]            │
│                                             │
└─────────────────────────────────────────────┘
```

#### 3.8.3 Timing Strategy
- Send email 3 days before charge (e.g., Sep 27 for Sep 30 charge)
- Show same-day notification in portal
- Option to adjust timing in settings if preferred

---

### 3.9 Successful Payment Confirmation

#### 3.9.1 Visual Layout
```
┌─────────────────────────────────────────────┐
│ ✓ Payment Successful                        │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Amount: $225.00                         │ │
│ │ Date: September 15, 2026                │ │
│ │ Method: Chase ••••8915                 │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Your payment has been processed            │
│ successfully.                              │
│                                             │
│ [Download Receipt]    [View Billing]        │
│                                             │
└─────────────────────────────────────────────┘
```

#### 3.9.2 Status Mapping
- **Processing:** → "Your payment is being processed..."
- **Paid:** → "Payment successful"
- **Settled:** → Show in history with date/time

---

### 3.10 Failed Payment Recovery

#### 3.10.1 Visual Layout
```
┌─────────────────────────────────────────────┐
│ Payment Issue                               │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ ⚠️ We couldn't process this charge      │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Your payment for Technology Advisory        │
│ ($225.00) could not be processed on         │
│ September 30.                                │
│                                             │
│ Reason: Payment method declined or expired  │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ We attempted to charge again today      │ │
│ │ (Sep 18) but it still failed.          │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ACTION REQUIRED                             │
│ ───────                                     │
│ [Update Payment Method]                      │
│                                              │
│ Or pay manually now:                          │
│ [Pay Now for $225.00]                        │
│                                             │
│ We'll keep trying on Sep 19 and Sep 20,     │
│ but please update your method if possible.   │
│                                             │
└─────────────────────────────────────────────┘
```

#### 3.10.2 Tone Guidelines
- No alarming language ("URGENT" or "OVERDUE")
- Use helpful, non-accusatory tone
- Clear explanation of what happened
- Simple recovery steps

#### 3.10.3 Retry Schedule
- Attempt 1: Original date
- Attempt 2: +1 day
- Attempt 3: +3 days
- Final attempt: +7 days
- If all fail: Escalate to manual contact

---

### 3.11 ACH Return (Later Failure)

#### 3.11.1 Visual Layout
```
┌─────────────────────────────────────────────┐
│ Payment Status: Returned                     │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Initial Date: September 30              │ │
│ │ Final Status: Returned                  │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Your ACH transaction appeared successful    │
│ initially, but was returned by your bank    │
│ later. This can happen with certain         │
│ bank accounts due to insufficient funds      │
│ or account restrictions.                     │
│                                             │
│ Amount: $225.00                            │
│ Date Returned: September 16                 │
│ Return Reason: Insufficient Funds (NRC)     │
│                                             │
│ WHAT THIS MEANS                             │
│ ────────────────────                        │
│ Your bank rejected this payment after we    │
│ submitted it. We're still trying to charge   │
│ you, but your bank keeps returning it.       │
│                                             │
│ YOU SHOULD DO THIS NOW                      │
│ ─────────────────────                       │
│ 1. Update your bank account information     │
│ 2. Or pay manually                          │
│                                             │
│ [Update Bank Account]    [Pay Manually]     │
│                                             │
│ This payment will be re-submitted after we  │
│ receive the updated information.            │
│                                             │
└─────────────────────────────────────────────┘
```

#### 3.11.2 Timeline View
```
Sep 30: Submitted (shown as processed)
         ↓
Sep 16: Returned by bank
         ↓
Current: Still attempting to process
```

#### 3.11.3 Distinguishing Features
- Clear separation between "submitted" and "settled"
- Return reason included when available
- Timeline showing status changes
- Actionable next steps prominent

---

### 3.12 Autopay Management

#### 3.12.1 Visual Layout
```
┌─────────────────────────────────────────────┐
│ Autopay Settings                            │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Status: Enabled                         │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Payment Method                              │
│ ────────────────────                        │
│ Chase ••••8915                              │
│ Expires: 12/2026                            │
│                                             │
│ Billing Frequency                           │
│ ──────────────────                          │
│ Monthly, on the 30th                        │
│                                             │
│ Advance Notice                               │
│ ──────────────                              │
│ Email reminder: 3 days before               │
│ Portal notification: same day               │
│                                             │
│ AUTHORIZATION DATE: August 15, 2024         │
│ (This authorization allows automatic charges)|
│                                             │
│ ACTIONS                                     │
│ ───────                                     │
│ [Disable Autopay]                            │
│ [Change Payment Method]                       │
│ [Update Billing Frequency]                    │
│                                              │
└─────────────────────────────────────────────┘
```

#### 3.12.2 Permission Controls
- **Account Owner:** Full access to all settings
- **Billing Administrator:** Can manage payment methods and autopay
- **Standard User:** Read-only billing view, no changes allowed
- **2Nspira Administrator:** Oversight, not client-facing

#### 3.12.3 Disabling Autopay
Simple flow:
1. "Disable autopay" button prominently displayed
2. Confirm dialog: "You'll receive an email for each charge until you re-enable autopay"
3. If payment method expired or declined, disable prompts manual payment option

---

### 3.13 Invoice History

#### 3.13.1 Visual Layout (Table View)
```
┌─────────────────────────────────────────────┐
│ Invoices                                    │
├─────────────────────────────────────────────┤
│                                             │
│ Invoice    Date     Due      Service         │
│ #          Paid?                    Amount   │
│ ─────────────────────────────────────────── │
│ 2026-085   ✓       Sep 15   Tech Retainer   │
│                     $450.00                 │
│                                             │
│ 2026-084   ✓       Aug 30    Tech Retainer   │
│                     $450.00                 │
│                                             │
│ 2026-083   ✓       Aug 1     Tech Retainer   │
│                     $450.00                 │
│                                             │
└─────────────────────────────────────────────┘
```

#### 3.13.2 Invoice Detail View
```
┌─────────────────────────────────────────────┐
│ Invoice #2026-085                          │
├─────────────────────────────────────────────┤
│                                             │
│ Date Issued: August 1, 2026                │
│ Due Date: September 15, 2026               │
│ Amount: $450.00                            │
│ Status: Paid                                │
│ Payment Date: September 15, 2026           │
│                                             │
│ ─────────────────────────────────────────── │
│ BREAKDOWN OF CHARGES                         │
│ • Technology Advisory Retainer: $400.00     │
│ • Website Hosting:                      $50.00│
│ • Invoice Fee:                            $0.00│
│                                             │
│ PAYMENT METHOD                              │
│ Chase ••••8915                              │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Download PDF    [Pay Now]              │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [View in Billing History]                   │
└─────────────────────────────────────────────┘
```

#### 3.13.3 Status Indicators
- ✓ Paid
- ⏳ Scheduled (due but not yet charged)
- ⚠️ Overdue (past due date)
- ❌ Cancelled (invoice cancelled)
- 🔄 Replaced (superceded by adjustment)

---

### 3.14 Payment History

#### 3.14.1 Visual Layout
```
┌─────────────────────────────────────────────┐
│ Payment History                             │
├─────────────────────────────────────────────┤
│                                             │
│ Date          Service          Method     │
│ ─────────────────────────────────────────── │
│ Sep 15       Tech Retainer     Chase   ✓ │
│                     $450.00        ••••8915│
│                                             │
│ Aug 30       Website Hosting   Visa     ✓ │
│                     $50.00          ••••4242│
│                                             │
│ Jul 30       Tech Retainer     Chase   ✓ │
│                     $450.00        ••••8915│
│                                             │
└─────────────────────────────────────────────┘
```

#### 3.14.2 Filters
- All Time / This Month / Last Quarter
- Service Type filter
- Payment Method filter
- Status filter (Paid, Failed, Pending)

---

## 4. User Flows

### 4.1 New Client First Login → Billing Setup
```
1. Land on welcome state
   ↓
2. See active services (if any)
   ↓
3. Prompt to add payment method (or confirm existing)
   ↓
4a. No payment method → Add via secure provider
     ↓
5. Verification complete → Return to dashboard
   ↓
4b. Payment method already on file → Confirm autopay status
     ↓
5. Redirect to dashboard

Alternative:
User opts to pay manually only (no autopay)
→ Dashboard shows manual payment options
```

### 4.2 Manual Payment Flow
```
1. Dashboard → "Pay Now"
   ↓
2. Invoice list displays
   ↓
3. Select unpaid invoice(s)
   ↓
4. Choose payment method (or add new)
   ↓
5. Confirm and process
   ↓
6. Success confirmation with receipt option
```

### 4.3 Autopay Management Flow
```
1. Dashboard → "Manage Autopay"
   ↓
2. View current autopay settings
   ↓
3. Action: Enable / Disable / Change Method / Update Frequency
   ↓
4. Confirmation dialog with authorization language
   ↓
5. Settings updated, redirect to billing overview
```

### 4.4 Failed Payment Recovery Flow
```
1. Scheduled charge fails (bank declines)
   ↓
2. Retry #2 (+1 day): Still fails
   ↓
3. Display failed payment page with reason
   ↓
4. Action options:
   a. Update payment method
   b. Pay manually now
   c. Contact support
   ↓
5a. If updated → Retry processing
    ↓
6a. Success or further failure
    ↓
5b. Manual payment → Confirm completion
```

---

## 5. Mobile Behavior

### 5.1 General Principles
- Convert tables to cards or vertical lists
- Use bottom sheets for primary actions
- Keep touch targets ≥ 44pt
- Avoid horizontal scrolling
- Progressive disclosure for dense info

### 5.2 Dashboard Mobile
```
┌─────────────────────┐
│ [Hamburger]   Balance                           │
│                     $0.00                       │
├─────────────────────┤
│ Next Payment                            ▼      │
│ ─────────────────────                      │
│ Tech Retainer        $225        Sep 30       │
│ Chase ••••8915           Autopay: ON         │
├─────────────────────┤
│ Services (2)                             ▼    │
│ • Technology Advisory Retainer               │
│ • Website Hosting                            │
├─────────────────────┤
│ Recent Activity                          ▼   │
│ • Paid Invoice #2026-085                  │
└─────────────────────┘

Bottom bar:
[Pay Now] [Billing] [Profile]
```

### 5.3 Payment Method Mobile (Add)
```
Full-screen flow:
1. Choose type (Bank / Card)
   ↓
2. Enter details with inline validation
   ↓
3. Provider verification overlay
   ↓
4. Confirmation → Done
```

### 5.4 Autopay Enrollment Mobile
- Same content as desktop but simplified
- Larger checkboxes and buttons
- Pull-down for verbose authorization text
- Biometric auth option on device unlock

---

## 6. Role & Permission Behavior

### 6.1 Role Definitions

| Role | Can View | Can Edit Payment | Can Manage Autopay | Notes |
|------|----------|------------------|--------------------|--------|
| Account Owner | Everything | All methods | All autopay | Primary admin |
| Billing Administrator | Everything | Own methods | Own autopay | Sub-admins |
| Standard User | Read-only billing | No | No | View only |
| 2Nspira Admin | Audit logs | N/A | N/A | Internal use |

### 6.2 Access Control Implementation
- Standard Users see billing info but grayed-out controls
- Attempting edit → "Contact your administrator to make changes"
- Billing Administrators can only modify their own settings
- Account Owner controls all client-side actions

---

## 7. States & Edge Cases

### 7.1 Payment Statuses
| State | Description | Visual Cue |
|-------|-------------|------------|
| Pending | Charge submitted, awaiting processing | ⏳ Spinner + "Processing..." |
| Processing | With provider, funds moving | ← Arrow animation |
| Paid | Funds transferred successfully | ✓ Green checkmark |
| Failed | Declined by bank/processor | ✗ Red warning icon |
| Returned | Submitted but later returned by bank | ↩️ Return icon + reason |
| Expired Card | Card expired, needs update | ⚠️ Expiration warning |

### 7.2 Loading States
- Skeleton screens for initial load
- Spinners for API calls
- Progressive disclosure (load next 10 items)

### 7.3 Error Handling
```
Network error:
"Unable to load your billing information. Please try again."
[Retry]
```

```
Authentication expired:
"You've been signed out for security reasons. Log in again."
[Log In]
```

---

## 8. Component Recommendations

### 8.1 Typography
- Headings: Clean sans-serif (e.g., Inter, SF Pro)
- Body: Readable, adequate line height (1.5–1.6)
- Financial numbers: Monospaced option for alignment

### 8.2 Color Usage
- Primary: Brand color from 2nspira.com
- Success: Green (#10B981 or similar)
- Warning: Amber/Orange (#F59E0B)
- Error: Red (#EF4444)
- Neutral: Grays for text, borders

### 8.3 Status Badges
```
Paid: [✓] Green background, white text
Pending: [⏳] Gray/Yellow, text on border
Failed: [✗] Red, urgent but calm tone
```

---

## 9. Copy & Microcopy Recommendations

### 9.1 Headlines
- Avoid: "Billing", "Payments", "Charges"
- Use: "Your Relationship," "What You Owe," "Next Payment"
- Tone: Calm, direct, not financial-services-boring

### 9.2 Buttons & Actions
- Primary: Pay Now, Add Payment Method, Enable Autopay
- Secondary: View Details, Make Changes, Update Method
- Destructive: Disable Autopay (confirm dialog required)

### 9.3 Error Messages
- Avoid: "Error 404", "Failed", "Declined"
- Use: "We couldn't process this payment," "Your card was declined,"
- Add helpful context: "Try a different card or contact your bank"

---

## 10. Accessibility Guidance

### 10.1 WCAG 2.1 AA Compliance
- Color contrast ratios ≥ 4.5:1 for normal text
- Keyboard navigable throughout
- Screen reader labels for all interactive elements
- Focus indicators visible

### 10.2 Form Elements
- Inline validation errors
- Helpful error explanations (not just "invalid")
- Payment fields masked appropriately
- Clear success/error states announced

### 10.3 Financial Numbers
- Align decimals vertically
- Use currency symbols consistently
- Show cents to 2 decimal places always

---

## 11. V1 vs Future Scope

### 11.1 V1 (This Release)
✅ Dashboard overview  
✅ View active services  
✅ Manual invoice payments  
✅ Add/remove payment methods  
✅ Autopay enrollment & management  
✅ Invoice history view  
✅ Payment status tracking  
✅ Advance notifications (email + portal)  

### 11.2 Future Considerations
- Multiple currencies / multi-entity support
- Budget/goal tracking
- Early-pay discounts or rewards
- Split payments between methods
- Subscription pause options
- API webhooks for provider integration

---

## 12. Wireframes Summary

All major screens documented above include ASCII wireframes showing:
- Layout hierarchy
- Component placement
- Touch target locations
- Visual flow and relationships

**Low-to-medium fidelity approach:**
- Focus on structure and information architecture
- Not visual design yet
- Clear enough for Adam to implement with actual 2Nspira design system

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| ACH | Automated Clearing House (US bank transfers) |
| Autopay | Recurring automatic charges to stored payment method |
| Provider | Payment processor handling transactions (Stripe, Square, etc.) |
| Tokenized payment | Masked representation of card/bank account |
| Return code | Bank rejection reason (R01: Insufficient Funds, etc.) |

---

## Appendix B: Security Notes

- All payment data handled by provider, not stored by 2Nspira
- TLS encryption for all data in transit
- Tokenization for card/bank information
- PCI-DSS compliance through provider
- No sensitive data ever displayed unmasked to clients

---

**End of UX Specification**  
*Author: Maya | Date: 2026-09-22*

<!-- project: path=/Users/agent2/.openclaw/workspace/main -->
