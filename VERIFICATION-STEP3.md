# Project 3 - Step 3: Verification Checklist (Autosave + ATS v1)

## Autosave test
- [ ] **Fill:** Name, Summary, Add 1 project.
- [ ] **Refresh page (F5).** → All data remains (form + preview).
- [ ] **Close browser, reopen, go to /builder.** → Data still there (localStorage persists).

## Corruption test
- [ ] **DevTools → Application → Local Storage** → set `resumeBuilderData` to `"not json"` or `"[1,2,3]"` or `""`.
- [ ] **Reload page.** → App loads without crash; form shows empty or fallback state. No console errors.

## Preview test
- [ ] **Add only:** 1 project, 1 experience, 1 skill (leave Summary, Education, Links empty).
- [ ] **Preview shows only:** header (name/contact), Experience, Projects, Skills. No Summary, Education, or Links section. No empty section headings.
- [ ] **Remove summary** (if you had one). → Summary section disappears from preview. No empty "Summary" heading.

## ATS score test (each rule)
| Action | Expected points | Running total (example) |
|--------|------------------|--------------------------|
| Add summary 40–120 words (e.g. 50 words) | +15 | 15 |
| Add 2 projects | +10 | 25 |
| Add 1 experience | +10 | 35 |
| Add 8 skills (comma-separated) | +10 | 45 |
| Add GitHub (or LinkedIn) link | +10 | 55 |
| Add number in a bullet (e.g. "Improved by 20%") | +15 | 70 |
| Complete education (school, degree, period) | +10 | 80 |
| **Cap** | Score never > 100 | 80 (or 100 if more rules) |

- [ ] Score increases as you add each requirement. Score caps at 100.

## Live update test
- [ ] **Add a number** in an experience or project bullet (e.g. "Saved 30% cost"). → Score updates **immediately** (no refresh).
- [ ] **Remove the number** from that bullet. → Score **drops** by 15 (again immediate).

## Suggestions test
- [ ] **Leave out projects** (0 or 1 project). → Suggestion appears: "Add at least 2 projects."
- [ ] **Add second project.** → That suggestion **disappears**.
- [ ] **Never more than 3 suggestions** at once. (Check with minimal data: you may see up to 3; with empty form, still max 3.)

## Git
- [ ] Commit: `Project 3 - Step 3: Add autosave + deterministic ATS scoring v1`
- [ ] Push to repository.

---
**Summary:** Autosave (resumeBuilderData), live preview (sections only when filled), deterministic ATS score (0–100), live score + max 3 suggestions, safe fallback on corrupted storage.
