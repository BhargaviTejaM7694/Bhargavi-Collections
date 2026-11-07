# WhatsApp Business Setup Guide

## For: Bhargavi Teja / Mittapalli Teja

### Current Status (as of 2026-11-07)

| Step | Status | Notes |
|------|--------|-------|
| Individual Verification | Done | Mittapalli Bhargavi Teja verified |
| Business Verification | **NOT DONE (BLOCKER)** | Required before templates can be created |
| Phone Number Added | Done | +91 91003 69789 on "Bhargavi Teja Collections" WABA |
| Message Templates | Blocked | Cannot create until business verification completes |
| Permanent Access Token | Pending | Current token expired |
| Code Integration | Done | All 3 message types coded and ready |

### Why This Is Needed
To send WhatsApp order notifications (order confirmation, processing, shipped) to customers, Meta requires **Business Verification** before the WhatsApp Business Account can create message templates. Without templates, the app cannot send any WhatsApp messages.

---

## What Needs To Be Done Now

### Step 1: Complete Business Verification (CRITICAL)

1. Open this link in your browser:
   **https://business.facebook.com/latest/settings/authorizations_verifications?business_id=1585816922047090**

2. Log in with your Facebook account (the one connected to "Hanuman Junction Rental Jewellery" business)

3. Look for **"Business verification"** section and click **"Start verification"** or **"Get Started"**

4. You will need to provide:
   - **Business name**: Bhargavi Teja Collections (or as registered)
   - **Business address**: Your registered business address
   - **Business phone number**: +91 91003 69789
   - **Business website**: Your website URL (if any)

5. **Upload ONE of these business documents** (clear, readable scan or photo):
   - **GST Registration Certificate** (recommended - fastest approval)
   - Certificate of Incorporation
   - Business License / Trade License
   - Tax Registration Certificate
   - Bank Statement (showing business name)
   - Utility Bill (in business name)

6. Submit and wait for Meta review

**Timeline**: Business verification typically takes **2-10 business days**. You'll receive a Facebook notification once approved or if additional documents are needed.

---

### Step 2: Create Message Templates (After Business Verification)

Once business verification is approved, create these 3 templates on the **"Bhargavi Teja Collections"** WABA:

1. Open WhatsApp Manager:
   **https://business.facebook.com/latest/whatsapp_manager/message_templates?business_id=1585816922047090&waba_id=1009912041100625**

2. Create each template:

#### Template 1: order_confirmation
- **Name**: `order_confirmation`
- **Category**: Utility
- **Language**: English
- **Body**:
  ```
  Hello {{1}}! Your order {{2}} has been confirmed. You ordered {{3}} item(s) for a total of {{4}}. We'll notify you when your order is being processed. Thank you for shopping with Bhargavi Teja Collections!
  ```
- **Sample values**: {{1}}=Priya, {{2}}=ORD-001, {{3}}=2, {{4}}=₹5,000

#### Template 2: order_processing
- **Name**: `order_processing`
- **Category**: Utility
- **Language**: English
- **Body**:
  ```
  Hello {{1}}! Great news - your order {{2}} is now being processed and prepared for shipping. We'll send you another update once it's shipped. Thank you for your patience!
  ```
- **Sample values**: {{1}}=Priya, {{2}}=ORD-001

#### Template 3: order_shipped
- **Name**: `order_shipped`
- **Category**: Utility
- **Language**: English
- **Body**:
  ```
  Hello {{1}}! Your order {{2}} has been shipped! You can expect delivery within 3-5 business days. Thank you for shopping with Bhargavi Teja Collections!
  ```
- **Sample values**: {{1}}=Priya, {{2}}=ORD-001

---

### Step 3: Create Permanent Access Token

1. Open this link:
   **https://business.facebook.com/latest/settings/system_users?business_id=1585816922047090**
2. Click **"Add"** to create a new system user
3. Set the name to **"WhatsApp API"** and role to **"Admin"**
4. Click **"Generate new token"**
5. Select the app **"BT Collections Notify"**
6. Check these two permissions:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
7. Click **"Generate token"**
8. **Copy the token immediately** (you won't see it again!)

---

### Step 4: Bring Phone Number Online

1. Open WhatsApp Manager phone numbers:
   **https://business.facebook.com/latest/whatsapp_manager/phone_numbers?business_id=1585816922047090&waba_id=1009912041100625**
2. The phone number +91 91003 69789 should show status "Connected" after business verification
3. If it shows "Offline", click on it and follow the prompts to verify/connect it

---

## What to Share with Developer (Prasad)

After completing all steps, share these values:

1. **Permanent Access Token**: The token copied in Step 3
2. **Confirmation** that all 3 templates are approved (Active status)

The Phone Number ID is already configured: `633405309853490`

---

## Technical Reference

| Item | Value |
|------|-------|
| Meta App | BT Collections Notify (ID: 2196052237922394) |
| Business Portfolio | Hanuman Junction Rental Jewellery (ID: 1585816922047090) |
| Production WABA | Bhargavi Teja Collections (ID: 1009912041100625) |
| Phone Number | +91 91003 69789 |
| Phone Number ID | 633405309853490 |
| WhatsApp API Version | v21.0 |

---

## Need Help?
If you get stuck at any step, take a screenshot and share it with Prasad.
