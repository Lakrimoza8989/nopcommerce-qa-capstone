# Prompt Log — nopCommerce QA Capstone

## 2025-09-08 · Day 2

### 1) Requirements.md
**Goal.** Draft concise product requirements for the **storefront** (Registration, Login/Logout, Cart, Guest Checkout) with acceptance criteria (ACs) and short Gherkin examples. Scope is storefront only.  
**Tool.** GPT-5  
**Output.** [`./Requirements.md`](./Requirements.md)

<details>
<summary><b>Prompt used (click to expand)</b></summary>

```text
Draft Requirements.md for the nopCommerce storefront (https://nop-qa.portnov.com).
Include: Scope, Out of Scope, Assumptions. For features Registration, Login/Logout,
Shopping Cart, Guest Checkout — write clear Acceptance Criteria and provide a short
Gherkin example for the happy path (plus one negative for Registration).
Keep the wording concise and implementation-agnostic.
```

</details>

###


### 2) Test-Strategy.md
**Goal.** Create a pragmatic Test Strategy for Playwright/TypeScript: goals, scope/out of scope, approach, test levels/suites, test data, environments/tools, entry/exit criteria, reporting/metrics, risks/mitigations, and a CI roadmap.  
**Tool.** GPT-5  
**Output.** [`./Test-Strategy.md`](./Test-Strategy.md)

<details>
<summary><b>Prompt used (click to expand)</b></summary>

```text
Draft Test-Strategy.md for the nopCommerce storefront automated with Playwright (TypeScript).
Include: Goals; Scope & Out of Scope; Approach (risk-based, resilient selectors);
Test Levels (Smoke/Functional/Negative/Regression); Test Data; Environments & Tools;
Structure & Tagging; Entry/Exit Criteria; Reporting & Metrics; Risks & Mitigations;
CI roadmap for GitHub Actions. Keep it concise and practical.
```

</details>

---

## 2025-09-09 · Day 3

### 1) Test-Plan.md
**Goal.** Draft a concise Test Plan (scope, priorities, high-level scenarios, approach, criteria, risks).  
**Tool.** GPT-5  
**Output.** [`Test-Plan.md`](Test-Plan.md)

<details>
<summary><b>Prompt used (click to expand)</b></summary>

```text
Draft Test-Plan.md for nopCommerce storefront: objectives; scope/in & out; test levels (smoke/functional/negative/regression/e2e);
priorities (P0/P1/P2); approach (Playwright+TS, role/label-first selectors, data strategy); environments/tools; entry/exit criteria;
high-level scenarios per feature; reporting/metrics; risks; deliverables. Keep it concrete and concise.
```

</details>

---

## 2025-09-10 · Day 4

### 1) TestCases.md
**Goal.** Create a top-level summary of manual test cases (P/N/B) for Registration, Login/Logout, Cart, Guest Checkout. Include IDs (TC-REG-…, TC-LOGIN-…, etc.) and link to per-feature details.  
**Tool.** GPT-5  
**Output.** [`./TestCases.md`](./TestCases.md)

<details>
<summary><b>Prompt used (click to expand)</b></summary>

```text
Create docs/TestCases.md: a concise list of manual cases for Registration, Login/Logout, Cart, Guest Checkout.
For each: ID (e.g., TC-REG-001), short title, Type (P/N/B). Add a “Details” line that links to per-feature files:
  docs/test-cases/registration.md, login.md, cart.md, checkout-guest.md (relative links from docs/Prompt-Log.md must be ./test-cases/<file>.md when referenced from TestCases.md).
Keep it clean and consistent with previous days.
```

</details>

### 2) Coverage-Matrix.csv (stub)
**Goal.** Seed a coverage matrix mapping Requirement → Test Case → Automated (Planned).  
**Tool.** GPT-5  
**Output.** [`./Coverage-Matrix.csv`](./Coverage-Matrix.csv)

<details>
<summary><b>Prompt used (click to expand)</b></summary>

```text
Create docs/Coverage-Matrix.csv with columns: Requirement, Test Case ID, Automated, Notes.
Populate rows for Registration (TC-R…), Login (TC-L…), Cart (TC-C…), Checkout (TC-CH…).
Set Automated=Planned for now. Keep CSV header and values simple (no extra commas inside cells).
```

</details>

### 3) Per-feature case files  
**Goal.**  Create per-feature test case files (Pre/Data/Steps/Expected/Priority) to match the summary list.  
  
