# Guest Checkout (Check / Money Order) — Test Cases (details)
- TC-CHK-001 • Guest checkout happy path • P
- TC-CHK-002 • Invalid billing email • N
- TC-CHK-003 • Required billing field empty • N
- TC-CHK-004 • Max length address fields • B
- TC-CHK-005 • Empty cart guard • N
- TC-CHK-006 • Shipping cost reflected in total • P
- TC-CHK-007 • Invalid ZIP format • N

> Use structure: Pre / Data / Steps / ER

## TC-CHK-001 — [P] Guest checkout happy path

Preconditions:  
User is not logged in  
At least one product is added to the cart

Data:  
- Valid billing information  
- Valid shipping option (e.g., Ground)  
- Payment method: Check / Money Order

Steps:  
1) Add any product to the cart  
2) Open the cart: [https://nop-qa.portnov.com/cart](https://https://nop-qa.portnov.com/cart)  
3) Click "Checkout as Guest"  
4) Fill in billing details  
5) Choose shipping method  
6) Select "Check / Money Order" as payment  
7) Confirm the order

Expected:  
- Order is successfully placed  
- Confirmation page is displayed  
- Order number is shown

### Priority: P0

---

## TC-CHK-002 — [N] Invalid billing email

Preconditions:  
User is not logged in  
At least one product in cart

Data:  
- Invalid email format: `invalidemail`

Steps:  
1) Add product to cart and proceed to checkout as guest  
2) Enter all billing fields but use invalid email  
3) Attempt to continue checkout

Expected:  
- Email field is highlighted  
- Error message: “Wrong email” or similar appears  
- Cannot proceed until corrected

### Priority: P1

---

## TC-CHK-003 — [N] Required billing field empty

Preconditions:  
User is not logged in  
Cart is not empty

Data:  
- Leave one required field blank (e.g., City)

Steps:  
1) Start guest checkout  
2) Leave “City” field empty  
3) Try to proceed

Expected:  
- Validation error for the empty field  
- Checkout does not continue

### Priority: P1

---

## TC-CHK-004 — [B] Max length address fields

Preconditions:  
User is not logged in  
Cart has at least one product

Data:  
- Enter very long strings (e.g., 256+ characters) in Address, City, etc.

Steps:  
1) Start guest checkout  
2) Fill billing address with maximum allowed characters  
3) Try to continue

Expected:  
- Fields are either trimmed or trigger validation errors  
- Cannot proceed with invalid data

### Priority: P1

---

## TC-CHK-005 — [N] Empty cart guard

Preconditions:  
User is not logged in  
Cart is empty

Data:  
- N/A

Steps:  
1) Open [https://nop-qa.portnov.com/cart](https://nop-qa.portnov.com/cart)  
2) Click “Checkout”

Expected:  
- Checkout button is disabled or leads to message like “Your cart is empty”  
- Cannot start checkout without items

### Priority: P1

---

## TC-CHK-006 — [P] Shipping cost reflected in total

Preconditions:  
User is not logged in  
Product is in cart

Data:  
- Choose shipping method with visible fee (e.g., Next Day Air)

Steps:  
1) Begin guest checkout  
2) Select a shipping option with additional cost  
3) Proceed to payment and confirm order

Expected:  
- Shipping fee is displayed in order summary  
- Total amount includes product price + shipping  
- Order confirmation reflects correct total

### Priority: P1

---

## TC-CHK-007 — [N] Invalid ZIP format

Preconditions:  
User is not logged in  
Cart contains product

Data:  
- ZIP Code: `12` or `abcde`

Steps:  
1) Start guest checkout  
2) Enter invalid ZIP code  
3) Try to continue

Expected:  
- ZIP field is validated  
- Error message shown  
- Cannot proceed until fixed

### Priority: P1
