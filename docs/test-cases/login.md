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

