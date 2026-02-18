# Email Flow Optimization - Testing Guide

**Date:** 2026-02-01
**Tester:** Jacqueline

---

## Quick Test Scenarios

### Scenario 1: Normal Flow (Payment → Immediate Booking)

**Expected Behavior:**
1. Customer submits booking form
2. Customer pays via Paystack
3. ✅ Customer receives Paystack payment confirmation (external)
4. ❌ Customer receives NO email from us
5. ✅ Team (jacque.amoako@gmail.com) receives notification
6. Customer redirected to Calendly
7. Customer books time slot
8. ✅ Customer receives booking confirmation with prep checklist
9. ✅ Email does NOT say "book your slot" (they already did)

**Steps:**
```bash
1. Go to: https://zerahq.com/products/strategy-session
2. Fill form with test data
3. Pay via Paystack (use test card)
4. Check jacque.amoako@gmail.com for team notification
5. Confirm NO customer email sent from hello@zerahq.com
6. Book Calendly slot immediately
7. Check customer email for booking confirmation
8. Verify prep checklist says "is conducting" (not "has completed")
9. Verify "Test audio/video setup" in checklist
```

---

### Scenario 2: Incomplete Booking (Payment → No Calendly Booking)

**Expected Behavior:**
1. Customer pays via Paystack
2. Customer redirected to Calendly but CLOSES browser
3. 3 hours pass
4. Cron job runs
5. ✅ Customer receives reminder: "Payment Confirmed - Next: Book Your Time Slot"
6. Email includes Calendly booking link
7. Database: `incomplete_booking_email_sent = TRUE`

**Steps:**
```bash
1. Submit booking form and pay
2. On Calendly redirect page, close browser (don't book)
3. Wait 3+ hours OR manually trigger cron:

   curl -X POST http://localhost:3004/api/cron/incomplete-bookings \
     -H "Authorization: Bearer {CRON_SECRET}"

4. Check customer email for reminder
5. Verify email subject: "✓ Strategy Session Confirmed - Next: Book Your Time Slot"
6. Click Calendly link in email
7. Check database:

   SELECT incomplete_booking_email_sent, incomplete_booking_email_sent_at
   FROM strategy_sessions
   WHERE business_email = 'test@example.com';
```

---

### Scenario 3: 24-Hour Session Reminder (Existing Flow)

**Expected Behavior:**
1. Customer has booked session for tomorrow
2. 24 hours before session
3. Cron job runs
4. ✅ Customer receives reminder: "Tomorrow: Your Strategy Session"
5. Prep checklist included

**Steps:**
```bash
1. Book session for tomorrow's date
2. Wait 24 hours OR manually trigger cron:

   curl -X POST http://localhost:3004/api/cron/session-reminders \
     -H "Authorization: Bearer {CRON_SECRET}"

3. Check customer email for 24h reminder
4. Verify prep checklist correct
```

---

### Scenario 4: Abandoned Booking (No Payment)

**Expected Behavior:**
1. Customer submits booking form but doesn't pay
2. 24 hours pass
3. Cron job runs
4. ✅ Customer receives recovery email: "Complete Your Booking"

**Steps:**
```bash
1. Submit booking form
2. Close Paystack modal without paying
3. Wait 24 hours OR manually trigger cron:

   curl -X POST http://localhost:3004/api/cron/abandoned-bookings \
     -H "Authorization: Bearer {CRON_SECRET}"

4. Check customer email for abandoned booking recovery
5. Verify resume payment link works
```

---

## Email Content Verification

### Team Notification (After Payment)
**To:** jacque.amoako@gmail.com
**Subject:** 🎯 New Strategy Session - {Company Name}

**Should include:**
- Contact information (name, email, company, website, WhatsApp)
- Business context (revenue, obstacle, desired outcome)
- Payment details (reference, amount, session ID)
- Marketing attribution (if available)

---

### Booking Confirmation (After Calendly)
**To:** Customer email
**Subject:** 📅 Strategy Session Scheduled - {Date}

**Should include:**
- Scheduled date and time with timezone
- Meeting link (Google Meet/Zoom)
- Reschedule and cancel links
- **CRITICAL:** Prep checklist with:
  - "Google Analytics, Search Console, etc." (updated)
  - "is conducting" audit (NOT "has completed")
  - "Test audio/video setup 5 minutes before"
- **CRITICAL:** NO "book your slot" messaging

---

### Incomplete Booking Reminder (3h After Payment)
**To:** Customer email
**Subject:** ✓ Strategy Session Confirmed - Next: Book Your Time Slot

**Should include:**
- Payment confirmation
- Payment reference
- "NEXT STEP: BOOK YOUR TIME SLOT" section
- Calendly booking URL button
- "What happens next" (3 steps: audit → session → action plan)

---

## Database Queries for Testing

### Check Incomplete Bookings
```sql
SELECT
  id,
  full_name,
  business_email,
  company_name,
  payment_status,
  calendly_status,
  paid_at,
  incomplete_booking_email_sent,
  incomplete_booking_email_sent_at,
  TIMESTAMPDIFF(HOUR, paid_at, NOW()) as hours_since_payment
FROM strategy_sessions
WHERE payment_status = 'completed'
  AND calendly_status = 'not_booked'
ORDER BY paid_at DESC;
```

