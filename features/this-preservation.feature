Feature: The this context emulates the cucumber one.
    The this parameter represents the execution context across
    cucumber steps. Thus it must be available across regular
    cucumber and promise-cucumber steps.

    Internally when reading the module, this will check that
    the cucumber wrapper and the cucmber itself has the same
    properties with the same type, so there isn't new functionality
    that is not covered in the wrapper.

Scenario: Calling this methods is the same
    Given I run a test with cucumber-promise
    When I get a 'this' object in a regular cucumber step
    Then I have the same properties for the 'this' object in the cucumber-promise step

