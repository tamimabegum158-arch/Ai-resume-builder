# AI Resume Builder — Verification Checklist (Step 2)

## Route verification
- [x] `/` — Home, no 404
- [x] `/builder` — Builder page, no 404
- [x] `/preview` — Preview page, no 404
- [x] `/proof` — Proof placeholder, no 404
- [x] No console errors (build passes, no runtime errors in code paths)

## Home page
- [x] Headline: "Build a Resume That Gets Read."
- [x] CTA visible: "Start Building"
- [x] CTA links to `/builder` (navigates on click)

## Builder layout
- [x] Left column: All form sections (Personal Info, Summary, Education, Experience, Projects, Skills, Links)
- [x] Right column: Live preview panel (structured resume layout)
- [x] Two-column on desktop (grid)
- [x] Single column on mobile (@media max-width: 900px)

## Preview route
- [x] Minimal black + white layout (white background, black text)
- [x] No colors (no accent/surface/bg vars in preview content)
- [x] No sidebars (only top nav; content is full-width centered)
- [x] No decorative UI (subtle shadow only on resume card)
- [x] ATS-friendly (semantic sections, clean typography)

## Navigation
- [x] Top nav visible on all resume routes (ResumeLayout)
- [x] Builder | Preview | Proof links present
- [x] Active state: `location.pathname === path` → `.active` class (accent color)

## Break tests (Build Track /rb)
- [x] Direct navigate to `/rb/03-architecture` without steps 1–2 artifacts → redirected to first incomplete step
- [x] Next button disabled until current step has artifact (`!canGoNext` → disabled)

## Git
- [ ] Commit: "Project 3-Step 2: Implement Resume Builder skeleton and preview layout"
- [ ] Push to repository
