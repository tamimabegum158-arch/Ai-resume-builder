# Template system + bullet guidance + improvement panel — Verification

## 1) Template tabs
- **Where:** `/builder` (right column, above ATS score) and `/preview` (above the resume).
- **Options:** Classic | Modern | Minimal.
- **Switch:** Click a tab → layout styling changes only (typography/spacing). Content and data unchanged. Resume stays clean black/white.
- **Persist:** Selected template stored in `localStorage.resumeBuilderTemplate`. Refresh or reopen → same template.

## 2) Bullet structure guidance (Experience & Projects)
- **Location:** Under each "Details" textarea in Experience and Projects.
- **Rules (guidance only; input never blocked):**
  - If any bullet line does **not** start with a common action verb (Built, Developed, Designed, Implemented, Led, Improved, Created, Optimized, Automated, etc.) → show: **"Start with a strong action verb."**
  - If the details text has **no** numeric indicator (digits, %, k, K, x, million, thousand) → show: **"Add measurable impact (numbers)."**
- **Behavior:** Suggestions appear/disappear as you edit. Subtle, inline (muted text under the field).

## 3) Improvement panel
- **Location:** Under ATS Score in the right column on `/builder`.
- **Title:** "Top 3 Improvements"
- **Logic:** Same as existing ATS suggestions (max 3): e.g. add projects, add numbers, expand summary 40–120 words, add skills 8+, add experience/links/education. No new scoring logic.

## 4) Score stability
- ATS score logic unchanged. Template choice does not affect score. Switching templates does not change the number.

## 5) Persist template
- **Key:** `resumeBuilderTemplate`. Values: `classic` | `modern` | `minimal`. Default: `classic`.

---

## Verification steps
1. **Templates:** On `/builder`, click Modern → Minimal → Classic. Confirm layout (spacing/typography) changes; score and content unchanged. Same on `/preview`. Refresh → template persists.
2. **Bullet guidance:** In Experience details, type "Helped the team" → see action-verb suggestion. Add "20%" → numbers suggestion disappears. Type "Built a 20% improvement" → both suggestions can disappear.
3. **Top 3 Improvements:** Confirm heading appears above the list under the score; list shows up to 3 items and updates as you fix items.
4. **Routes / design:** No route changes. No existing features removed. Premium design and no flashy elements.
