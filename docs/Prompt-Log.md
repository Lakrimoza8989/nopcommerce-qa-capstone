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
**Output.** [`api-tests/registration.api.spec.ts`](api-tests/registration.api.spec.ts)

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

- ~80% of artifacts (requirements, test strategy, test plan, BDD features, Playwright specs) were scaffolded by GPT-5.
- Manual fixes (~20%) included:
  - Adding `User-Agent`, cookies, and antiforgery token handling.
  - Stabilizing API tests (valid/missing/duplicate).
  - Validating results in Postman and Playwright runs.
- Workflow: **AI-generated → Human-refined**.

---

