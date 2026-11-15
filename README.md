# SeminarHub — version 1.0

A small, static university seminar organiser built as the baseline for a **CI/CD with GitHub Actions** live demonstration.

## What's included

- A monthly calendar, initially showing **November 2026**.
- Clickable seminar dates with details in the right-hand panel.
- A monthly programme list and mobile-friendly layout.
- A small local dataset. The **30 November CI/CD topic** reflects the presentation scenario; all other schedule entries are fictional examples.
- Node.js tests for date handling, schedule selection and HTML escaping.

**Deliberately not included yet:** Suggested Questions. We will add that as a feature branch during the presentation, after the initial version has CI/CD configured.

## Requirements

- Ubuntu or another desktop operating system.
- **Node.js 22.12+** and npm. Vite supports Node.js 20.19+ or 22.12+, but this project uses the Node 22 line.

## Run locally on Ubuntu

```bash
cd seminarhub
npm install
npm run dev
```

Open the URL printed in the terminal, typically <http://127.0.0.1:5173/>.

## Run tests

```bash
npm test
```

The tests use Node.js's built-in test runner; they don't require a separate testing library.

## Build for production

```bash
npm run build
npm run preview
```

Vite creates the deployable static website in `dist/`.

## Editing the programme

Modify `src/data/presentations.js` to edit titles, dates, descriptions, categories or tags.
The presentation detail view is in `src/components/presentationDetails.js`.

## Repository and demonstration workflow

This is **milestone 1 only**: the website and baseline tests. In milestone 2, add a GitHub Actions workflow that runs `npm ci`, `npm test`, and `npm run build` on Pull Requests, and deploys `dist/` to GitHub Pages when `main` receives a passing change.

When you run `npm install`, npm will create `package-lock.json`. **Commit it** to the repository before configuring CI so that `npm ci` installs predictable dependency versions.

The Vite config uses `base: './'` so built static assets are referenced relatively, including when the website is hosted under a GitHub Pages project path.

## Notes on reliability and safety

- No authentication, database, API keys, tracking, or external runtime requests.
- Data is static and fictitious, except for the specified CI/CD session.
- Fixed starting month: November 2026, regardless of the computer's date or timezone.
- Data strings are HTML-escaped before insertion into the interface.
- Keep the original app and the demonstration feature branch separately tagged so you can restore a known state before each rehearsal.
- CI/CD automation and GitHub Pages publication are **not yet configured**.
