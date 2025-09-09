# Test Cases — nopCommerce Storefront

## Legend
- Type: **P** = Positive, **N** = Negative, **B** = Boundary
- Each case: ID • Title • Type
- Full details live in per-feature files.

---

## 1) Registration
- **TC-REG-001** • New account (valid) • P
- **TC-REG-002** • Existing email • N
- **TC-REG-003** • Invalid email format • N
- **TC-REG-004** • Empty required fields • N
- **TC-REG-005** • Password mismatch • N
- **TC-REG-006** • Min/Max password length • B

→ Details: [docs/test-cases/registration.md](test-cases/registration.md)

---

## 2) Login / Logout
- **TC-LOGIN-001** • Valid login • P
- **TC-LOGIN-002** • Wrong password • N
- **TC-LOGIN-003** • Unregistered email • N
- **TC-LOGIN-004** • Email case-insensitive • B
- **TC-LOGIN-005** • Empty email/password • N
- **TC-LOGIN-006** • Logout • P

→ Details: [docs/test-cases/login.md](test-cases/login.md)

---

## 3) Shopping Cart
- **TC-CART-001** • Add item from listing • P
- **TC-CART-002** • Update quantity recalculates totals • P
- **TC-CART-003** • Zero quantity not allowed • N
- **TC-CART-004** • Max quantity boundary • B
- **TC-CART-005** • Remove item • P

→ Details: [docs/test-cases/cart.md](test-cases/cart.md)

---

## 4) Guest Checkout (Check / Money Order)
- **TC-CHK-001** • Guest checkout happy path • P
- **TC-CHK-002** • Invalid billing email • N
- **TC-CHK-003** • Required billing field empty • N
- **TC-CHK-004** • Max length address fields • B
- **TC-CHK-005** • Empty cart guard • N
- **TC-CHK-006** • Shipping cost reflected in total • P
- **TC-CHK-007** • Invalid ZIP format • N

→ Details: [docs/test-cases/checkout-guest.md](test-cases/checkout-guest.md)
