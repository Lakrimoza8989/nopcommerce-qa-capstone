Feature: User Registration

  Scenario: Successful registration with valid data
    Given the user is on the Registration page
    When the user selects gender "Female"
    And enters First Name "Anna"
    And enters Last Name "Ivanova"
    And enters unique email "user001@example.com"
    And enters password "Qwerty123!"
    And confirms password "Qwerty123!"
    And clicks the "Register" button
    Then the message "Your registration completed" should be displayed
    And the user should be logged in
    And the user should be redirected to the homepage
