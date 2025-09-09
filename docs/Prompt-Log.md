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
**Goal.** Draft a practical Test Plan: objectives, scope/in-out, assumptions/risks, roles & schedule, test levels/suites, risk-based priorities, environments/browsers, data strategy, entry/exit criteria, triage & SLAs, reporting & deliverables, traceability.  
**Tool.** GPT-5  
**Output.** [`docs/test-plan/Test-Plan.md`](docs/test-plan/Test-Plan.md)

<details>
<summary><b>Prompt used (click to expand)</b></summary>

```text
Draft Test-Plan.md for the nopCommerce storefront (Playwright + TypeScript focus).
Include: Objectives; Scope (in/out) & assumptions; Stakeholders/roles & RACI; Schedule/milestones;
Test levels (Smoke/Functional/Negative/Regression/E2E); Risk-based priorities (P0/P1/P2) by area;
Environments/browsers; Test data strategy; Entry/Exit criteria; Defect severity/priority + SLAs;
Triage & reporting cadence; Deliverables; Traceability to Requirements IDs; Dependencies; Open risks.
Add a compact table for Feature × Priority × Planned coverage.
Keep it concise and actionable for this repo.
```
</details>

### 2) Coverage-Matrix.csv (stub)
**Goal.** Seed a coverage matrix mapping Requirement IDs to test cases (manual/BDD/automated) with status.  
**Tool.** GPT-5  
**Output.** [`docs/Coverage-Matrix.csv`](docs/Coverage-Matrix.csv)

<details>
<summary><b>Prompt used (click to expand)</b></summary>

```text
Create an initial CSV for coverage. Columns:
Requirement_ID,Feature,Test_Case_ID,Type(manual|bdd|auto),Priority(P0|P1|P2),Automated_File,Status(planned|in_progress|done),Notes
Populate 6–10 example rows using IDs from Requirements:
AC-R1…R5 (Registration), AC-L1…L4 (Login), AC-C1…C6 (Cart), AC-CH1…CH6 (Guest Checkout).
Map to sample tests like REG-001, LOGIN-001, CART-001, CHK-001.
Automated_File examples: tests/smoke.spec.ts, tests/navigation.spec.ts, tests/smoke-search.spec.ts,
and planned: tests/register.spec.ts, tests/login.spec.ts, tests/cart-add.spec.ts, tests/checkout-guest.spec.ts.
```
</details>


