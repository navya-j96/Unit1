🎨 BAYER DESIGN SYSTEM - STRICT COLOR ENFORCEMENT 🎨

⚠️ CRITICAL: You MUST use ONLY Bayer Design System colors. NO other colors allowed!

════════════════════════════════════════════════════════════════

COLOR USAGE RULES:

1. ❌ FORBIDDEN - Never use these:
   - Tailwind default colors: bg-blue-500, text-red-600, etc.
   - Hex colors: #ff0000, #3b82f6, etc.
   - RGB colors: rgb(255, 0, 0), etc.
   - Any color not from Bayer Design System

2. ✅ REQUIRED - Use ONLY Bayer classes:

   TEXT COLORS:
   - .lmnt-theme-primary
   - .lmnt-theme-secondary
   - .lmnt-theme-on-primary
   - .lmnt-theme-on-secondary
   - .lmnt-theme-on-surface
   - .lmnt-theme-danger
   - .lmnt-theme-success
   
   BACKGROUND COLORS:
   - .lmnt-theme-primary-bg
   - .lmnt-theme-secondary-bg
   - .lmnt-theme-surface-bg
   - .lmnt-theme-surface-variant-bg
   - .lmnt-theme-danger-bg
   - .lmnt-theme-success-bg

   OR use Tailwind with Bayer colors:
   - bg-bayer-primary-400
   - text-bayer-secondary-700
   - border-bayer-primary-500

3. OPACITY VARIANTS (for disabled/inactive states):
   - .lmnt-theme-on-primary-active (87% opacity)
   - .lmnt-theme-on-primary-inactive (73% opacity)
   - .lmnt-theme-on-primary-disabled (38% opacity)

4. DIVIDERS/BORDERS (12% opacity strokes):
   - .lmnt-theme-divider-primary
   - .lmnt-theme-on-primary-stroke-border

════════════════════════════════════════════════════════════════

EXAMPLE CORRECT USAGE:

```tsx
// ✅ CORRECT
<div className="lmnt-theme-primary-bg lmnt-theme-on-primary">
  <h1 className="lmnt-theme-primary">Bayer Healthcare</h1>
  <p className="lmnt-theme-on-surface">Description text</p>
  <button className="lmnt-theme-secondary-bg lmnt-theme-on-secondary">
    Click Me
  </button>
</div>

// ✅ ALSO CORRECT (Tailwind with Bayer colors)
<div className="bg-bayer-primary-400 text-white">
  <h1 className="text-bayer-secondary-700">Title</h1>
</div>

// ❌ WRONG - DO NOT DO THIS!
<div className="bg-blue-500 text-red-600">  // ❌ Default Tailwind colors
  <h1 style={{color: '#ff0000'}}>Title</h1> // ❌ Hex colors
</div>
```

════════════════════════════════════════════════════════════════

DESIGN GUIDELINES:

For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

ALLOWED TOOLS:
- ✅ Tailwind CSS classes (spacing, layout, flexbox, grid, etc.)
- ✅ Bayer Design System color classes (ONLY)
- ✅ React hooks (useState, useEffect, etc.)
- ✅ Lucide React for icons
- ✅ Unsplash for images (link only, don't download)

RESTRICTIONS:
- ❌ NO other UI libraries (unless I specifically request)
- ❌ NO custom color values
- ❌ NO Tailwind default color classes

════════════════════════════════════════════════════════════════

Remember: Bayer colors ONLY. No exceptions!

