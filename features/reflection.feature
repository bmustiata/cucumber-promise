Feature: Reflection should get information on functions
    When working with functions we want to be able.

Scenario Outline: No parameters are found.
    Given the code: <function_definition>
    When I get the function parameters
    Then it's an empty array
Examples:
    | function_definition |
    | function() {}       |
    | function( ){}       |
    | function (){}       |
    | function ( ){}      |
    | function A() {}     |
    | function A( ){}     |

Scenario Outline: Multi parameters functions.
    Given the code: <function_definition>
    When I get the function parameters
    Then it's the ["a", "b"] array
Examples:
    | function_definition |
    | function(a, b) {}   |
    | function(a,b) {}    |
    | function A(a,b) {}  |
    | function A(a, b) {} |

Scenario Outline: Single parameter functions.
    Given the code: <function_definition>
    When I get the function parameters
    Then it's the ["a"] array
Examples:
    | function_definition |
    | function(a) {}   |
    | function A(a) {}  |

Scenario: Multiple parameters with callbacks.
    Given the code:
        """
        function (a, b, callback) {
            assert.ok(this[a], 'Parameter ' + a + ' should be defined');
            assert.ok(this[b], 'Parameter ' + b + ' should be defined');

            callback();
        }
        """
    When I get the function parameters
    Then it's the ["a", "b", "callback"] array