**Tool.** GPT-5  
**Output.**  
- [`./test-cases/registration.md`](./test-cases/registration.md)
- [`./test-cases/login.md`](./test-cases/login.md)
- [`./test-cases/cart.md`](./test-cases/cart.md)
- [`./test-cases/checkout-guest.md`](./test-cases/checkout-guest.md)

<details> 
<summary><b>Prompt used (click to expand)</b></summary>

```text
Generate per-feature test case stubs:
  docs/test-cases/registration.md
  docs/test-cases/login.md
  docs/test-cases/cart.md
  docs/test-cases/checkout-guest.md
For each file: list the cases with ID/Title/Type, then provide a “Use structure: Pre / Data / Steps / ER” note so the team can expand details later.
Notes: Test case detailing (Preconditions / Data / Steps / Expected) completed with GPT-5 assistance. Prompt used interactively during case-by-case creation.

```

</details>

---

## 2025-09-11 • Day 5

### 1) registration-valid.feature  
**Goal.** Convert valid registration test case (TC-REG-001) into a Gherkin-based BDD feature.  
**Tool.** GPT-5  
**Output.** [bdd-cucumber/features/registration-valid.feature](../bdd-cucumber/features/registration-valid.feature)

### 2) login-valid-invalid.feature  
**Goal.** Convert positive and negative login scenarios into one `.feature` file.  
**Tool.** GPT-5  
**Output.** [bdd-cucumber/features/login-valid-invalid.feature](../bdd-cucumber/features/login-valid-invalid.feature)

### 3) cart-add.feature  
**Goal.** Create a BDD flow for adding item to cart from the product listing page.  
**Tool.** GPT-5  
**Output.** [bdd-cucumber/features/cart-add.feature](../bdd-cucumber/features/cart-add.feature)

### 4) guest-checkout.feature  
**Goal.** Write end-to-end guest checkout scenario using Gherkin syntax.  
**Tool.** GPT-5  
**Output.** [bdd-cucumber/features/guest-checkout.feature](../bdd-cucumber/features/guest-checkout.feature)  

---  

## 2025-09-10 · Day 6 · Prompt Log

### 1) registration.spec.ts (UI)
**Goal.** Automate Registration flow via UI: valid and invalid cases.  
**Prompt used:**  
> Write a Playwright test in TypeScript for nopCommerce demo site registration.  
> - Case 1: valid registration with unique email, assert “Your registration completed”.  
> - Case 2: invalid registration with empty required fields, assert validation messages.  
> Use `getByLabel` / `getByRole` locators, auto-scroll helper, and dynamic email generator.  
**Output.** [`tests/registration.spec.ts`](../tests/registration.spec.ts)

##

### 2) registration.api.spec.ts (API)
**Goal.** Automate Registration flow via API: valid (200), missing required (200 + validation errors), duplicate (200 + “email already exists”).  
**Prompt used:**  
> Write API tests in Playwright (TypeScript) for nopCommerce demo registration.  
> - Fetch antiforgery token from `/register` page.  
> - POST form with required fields.  
> - Verify success text, validation error messages, and duplicate email message.  
**Output.** Output. [registration.api.spec.ts](../api-tests/day06/playwright/src/registration.api.spec.ts)


##

### 3) playwright.config.ts
**Goal.** Update config for stable execution.  
**Prompt used:**  
> Update Playwright config: set baseURL=https://nop-qa.portnov.com, headless=false, viewport 1366x768, timeouts, screenshots on failure, trace/video artifacts. Configure project for Desktop Chrome.  
**Output.** [`playwright.config.ts`](../playwright.config.ts)

##

### Verification
**Prompt used:**  
> How to verify that both UI and API registration tests pass? Provide Playwright CLI commands.  
**Output.**  
```bash
npx playwright test
npx playwright show-report

```

#### Troubleshooting Log (API)

- Initial `POST /register` attempts returned **400 Bad Request**.
  - Root cause: missing antiforgery token and cookies.
  - Fix: added a GET step to `/register`, parsed the HTML with `cheerio` in Postman Tests, and saved:
    - `__RequestVerificationToken` (hidden input),
    - `formAction` (form action attribute),
    - The cookie jar was warmed by the GET and reused automatically.

- Blocked as a **“Search Engine”**:
  - Symptom: “Search engine can’t be registered”.
  - Fix: set a real browser `User-Agent` header in both GET and POST.

- Success validation:
  - Instead of relying on redirects, we assert the response body contains `"Your registration completed"`.

- Stable flow:
  1) GET → capture token, cookies, and action.  
  2) POST → submit the form with a unique email.  
  3) Assert 200 + success text; otherwise extract message from `<div class="message-error">`.


## AI Contribution Summary (Day 6)

The Day 6 deliverables focused on **API-based registration testing** with Playwright:

