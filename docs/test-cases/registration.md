# Registration — Test Cases (details)
- TC-REG-001 • New account (valid) • P
- TC-REG-002 • Existing email • N
- TC-REG-003 • Invalid email format • N
- TC-REG-004 • Empty required fields • N
- TC-REG-005 • Password mismatch • N
- TC-REG-006 • Min/Max password length • B

> Use structure: Pre / Data / Steps / ER / P

## TC-REG-001 — New account (valid)

Priority: P0

Preconditions —  
The user is logged out. Registration page is open:  
[https://demo.nopcommerce.com/register](https://demo.nopcommerce.com/register)

Data —  
- Gender: Female  
- First Name: Anna  
- Last Name: Ivanova  
- Email: `user001@example.com` (unique)  
- Password: `Qwerty123!`  
- Confirm Password: `Qwerty123!`

Steps —  
1) Open [https://demo.nopcommerce.com/register](https://demo.nopcommerce.com/register)  
2) Select gender: Female  
3) Fill in First Name and Last Name fields  
4) Enter email address  
5) Enter password and confirm password  
6) Click the "REGISTER" button

Expected —  
- A success message “Your registration completed” is displayed  
- The user is automatically logged in  
- The user is redirected to the homepage
