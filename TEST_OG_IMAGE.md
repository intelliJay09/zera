# Testing Open Graph Image

## Issue: OG Image Not Showing

### Current Configuration
- **File Location:** `/public/images/og-zera-sovereign.jpg` ✅
- **File Size:** 50KB ✅
- **Metadata Path:** `/images/og-zera-sovereign.jpg` ✅
- **MetadataBase:** `https://zerahq.com` (or localhost in dev) ✅

---

## Fix Steps Completed

1. ✅ **Cleared Next.js Cache**
   ```bash
   rm -rf .next
   ```

2. **Next: Restart Dev Server**
   ```bash
   # Stop current server (Ctrl+C or kill process)
   npm run dev
   ```

3. **Then: Clear Browser Cache**
   - Chrome: Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)
   - Or use Incognito/Private mode

---

## How to Test OG Image

### Method 1: View Page Source (After Restart)
1. Go to `http://localhost:3000`
2. Right-click → "View Page Source"
3. Search for `og:image`
4. You should see:
   ```html
   <meta property="og:image" content="http://localhost:3000/images/og-zera-sovereign.jpg">
   <meta property="og:image:width" content="1200">
   <meta property="og:image:height" content="630">
   ```

### Method 2: Direct Image Access
Test if image loads directly:
- Dev: `http://localhost:3000/images/og-zera-sovereign.jpg`
- Prod: `https://zerahq.com/images/og-zera-sovereign.jpg`

### Method 3: Social Media Debuggers (After Deployment)

**LinkedIn Post Inspector:**
1. Go to LinkedIn
2. Create a new post
3. Paste your URL: `https://zerahq.com`
4. LinkedIn will show preview with your OG image

**Twitter Card Validator:**
- https://cards-dev.twitter.com/validator
- Enter: `https://zerahq.com`

**Facebook Sharing Debugger:**
- https://developers.facebook.com/tools/debug/
- Enter: `https://zerahq.com`

**OpenGraph.xyz:**
- https://www.opengraph.xyz/
- Enter: `https://zerahq.com`
- Shows how your OG tags will appear

---

## Common Issues & Solutions

### Issue 1: Image Not Loading in Dev
**Cause:** Dev server caching or not restarted
**Solution:**
```bash
# Stop server
lsof -ti:3000 | xargs kill -9

# Clear cache
rm -rf .next

# Restart
npm run dev

# Hard refresh browser: Cmd+Shift+R
```

### Issue 2: Wrong Path in Metadata
**Check:** File must be in `/public/images/` (not `/public/` or `/src/`)
**Verify:**
```bash
ls -lh public/images/og-zera-sovereign.jpg
```

### Issue 3: File Extension Mismatch
**Check:** Metadata says `.jpg` but file is `.png`
**Current Config:** Looking for `.jpg` ✅
**Current File:** `.jpg` ✅

### Issue 4: MetadataBase Not Set
**Check:** `metadataBase` in layout.tsx
**Current:** Set to `https://zerahq.com` ✅

---

## Verification Checklist

After restarting dev server, check:

- [ ] Image loads directly at: `http://localhost:3000/images/og-zera-sovereign.jpg`
- [ ] View page source shows `<meta property="og:image" ...>`
- [ ] Browser hard refresh completed (Cmd+Shift+R)
- [ ] OG image appears in page source with correct URL
- [ ] Image dimensions show as 1200x630 in meta tags

---

## Expected HTML Output

When you view source on `http://localhost:3000`, you should see:

```html
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="http://localhost:3000">
<meta property="og:site_name" content="ZERA">
<meta property="og:title" content="ZERA | Digital Growth Systems">
<meta property="og:description" content="We engineer market sovereignty. Stop building websites. Start building assets.">
<meta property="og:image" content="http://localhost:3000/images/og-zera-sovereign.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="1200">
<meta property="og:image:alt" content="ZERA Digital Growth Systems">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@zerahq">
<meta name="twitter:creator" content="@zerahq">
<meta name="twitter:title" content="ZERA | Market Sovereignty">
<meta name="twitter:description" content="We engineer revenue systems for global brands.">
<meta name="twitter:image" content="http://localhost:3000/images/og-zera-sovereign.jpg">
```

---

## Alternative: Use PNG Instead of JPG

If you prefer to use the original PNG file:

```bash
# Option 1: Rename to use PNG in code
# Update layout.tsx to reference .png instead of .jpg

# Option 2: Convert PNG to JPG (already done)
# File already copied to og-zera-sovereign.jpg
```

Current setup uses JPG (✅ recommended for smaller file size).

---

## Status After Fix

1. ✅ Next.js cache cleared
2. ⏳ Restart dev server (you need to do this)
3. ⏳ Hard refresh browser
4. ⏳ Verify image loads

**Next Step:** Restart your dev server and hard refresh browser.
