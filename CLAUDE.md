# Zera Project - Claude Instructions

## Server Management

### ngrok Server
**CRITICAL**: Do not ever kill ngrok's server without explicit permission from the user.

ngrok tunnels are used for:
- Paystack payment callback testing (webhooks)
- Calendly webhook testing
- External service integrations

Killing the ngrok process will:
- Break payment callback testing
- Break webhook integrations
- Require regenerating tunnel URLs in external services

**Always ask before:**
- Running `lsof -ti:4040 | xargs kill`
- Running `pkill ngrok`
- Stopping any ngrok process
- Restarting the ngrok tunnel
