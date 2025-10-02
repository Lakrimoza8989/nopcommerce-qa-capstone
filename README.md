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

## Day 7 — UI & API Login Tests (NFR-ready)

**Scope.** Automate Login flow end-to-end: UI tests (valid/invalid), API tests (valid/invalid password/non-existent email), Postman collections, config consistency, and local verification.

##

### Deliverables
- **UI:** [`tests/login.spec.ts`](tests/login.spec.ts)  
  - Valid login → sees **“Log out”** and **“My account”**  
  - Invalid password → error **“Login was unsuccessful”**  
  - Non-existent email → error **“Login was unsuccessful”**  
  - Stable locators (`getByLabel`/`getByRole`), conditional skip if no credentials  

- **API:** [`api-tests/day07/playwright/src/login.api.spec.ts`](api-tests/day07/playwright/src/login.api.spec.ts)  
  - Uses Playwright HTTP client (no browser)  
  - Flow: `GET /login` to fetch cookies + antiforgery token, then `POST /login` with form data  
  - Cases:  
    - **Valid** → HTTP `200/302` + `GET /` shows “Log out”  
    - **Invalid password** → HTTP `200` + error message  
    - **Non-existent email** → HTTP `200` + error message  
  - Saved HTML responses → `api-tests/day07/playwright/results/*.html`

- **Postman:** [`api-tests/day07/postman/`](api-tests/day07/postman/)  
  - Collection: `collections/day07-login-collection.json`  
  - Environment: `environments/day07.postman_environment.json`  
  - Results: `results/day07-login-test-run.json`  
  - Screenshots: `screenshots/*.png`

- **Config:** [`playwright.config.ts`](playwright.config.ts)  
  - `baseURL=https://nop-qa.portnov.com`, `headless=false` (debug)  
  - Viewport 1366×768, screenshots always, **trace/video on**  
  - Project: Desktop Chrome (Chromium).  

##

### How to Run
```bash
# UI only
npx playwright test tests/login.spec.ts --headed --trace on

# API only
npx playwright test api-tests/day07/playwright/src/login.api.spec.ts

# Postman
Import collection + environment and run in Postman

# Everything
npx playwright test
npx playwright show-report
```

##
Понял. Переписываю **общий README для Day 8** полностью на английском — в том же стиле, как у тебя оформлен Day 7:

````markdown
## Day 8 — UI & API Add to Cart Tests (NFR-ready)

**Scope.** Automate “Add to Cart” flow end-to-end:  
- **UI tests** — verify that adding a product from the catalog updates the cart indicator and cart page.  
- **API tests** — programmatically add a product to the cart and verify its presence via `/cart`.  
- **Postman collection** — mirrors the API flow with environment variables and saved results.

##

### Deliverables
- **UI:** [`tests/add-to-cart.spec.ts`](tests/add-to-cart.spec.ts)  
  - Navigate to **Books** → PDP “Fahrenheit 451 by Ray Bradbury”  
  - Click **Add to cart**  
  - Header shows **Shopping cart (1)**  
  - `/cart` page displays the product, Qty = 1, and Total = $27.00  
  - Stable locators (`getByRole`, `getByText`), Playwright artifacts (screenshots, traces, videos)

- **API (Playwright):** [`api-tests/day08/playwright/src/books.add-to-cart.api.spec.ts`](api-tests/day08/playwright/src/books.add-to-cart.api.spec.ts)  
  - **GET PDP** → extract `productId` and antiforgery token  
  - **POST** `/addproducttocart/details/{productId}/1` with form data  
  - **GET /cart** → verify product name, quantity, and total  
  - Raw HTML responses stored in `api-tests/day08/playwright/results/` for recruiter-visible evidence

- **Postman:** [`api-tests/day08/postman/`](api-tests/day08/postman/)  
  - **collections/** — `nopCommerce API (Day 8) Add to Cart & Verify Cart.postman_collection.json`  
  - **environments/** — `Day 8.postman_environment.json`  
  - **results/** — exported run results (`*.postman_test_run.json`)  
  - **screenshots/** — PDP, Add-to-Cart, Cart verification steps

- **Config:** [`playwright.config.ts`](playwright.config.ts)  
  - `baseURL=https://nop-qa.portnov.com`  
  - Headed mode for debugging, screenshots always, trace/video enabled

##

### How to Run

```bash
# UI
npx playwright test tests/add-to-cart.spec.ts --headed --trace on

# API (Playwright)
npx playwright test api-tests/day08/playwright/src/books.add-to-cart.api.spec.ts

# Postman
# Import collection + environment and run through Postman Runner or CLI

# Everything
npx playwright test
npx playwright show-report
````

##

### Reports & Artifacts

* **Playwright HTML report** — `reports/latest/html-report/`
* **API raw responses** — `api-tests/day08/playwright/results/`
* **Postman run evidence** — `api-tests/day08/postman/{collections,environments,results,screenshots}`

##

### AI Contribution Summary (Day 8)

AI was used to:

* Scaffold UI and API Add-to-Cart test specifications
* Generate parsing logic for PDP tokens and product IDs
* Propose structured Postman setup mirroring Playwright tests

Human refinements:

* Adjust token/productId regex for real PDP HTML
* Debug POST payload and headers for successful cart update
* Validate cart HTML manually and fix header assertions
* Organize Postman artifacts and commit results for recruiter visibility

Process: **AI scaffolding → manual debugging → verified test runs → structured repo commit**

```