- **AI-generated foundation (~80%)**  
  GPT-5 was used to scaffold the initial Playwright API test specifications, including test cases for valid registration, missing required fields, and duplicate email handling.  

- **Manual refinement (~20%)**  
  Additional adjustments were required to achieve stable execution:  
  - Injecting realistic `User-Agent` headers, cookies, and antiforgery token handling.  
  - Ensuring consistent status codes and validation of response messages.  
  - Running and verifying flows in Postman, Playwright, and Git Bash.  

- **Process**  
  The workflow followed a structured cycle: **AI-generated scaffolding → human debugging and refinement**, resulting in a stable and reproducible test suite.


---

Отлично, понял. Я собрал **Day 7 · Prompt Log** ровно в том же стиле, что у тебя для Day 6, со всеми блоками: номер, файл, цель, промпт, аутпут. Вот чистовой вариант:

---

## 2025-09-11 · Day 7 · Prompt Log

### 1) login.spec.ts (UI)

**Goal.** Automate Login flow via UI:

* Case 1: valid login with real credentials → assert that **Log out** appears.
* Case 2: invalid password → assert **Login was unsuccessful** message.
* Case 3: non-existent email → assert **Login was unsuccessful** message.

**Prompt used:**

> Write a Playwright test in TypeScript for nopCommerce demo site login.
>
> * Use environment variables `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`.
> * Case 1: valid login, check `Log out`.
> * Case 2: wrong password, expect error message.
> * Case 3: non-existent email, expect error message.
>   Use `getByLabel` / `getByRole` locators. Save screenshot/trace/video artifacts.

**Output.** [`tests/login.spec.ts`](../tests/login.spec.ts)

##

### 2) login.api.spec.ts (API)

**Goal.** Automate Login flow via API:

* Valid credentials → expect `200` or `302`, and GET `/` shows `Log out`.
* Invalid password → expect `200` with error message.
* Non-existent email → expect `200` with error message.

**Prompt used:**

> Write API tests in Playwright (TypeScript) for nopCommerce demo login.
>
> * GET `/login` to capture `__RequestVerificationToken`.
> * POST `/login` with form data (email, password).
> * Handle cookies and token in the same APIRequestContext.
> * Save raw HTML response bodies into `results/` for recruiter evidence.
> * Cases: valid login, wrong password, non-existent email.

**Output.** [`api-tests/day07/playwright/src/login.api.spec.ts`](../api-tests/day07/playwright/src/login.api.spec.ts)

##

### 3) package.json

**Goal.** Add npm scripts to run Day 7 login tests.

**Prompt used:**

> Update `package.json` scripts:
>
> * `"test:ui:login": "npx playwright test tests/login.spec.ts --headed"`
> * `"test:api:day07:login": "npx playwright test \"api-tests/day07/playwright/src/login.api.spec.ts\""`

**Output.** [`package.json`](../package.json)

##

### 4) Results

**Goal.** Store recruiter-friendly evidence.

**Prompt used:**

> Save HTML response bodies from API tests under `api-tests/day07/playwright/results/`.
> Ensure screenshots, traces, and videos are generated for UI tests in `reports/latest/`.

**Output.**

* [`api-tests/day07/playwright/results/`](../api-tests/day07/playwright/results/)
* [`reports/latest/test-results/`](../reports/latest/test-results/)

##

### Verification

**Prompt used:**

> How to run Day 7 login tests and verify results?

**Output.**

```bash
# Run UI login tests
npm run test:ui:login

# Run API login tests
npm run test:api:day07:login

# Open latest Playwright report
npx playwright show-report reports/latest/html-report
```

---



## 2025-09-27 · Day 8 · Prompt Log

### 1) add-to-cart.spec.ts (UI)

**Goal.** Automate **Add to Cart** flow via UI:

* Navigate to **Books** → open PDP for “Fahrenheit 451 by Ray Bradbury”.
* Click **Add to cart**.
* Assert that cart icon in header updates to **(1)**.
* Open `/cart` page → verify:

  * Product name is displayed
  * Quantity = 1
  * Total = `$27.00`

**Prompt used:**

> Write a Playwright UI test in TypeScript for nopCommerce demo site:
>
> * Navigate to `/books`, open PDP for “Fahrenheit 451 by Ray Bradbury”.
> * Click Add to Cart and assert that the cart indicator in the header shows “(1)”.
> * Open `/cart` and assert product name, quantity = 1, and total = `$27.00`.
> * Use stable locators (`getByRole`, `getByText`).
> * Save screenshots, traces, and videos for recruiter visibility.

