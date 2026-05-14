# Design Brief — AskSpark Dark Theme

**Theme:** Dark mode (navy/indigo gradient) | **Primary Font:** Bricolage Grotesque | **Body Font:** Figtree | **Accent Usage:** Neon purple/blue glows, CTA buttons, floating elements | **Layout:** Glassmorphic card-based, sidebar nav, hero with floating badges | **Aesthetic:** Premium AI startup (Linear/Notion dark mode), neon accents, smooth animations, professional confidence-building

---

## Palette (OKLCH)

| Token            | L    | C    | H   | Usage                          |
| :--------------- | :--- | :--- | :-- | :----------------------------- |
| background       | 0.08 | 0.00 | 265 | Page background (deep navy)   |
| foreground       | 0.92 | 0.02 | 265 | Body text, high contrast white |
| primary          | 0.62 | 0.26 | 270 | Neon purple buttons, accents    |
| accent           | 0.68 | 0.30 | 270 | Glow effects, highlights       |
| card             | 0.12 | 0.01 | 265 | Dark glassmorphic cards        |
| muted            | 0.20 | 0.05 | 265 | Secondary elements, borders    |
| destructive      | 0.58 | 0.25 | 27  | Error alerts and warnings      |

---

## Gradients

| Gradient       | Definition                                                      | Use                  |
| :------------- | :-------------------------------------------------------------- | :------------------- |
| bg             | `oklch(0.08 0.003 265) → oklch(0.11 0.012 280) → oklch(0.14 0.02 300)` | Dark navy page bg   |
| primary        | `oklch(0.68 0.30 270) → oklch(0.62 0.28 290)`                   | Neon purple buttons |
| text           | `oklch(0.68 0.30 270) → oklch(0.65 0.28 310)`                   | Gradient text glow  |

---

## Structural Zones

| Zone      | Treatment                                              | Elevation  |
| :-------- | :----------------------------------------------------- | :--------- |
| Navbar    | Dark glass, neon border glow, blur 16px               | Floating   |
| Hero      | Deep gradient (navy→indigo), floating glassmorphic badges | Premium    |
| Cards     | Dark glass (rgba 45%, neon purple border, glow shadow) | Layered    |
| CTA areas | Neon gradient buttons with glow on hover              | Prominent  |
| Footer    | Dark bg with muted border, glow accents               | Grounded   |

---

## Spacing & Rhythm

- **Horizontal:** 24px—32px section padding, 16px—20px card padding, 12px—16px internal card spacing
- **Vertical:** 64px—96px between major sections, 32px between cards, 24px between heading + body
- **Type scale:** H1 48px–56px (display), H2 32px–40px (section heads), H3 20px–24px (card titles), body 14px–16px

---

## Components & Patterns

- **Buttons:** `rounded-full`, gradient-primary for CTAs, muted bg for secondary, smooth hover scale (transform -4px)
- **Cards:** `glass-card` with `warm-shadow`, 20px border-radius, hover elevate + shadow deepens
- **Badges:** Float animation (4s infinite), staggered delay, subtle glow via shadow
- **Icons:** lucide-react, 20px–24px sizing, primary color, paired with text
- **Form inputs:** Light bg, border-border, focus ring-primary

---

## Motion & Animation

| Animation    | Duration | Easing       | Usage                              |
| :----------- | :------- | :----------- | :--------------------------------- |
| float        | 4s       | ease-in-out  | Floating badges, continuous        |
| fade-up      | 0.6s     | ease-out     | Section entry, staggered           |
| fade-in      | 0.4s     | ease-out     | Element visibility                 |
| scale-hover  | 0.2s     | ease         | Card/button interactions           |

---

## Shadows

- **warm-shadow:** `0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(99,102,241,0.05)` — subtle, default
- **warm-shadow-lg:** `0 8px 40px rgba(99,102,241,0.14), 0 2px 8px rgba(99,102,241,0.08)` — elevated hover
- **warm-shadow-xl:** `0 16px 60px rgba(99,102,241,0.18), 0 4px 12px rgba(99,102,241,0.1)` — modal/overlay

---

## Signature Details

1. **Neon glow effects** on buttons and interactive elements — purple/blue aura (0 0 20px rgba(168,140,255,0.4))
2. **Glassmorphic dark cards** with semi-transparent dark glass (rgba 19,18,45 / 0.45) and neon purple borders
3. **Deep navy-to-indigo gradient** background creates immersive dark theme with depth
4. **Floating animated badges** in hero with staggered timing and glow shadows
5. **Bold Bricolage Grotesque headings** on dark bg with text-gradient highlight for impact
6. **Smooth hover interactions** — cards lift with enhanced glow, buttons scale with neon aura

---

## Constraints

- ✓ Mobile-first responsive (`sm:`, `md:`, `lg:` breakpoints)
- ✓ No custom colors — use OKLCH tokens only
- ✓ No animation without purpose — all motion supports usability and delight
- ✓ Glass cards keep consistent 20px blur, 0.72–0.85 opacity
- ✓ Minimum contrast AA+ across light/dark (not using dark mode here)
