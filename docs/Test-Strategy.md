# Test Strategy — nopCommerce Demo (Storefront)

## Goals
Provide a lean, reliable test stack that proves critical user flows work: Registration, Login/Logout, Cart, Guest Checkout. Keep a very fast Smoke layer for daily confidence.

## Scope
User storefront at https://nop-qa.portnov.com (desktop, Chromium primary).

## Out of Scope
Admin panel, real payment providers, email delivery, tax/shipping rate correctness, performance/load testing.

## Approach
- **Risk-based, incremental**: start with Smoke → happy paths → key negatives → selective Regression.
- **UI automation**: Playwright + TypeScript. Prefer resilient selectors:
  - `getByRole`, `getByLabel`, `getByPlaceholder`, explicit assertions via `expect(...)`.
- **Stability**
  - Avoid brittle CSS/XPath to text-only selectors.
  - Use URL/heading checks after navigation.
  - Screenshots/videos on failure, traces on retry.
- **Definition of Done**
  - **Smoke**: 100% green; no Sev1/Sev2 open.
  - **Feature**: happy path automated + essential negatives; report attached.

## Test Levels & Suites
- **Smoke** (runs locally & in CI on every push):
  - Homepage loads.
  - Main menu nav: **Computers → Desktops** shows products.
  - Search returns results.
- **Functional/Sanity**
  - Registration, Login/Logout, Cart (add/update/remove), Guest Checkout (Check/Money Order).
- **Negative/Validation**
  - Required fields, invalid email, password mismatch, terms not accepted, wrong password, etc.
- **Selective Regression**
  - Tagged set, run by schedule/when risky areas change.

## Data
- **Registration email**: `user+<timestamp>@example.com`.
- **Login**: either a freshly created user within tests or a seeded test user via config/secret.
- **Cart/Checkout**: stick to stable categories (e.g., Books, Computers/Desktops).

## Environments & Tools
- **Playwright**: Chromium (primary), Firefox/WebKit optional later.
- **Reporters**: HTML report; keep screenshots/videos on failure; traces on first retry.
- **Config**: baseURL points to demo site; viewport: desktop.

## Structure & Tagging
- Files in `tests/`. Current:
  - `tests/smoke.spec.ts`, `tests/navigation.spec.ts`, `tests/smoke-search.spec.ts` (✅ done).
- Planned feature files:
  - `tests/register.spec.ts`, `tests/auth.spec.ts`,
  - `tests/cart-add.spec.ts`, `tests/cart-update.spec.ts`,
  - `tests/checkout-guest.spec.ts`.
- Optional tags later: `@smoke @auth @cart @checkout`.

## Entry / Exit Criteria
- **Entry**: site reachable; critical pages load.
- **Exit (feature)**: happy path + key negatives pass; no Sev1/Sev2 open; artifacts published.
- **Exit (release/demo)**: smoke green; functional pass-rate ≥ 90%; flaky tests quarantined.

## Reporting & Metrics
- Artifacts: HTML report + screenshots/videos/traces.
- Metrics: pass-rate, duration, flaky count; linked from README by “Day”.

## Risks & Mitigations
- **Demo content changes** → prefer role/label selectors; assert headings/URLs instead of brittle text.
- **Flakiness/latency** → explicit waits with `expect().toBeVisible()`; retries only on known flaky spots.
- **Email already used** → generate unique addresses.

## CI Roadmap (GitHub Actions)
1) Job: install deps → run **Smoke** → upload HTML report as artifact.
2) Fail build if **Smoke** fails.
3) Nightly Functional suite (matrix later) → publish report to `docs/reports/<date>-ci/`.
4) Cache `node_modules`/browsers to speed up, run with concurrency to avoid overlap.

## Traceability (live link to current state)
See `Requirements.md` table: smoke = ✅ done; features = planned with target spec files.
