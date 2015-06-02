Feature: Steps that don't have callbacks are executed synchronously
    If there no callback parameter to the function, then the step
    should be executed, and the result imediately used.

    Parameters for the expressions should be still passed as expected.

Scenario: Test no callback step
    Given I run a test with cucumber-promise
    When I call a step with a callback
    And I call a step with no parameters
    Then I should finish the test

Scenario: Parameters are passed on implementation steps
    Given I run a test with cucumber-promise
    When I call a step with two parameters: "a" and "b"
    Then I get two parameters "a" and "b"

Scenario: Parameters are passed for string implementation steps
    Given I run a test with cucumber-promise
    When I call a string step with two parameters: "a" and "b"
    And I call a string no callback step with two parameters: "c" and "d"
    Then I get four parameters "a", "b", "c" and "d"

Scenario: Parameters are passed on no callback steps
    Given I run a test with cucumber-promise
    When I call a no callback step with two parameters: "a" and "b"
    Then I get two parameters "a" and "b"

Scenario: Parameters are passed on both regular and no callback steps
    Given I run a test with cucumber-promise
    When I call a step with two parameters: "a" and "b"
    And I call a no callback step with two parameters: "c" and "d"
    Then I get four parameters "a", "b", "c" and "d"

