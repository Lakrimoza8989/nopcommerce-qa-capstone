# Test Plan — nopCommerce Demo (Storefront)

## 1. Objectives
Provide a pragmatic plan to validate critical user flows of the **storefront** and to demonstrate a complete QA workflow (docs → manual/BDD → automation → reports/CI).

## 2. In Scope
- Registration, Login/Logout
- Shopping Cart (add/update/remove, terms)
- Guest Checkout (Check/Money Order)
- Smoke: home page load, main navigation (Computers → Desktops), basic search

## 3. Out of Scope
Admin panel, real payments/taxes/email delivery, performance/load, i18n, accessibility audit (beyond basic role/label usage).

## 4. Test Levels & Types
- **Smoke** (fast, green daily)
- **Functional** (happy paths)
- **Negative/Validation**
- **Selective Regression** (tag-based)
- **E2E guest checkout (happy path)**

## 5. Priorities
- **P0:** Availability, Registration, Login, Cart add/remove/update totals, Guest Checkout
- **P1:** Form validations, Navigation categories, Search results
- **P2:** Cross-browser (FF/WebKit), minor UX polish

## 6. Test Approach
- Risk-based, incremental.
- UI automation: **Playwright + TypeScript**; selectors first by **role/label/placeholder**.
- Data: unique emails `user+<timestamp>@example.com`; stable products (Books, Computers/Desktops).
- Flakiness control: explicit waits via `expect(...).toBeVisible()`, URL assertions; retries — точечно.

## 7. Environments & Tools
HEAD
- Site: [https://nop-qa.portnov.com](https://nop-qa.portnov.com/)

- Site: https://nop-qa.portnov.com

- Browser: Chromium primary (FF/WebKit later)
- Reporting: Playwright HTML; screenshots/video/trace on fail
- CI: GitHub Actions (smoke gate; nightly functional matrix — later)

## 8. Entry / Exit Criteria
**Entry (feature):** site reachable; test data prepared.  
**Exit (feature):** happy path + key negatives pass; no Sev1/Sev2 open; report published.  
**Exit (release/demo):** smoke green; functional ≥ 90% pass; flaky tests quarantined.

## 9. High-Level Scenarios (HLS)
- **HLS-SMK-1:** Home page loads and key UI visible (P0, automated)
- **HLS-NAV-1:** Menu Computers → Desktops lists products (P0, automated)
- **HLS-SRCH-1:** Search “computer” returns results (P1, automated)
- **HLS-REG-1:** Successful Registration (P0, auto planned)
- **HLS-REG-2:** Registration with existing email → error (P1, auto planned)
- **HLS-AUTH-1:** Login valid → My account / Log out (P0, auto planned)
- **HLS-AUTH-2:** Login invalid → error (P1, auto planned)
- **HLS-CART-1:** Add to cart from listing; counter increases (P0, auto planned)
- **HLS-CART-2:** Update qty recalculates totals (P0, auto planned)
- **HLS-CART-3:** Remove item clears row (P0, auto planned)
- **HLS-CHK-1:** Guest checkout end-to-end (P0, auto planned)

## 10. Reporting & Metrics
Pass rate, duration, flakies, failures by suite; attach HTML report + artifacts; link from README.

## 11. Risks & Mitigations
- Demo data changes → role/label selectors, stable categories
- Slow responses → explicit expectations, pragmatic timeouts
- Shared emails → timestamped uniques

## 12. Deliverables
- Test Plan (this document)
- Prompt Log (Day 3)
- HTML reports per run; CI pipeline (later)
MD

