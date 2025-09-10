Feature: Shopping Cart

  Scenario: Add item to cart from product listing
    Given the user is on the "Desktops" category page
    When the user clicks "Add to cart" for the first listed product
    Then the success message "The product has been added to your shopping cart" should be displayed
    And the cart icon should reflect the updated item count
