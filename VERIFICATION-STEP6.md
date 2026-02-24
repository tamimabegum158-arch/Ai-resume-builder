# Project 3 - Step 6: Skills + Projects verification checklist

## Skills input test
- [ ] Type "React", press **Enter** → appears as chip.
- [ ] Press **Enter** again (same or empty input) → duplicate prevented (includes check in addSkill).
- [ ] Type spaces only, press **Enter** → empty input ignored (trimmed, not added).

## Suggest Skills test
- [ ] Click **✨ Suggest Skills** → button shows "Adding…" for 1 second.
- [ ] Skills populate: Technical (TypeScript, React, Node.js, PostgreSQL, GraphQL), Soft (Team Leadership, Problem Solving), Tools (Git, Docker, AWS).
- [ ] Click **Suggest Skills** again → no duplicates (merge uses Set).

## Skill count test
- [ ] Add 3 technical skills → header shows **Technical Skills (3)**.
- [ ] Remove 1 → updates to **(2)**.

## Project test
- [ ] Click **Add Project** → fill Title, Description, Tech stack, GitHub URL.
- [ ] Collapse entry → header shows project title (or "Untitled Project" if empty).
- [ ] **Refresh page** → project still there (localStorage).

## Character limit test
- [ ] Type 200+ characters in Description → overflow prevented (slice(0, 200) + maxLength).
- [ ] Counter updates live: **x/200**.

## Preview test
- [ ] Skills grouped (Technical, Soft, Tools) with pills.
- [ ] Projects as clean blocks (cards with title, description, tech pills).
- [ ] Link icons (Live / GitHub) visible only when URLs exist.
- [ ] Empty sections hidden.

## Stress test
- [ ] Add 5 projects and 20 skills → layout stable, preview clean.

## Git
- [ ] Commit: `Project 3-Step 6: Add structured skills + project tag system`
- [ ] Push to repository.
