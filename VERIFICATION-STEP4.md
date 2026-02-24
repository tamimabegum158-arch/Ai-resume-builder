# Project 3 - Step 4: Verification Checklist (Templates + Bullet Guidance)

## Template switching test
- [ ] **Select Classic** → then switch to **Modern** → then **Minimal**.
- [ ] **Layout changes?** Yes (spacing, section margins, heading size/letter-spacing).
- [ ] **Content identical?** Yes (no data change).
- [ ] **ATS score identical?** Yes (score not affected by template).

## Template persistence test
- [ ] **Select Modern** → refresh page. **Is Modern still active?** Yes.
- [ ] **localStorage:** Key is `resumeBuilderTemplate` (not `resumeTemplate`). Value: `classic` | `modern` | `minimal`.

## Bullet guidance test
- [ ] **Enter bullet:** "Worked on frontend development"
  - **Shows:** "Start with a strong action verb." (Worked is not in the verb list.)
  - **Shows:** "Add measurable impact (numbers)." (no digits/%.)
- [ ] **Change to:** "Built a dashboard used by 500+ users"
  - **Suggestions disappear?** Yes (Built is action verb, 500+ has number).

## Non-blocking test
- [ ] **Type freely?** Yes (no input disabled).
- [ ] **Ignore suggestions?** Yes (guidance only).
- [ ] **Continue editing?** Yes.

## Top 3 Improvements test
- [ ] **Remove projects** (0 or 1) → see "Add at least 2 projects."
- [ ] **Remove numbers from bullets** (and have experience/projects) → see "Add measurable impact (numbers) in bullets."
- [ ] **No more than 3** suggestions ever.

## Score stability test
- [ ] **Switch templates** → score stays exactly the same.
- [ ] **Add bullet with number** → score increases (e.g. +15). **Switch template again** → score stays correct (unchanged by template).

## Git
- [ ] Commit: `Project 3-Step 4: Add template system and bullet discipline guidance`
- [ ] Push to repository.