### Check Email Tracking
```sql
SELECT
  id,
  full_name,
  business_email,
  confirmation_email_sent,          -- Should be FALSE (we removed this)
  team_notification_sent,           -- Should be TRUE
  incomplete_booking_email_sent,    -- TRUE if 3h+ passed without booking
  calendly_confirmation_sent,       -- TRUE if booked on Calendly
  reminder_email_sent               -- TRUE if 24h before session
FROM strategy_sessions
WHERE business_email = 'test@example.com';
```

---

## Cron Job Manual Triggers

### Local Development (Port 3004)
```bash
# Incomplete bookings reminder (every 2 hours)
curl -X POST http://localhost:3004/api/cron/incomplete-bookings \
  -H "Authorization: Bearer {CRON_SECRET}"

# Session reminders (every hour)
curl -X POST http://localhost:3004/api/cron/session-reminders \
  -H "Authorization: Bearer {CRON_SECRET}"

# Abandoned bookings (daily at 9am)
curl -X POST http://localhost:3004/api/cron/abandoned-bookings \
  -H "Authorization: Bearer {CRON_SECRET}"
```

### Production (zerahq.com)
```bash
# Replace with production CRON_SECRET
curl -X POST https://zerahq.com/api/cron/incomplete-bookings \
  -H "Authorization: Bearer {PRODUCTION_CRON_SECRET}"
```

---

## Common Issues and Fixes

### Issue: Customer still receives payment confirmation from us
**Cause:** Webhook code not updated or cached
**Fix:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev

# Hard refresh browser (Cmd+Shift+R)
```

### Issue: Incomplete booking reminder not sent after 3 hours
**Cause:** Cron job not running or database field missing
**Fix:**
```bash
# Check database columns exist
mysql -u jacqueline astraflow -e "SHOW COLUMNS FROM strategy_sessions LIKE 'incomplete_booking%';"

# Manually trigger cron
curl -X POST http://localhost:3004/api/cron/incomplete-bookings \
  -H "Authorization: Bearer {CRON_SECRET}"

# Check cron logs
tail -f .dev-server.log | grep "\[Cron\]"
```

### Issue: Booking confirmation still says "book your slot"
**Cause:** Email template not updated
**Fix:**
```bash
# Verify changes in email template
grep -A 5 "PREPARE FOR YOUR SESSION" src/lib/email-strategy-sessions.ts

# Should see "is conducting" not "has completed"
# Should see "Test your audio/video setup"
```

---

## Test Data

### Test Customer Information
```json
{
  "fullName": "Test Customer",
  "businessEmail": "test+strategy@example.com",
  "companyName": "Test Corp",
  "websiteUrl": "https://example.com",
  "whatsappNumber": "+1234567890",
  "revenueRange": "$50K-$200K",
  "growthObstacle": "Low website traffic",
  "magicWandOutcome": "10x organic traffic in 6 months"
}
```

### Paystack Test Cards
```
Success: 4084084084084081
Declined: 4084080000000408
```

---

## Success Criteria Checklist

**Email Flow:**
- [ ] Customer receives NO email from us after payment
- [ ] Paystack sends payment confirmation (check customer email)
- [ ] Team notification sent to jacque.amoako@gmail.com
- [ ] Booking confirmation sent after Calendly booking
- [ ] Booking confirmation does NOT mention "book your slot"
- [ ] Incomplete booking reminder sent 3h after payment (if no booking)

**Email Content:**
- [ ] Prep checklist says "is conducting" (not "has completed")
- [ ] Prep checklist includes "Test audio/video setup"
- [ ] Prep checklist says "Google Analytics, Search Console"
- [ ] No "book your slot" messaging in booking confirmation

**Database:**
- [ ] `incomplete_booking_email_sent` column exists
- [ ] `incomplete_booking_email_sent_at` column exists
- [ ] Index `idx_incomplete_booking_check` exists
- [ ] Email tracking fields updated correctly

**Cron Jobs:**
- [ ] Incomplete bookings cron runs every 2 hours
- [ ] Session reminders cron still runs every hour
- [ ] Abandoned bookings cron still runs daily at 9am
- [ ] All crons can be triggered manually with Authorization header

---

## Timeline Verification

**After Payment:**
- T+0s: Payment completed
- T+0s: Paystack sends confirmation (external)
- T+0s: Team notification sent to jacque.amoako@gmail.com
- T+0s: Customer redirected to Calendly
- T+0s: ❌ NO customer email from us

**After Calendly Booking:**
- T+2m: Customer books time slot
- T+2m: Booking confirmation sent to customer
- T+2m: CRM webhook sent

**If No Calendly Booking:**
- T+3h: Incomplete booking reminder sent
- T+3h: Database updated: `incomplete_booking_email_sent = TRUE`

**Before Session:**
- T+24h: 24-hour reminder sent

---

## Rollback Procedure

If major issues found during testing:

1. **Restore team email to env variable:**
   ```typescript
   const TEAM_EMAIL = process.env.EMAIL_TO || 'hello@zerahq.com';
   ```

2. **Re-enable customer payment confirmation:**
   ```bash
   git revert HEAD~1  # Or specific commit
   ```

3. **Disable incomplete booking cron:**
   ```json
   // Remove from vercel.json temporarily
   ```

4. **Revert database:**
   ```sql
   DROP INDEX idx_incomplete_booking_check ON strategy_sessions;
   ALTER TABLE strategy_sessions
   DROP COLUMN incomplete_booking_email_sent,
   DROP COLUMN incomplete_booking_email_sent_at;
   ```

---

**Tester:** Jacqueline
**Test Date:** 2026-02-01
**Status:** Ready for testing
