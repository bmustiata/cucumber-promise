Feature: Unit Test RegExpGroupCounter

Scenario: It should see there are no groups in empty regexps.
    Given the regexp /^nada$/
    When I count the groups
    Then I get 0

Scenario: It should count simple groups.
    Given the regexp /^Some (group) is (here)$/
    When I count the groups
    Then I get 2

Scenario: It should count nested groups.
    Given the regexp /Some (group is (here))/
    When I count the groups
    Then I get 2

Scenario: It should skip paranthesis that are escaped.
    Given the regexp /Some \(group is (here)\)/
    When I count the groups
    Then I get 1

Scenario: It should skip paranthesis that are inside multichar [] values
    Given the regexp /Some [()]group is (here)[^()]/
    When I count the groups
    Then I get 1

Scenario: It should allow escaping inside the group as well
    Given the regexp /Some [charlist\]is(here)] and a (group)/
    When I count the groups
    Then I get 1

