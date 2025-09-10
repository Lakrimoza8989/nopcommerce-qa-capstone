# Login / Logout — Test Cases (details)
- TC-LOGIN-001 • Valid login • P
- TC-LOGIN-002 • Wrong password • N
- TC-LOGIN-003 • Unregistered email • N
- TC-LOGIN-004 • Email case-insensitive • B
- TC-LOGIN-005 • Empty email/password • N
- TC-LOGIN-006 • Logout • P

> Use structure: Pre / Data / Steps / ER / P  

## TC-LOGIN-001 — [P] Valid login

Preconditions:  
User has a registered account with the following credentials:  
- Email: `user001@example.com`  
- Password: `Qwerty123!`  
User is logged out.  
Login page is open:  
[https://demo.nopcommerce.com/login?returnUrl=%2Fdesktops](https://demo.nopcommerce.com/login?returnUrl=%2Fdesktops)

Data:  
- Email: `user001@example.com`  
- Password: `Qwerty123!`

Steps:  
1) Open [https://demo.nopcommerce.com/login?returnUrl=%2Fdesktops](https://demo.nopcommerce.com/login?returnUrl=%2Fdesktops)  
2) Enter valid email and password  
3) Click the "LOG IN" button

Expected:  
- Login is successful  
- “Log out” and “My account” links appear in the header  
- The user is redirected to `/desktops` page (or remains there if opened directly)  
- No error messages are displayed

Priority: P0

---

## TC-LOGIN-002 — [N] Wrong password

Preconditions:  
The user has a registered account:  
- Email: `user001@example.com`  
- Password: `Qwerty123!`  
User is logged out. Login page is open:  
[https://demo.nopcommerce.com/login](https://demo.nopcommerce.com/login)

Data:  
- Email: `user001@example.com`  
- Password: `WrongPass123!`

Steps:  
1) Open [https://demo.nopcommerce.com/login](https://demo.nopcommerce.com/login)  
2) Enter valid email and incorrect password  
3) Click the "LOG IN" button

Expected:  
- An error message appears: “Login was unsuccessful. Please correct the errors and try again.”  
- User is not logged in  
- User remains on the login page

### Priority: P1

---

## TC-LOGIN-003 — [N] Unregistered email

Preconditions:  
The user is logged out. Login page is open:  
[https://demo.nopcommerce.com/login](https://demo.nopcommerce.com/login)

Data:  
- Email: `not.registered@example.com`  
- Password: `Qwerty123!`

Steps:  
1) Open [https://demo.nopcommerce.com/login](https://demo.nopcommerce.com/login)  
2) Enter unregistered email and any password  
3) Click the "LOG IN" button

Expected:  
- An error message appears: “Login was unsuccessful. Please correct the errors and try again.”  
- User is not logged in  
- User remains on the login page

### Priority: P1

---

## TC-LOGIN-004 — [B] Email case-insensitive

Preconditions:  
The user has a registered account with email: `user001@example.com`  
User is logged out. Login page is open:  
[https://demo.nopcommerce.com/login](https://demo.nopcommerce.com/login)

Data:  
- Email: `USER001@EXAMPLE.COM` (uppercase variant)  
- Password: `Qwerty123!`

Steps:  
1) Open [https://demo.nopcommerce.com/login](https://demo.nopcommerce.com/login)  
2) Enter the same email but in uppercase  
3) Enter correct password  
4) Click the "LOG IN" button

Expected:  
- Login is successful  
- User is recognized regardless of email case  
- “Log out” and “My account” appear

### Priority: P1

---

## TC-LOGIN-005 — [N] Empty email/password

Preconditions:  
User is logged out. Login page is open:  
[https://demo.nopcommerce.com/login](https://demo.nopcommerce.com/login)

Data:  
- Email: (empty)  
- Password: (empty)

Steps:  
1) Open [https://demo.nopcommerce.com/login](https://demo.nopcommerce.com/login)  
2) Leave both email and password fields empty  
3) Click the "LOG IN" button

Expected:  
- Validation errors appear:  
  - “Please enter your email”  
  - “Password is required”  
- Login is not performed  
- User remains on the login page

### Priority: P1

---

## TC-LOGIN-006 — [P] Logout

Preconditions:  
User is logged in with a valid account:  
- Email: `user001@example.com`  
- Password: `Qwerty123!`  
Homepage or any page is open

Data:  
N/A

Steps:  
1) Click on the "Log out" link in the top menu

Expected:  
- User is logged out successfully  
- “Log in” and “Register” links appear again  
- Session is cleared  
- User is redirected to the homepage

### Priority: P0

