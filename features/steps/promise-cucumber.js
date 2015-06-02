var cpromise = require("../../lib/cucumber-promise.js").cpromise,
    Promise = require("blinkts-lang").lang.Promise,
    assert = require('assert');

module.exports = cpromise(function() {
    /**
     * This checks that all the members with the same type exist on the
     * wrapper for the cucumber, so existin tests will work fine.
     */
    for (var k in this._cucumberInstance) {
        var cucumberType = typeof this._cucumberInstance[k];

        if (typeof this[k] == "undefined") {
            assert.ok(false, "Property " + k +
                        " exists on cucumber but is not defined on the wrapper.");
        }

        if (cucumberType != typeof this[k]) {
            assert.ok(false, "Property " + k +
                        " exists on both the cucumber object, and its associated wrapper," +
                        " but it has the `" + cucumberType +
                        "` type on the cucumber object and the `" + typeof this[k] +
                        "` type on the wrapper.");
        }
    }

    /**
     * Calling a promise step.
     * @CucumberPromise
     */
    this.When(/^I call a promise step with parameters "([^"]*)" and "([^"]*)"$/, function (a, b) {
        return new Promise(function(fulfill, reject) {
            this[a] = 1;
            this[b] = 1;

            fulfill();
        }.bind(this));
    });

    /**
     * Calling a promise that will have its code resolved after some delay.
     * @CucumberPromise
     */
    this.When(/^I call a promise step with parameters "([^"]*)" and "([^"]*)" after (\d+)ms$/, function (a, b, delay) {
        return new Promise(function(fulfill, reject) {
            setTimeout(function() {
                this[a] = 1;
                this[b] = 1;

                fulfill();
            }.bind(this), delay);
        }.bind(this));
    });

    /**
     * I can just set values on it.
     */
    this.When(/^I get a 'this' object in a regular cucumber step$/, function (callback) {
        var context = this;

        context._thisFound = true;

        callback();
    });

    /**
     * And I can read them just fine.
     */
    this.Then(/^I have the same properties for the 'this' object in the cucumber\-promise step$/, function (callback) {

        var context = this;

        assert.ok(context);
        assert.ok(context._thisFound);
        assert.ok(!context._thisNotFound);

        callback();
    });

    /**
     * Return a rejected promise.
     * @CucumberPromise
     */
    this.When(/^I call a promise that is rejected$/, function () {
        return Promise.reject(new Error("rejected"));
    });

    this.Then(/^the test failed$/, function () {
        assert.ok(false, "not reachable");
    });

});
