# Bayer Design System - React Vite Template# Next.js Bayer Theme - Reference Repository for AI_Design_Agent



AI-ready template with **strict Bayer color enforcement**. Only approved Bayer colors are allowed.> **Branch:** `nexjs_bayer_themes`  

> **Purpose:** This repository serves as a **reference/template repository** for AI_Design_Agent backend to generate Next.js UI applications with Bayer Design System themes.

## 🎨 Color System

## 🎯 Repository Purpose

### Available Colors

This is a **placeholder/template repository** for AI_Design_Agent (similar to Lovable app). The AI_Design_Agent backend will:

**Primary (Pink/Red):**

- `#ffdce4` to `#443247` (10 shades)1. **Reference this repository** when generating Next.js code

- Main: `#de0043`2. **Use theme files** (`bayer.theme.css` and `bayer2_5.theme.css`) for all color definitions

3. **Check placeholder.tsx** for structure patterns

**Secondary (Blue):**4. **Pick templates** from examples and composition guides

- `#e7f8ff` to `#10384f` (9 shades)5. **Build/override** codebase to generate new UI as per user requirements

- Main: `#10384f`

### For AI_Design_Agent Backend Developers

## 🚀 Usage

**📖 Start Here:** [AI_DESIGN_AGENT_REFERENCE.md](./AI_DESIGN_AGENT_REFERENCE.md) - Complete guide for integrating this repository with AI_Design_Agent backend.

### Text Colors

### For AI Code Generators

```tsx

<h1 className="lmnt-theme-primary">Primary Text</h1>Pure reference/placeholder for AI applications. No hardcoded templates - AI generates everything dynamically.

<p className="lmnt-theme-secondary">Secondary Text</p>

<p className="lmnt-theme-on-surface">Body Text</p>## 🤖 For AI: Quick Start

```

**📖 READ THIS:** [AI-INSTRUCTIONS.md](./AI-INSTRUCTIONS.md)

### Background Colors

### How It Works:

```tsx

<div className="lmnt-theme-primary-bg">Primary Background</div>1. **User requests a page** (login, dashboard, landing, blog, e-commerce, etc.)

<div className="lmnt-theme-surface-bg">Surface Background</div>2. **AI creates** `app/generated/[page-name].tsx` with generated code

```3. **AI updates** `app/generated/config.json` to `{"activePage": "page-name.tsx"}`

4. **Router loads** the page automatically

### Tailwind Integration

### Example Flow:

```tsx

<div className="bg-bayer-primary-400">Primary 400</div>```

<div className="text-bayer-secondary-700">Secondary 700</div>User: "Create a login page"

```

AI Actions:

## ❌ Forbidden1. Creates app/generated/login-page.tsx (with form, validation, Bayer CSS)

2. Updates app/generated/config.json → {"activePage": "login-page.tsx"}

```tsx3. Done! Page loads automatically

// ❌ Default Tailwind colors

<div className="bg-blue-500">NOT ALLOWED</div>User sees: Actual login page (not a template)

<div className="text-red-600">NOT ALLOWED</div>```



// ❌ Hex colors## 🎨 Mandatory: Use Bayer CSS Variables

<div style={{ color: '#ff0000' }}>NOT ALLOWED</div>

```tsx

// ❌ RGB colors// ✅ CORRECT

<div style={{ color: 'rgb(255, 0, 0)' }}>NOT ALLOWED</div>style={{ backgroundColor: 'var(--lmnt-theme-primary)' }}

```

// ❌ WRONG  

## 📚 ReferenceclassName="bg-blue-500"

```

- **Color Demo:** `src/BayerColorDemo.tsx` - See all colors in action

- **Theme CSS:** `src/styles/bayer-theme.css` - All color definitions## 📚 Documentation

- **Config:** `tailwind.config.js` - Bayer integration

### For AI_Design_Agent Backend:

## 🤖 AI Instructions1. **[AI_DESIGN_AGENT_REFERENCE.md](./AI_DESIGN_AGENT_REFERENCE.md)** ⭐ **START HERE** - Complete integration guide

2. **[REPOSITORY_STRUCTURE.md](./REPOSITORY_STRUCTURE.md)** - File structure reference

When AI generates UI:3. **[THEME_REFERENCE.md](./THEME_REFERENCE.md)** - Quick theme file reference

1. ✅ Use **only** `lmnt-theme-*` classes for colors

2. ✅ Use Tailwind for spacing/layout### For AI Code Generators:

3. ❌ Never use default Tailwind color classes1. **[AI-INSTRUCTIONS.md](./AI-INSTRUCTIONS.md)** ⭐ Main AI instructions

4. ❌ Never use hex/rgb colors2. **[COMPOSITION-GUIDE.md](./COMPOSITION-GUIDE.md)** - 5 complete page examples  

3. **[USE-ONLY-BAYER-THEMES.md](./USE-ONLY-BAYER-THEMES.md)** - 170+ CSS variables

## 🛠️ Development4. **[REACT-IMPORT-GUIDE.md](./REACT-IMPORT-GUIDE.md)** - Client vs Server components

5. **[components/layouts.tsx](./components/layouts.tsx)** - 10 reusable layouts

```bash

npm install## 🎨 Bayer Design System

npm run dev      # Start dev server

npm run build    # Production buildTwo theme variants available:

```

