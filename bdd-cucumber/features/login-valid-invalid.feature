Feature: User Login

  Scenario: Successful login with valid credentials
    Given the user is on the Login page
    When the user enters email "user001@example.com"
    And enters password "Qwerty123!"
    And clicks the "Log in" button
    Then the user should be logged in
    And the account link should be visible
    And the user should be redirected to the homepage

  Scenario: Login fails with wrong password
    Given the user is on the Login page
    When the user enters email "user001@example.com"
    And enters password "WrongPass123!"
    And clicks the "Log in" button
    Then an error message "Login was unsuccessful" should be displayed
    And the user should remain on the Login page
