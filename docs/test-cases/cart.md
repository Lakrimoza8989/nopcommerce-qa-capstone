# Shopping Cart — Test Cases (details)
- TC-CART-001 • Add item from listing • P
- TC-CART-002 • Update quantity recalculates totals • P
- TC-CART-003 • Zero quantity not allowed • N
- TC-CART-004 • Max quantity boundary • B
- TC-CART-005 • Remove item • P

> Use structure: Pre / Data / Steps / ER

## TC-CART-001 — [P] Add item from listing

Preconditions:  
User is logged in  
Homepage is open or category page (e.g., [https://nop-qa.portnov.com/desktops](https://nop-qa.portnov.com/desktops))

Data:  
- Any in-stock product that has an "Add to cart" button

Steps:  
1) Open category page (e.g., Desktops)  
2) Click "Add to cart" on any product directly from listing  
3) Click on the cart icon in the top menu

Expected:  
- Product appears in the cart  
- Quantity is 1  
- Subtotal reflects the correct price  
- Success message like “The product has been added to your shopping cart” is shown

### Priority: P0

---

## TC-CART-002 — [P] Update quantity recalculates totals

Preconditions:  
User is logged in  
At least one product is already added to the cart

Data:  
- Existing cart item  
- New quantity: 3

Steps:  
1) Open the shopping cart page: [https://nop-qa.portnov.com/cart](https://nop-qa.portnov.com/cart)  
2) Change quantity of an item to 3  
3) Click the "Update shopping cart" button

Expected:  
- Quantity is updated to 3  
- Subtotal updates accordingly (Price × 3)  
- No errors appear

### Priority: P0

---

## TC-CART-003 — [N] Zero quantity not allowed

Preconditions:  
User is logged in  
At least one product is in the cart

Data:  
- Set quantity to `0`

Steps:  
1) Open the shopping cart page: [https://nop-qa.portnov.com/cart](https://nop-qa.portnov.com/cart)  
2) Set item quantity to `0`  
3) Click "Update shopping cart"

Expected:  
- Error message appears: “Quantity must be greater than zero” or similar  
- Quantity remains unchanged  
- Cart is not updated with zero quantity

### Priority: P1

---

## TC-CART-004 — [B] Max quantity boundary

Preconditions:  
User is logged in  
Product that allows bulk quantity is in the cart

Data:  
- Set quantity to maximum allowed (e.g., `100`)  
- Or attempt to enter an extremely high number (e.g., `9999`)

Steps:  
1) Open the cart page: [https://nop-qa.portnov.com/cart](https://nop-qa.portnov.com/cart)  
2) Change quantity of item to a large value  
3) Click "Update shopping cart"

Expected:  
- If within limit: cart updates successfully  
- If exceeds limit: error/warning appears  
- Subtotal should match updated quantity (if accepted)

### Priority: P1

---

## TC-CART-005 — [P] Remove item

Preconditions:  
User is logged in  
At least one product is present in the cart

Data:  
- N/A

Steps:  
1) Open the cart page: [https://nop-qa.portnov.com/cart](https://nop-qa.portnov.com/cart)  
2) Check the "Remove" checkbox next to the product  
3) Click "Update shopping cart"

Expected:  
- Product is removed from the cart  
- Cart becomes empty if it was the only item  
- Subtotal is updated  
- Success message may be shown or cart updates silently

### Priority: P0

