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


## Test Reports

### Smoke Test (Day 1)
- **HTML report:** `docs/reports/20250902-140133/index.html`
- Screenshot: [Day 1](docs/screenshots/smoke/day1.png)

---

### Navigation Test (Day 1)
- **HTML report:** `docs/reports/20250902-navigation/index.html`
- Screenshots:
  - [Summary](docs/screenshots/navigation/day1.png)
  - [Detail](docs/screenshots/navigation/detail-day1.png)
  - [Desktops page](docs/screenshots/navigation/desktops-day1.png)
  - [Terminal run](docs/screenshots/navigation/terminal-day1.png)
##

### Day 2

**Focus:** foundational test docs for the automation work.

- Added **Requirements.md** (storefront features + ACs + Gherkin) → [docs/Requirements.md](docs/Requirements.md)
- Added **Test-Strategy.md** (scope, approach, levels, data, env/tools, entry/exit, reporting, risks, CI plan) → [docs/Test-Strategy.md](docs/Test-Strategy.md)
- Updated **Prompt-Log.md** with Day 2 prompts & outputs → [docs/Prompt-Log.md](docs/Prompt-Log.md)

**Highlights**
- Scope limited to storefront: Registration, Login/Logout, Cart, Guest Checkout
- Playwright + TypeScript; resilient, role/label-first selectors
- Keep Smoke lean; expand Functional/Negative next

**Next up (Day 3):** draft **Test-Plan.md** (scope, priorities, high-level scenarios)

