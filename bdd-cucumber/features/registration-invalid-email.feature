Feature: User Registration

  Scenario: Registration fails with invalid email format
    Given the user is on the Registration page
    When the user selects gender "Female"
    And enters First Name "Anna"
    And enters Last Name "Ivanova"
    And enters invalid email "invalid-email-format"
    And enters password "Qwerty123!"
    And confirms password "Qwerty123!"
    And clicks the "Register" button
    Then an error message about invalid email should be displayed
    And the user should not be registered
    And the user should remain on the Registration page
