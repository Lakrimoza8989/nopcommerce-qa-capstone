Feature: Guest Checkout with Money Order

  Scenario: Guest user completes checkout using Check / Money Order
    Given the user navigates to the "Desktops" category page
    When the user clicks "Add to cart" on the first listed product
    And the user navigates to the shopping cart
    And the user agrees to the terms of service
    And the user clicks the "Checkout" button
    And the user selects "Checkout as Guest"
    And the user fills in the following billing information:
      | First Name | Anna     |
      | Last Name  | Ivanova  |
      | Email      | anna.guest@example.com |
      | Country    | United States |
      | City       | New York |
      | Address    | 123 Broadway |
      | ZIP Code   | 10001 |
      | Phone      | 1234567890 |
    And the user continues to the shipping method step
    And the user selects "Ground" shipping
    And the user continues to the payment method step
    And the user selects "Check / Money Order" as the payment method
    And the user continues to the payment information step
    And the user continues to the confirm order step
    Then the user should see the message "Your order has been successfully processed!"
    And the user should land on the order confirmation page
