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
  (details filled on Day 4 - Pre / Data / Steps / Expected + Priority).
- Added `docs/Coverage-Matrix.csv` (Requirement → Test Case → Automated=Planned).

### AI Usage
- Generated `docs/TestCases.md` (index of manual cases with **P/N/B** types and links to per-feature files).
- Generated per-feature test case files:
  `docs/test-cases/registration.md`, `docs/test-cases/login.md`,
  `docs/test-cases/cart.md`, `docs/test-cases/checkout-guest.md`
  (uniform **Pre / Data / Steps / Expected Result** skeletons).
- Generated `docs/Coverage-Matrix.csv` (Requirement → Test Case → Automated = **Planned** mapping for traceability).
- Manual test cases written with GPT-5 assistance.



## Documents
- Test Cases: [docs/TestCases.md](docs/TestCases.md)  
- Coverage Matrix: [docs/Coverage-Matrix.csv](docs/Coverage-Matrix.csv)  
- Per-feature stubs:  
  [`docs/test-cases/registration.md`](docs/test-cases/registration.md),   
  [`docs/test-cases/login.md`](docs/test-cases/login.md),  
  [`docs/test-cases/cart.md`](docs/test-cases/cart.md),  
  [`docs/test-cases/checkout-guest.md`](docs/test-cases/checkout-guest.md)  

---

## Day 5 — Gherkin (BDD) Scenarios

- Added 4 Gherkin `.feature` files in `bdd-cucumber/features`:  
  - `registration-valid.feature`  
  - `login-valid-invalid.feature`  
  - `cart-add.feature`  
  - `guest-checkout.feature`  

### AI Usage

- GPT-5 assisted in converting manual test cases to BDD format.  
- Helped with Gherkin syntax, test case structuring, and realistic user steps.  

### Documents

- Feature Files (Gherkin):
  - [`registration-valid.feature`](bdd-cucumber/features/registration-valid.feature)  
  - [`login-valid-invalid.feature`](bdd-cucumber/features/login-valid-invalid.feature)
  - [`cart-add.feature`](bdd-cucumber/features/cart-add.feature)  
  - [`guest-checkout.feature`](bdd-cucumber/features/guest-checkout.feature)
    
---

## Day 6 — UI & API Registration Tests (NFR-ready)

**Scope.** Finish Registration automation end-to-end: UI tests (valid/invalid), API tests (success/validation/duplicate), config hardening, and local verification.

##

### Deliverables
- **UI:** [`tests/registration.spec.ts`](tests/registration.spec.ts)  
  - Valid registration → sees **“Your registration completed”**  
  - Invalid registration (empty required fields) → sees field validation messages  
  - Stable locators (`getByLabel`/`getByRole`), auto-scroll helper, unique email generator
- **API:** [`api-tests/registration.api.spec.ts`](api-tests/registration.api.spec.ts)  
  - Uses Playwright HTTP client (no browser)  
  - Grabs `__RequestVerificationToken` from `/register`, then POSTs form  
  - Cases:
    - **Valid** → HTTP `200` + success text
    - **Missing required** → HTTP `200` + validation texts
    - **Duplicate email** → HTTP `200` + “email already exists”
- **Config:** [`playwright.config.ts`](playwright.config.ts)  
  - `baseURL=https://nop-qa.portnov.com`, `headless=false` (debug)  
  - Viewport 1366×768, timeouts tuned, screenshots on failure, **trace/video retain on failure**  
  - Project: Desktop Chrome (Chromium). Ready to flip to `channel: 'chrome'` if needed.  

##

### How to Run
```bash
# UI only
npx playwright test tests/registration.spec.ts --headed --trace on

# API only
npx playwright test api-tests/registration.api.spec.ts

# Everything
npx playwright test
npx playwright show-report
```

##

### Reports & Artifacts

- Saved HTML snapshot: `reports/latest/playwright-report/index.html`
- All images/videos/traces: `reports/latest/playwright-report/data/`

