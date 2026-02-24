# AI Resume Builder — Autosave + ATS v1 Verification

## 1) Persistence after refresh
- **Steps:** Open `/builder`, fill some fields (e.g. name, summary, add one experience). Refresh the page (F5 or Ctrl+R).
- **Expected:** Form and live preview show the same data. No data loss.
- **Storage key:** `localStorage.resumeBuilderData` (all form fields and sections).

## 2) Score changes live while editing
- **Steps:** On `/builder`, note the "ATS Readiness Score" (e.g. 0). Add a summary with 40–120 words → score should increase by 15. Add 2 projects → +10. Add 8+ skills (comma-separated) → +10. Add GitHub or LinkedIn link → +10. Add at least one experience → +10. Add a number in an experience/project bullet (e.g. "Improved performance by 20%") → +15. Complete one education entry (school, degree, period) → +10.
- **Expected:** Score meter and value update as you type. Cap at 100.

## 3) Suggestions (3 max)
- **Steps:** Start with empty or partial resume. Check the list under the score.
- **Expected:** Up to 3 suggestions from: "Write a stronger summary (40–120 words).", "Add at least 2 projects.", "Add measurable impact (numbers) in bullets.", "Add more skills (target 8+).", "Add a GitHub or LinkedIn link.", "Add at least one experience entry.", "Complete education section (school, degree, period)." Suggestions disappear as you fix them.

## 4) Live preview real content + empty sections hidden
- **Steps:** Clear a section (e.g. delete summary text). Check right-hand preview.
- **Expected:** That section no longer appears in the preview. Only sections with content are shown (Summary, Education, Experience, Projects, Skills, Links). If all sections are empty, message: "Fill the form to see your resume here."

## 5) No route or design changes
- Routes unchanged: `/`, `/builder`, `/preview`, `/proof`.
- Premium design kept (off-white, serif, deep red accent, spacing scale).

## ATS score rules (deterministic, cap 100)
| Rule | Points |
|------|--------|
| Summary 40–120 words | +15 |
| At least 2 projects | +10 |
| At least 1 experience | +10 |
| Skills ≥ 8 items | +10 |
| GitHub or LinkedIn link | +10 |
| Number in experience/project bullets | +15 |
| Education has complete entry (school, degree, period) | +10 |
