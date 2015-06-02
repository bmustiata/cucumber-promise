
var cpromise = require("../../lib/cucumber-promise.js").cpromise,
    assert = require("assert");

module.exports = cpromise(function() {
    /**
     * This just checks that cpromise loads.
     */
    this.Given(/^I run a test with cucumber\-promise$/, function (callback) {
        assert.ok(cpromise);
        callback();
    });

    /**
     * Just marks that a step that had callbacks was called
     * setting the `_callbackStepCalled` property on the current
     * context.
     */
    this.When(/^I call a step with a callback$/, function (callback) {
        this._callbackStepCalled = true;
        callback();
    });

    /**
     * Just marks that a step that has no parameters was called
     * setting the `_noCallbackStepCalled` proeprty on the current
     * context.
     *
     * @CucumberPromise This can run only in cucumber promise.
     */
    this.When(/^I call a step with no parameters$/, function() {
        this._noCallbackStepCalled = true;
    });

    this.When("I call a string step with two parameters: \"$a\" and \"$b\"", function (a, b, callback) {
        this[a] = 1;
        this[b] = 1;

        callback();
    });

    this.When("I call a string no callback step with two parameters: \"$a\" and \"$b\"", function (a, b) {
        this[a] = 1;
        this[b] = 1;
    });

    /**
     * Marks that values in the context that the parameters were
     * correctly received by the defined step.
     */
    this.When(/^I call a step with two parameters: "([^"]*)" and "([^"]*)"$/, function (a, b, callback) {
        this[a] = 1;
        this[b] = 1;

        callback();
    });

    /**
     * Checks if the given parameters are defined in the context.
     */
    this.Then(/^I get two parameters "([^"]*)" and "([^"]*)"$/, function (a, b, callback) {
        assert.ok(this[a], 'Parameter ' + a + ' should be defined');
        assert.ok(this[b], 'Parameter ' + b + ' should be defined');

        callback();
    });

    /**
     * Marks that values in the context that the parameters were
     * correctly received by the defined step.
     * @CucumberPromise
     */
    this.When(/^I call a no callback step with two parameters: "([^"]*)" and "([^"]*)"$/, function (a, b) {
        this[a] = 1;
        this[b] = 1;
    });

    /**
     * Checks if the given four arguments are present in the context.
     */
    this.Then(/^I get four parameters "([^"]*)", "([^"]*)", "([^"]*)" and "([^"]*)"$/, function (a, b, c, d, callback) {
        assert.ok(this[a], 'Parameter ' + a + ' should be defined');
        assert.ok(this[b], 'Parameter ' + b + ' should be defined');
        assert.ok(this[c], 'Parameter ' + c + ' should be defined');
        assert.ok(this[d], 'Parameter ' + d + ' should be defined');

        callback();
    });

    /**
     * Checks if the callback step and the no callback step are marked
     * in the current context as executed.
     */
    this.Then(/^I should finish the test$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        assert.ok(this._callbackStepCalled);
        assert.ok(this._noCallbackStepCalled);

        callback();
    });
});

