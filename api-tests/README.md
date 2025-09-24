# API Tests — Day-based Structure



Tests are now organized **by days**: `api-tests/day6`, `api-tests/day7`, ...



Inside each day:

- `collections/` → Postman collections

- `environments/` → Postman environments

- `results/` → saved HTML responses

- `screenshots/` → screenshots of test runs

- `src/` → Playwright/TypeScript API test specs



For **Day 6**, you can already find collections, results, and screenshots of the Registration API tests.


# API Registration Troubleshooting (Day 6)

During the implementation of API registration tests we encountered several issues:

1. **400 Bad Request**  
   - **Cause:** the POST request was sent without valid cookies and antiforgery token.  
   - **Fix:** always call `GET /register` first, then extract via Postman Tests:  
     - `__RequestVerificationToken` from the hidden input;  
     - `formAction` from the `<form>` tag;  
     - cookies are warmed in the cookie jar automatically.  
   - These values were stored in environment variables and reused in the `POST`.

2. **Blocked as "Search Engine"**  
   - **Cause:** the server classified the client as a search engine when using default user agents.  
   - **Symptom:** “Search engine can’t be registered”.  
   - **Fix:** set `User-Agent` to a real browser string (e.g., Chrome on Windows) in both requests.

3. **Stale environment values**  
   - **Fix:** refresh variables on each run via the GET step and generate a unique email.

4. **Success validation**  
   - **Fix:** check for `"Your registration completed"` in the response body.

✅ With these fixes the test now consistently passes (200 OK + “Your registration completed”).

##

# API tests (Postman)

Day 6: Registration (success, duplicate, missing required)

### What this covers
End-to-end registration flow via nopCommerce public site using Postman (UI only).

### How to run (Postman UI)
1. Select environment `nopcommerce-qa`.
2. Run **GET** `Register page` to fetch cookies, `__RequestVerificationToken`, and form action.
3. Run **POST** `Register (success 200)` with body type `x-www-form-urlencoded`.
4. Expected result: **200 OK** and `"Your registration completed"` appears in the response body.

### Scenarios
- ✅ Valid registration → 200 OK + "Your registration completed"
- ❌ Missing/invalid token or cookies → 400 Bad Request
- ❌ Search-engine blocked (wrong UA) → "Search engine can’t be registered"
- ❌ Duplicate email → page returns validation summary

### Notes
- Always fetch the page (`GET /register`) before submitting the form — it refreshes cookies and antiforgery token.
- Use a real browser `User-Agent` header to avoid being flagged as a search engine.
- Email is auto-generated per run (e.g., `qa_<timestamp>@example.com`).

### Proofs
- Screenshots: `docs/img/api-registration-success.png`

##

# API Tests — Day 6 (Playwright)

This module covers **registration scenarios** through Playwright’s `APIRequestContext` (no browser UI).  
Requests replicate a real browser flow: fetch `__RequestVerificationToken` with `GET /register`, preserve cookies in the same API context, and submit form data with `form:`.

---

## How to Run
```bash
# run all Day 6 API specs
npx playwright test api-tests/day06/playwright/src/registration.api.spec.ts

# run a single scenario by title
npx playwright test -g "Valid registration"
```

---

## Scenarios

- ✅ **Valid registration** → HTTP `200/302 OK`, response body contains `"Your registration completed"`.
- ❌ **Missing required fields** → HTTP `200 OK`, body contains `"First name is required"`, `"Last name is required"`, `"Email is required"`.
- ⚠️ **Duplicate email** → HTTP `200/302 OK`, body contains `"The specified email already exists"`.

---

## Notes

- Each test begins with `GET /register` to obtain a fresh `__RequestVerificationToken` and initialize cookies.
- Headers emulate a real browser (`User-Agent`, `Accept`, `Accept-Language`, `Referer`) to prevent anti-bot blocking.
- Unique email is generated per run (e.g., `user_<timestamp>@mail.com`); duplicate scenario reuses the same email.
- Redirects (`302`) are followed automatically; assertions check the final `200` response page.

