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
[https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)

Data:  
- Gender: Female  
- First Name: Anna  
- Last Name: Ivanova  
- Email: `user001@example.com` (unique)  
- Password: `Qwerty123!`  
- Confirm Password: `Qwerty123!`

Steps:  
1) Open [https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)  
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
[https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)  
An account with email `user001@example.com` already exists in the system.

Data:  
- Gender: Male  
- First Name: John  
- Last Name: Smith  
- Email: `user001@example.com` (already registered)  
- Password: `Qwerty123!`  
- Confirm Password: `Qwerty123!`

Steps:  
1) Open [https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)  
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

---

## TC-REG-003 — [N] Invalid email format

Preconditions:  
The user is logged out. Registration page is open:  
[https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)

Data:  
- Gender: Male  
- First Name: Alex  
- Last Name: Turner  
- Email: `invalid-email-format` (missing @ and domain)  
- Password: `Qwerty123!`  
- Confirm Password: `Qwerty123!`

Steps:  
1) Open [https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)  
2) Select gender: Male  
3) Fill in First Name and Last Name  
4) Enter invalid email: `invalid-email-format`  
5) Enter password and confirm password  
6) Click the "REGISTER" button

Expected:  
- A validation error appears under the email field  
- The message may say: “Wrong email” or similar  
- Registration is not completed  
- The user remains on the registration page

### Priority: P1

---

## TC-REG-004 — [N] Empty required fields

Preconditions:   
The user is logged out. Registration page is open:  
[https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)

Data:  
- Leave all fields empty (no input provided)

Steps:  
1) Open [https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)  
2) Click the "REGISTER" button without filling any fields

Expected:  
- Validation messages appear under each required field  
- The messages may include:  
  - “First name is required”  
  - “Last name is required”  
  - “Email is required”  
  - “Password is required”  
  - “Password is required” (again for confirmation)  
- Registration is not completed  
- The user remains on the registration page

Priority: P1

---

## TC-REG-005 — [N] Password mismatch

Preconditions:  
The user is logged out. Registration page is open:  
[https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)

Data:  
- Gender: Female  
- First Name: Emma  
- Last Name: Davis  
- Email: `emma.davis@example.com` (unique)  
- Password: `Qwerty123!`  
- Confirm Password: `WrongPassword!`

Steps:  
1) Open [https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)  
2) Select gender: Female  
3) Fill in First Name, Last Name, and Email  
4) Enter password and confirm with a mismatched value  
5) Click the "REGISTER" button

Expected:  
- An error message appears below the password confirmation field  
- Example message: “The password and confirmation password do not match.”  
- Registration is not completed  
- The user remains on the registration page

### Priority: P1

---

## TC-REG-006 — [B] Min/Max password length

Preconditions:  
The user is logged out. Registration page is open:  
[https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)

Data:  
- First Name: Alan  
- Last Name: Brooks  
- Email: `alan.brooks@example.com`  
- Test passwords:  
  - Too short: `123`  
  - Too long: `ThisIsAVeryVeryLongPasswordThatShouldFail`  
  - Valid: `Qwerty123!`  

Steps:  
1) Open [https://nop-qa.portnov.com/register](https://nop-qa.portnov.com/register)  
2) Fill in First Name, Last Name, and Email  
3) Enter test passwords (one by one):
   - Case 1: use short password `123`  
   - Case 2: use very long password  
   - Case 3: use valid password `Qwerty123!`  
4) Click "REGISTER" in each case

Expected:  
- Case 1: Error message like “Password must meet the minimum length”  
- Case 2: Error message like “Password must not exceed the maximum length”  
- Case 3: Registration is successful

### Priority: P1
