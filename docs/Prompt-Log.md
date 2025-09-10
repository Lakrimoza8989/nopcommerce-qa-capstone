# Prompt Log — nopCommerce QA Capstone

## 2025-09-08 · Day 2

### 1) Requirements.md
**Goal.** Draft concise product requirements for the **storefront** (Registration, Login/Logout, Cart, Guest Checkout) with acceptance criteria (ACs) and short Gherkin examples. Scope is storefront only.  
**Tool.** GPT-5  
**Output.** [`./Requirements.md`](./Requirements.md)

<details>
<summary><b>Prompt used (click to expand)</b></summary>

```text
Draft Requirements.md for the nopCommerce storefront (https://demo.nopcommerce.com).
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

**Goal**  
Convert a positive test case for Registration into Gherkin format.

**Tool**  
GPT-5

**Output**  
`bdd-cucumber/features/registration-valid.feature`

---

### 2) login-valid-invalid.feature

**Goal**  
Write a BDD scenario combining both valid and invalid login attempts.

**Tool**  
GPT-5

**Output**  
`bdd-cucumber/features/login-valid-invalid.feature`

---

### 3) cart-add.feature

**Goal**  
Write a BDD scenario for adding an item to the shopping cart from a product listing.

**Tool**  
GPT-5

**Output**  
`bdd-cucumber/features/cart-add.feature`

---

### 4) guest-checkout.feature

**Goal**  
Write a BDD scenario for guest checkout (positive happy path).

**Tool**  
GPT-5

**Output**  
`bdd-cucumber/features/guest-checkout.feature`