**Output.** [`tests/add-to-cart.spec.ts`](../tests/add-to-cart.spec.ts)

##

### 2) books.add-to-cart.api.spec.ts (API)

**Goal.** Automate **Add to Cart** flow via Playwright API:

* GET PDP → parse `productId` and antiforgery token.
* POST `/addproducttocart/details/{productId}/1` with form data and token.
* GET `/cart` → verify that the product is present with correct quantity and total.

**Prompt used:**

> Write a Playwright API test in TypeScript for nopCommerce demo site to add a product to the cart and verify it:
>
> * GET PDP `/fahrenheit-451-by-ray-bradbury`, parse `productId` and `__RequestVerificationToken`.
> * POST to `/addproducttocart/details/{productId}/1` with form data.
> * Reuse cookies and token.
> * GET `/cart` and assert product name, quantity = 1, total = $27.00.
> * Save HTML responses to `api-tests/day08/playwright/results/` for recruiter evidence.

**Output.** [`api-tests/day08/playwright/src/books.add-to-cart.api.spec.ts`](../api-tests/day08/playwright/src/books.add-to-cart.api.spec.ts)

##

### 3) package.json

**Goal.** Add npm scripts to run Day 8 Add to Cart tests.

**Prompt used:**

> Update `package.json` scripts:
>
> * `"test:ui:day08:add-to-cart": "npx playwright test tests/add-to-cart.spec.ts --headed"`
> * `"test:api:day08:add-to-cart": "npx playwright test \"api-tests/day08/playwright/src/books.add-to-cart.api.spec.ts\""`

**Output.** [`package.json`](../package.json)

##

### 4) Postman Collection

**Goal.** Reproduce the Add to Cart flow in Postman and save results.

**Prompt used:**

> Create a Postman collection that replicates the Playwright API test:
>
> * GET PDP → parse `productId` and token with scripts.
> * POST add-to-cart → expect `"success": true`.
> * GET `/cart` → assert product name, qty, total in Tests tab.
> * Use environment variables for base URL, productId, token.
> * Export collection, environment, run results, and screenshots.

**Output.**

* [`api-tests/day08/postman/collections/nopCommerce API (Day 8) Add to Cart & Verify Cart.postman_collection.json`](../api-tests/day08/postman/collections/)
* [`api-tests/day08/postman/environments/Day 8.postman_environment.json`](../api-tests/day08/postman/environments/)
* [`api-tests/day08/postman/results/*.postman_test_run.json`](../api-tests/day08/postman/results/)
* [`api-tests/day08/postman/screenshots/*.png`](../api-tests/day08/postman/screenshots/)

##

### 5) Results

**Goal.** Store recruiter-friendly evidence of UI, API, and Postman runs.

**Prompt used:**

> Save Playwright HTML report and raw HTML responses for Day 8.
> Export Postman run results and screenshots to `api-tests/day08/postman/`.

**Output.**

* [`reports/latest/html-report/`](../reports/latest/html-report/) — Playwright UI/API artifacts
* [`api-tests/day08/playwright/results/`](../api-tests/day08/playwright/results/) — saved PDP & Cart HTML
* [`api-tests/day08/postman/`](../api-tests/day08/postman/) — collection, environment, results, screenshots

##

### 6) Verification

**Prompt used:**

> How to run Day 8 Add to Cart tests and verify results?

**Output.**

```bash
# Run UI Add to Cart test
npm run test:ui:day08:add-to-cart

# Run API Add to Cart test
npm run test:api:day08:add-to-cart

# Postman
# Import collection + environment and run through Postman Runner

# Open latest Playwright report
npx playwright show-report reports/latest/html-report
```

---

### Debugging & Human Fixes

During Day 8 implementation, multiple AI-generated issues were identified and manually fixed:

* ❌ **Wrong headers in Postman GET Cart request** — AI forgot to preserve cookies; fixed by adding the correct Cookie and antiforgery token headers.
* ❌ **Broken `success=true` assertion** in Postman tests — AI wrote an incorrect check; replaced with correct JSON validation.
* ❌ **Missing environment setup** — AI didn’t generate environment variables; manually created `Day 8.postman_environment.json` and linked it to the collection.
* ❌ **Regex extraction errors** — AI’s initial regex for `productId` and token failed on real PDP HTML; manually corrected regex to match actual attributes.
* ✅ Verified HTML responses manually, fixed headers/payloads, and re-ran tests until all assertions passed.

**Summary:** AI provided initial structure but failed in several implementation details. All critical steps (headers, token extraction, assertions) were debugged and corrected manually to achieve stable and reproducible results.

---