#### Open a saved report locally
```bash
npx playwright show-report reports/latest/playwright-report

```

### Launch
```bash
npx playwright test

```

Конечно. Вот готовый README-документ в том же стиле для **Day 7 — Login UI + API (Postman & Playwright)**:

---

Понял. Держи правильный, **англоязычный README**, без русского текста, с чёткой структурой, и **прямыми ссылками на файлы**, как положено:

---

## ✅ Day 7 — Login Tests (UI + API via Playwright & Postman)

**Scope:** Automated login tests via UI and API using both **Playwright** and **Postman**. Includes positive and negative flows, token handling, and response validations. Designed to be CI-ready and fully parameterized.

---

### 📂 Deliverables

#### ✅ **UI Tests** — [`tests/login.spec.ts`](tests/login.spec.ts)

* **Valid login** → redirects to `/`, sees `"Log out"` in header
* **Invalid password** → stays on login page, shows `"Login was unsuccessful"`
* **Non-existent email** → same as above
* Robust locators:

  * `getByRole`, `getByLabelText`
  * Scroll helpers to bring fields into view
  * Unique email generators for future use

---

#### ✅ **API Tests (Playwright)** — [`api-tests/login.api.spec.ts`](api-tests/login.api.spec.ts)

* Uses **Playwright’s HTTP Client**
* Flow:

  * `GET /login` → parses `__RequestVerificationToken` and `form[action]`
  * `POST /login` → sends form with token and credentials
* Scenarios:

  * ✅ **Valid login** → HTTP `302` + redirect to `/`
  * ❌ **Wrong password** → HTTP `200`, `"Login was unsuccessful"`
  * ❌ **Invalid email** → HTTP `200`, same error

---

#### ✅ **API Tests (Postman)** — [`nopCommerce API (day7).postman_collection.json`](./nopCommerce%20API%20%28day7%29.postman_collection.json)

* Token dynamically retrieved from `GET /login`
* Form POST includes token, headers, cookies
* Tests use `pm.expect()` and DOM parsing (HTML)
* Checks:

  * Response status
  * Page content (presence of `Log out` or error messages)
  * Boolean logic: `stayedOnLogin`, `notLoggedIn`

---

### ⚙️ Config — [`playwright.config.ts`](playwright.config.ts)

* `baseURL=https://nop-qa.portnov.com`
* `headless=false` for local debugging
* Viewport: `1366×768`, tuned timeouts
* Artifacts:

  * Video + trace on failure
  * Screenshots: `on`
* Chromium project; easily switchable to `channel: 'chrome'`

---

## ▶️ How to Run

### UI Tests

```bash
npx playwright test tests/login.spec.ts --headed --trace on
```

### API Tests (Playwright)

```bash
npx playwright test api-tests/login.api.spec.ts
```

### API Tests (Postman)

```bash
# Option 1: Postman GUI (import collection)
# Option 2: Newman CLI
newman run "nopCommerce API (day7).postman_collection.json" \
  --env-var baseUrl=https://nop-qa.portnov.com
```

---

## 📊 Reports

### Playwright

* Open report:

  ```bash
  npx playwright show-report reports/latest/playwright-report
  ```
* Default saved location:

  * `reports/latest/playwright-report/index.html`
  * Trace/videos: `reports/latest/playwright-report/data/`

---

## 📁 Files

| Type       | File                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| ✅ Postman  | [`nopCommerce API (day7).postman_collection.json`](./nopCommerce%20API%20%28day7%29.postman_collection.json) |
| ✅ UI Test  | [`tests/login.spec.ts`](tests/login.spec.ts)                                                                 |
| ✅ API Test | [`api-tests/login.api.spec.ts`](api-tests/login.api.spec.ts)                                                 |
| ⚙️ Config  | [`playwright.config.ts`](playwright.config.ts)                                                               |

---

Let me know if you want a `.md` version exported or CI/CD instructions added.

