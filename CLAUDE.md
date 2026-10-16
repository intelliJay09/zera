# Zera Project - Claude Instructions

## Writing & Copy Style

- **NEVER use the em dash (—)**. Always use a regular hyphen-dash (-) instead.

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

## Design Standard

**Awwwards mode: contest** (chosen 2026-10-16). Build to contest Site of the Year: the awwwards-sotd skill's contest-mode rules apply (immersive WebGL allowed when it is the idea, real-progress loader, R&D prototypes of the signature mechanic before design), while keeping Usability >= 7.6 and Developer >= 7.5 in every category.
