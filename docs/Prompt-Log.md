# Prompt Log — nopCommerce QA Capstone

## 2025-09-08 · Day 2

### 1) Requirements.md
**Goal.** Draft concise product requirements for the **storefront** (Registration, Login/Logout, Cart, Guest Checkout) with acceptance criteria (ACs) and short Gherkin examples. Scope is storefront only.  
**Tool.** GPT-5  
**Output.** [`docs/Requirements.md`](docs/Requirements.md)

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
**Output.** [`docs/Test-Strategy.md`](docs/Test-Strategy.md)

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

