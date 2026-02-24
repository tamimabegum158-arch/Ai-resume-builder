# Export system + validation — Verification

## 1) Export options on /preview
- **Print / Save as PDF:** Button triggers `window.print()`. Use browser’s “Save as PDF” or “Print” from the print dialog. Print styling hides nav and export UI; only the resume article is printed with white background and clean margins.
- **Copy Resume as Text:** Button generates plain text (Name, Contact, Summary, Education, Experience, Projects, Skills, Links) and copies to clipboard. Button shows “Copied!” briefly after success.

## 2) Print styling
- **In print:** Top nav and export bar (template tabs + buttons) are hidden (`.no-print`). Resume only: white background, black text, no colored accents. Margins: 16mm top/bottom, 20mm left/right. Section headers and items use `page-break-inside: avoid` / `page-break-after: avoid` to reduce cut-off and avoid splitting bullets across pages where possible.

## 3) Validation (warning only)
- **When:** Name is empty **or** (no projects **and** no experience).
- **Message:** “Your resume may look incomplete.” shown above the export buttons.
- **Behavior:** Export is **not** blocked. User can still click “Print / Save as PDF” or “Copy Resume as Text.”

## 4) Layout precision
- Resume content uses `overflow-wrap: break-word` to avoid text overflow. Sections use consistent spacing (no overlap). No layout changes to routes or features.

## Verification steps
1. **PDF/print:** On `/preview`, click “Print / Save as PDF” → print dialog opens. Choose “Save as PDF” (or print). Confirm only the resume is printed (no nav, no buttons), white background, readable margins.
2. **Copy text:** Click “Copy Resume as Text” → paste in Notepad. Confirm structure: Name, Contact, Summary, Education, Experience, Projects, Skills, Links with clean line breaks.
3. **Warning:** Clear name and remove all experience and projects → “Your resume may look incomplete.” appears. Click either export button → action still runs (print or copy).
4. **No heavy libs:** No new dependencies; uses browser `window.print()` and `navigator.clipboard.writeText`.