---

## Artifacts

### Postman
- [Screenshots](https://github.com/Lakrimoza8989/nopcommerce-qa-capstone/tree/main/api-tests/day06/postman/screenshots)  
- [Saved responses & logs (HTML report)](https://github.com/Lakrimoza8989/nopcommerce-qa-capstone/blob/main/api-tests/day06/postman/results/Registration_postman_test_run.html)  

### Playwright
- [Spec file](https://github.com/Lakrimoza8989/nopcommerce-qa-capstone/blob/main/api-tests/day06/playwright/src/registration.api.spec.ts)  
- [Test results (screenshots, videos, traces)](https://github.com/Lakrimoza8989/nopcommerce-qa-capstone/tree/main/reports/latest/test-results)  
- [Latest HTML report](https://github.com/Lakrimoza8989/nopcommerce-qa-capstone/tree/main/reports/latest/html-report)  

---

Вот структурированное **README для Day 7**, сделанное в том же стиле, что и Day 6. Можно прямо вставлять в репозиторий.

---

# Day 7 — Login Tests (UI + API)

## Scope

Cover login functionality with both **UI automation** and **API tests**.
Scenarios include valid login, invalid password, and non-existent email.
Artifacts: Playwright reports (screenshots, videos, traces) and saved HTML responses for evidence.

##

## Deliverables

### 1) UI: [`tests/login.spec.ts`](../tests/login.spec.ts)

* **✅ Valid login** → shows **“Log out”** link after entering correct credentials.
* **❌ Invalid password** → shows **“Login was unsuccessful”** message.
* **❌ Non-existent email** → shows **“Login was unsuccessful”** message.
* Uses `getByLabel` / `getByRole`, environment variables (`TEST_USER_EMAIL`, `TEST_USER_PASSWORD`), and Playwright artifacts.

Run:

```bash
npm run test:ui:login
```

---

### 2) API: [`api-tests/day07/playwright/src/login.api.spec.ts`](../api-tests/day07/playwright/src/login.api.spec.ts)

* **✅ Valid login** → expect status `200` or `302`, then GET `/` contains **Log out**.
* **❌ Invalid password** → status `200`, body includes **“Login was unsuccessful”**.
* **❌ Non-existent email** → same as above.
* Handles antiforgery token (`__RequestVerificationToken`) and cookies via `APIRequestContext`.
* Saves raw HTML bodies to [`results/`](../api-tests/day07/playwright/results) for recruiter-visible proof.

Run:

```bash
npm run test:api:day07:login
```

---

### 3) Postman (structure only)

Folders prepared under [`api-tests/day07/postman/`](../api-tests/day07/postman/):

* **collections/** — request collection with login scenarios
* **environments/** — baseUrl, userAgent, credentials
* **results/** — exported run results
* **screenshots/** — error evidence if needed

(Execution to be added in the next iteration.)

---

## Reports & Artifacts

* **Playwright HTML report** (screenshots, videos, traces): [`reports/latest/html-report/`](../reports/latest/html-report)
* **Saved raw responses**: [`api-tests/day07/playwright/results/`](../api-tests/day07/playwright/results)

Open local report:

```bash
npx playwright show-report reports/latest/html-report
```

---

## AI Contribution Summary (Day 7)

AI was used to:

* Scaffold both UI and API login test specifications (\~75%).
* Suggest environment variable usage for credentials.
* Generate token + cookie handling for API flows.
* Propose Postman folder structure consistent with Day 6.

Human refinements (\~25%):

* Debugging of login status codes (`200 vs 400`).
* Adjusting assertions for “Login was unsuccessful”.
* Organizing results into structured folders for recruiter visibility.

Process: **AI scaffolding → manual debugging → verified test runs → structured repo commit.**

---



