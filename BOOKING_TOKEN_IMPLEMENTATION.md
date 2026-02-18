# One-Time Booking Token System - Implementation Complete

**Date:** 2026-01-29
**Status:** ✅ IMPLEMENTED
**Security Level:** HIGH

---

## Overview

Implemented cryptographically secure, single-use, time-limited booking tokens to prevent unauthorized access to Calendly booking flow after payment.

---

## Security Problem Solved

**Before (INSECURE):**
- Anyone with success page URL could book Calendly sessions
- Users could refresh page to create multiple bookings
- No expiration on booking links
- Success page URL was public and shareable

**After (SECURE):**
- One-time tokens required to access booking page
- Tokens expire after 24 hours
- Tokens marked as used immediately when booking confirmed
- Cryptographically secure (256-bit entropy)
- Database-enforced single-use constraint

---

## Implementation Details

### 1. Database Schema (Migration 010)

**File:** `database/migrations/010_add_booking_tokens.sql`

**New Columns:**
- `booking_token` (VARCHAR(64), UNIQUE) - Cryptographically secure token
- `booking_token_used` (BOOLEAN) - Tracks if token consumed
- `booking_token_expires_at` (DATETIME) - 24-hour expiration
- `calendly_event_booked` (BOOLEAN) - Tracks if Calendly event scheduled
- `calendly_event_booked_at` (DATETIME) - Timestamp of booking

**Indexes:**
- `idx_booking_token` - Fast token lookups
- `idx_token_expiry` - Expiration checks
- `idx_token_used` - Usage tracking
- `idx_event_booked` - Booking status

---

### 2. Booking Token Utilities

**File:** `src/lib/booking-token.ts`

**Functions:**
- `generateBookingToken()` - Creates 64-char hex string (crypto.randomBytes(32))
- `createBookingToken(sessionId)` - Generates token, saves to database with 24h expiration
- `verifyBookingToken(sessionId, token)` - Validates token (payment completed, not used, not expired)
- `markTokenAsUsed(sessionId, token)` - Marks token as consumed when Calendly event scheduled

**Security Features:**
- 256-bit entropy (1 in 10^77 collision probability)
- Multiple validation checks (payment, usage, expiration, booking status)
- Database constraints enforce uniqueness

---

### 3. API Routes

#### Verify Token
**File:** `src/app/api/book-strategy-session/verify-token/route.ts`

**Endpoint:** `GET /api/book-strategy-session/verify-token?sessionId=xxx&token=yyy`

**Validation Checks:**
1. Session exists with matching token
2. Payment status is 'completed'
3. Token not already used
4. Token not expired (24h window)
5. Calendly event not already booked

**Returns:**
- `{ valid: true, session: {...} }` - Token valid, session data returned
- `{ valid: false, reason: "..." }` - Token invalid with reason

#### Mark Token Used
**File:** `src/app/api/book-strategy-session/mark-token-used/route.ts`

**Endpoint:** `POST /api/book-strategy-session/mark-token-used`

**Payload:** `{ sessionId: "...", token: "..." }`

**Action:** Marks token as used and sets `calendly_event_booked = TRUE`

---

### 4. Payment Callback Update

**File:** `src/app/api/book-strategy-session/payment-callback/route.ts`

**Changes:**
- After successful payment, generates booking token
- Redirects to `/booking/success?sessionId=xxx&token=yyy` (previously no token)

**Code:**
```typescript
// Generate one-time booking token
const { createBookingToken } = await import('@/lib/booking-token');
const bookingToken = await createBookingToken(sessionId);

// Redirect to success page with token
const redirectUrl = createRedirectUrl(
  request,
  `/booking/success?sessionId=${sessionId}&token=${bookingToken}`
);
```

---

### 5. Success Page Overhaul

**File:** `src/app/booking/success/page.tsx`

**Page States:**
1. `loading` - Verifying token
2. `valid` - Token valid, show Calendly widget
3. `invalid` - Token doesn't exist or doesn't match session
4. `used` - Token already consumed (previous booking)
5. `expired` - Token older than 24 hours
6. `booked` - Just completed booking via Calendly

**Flow:**
1. Extract `sessionId` and `token` from URL query params
2. Call `/api/book-strategy-session/verify-token` to validate
3. If valid, show Calendly widget with user's prefilled data
4. Listen for `calendly.event_scheduled` postMessage event
5. When event scheduled, call `/api/book-strategy-session/mark-token-used`
6. Show "Session Confirmed" message
7. If user refreshes or shares URL, shows "Already Booked" message

**Error States:**
- **Invalid Token:** "Invalid Booking Link" with contact support button
- **Already Used:** "Already Booked" message (green checkmark)
- **Expired:** "Booking Link Expired (24-hour limit)" with support email

---

## Security Features

### Attack Prevention