### Bayer Classic Theme

## 📦 Deployment```tsx

import '@/themes/bayer/bayer.theme.css';

Dockerfile included for Coolify deployment.```

- Primary: Pink (#de0043)

---- Secondary: Blue (#10384f)

- 170+ CSS variables

**Bayer Design System © 2026** - Strict Color Enforcement Active

### Bayer 2.5 Theme
```tsx
import '@/themes/bayer2_5/bayer2_5.theme.css';
```
- Primary: Blue (#006F9B)
- Monochromatic palette
- Lighter font weights

## 🎯 CSS Variable Usage (Mandatory)

**ALL colors MUST use Bayer CSS variables:**

```tsx
// ✅ CORRECT
<div style={{ backgroundColor: 'var(--lmnt-theme-primary)' }}>
<h1 style={{ color: 'var(--lmnt-theme-on-surface)' }}>
<button style={{ backgroundColor: 'var(--lmnt-theme-secondary)' }}>

// ❌ WRONG - Never use these!
<div className="bg-blue-500">
<h1 style={{ color: '#de0043' }}>
<button className="bg-secondary-600">
```

## 🧩 Available Resources

- **50+ UI components** in `/components/ui/` (Button, Card, Input, Dialog, etc.)
- **170+ CSS variables** for colors, spacing, typography
- **2 Bayer themes**: Classic and 2.5
- **10 layout components** in `components/layouts.tsx`
- **5 complete examples** in COMPOSITION-GUIDE.md

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS 3.3** (spacing/layout only, NOT colors)
- **shadcn/ui** + Radix UI
- **Bayer Design System** (170+ CSS variables)

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                    # Template (replace with generated code)
│   └── globals.css                 # Global styles
├── components/
│   ├── ui/                         # shadcn/ui components
│   └── layouts.tsx                 # 10 reusable layouts
├── themes/
│   ├── bayer/
│   │   └── bayer.theme.css        # Bayer Classic (170+ vars)
│   └── bayer2_5/
│       └── bayer2_5.theme.css     # Bayer 2.5 (170+ vars)
├── AI-CODE-GENERATOR-INSTRUCTIONS.md   # ⭐ Main AI instructions
├── README-FOR-AI-APPLICATIONS.md       # AI app developer guide
├── COMPOSITION-GUIDE.md                # 5 complete examples
├── USE-ONLY-BAYER-THEMES.md           # CSS variable reference
├── REACT-IMPORT-GUIDE.md              # Next.js patterns
└── .ai-instructions                    # Quick rules
```

## ✅ Validation Checklist

Generated code should:
- [ ] Import Bayer theme CSS
- [ ] Use CSS variables for ALL colors
- [ ] Include `'use client'` if interactive
- [ ] Import React hooks if using state
- [ ] Use shadcn/ui components
- [ ] Follow Next.js App Router patterns
- [ ] Be production-ready and complete
- [ ] Address user's specific request

## 🔗 Key Files

| File | Purpose | Audience |
|------|---------|----------|
| `AI_DESIGN_AGENT_REFERENCE.md` | **Integration guide for AI_Design_Agent backend** | Backend Developers |
| `themes/bayer/bayer.theme.css` | **Bayer Classic theme (170+ CSS variables)** | All |
| `themes/bayer2_5/bayer2_5.theme.css` | **Bayer 2.5 theme (170+ CSS variables)** | All |
| `app/generated/placeholder.tsx` | **Reference template structure** | All |
| `app/generated/config.json` | **Configuration for active page** | All |
| `AI-INSTRUCTIONS.md` | Complete AI generation guide | Code Generators |
| `COMPOSITION-GUIDE.md` | 5 working page examples | Code Generators |
| `USE-ONLY-BAYER-THEMES.md` | All CSS variables | Code Generators |
| `components/layouts.tsx` | Reusable layouts | Code Generators |

## 🎓 Learning Path

1. **AI Developers:** Start with `README-FOR-AI-APPLICATIONS.md`
2. **AI Generators:** Read `AI-CODE-GENERATOR-INSTRUCTIONS.md`
3. **Code Examples:** Study `COMPOSITION-GUIDE.md`
4. **CSS Reference:** Use `USE-ONLY-BAYER-THEMES.md`

## 📝 License

This is a template repository for code generation.

## 🆘 Troubleshooting

**Problem:** AI shows template instead of generating new code  
**Solution:** Read `AI-CODE-GENERATOR-INSTRUCTIONS.md` first

**Problem:** Generated code uses Tailwind colors  
**Solution:** Use CSS variables: `var(--lmnt-theme-primary)`

**Problem:** Code crashes (useState without 'use client')  
**Solution:** Add `'use client'` directive at top of file

**Problem:** Colors don't work  
**Solution:** Import theme CSS: `import '@/themes/bayer/bayer.theme.css';`

---

## 🎯 Remember

> This repository is a REFERENCE LIBRARY, not a complete app.
> 
> AI generators should READ the docs and GENERATE new code,
> not COPY the template files!

For complete instructions, see: **[AI-CODE-GENERATOR-INSTRUCTIONS.md](./AI-CODE-GENERATOR-INSTRUCTIONS.md)** 🚀
