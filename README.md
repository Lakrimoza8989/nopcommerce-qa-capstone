# nopcommerce-qa-capstone
This repository contains a complete QA Capstone project for the nopCommerce demo store. It includes test documentation (Test Plan, Strategy, Coverage Matrix), manual and BDD test cases, automated Playwright tests, CI/CD setup, and HTML reports. AI tools (ChatGPT, Gemini) were used to speed up test design and automation.

## Progress Log

### Day 1
- Created GitHub repository: **nopcommerce-qa-capstone**
- Set up initial folder structure: `/docs`, `/tests`, `/bdd-cucumber`, `/prompts`, `/reports`
- Added `README.md` with project description and progress log
- Installed **Node.js** and **Playwright**
- Wrote smoke test: homepage load verification
- Executed the smoke test and saved the first HTML report
- Wrote navigation test: menu navigation **Computers → Desktops**
- Executed the navigation test and saved the HTML report

### AI Usage (Day 1)
- Helped create the repository folder structure (`docs/`, `tests/`, `screenshots/`).  
- Suggested organizing screenshots into subfolders (`smoke/`, `navigation/`).  
- Provided commands for cleaning up and renaming files.
- AI Chat – Git fixes
- Guided through resolving Git issues (`fetch`, `pull --rebase`, `push`).  
- Provided the correct Git commands that unblocked progress.
- AI Chat – Smoke test
- Generated Playwright test for homepage load with Cloudflare handling.  
- Improved locator strategy (`ul.top-menu.notmobile`).  
- Final test (`smoke.spec.ts`) executed successfully. 

- Screenshots:
- [AI Chat – Project setup](docs/screenshots/ai/day1-setup.png)
- [AI Chat – Smoke test](docs/screenshots/ai/day1-smoke.png)
- [AI Chat – Git fixes](docs/screenshots/ai/day1-git.png)

### Search Test (Day 1)
- HTML report: [docs/reports/20250902-search/index.html](docs/reports/20250902-search/index.html)


## Test Reports

### Smoke Test (Day 1)
- **HTML report:** `docs/reports/20250902-140133/index.html`
- Screenshot: [Day 1](docs/screenshots/smoke/day1.png)
- [Main page](docs/screenshots/smoke/Main%20page.png)

##

### Navigation Test (Day 1)
- **HTML report:** `docs/reports/20250902-navigation/index.html`
- Screenshots:
  - [Summary](docs/screenshots/navigation/day1.png)
  - [Detail](docs/screenshots/navigation/detail-day1.png)
  - [Desktops page](docs/screenshots/navigation/desktops-day1.png)
  - [Terminal run](docs/screenshots/navigation/terminal-day1.png)

---

### Day 2

- Added documentation: **Requirements** and **Test Strategy**
- Logged prompts and outputs in the **Prompt Log**
- Updated the `/docs` structure (ready for further automation)

## AI Usage 
- Generated `docs/Requirements.md` (Scope / Out of Scope / Assumptions + ACs + Gherkin)
- Generated `docs/Test-Strategy.md` (goals, approach, levels/suites, test data, environments/tools, entry/exit criteria, reporting/metrics, risks/mitigations, CI roadmap)
- Cleaned up formatting and added initial traceability (Requirements → future automated specs)

## Documents
- **Requirements:** [`docs/Requirements.md`](docs/Requirements.md)
- **Test Strategy:** [`docs/Test-Strategy.md`](docs/Test-Strategy.md)
- **Prompt Log (Day 2):** [`docs/Prompt-Log.md`](docs/Prompt-Log.md)

---

### Day 3
- Drafted **Test Plan**
- Logged the prompt and output in **Prompt Log** (Day 3)

### AI Usage
- Generated `docs/Test-Plan.md` (goals, scope/out of scope, approach, test levels/suites, test data, environments/tools, entry/exit criteria, reporting/metrics, risks/mitigations, CI roadmap).
- Logged the prompt and output for Day 3 in `docs/Prompt-Log.md` (section **2025-09-09 · Day 3**).


## Documents
- **Test Plan:** [docs/Test-Plan.md](docs/Test-Plan.md)
- **Prompt Log: (Day 3)** [docs/Prompt-Log.md](docs/Prompt-Log.md)
MD

---

### Day 4 — Manual Test Cases & Coverage Matrix
- Added `docs/TestCases.md` **(summary)** + **per-feature stubs** in `docs/test-cases/`
  (details to be filled on **Day 5**: *Pre / Data / Steps / ER*).
- Added `docs/Coverage-Matrix.csv` (Requirement → Test Case → Automated=Planned).

### AI Usage
- Generated `docs/TestCases.md` (index of manual cases with **P/N/B** types and links to per-feature files).
- Generated per-feature test case files:
  `docs/test-cases/registration.md`, `docs/test-cases/login.md`,
  `docs/test-cases/cart.md`, `docs/test-cases/checkout-guest.md`
  (uniform **Pre / Data / Steps / Expected Result** skeletons).
- Generated `docs/Coverage-Matrix.csv` (Requirement → Test Case → Automated = **Planned** mapping for traceability).


## Documents
- Test Cases: [docs/TestCases.md](docs/TestCases.md)  
- Coverage Matrix: [docs/Coverage-Matrix.csv](docs/Coverage-Matrix.csv)  
- Per-feature stubs:  
  [`docs/test-cases/registration.md`](docs/test-cases/registration.md), 
  [`docs/test-cases/login.md`](docs/test-cases/login.md),
  [`docs/test-cases/cart.md`](docs/test-cases/cart.md),
  [`docs/test-cases/checkout-guest.md`](docs/test-cases/checkout-guest.md)

---
