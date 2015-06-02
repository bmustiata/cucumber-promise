Feature: Having return values as promises, when no callbacks
    will default them to promise use.

Scenario: Test promise step
    Given I run a test with cucumber-promise
    When I call a promise step with parameters "a" and "b"
    Then I get two parameters "a" and "b"

Scenario: Test promise resolved with a delay
    Given I run a test with cucumber-promise
    When I call a promise step with parameters "a" and "b" after 10ms
    Then I get two parameters "a" and "b"

