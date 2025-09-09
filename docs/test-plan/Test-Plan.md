# Test Plan — nopCommerce Demo (Storefront)

## 1. Objectives
Provide a practical plan to verify the storefront’s critical user flows and build confidence via a fast Smoke layer, focused Functional/Negative tests, and an executable E2E path for Guest checkout. Keep automation stable, fast, and CI-friendly.

## 2. Scope
In scope (storefront only): Registration, Login/Logout, Shopping Cart, Guest Checkout (happy path), Top-menu navigation, Search (smoke).
Out of scope: Admin panel, real payments, performance/load, email delivery, taxes/rates correctness.

Reference: `docs/Requirements.md`.

## 3. Test Types & Suites
- **Smoke**: homepage loads; main menu navigation (Computers → Desktops); search returns results.
- **Functional (happy paths)**:
  - Registration (unique email)
  - Login/Logout
  - Cart: add/update/remove
  - Guest Checkout (Check / Money Order)
- **Negative/Validation**:
  - Registration: existing email; invalid email; required fields
  - Login: wrong password
  - Cart/Checkout: terms not accepted
- **Selective Regression**: stable subset of above, run nightly in CI.
- **E2E**: Guest checkout from product add to order confirmation.

## 4. Environments & Platforms
- URL: https://demo.nopcommerce.com
- Browsers: Chromium (primary). Firefox/WebKit optional later.
- Viewport: desktop.
- Test data:
  - Unique email template: `user+{timestamp}@example.com`
  - Billing address: fixed safe values suitable for the demo
- Tools: Playwright (TypeScript), Node.js, GitHub Actions, HTML report, screenshots/video on failure, traces on retry.

## 5. Test Design Approach
- Risk-based selection; cover business-critical happy paths first.
- Stable selectors: `getByRole`, `getByLabel`, `getByPlaceholder`; avoid brittle CSS/XPath.
- Idempotent test data; generate per run; clean up via UI where needed.
- Small, independent specs; fast runs (parallel by default).

## 6. Entry / Exit Criteria
**Entry:** Demo site reachable; no Sev-1 known blockers for the planned scope.
**Exit (feature/suite):**
- Happy path + key negatives pass
- No open Sev-1/Sev-2 defects for in-scope features
- HTML report published; evidence (screenshots) attached where relevant
**Exit (release/demo):**
- Smoke 100% pass in CI
- Functional pass rate ≥ 90%
- Flaky tests quarantined or stabilized

## 7. Defects, Severity & Triage
Severity:
- **Sev-1**: critical break of core flow (can’t register/login/checkout)
- **Sev-2**: major functionality degraded; no simple workaround
- **Sev-3**: standard functional defect
- **Sev-4**: minor/visual/text

Triage:
- Sev-1: same day
- Sev-2: next working day
- Sev-3/4: as scheduled

## 8. Reporting & Metrics
- Artifacts: HTML report, screenshots, videos, traces
- Metrics: pass rate, duration, flaky count, top failing specs
- Visibility: linked from `README.md` (Docs/Reports section)

## 9. Schedule & Cadence
- **Local dev:** run Smoke on every change; Functional when altering affected area
- **CI (GitHub Actions):**
  - On push/PR: Smoke
  - Nightly: Functional + Negative subset
  - Optional weekly: selective Regression

## 10. Suite Inventory (initial)
- Smoke: homepage, navigation (Computers → Desktops), search
- Functional: registration, login/logout, cart add/update/remove, guest checkout
- Negative: registration (existing email/invalid/required), login wrong password, checkout without terms

## 11. Risks & Mitigations
- Changing demo content → prefer role/label selectors; assert URLs/titles where stable
- Flakiness/slow responses → explicit waits on visibility, retries on known flaky steps only
- Shared demo data (existing email) → timestamped unique emails

## 12. Deliverables
- Automated Playwright specs under `/tests`
- HTML reports under `docs/reports/<date>/`
- Screenshots under `docs/screenshots/`
- Updated `README.md` links
- Prompt log entries in `docs/Prompt-Log.md`

## 13. Approvals
This plan is owned and maintained within the repository. Changes are proposed via PR and tracked in `README.md` “Progress Log”.
