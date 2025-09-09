# Registration — Test Cases (details)
- TC-REG-001 • New account (valid) • P
- TC-REG-002 • Existing email • N
- TC-REG-003 • Invalid email format • N
- TC-REG-004 • Empty required fields • N
- TC-REG-005 • Password mismatch • N
- TC-REG-006 • Min/Max password length • B

> Use structure: / Pre / Data / Steps / ER / P

## TC-REG-001 — [P] New account 

Preconditions:  
The user is logged out. Registration page is open:  
[https://demo.nopcommerce.com/register](https://demo.nopcommerce.com/register)

Data:  
- Gender: Female  
- First Name: Anna  
- Last Name: Ivanova  
- Email: `user001@example.com` (unique)  
- Password: `Qwerty123!`  
- Confirm Password: `Qwerty123!`

Steps:  
1) Open [https://demo.nopcommerce.com/register](https://demo.nopcommerce.com/register)  
2) Select gender: Female  
3) Fill in First Name and Last Name fields  
4) Enter email address  
5) Enter password and confirm password  
6) Click the "REGISTER" button

Expected:  
- A success message “Your registration completed” is displayed  
- The user is automatically logged in  
- The user is redirected to the homepage  

### Priority: P0  

---

## TC-REG-002 — [N] Existing email 



Preconditions:  
The user is logged out. Registration page is open:  
[https://demo.nopcommerce.com/register](https://demo.nopcommerce.com/register)  
An account with email `user001@example.com` already exists in the system.

Data:  
- Gender: Male  
- First Name: John  
- Last Name: Smith  
- Email: `user001@example.com` (already registered)  
- Password: `Qwerty123!`  
- Confirm Password: `Qwerty123!`

Steps:  
1) Open [https://demo.nopcommerce.com/register](https://demo.nopcommerce.com/register)  
2) Select gender: Male  
3) Fill in First Name and Last Name fields  
4) Enter already registered email address  
5) Enter password and confirm password  
6) Click the "REGISTER" button

Expected:  
- An error message is shown: “The specified email already exists”  
- Registration is not completed  
- The user remains on the registration page

### Priority: P1
