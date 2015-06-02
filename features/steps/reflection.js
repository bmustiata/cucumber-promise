var ReflectionUtil = require("../../lib/cucumber-promise.js").ReflectionUtil,
    assert = require('assert');


var myStepDefinitionsWrapper = function() {
    this.Given(/^the code:$/, function (functionDefinition, callback) {
        this._function = functionDefinition;
        callback();
    });

    this.Given(/^the code: (.*)$/, function (functionDefinition, callback) {
        this._function = functionDefinition;
        callback();
    });

    this.When(/^I get the function parameters$/, function (callback) {
        this._parameters = ReflectionUtil.functionParameters(this._function);

        callback();
    });

    this.Then(/^it's an empty array$/, function (callback) {
        assert.ok(this._parameters);
        assert.equal(this._parameters.length, 0);

        callback();
    });

    this.Then(/^it's the (.+?) array$/, function (jscode, callback) {
        var data = JSON.parse(jscode);
        assert.deepEqual(this._parameters, data);

        callback();
    });
};

module.exports = myStepDefinitionsWrapper;