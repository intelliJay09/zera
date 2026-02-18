#!/bin/bash
echo "🔍 ZERA Typography Brand Compliance Check"
echo "=========================================="
echo ""

# Check 1: No font-playfair remaining
echo "✓ Check 1: Verify no font-playfair remaining"
PLAYFAIR_COUNT=$(grep -r "font-playfair" src/ 2>/dev/null | wc -l | tr -d ' ')
if [ "$PLAYFAIR_COUNT" -eq 0 ]; then
  echo "  ✅ PASS: No font-playfair found"
else
  echo "  ❌ FAIL: Found $PLAYFAIR_COUNT instances of font-playfair"
  grep -rn "font-playfair" src/ 2>/dev/null | head -10
fi
echo ""

# Check 2: font-display should have uppercase
echo "✓ Check 2: Verify font-display has uppercase"
DISPLAY_WITHOUT_UPPERCASE=$(grep -r "font-display" src/ 2>/dev/null | grep -v "uppercase" | grep -v "// " | grep -v "typography.ts" | wc -l | tr -d ' ')
if [ "$DISPLAY_WITHOUT_UPPERCASE" -eq 0 ]; then
  echo "  ✅ PASS: All font-display has uppercase"
else
  echo "  ⚠️  WARNING: Found $DISPLAY_WITHOUT_UPPERCASE instances of font-display without uppercase"
  grep -rn "font-display" src/ 2>/dev/null | grep -v "uppercase" | grep -v "// " | grep -v "typography.ts" | head -10
fi
echo ""

# Check 3: No tracking-tight on headers
echo "✓ Check 3: Verify no tracking-tight on headers"
TIGHT_TRACKING=$(grep -r "tracking-tight" src/ 2>/dev/null | grep -E "h1|h2|h3|font-display" | wc -l | tr -d ' ')
if [ "$TIGHT_TRACKING" -eq 0 ]; then
  echo "  ✅ PASS: No tracking-tight on headers"
else
  echo "  ❌ FAIL: Found $TIGHT_TRACKING instances of tracking-tight on headers"
  grep -rn "tracking-tight" src/ 2>/dev/null | grep -E "h1|h2|h3|font-display" | head -10
fi
echo ""

# Check 4: Count tracking-[0.X] custom values
echo "✓ Check 4: Check for custom letter spacing values (should use brand utilities)"
CUSTOM_TRACKING=$(grep -r "tracking-\[0\." src/ 2>/dev/null | wc -l | tr -d ' ')
echo "  ℹ️  INFO: Found $CUSTOM_TRACKING instances of custom tracking values"
if [ "$CUSTOM_TRACKING" -gt 0 ]; then
  echo "  📝 These should be reviewed and possibly replaced with brand utilities:"
  grep -rn "tracking-\[0\." src/ 2>/dev/null | head -10
fi
echo ""

# Check 5: font-light usage (should be font-normal or font-bold for headers)
echo "✓ Check 5: Check font-light usage"
FONT_LIGHT=$(grep -r "font-light" src/ 2>/dev/null | wc -l | tr -d ' ')
echo "  ℹ️  INFO: Found $FONT_LIGHT instances of font-light"
if [ "$FONT_LIGHT" -gt 0 ]; then
  echo "  📝 Review these - headers should use font-bold, body text can keep font-light or change to font-normal"
fi
echo ""

echo "=========================================="
echo "Typography Migration Summary:"
echo "- font-playfair: $PLAYFAIR_COUNT (should be 0)"
echo "- font-display without uppercase: $DISPLAY_WITHOUT_UPPERCASE (should be 0)"
echo "- tracking-tight on headers: $TIGHT_TRACKING (should be 0)"
echo "- Custom tracking values: $CUSTOM_TRACKING (review needed)"
echo "- font-light usage: $FONT_LIGHT (review needed)"
echo "=========================================="
