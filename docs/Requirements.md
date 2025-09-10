# Requirements — nopCommerce Demo (Storefront)

## Scope
Testing covers the **user storefront** at https://nop-qa.portnov.com, including:
- Registration
- Login / Logout
- Shopping Cart
- Guest Checkout (happy path)

## Out of Scope
Admin panel, real payment gateways, email delivery verification, taxes/shipping rate correctness, 3-D Secure.

## Assumptions
- Demo catalog may change; selectors should rely on roles/labels.
- Desktop viewport; Chromium as primary browser for automation.
- Checkout via **“Check / Money Order”** (demo-friendly).

---

## Features & Acceptance Criteria

### 1) Registration
**Description:** User can create an account with valid details.

**Acceptance Criteria**
- **AC-R1**: **Register** page is reachable from the header.
- **AC-R2**: Required fields: *First name, Last name, Email, Password, Confirm password*.
- **AC-R3**: Validation:
  - Empty required field → inline error.
  - Invalid email format → error.
  - Password and Confirm Password must match.
  - Password meets minimum strength rules (per UI).
- **AC-R4**: On valid input, account is created and either a success message is shown or user is redirected to **My account**.
- **AC-R5**: Using an email that already exists shows a clear error.

**Gherkin (happy path)**
```gherkin
Scenario: Successful Registration
  Given I am on the Register page
  When I fill First name, Last name, a unique Email, Password and Confirm Password
  And I click "Register"
  Then I see a success message or I am redirected to "My account"
```

**Gherkin (negative)**
```gherkin
Scenario: Registration with existing email
  Given I am on the Register page
  When I use an email that already exists and submit
  Then I see an error about the email already being used
```

### 2) Login / Logout
Description: User can sign in and sign out with valid credentials.

Acceptance Criteria
AC-L1: Log in page is reachable from the header.
AC-L2: Valid credentials → user is logged in (header shows My account / Log out).
AC-L3: Invalid credentials → general error message is shown.
AC-L4: Log out ends the session; header shows Log in again.

**Gherkin**
```gherkin
Scenario: Successful Login and Logout
  Given I am on the Login page
  When I sign in with valid credentials
  Then I see "My account" and "Log out" in the header
  When I click "Log out"
  Then I see "Log in" in the header
```

### 3) Shopping Cart

Description: User can add items, change quantity, and remove items.

Acceptance Criteria

AC-C1: From listing or product page, Add to cart adds an item.
AC-C2: Header cart counter cart-qty increases accordingly.
AC-C3: Cart page shows item rows with name, price, qty, subtotal.
AC-C4: Updating quantity recalculates subtotal and total.
AC-C5: Remove deletes the row.
AC-C6: Terms of service checkbox must be accepted before checkout.

**Gherkin (happy path)**
```gherkin
Scenario: Add item to cart and update quantity
  Given I add a product to the cart
  Then the header cart counter increases
  When I open the Shopping cart and set quantity to 2
  Then the subtotal and total are recalculated
```
### 4) Guest Checkout (happy path)

Description: User can checkout without registration.

Acceptance Criteria

AC-CH1: From cart, user accepts Terms and clicks Checkout.
AC-CH2: Checkout as Guest is available and leads to Billing Address.
AC-CH3: Required fields in Billing Address must be completed.
AC-CH4: User can select a Shipping Method and continue.
AC-CH5: User can select Payment Method Check / Money Order and continue.
AC-CH6: On confirmation, order is created and success page shows an order number.

**Gherkin (happy path)**
```gherkin
Scenario: Guest checkout happy path (Check / Money Order)
  Given I have an item in the cart and I accepted the terms
  When I start checkout as Guest and fill Billing Address
  And I select a Shipping Method and continue
  And I select "Check / Money Order" and continue
  And I confirm the order
  Then I see an order completion page with an order number
```

### Non-Functional Minimum

Key pages open without critical errors; actions complete within reasonable time for the demo environment.
Elements accessible by role/label for stable automation.

### Traceability

| Area               | AC IDs        | Test file(s)                                              | Status  |
|--------------------|---------------|-----------------------------------------------------------|---------|
| Smoke: homepage    | —             | tests/smoke.spec.ts                                       | ✅ done |
| Smoke: navigation  | —             | tests/navigation.spec.ts                                  | ✅ done |
| Smoke: search      | —             | tests/smoke-search.spec.ts                                | ✅ done |
| Registration       | AC-R1…R5      | tests/register.spec.ts                                    | planned |
| Login/Logout       | AC-L1…L4      | tests/auth.spec.ts                                        | planned |
| Cart (add/update)  | AC-C1…C6      | tests/cart-add.spec.ts, tests/cart-update.spec.ts         | planned |
| Guest Checkout     | AC-CH1…CH6    | tests/checkout-guest.spec.ts                              | planned |

