# API tests (Postman)

Day 6: Registration (success, duplicate, CSRF 400)

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

