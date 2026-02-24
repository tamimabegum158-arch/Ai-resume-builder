# Project 3 — Verification Checklist

## Route verification
- [x] `/rb/01-problem` — renders RBStepPage Step 1
- [x] `/rb/02-market` … `/rb/08-ship` — each renders correct step
- [x] `/rb/proof` — renders ProofPage
- [x] Invalid path (e.g. `/rb/99-foo`) redirects to `/rb/01-problem`
- [x] No 404s: catch-all redirects to `/rb/01-problem`

## Gating verification
- [x] Direct visit to `/rb/04-hld` without completing steps 1–3 redirects to first incomplete step (e.g. `/rb/01-problem`)
- [x] Upload artifact for Step 1 (paste in panel, click "It Worked") → Step 2 unlocks (Next enabled, can navigate to step 2)
- [x] Refresh page → artifact still stored (localStorage `rb_step_01_artifact`)

## Layout verification
- [x] Off-white background `#F7F6F3`
- [x] Serif headings (Georgia)
- [x] Deep red accent `#8B0000`
- [x] Spacing scale 8 / 16 / 24 / 40 / 64
- [x] No gradients, no glass effects, no neon
- [x] Max 720px text width (`--text-max-width`)

## Proof page verification
- [x] All 8 step statuses (Done / Pending)
- [x] Inputs: Lovable link, GitHub link, Deploy link
- [x] "Copy Final Submission" button
- [x] No resume features visible

## Build
- [x] `npm run build` succeeds