| Attack Vector | Prevention Method |
|--------------|-------------------|
| **URL Sharing** | Token becomes invalid after use |
| **Refresh Abuse** | Token marked as used immediately when booked |
| **Brute Force** | 64-char random hex = computationally infeasible |
| **Token Reuse** | Database enforces single-use constraint via `booking_token_used` |
| **Expired Token** | 24-hour expiration window enforced |
| **Payment Bypass** | Token verification checks payment status |
| **Direct Access** | Success page requires both sessionId AND token |

### Cryptographic Strength
- Uses Node.js `crypto.randomBytes(32)` - cryptographically secure PRNG
- 256-bit entropy (2^256 possible combinations)
- Collision probability: ~1 in 1.16 × 10^77
- Industry-standard token generation approach

---

## User Experience

### Happy Path
1. User completes payment on Paystack
2. Payment callback generates token and redirects to success page
3. Success page verifies token → shows "Payment Confirmed" header
4. User selects time in Calendly widget
5. Calendly event scheduled → frontend marks token as used
6. Shows "Session Confirmed" message
7. User receives email confirmations

### Error Paths

**User Refreshes After Booking:**
- Token verification returns "already used"
- Shows "Already Booked" message (positive UX, not error)
- Directs to check email for confirmation

**User Accesses Old Link (>24h):**
- Token verification returns "expired"
- Shows "Booking Link Expired" message
- Provides support email to request new link

**User Accesses Invalid Link:**
- Token verification fails
- Shows "Invalid Booking Link" message
- Provides contact support button

---

## Files Created/Modified

### New Files (4)
1. `database/migrations/010_add_booking_tokens.sql` - Database schema
2. `src/lib/booking-token.ts` - Token generation and verification
3. `src/app/api/book-strategy-session/verify-token/route.ts` - Token verification endpoint
4. `src/app/api/book-strategy-session/mark-token-used/route.ts` - Mark token used endpoint

### Modified Files (2)
1. `src/app/api/book-strategy-session/payment-callback/route.ts` - Generate token on payment
2. `src/app/booking/success/page.tsx` - Token validation and UX states

---

## Testing Checklist

### ✅ Security Tests
- [x] Cannot access success page without token
- [x] Cannot book without valid token
- [x] Token single-use enforced (refresh shows "Already Booked")
- [x] Token expiration enforced (24 hours)
- [x] URL sharing prevented (token consumed after first use)
- [x] Payment status validated (must be 'completed')

### ✅ User Experience Tests
- [x] Clear error messages for each failure case
- [x] "Already Booked" message if token used
- [x] "Expired" message if token >24h old
- [x] "Session Confirmed" message after booking
- [x] Loading state while verifying token
- [x] Calendly widget prefilled with user data

### ✅ Technical Tests
- [x] Database migration applied successfully
- [x] No TypeScript errors introduced
- [x] ESLint passes (no new errors)
- [x] Token generation cryptographically secure
- [x] API endpoints respond correctly

---

## Database Verification

```bash
# Verify columns added
mysql -u jacqueline astraflow -e "SHOW COLUMNS FROM strategy_sessions WHERE Field LIKE '%booking_token%' OR Field LIKE '%calendly_event_booked%';"

# Output:
# booking_token              | varchar(64) | YES | UNI  | NULL
# booking_token_used         | tinyint(1)  | YES | MUL  | 0
# booking_token_expires_at   | datetime    | YES | MUL  | NULL
# calendly_event_booked      | tinyint(1)  | YES | MUL  | 0
# calendly_event_booked_at   | datetime    | YES |      | NULL

# Verify indexes
mysql -u jacqueline astraflow -e "SHOW INDEX FROM strategy_sessions WHERE Key_name LIKE '%booking_token%' OR Key_name LIKE '%event_booked%';"
```

---

## Success Metrics

**Security:**
- ✅ Cannot book without valid token
- ✅ Token single-use enforced
- ✅ URL sharing prevented
- ✅ Refresh abuse prevented
- ✅ Token expiration enforced (24 hours)
- ✅ Payment validation enforced

**User Experience:**
- ✅ Clear error messages for each failure case
- ✅ Positive messaging for "Already Booked" (not error)
- ✅ Support contact information provided
- ✅ Loading states implemented
- ✅ Success states implemented
- ✅ Calendly widget prefilled

**Database:**
- ✅ Token stored securely
- ✅ Token usage tracked
- ✅ Expiration tracked
- ✅ Calendly event booking tracked
- ✅ Indexes created for performance

---

## Production Deployment Notes

1. **Environment Variables:** No new environment variables required
2. **Database Migration:** Already applied to local database
3. **Breaking Changes:** None - existing bookings unaffected
4. **Rollback Plan:** Can remove token requirement by reverting success page changes
5. **Monitoring:** Watch for token verification failures in logs

---

## Future Enhancements

**Potential Additions:**
- Email booking link to user (include token in email)
- Admin dashboard to regenerate expired tokens
- Token usage analytics (how many expired, how many used)
- Configurable expiration window (currently 24h)
- Rate limiting on token verification endpoint

---

**Implementation Time:** ~2 hours
**Complexity:** LOW-MEDIUM
**Risk Level:** LOW (non-breaking change)
**Confidence:** VERY HIGH (industry-standard pattern)
