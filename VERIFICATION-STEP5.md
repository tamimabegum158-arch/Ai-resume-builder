# Project 3 - Step 5: Export verification checklist

## Print test
- [ ] Go to `/preview` → click **Print / Save as PDF**.
- [ ] In print preview: **Navigation hidden?** Yes (.no-print on .resume-nav).
- [ ] **Buttons and export bar hidden?** Yes (.no-print on .preview-export-actions).
- [ ] **Pure black text on white background?** Yes (no colored accents in print CSS).
- [ ] **Margins clean?** Yes (16mm / 20mm on .preview-resume).
- [ ] **Spacing consistent?** Yes (same spacing scale in print).
- [ ] **No colored accents?** Yes.

## Page break test
- [ ] Add **3 long projects** with **multiple bullets**.
- [ ] Open print preview: **Bullets avoid splitting mid-line** where possible (page-break-inside: avoid on .preview-resume-item, .preview-resume-p, .preview-resume-sub).
- [ ] **Project not cut in half** across pages when possible (page-break-inside: avoid on logical blocks).

## Plain text copy test
- [ ] Click **Copy Resume as Text** → paste into Notepad / VS Code.
- [ ] **Looks clean?** Name, Contact, Summary, Education, Experience, Projects, Skills, Links with clear line breaks.

## Validation test
- [ ] **Remove name** and **remove all projects and experience**.
- [ ] Click **Print** (or Copy): **See "Your resume may look incomplete."** Yes.
- [ ] **Print still allowed?** Yes (warning only, no block).

## Empty state test
- [ ] **Clear all form data**.
- [ ] Click **Copy Resume as Text**.
- [ ] **Still generates structured headings** (Name, — at minimum). **No crash.** Yes.

## Layout precision test
- [ ] Add **very long summary**, **long bullet**, **long project title**.
- [ ] Check preview: **No text overflow** (overflow-wrap: break-word). **No section overlapping.** **Spacing consistent.**

## Git
- [ ] Commit: `Project 3— Step 5: Add reliable export system and print-safe styling`
- [ ] Push to repository.
