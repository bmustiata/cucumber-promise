var RegExpGroupCounter =  require("../../lib/cucumber-promise.js").RegExpGroupCounter,
    assert = require('assert');

module.exports = function() {
    /**
     * Stores the expression in the context.
     * @param {string} reExpression The regular expression to store.
     * @param {Function} callback cucumber callback.
     */
    this.defineStep(/^the regexp (.*)/, function(reExpression, callback) {
        this._re = reExpression;

        callback();
    });

    /**
     * Call the RegExpGroupCounter, that does the actual group counting with a minimal
     * "grammar" like approach.
     * @param {Function} callback cucumber callback
     */
    this.When(/^I count the groups$/, function (callback) {
        assert.ok(this._re);

        this._reCount = new RegExpGroupCounter(this._re).getGroupCount();

        callback();
    });

    /**
     * Validate the result.
     * @param {string} count The count of expected items.
     * @param {Function} callback cucumber callback.
     */
    this.Then(/^I get (\d+)$/, function (count, callback) {
        assert.equal(this._reCount, parseInt(count));

        callback();
    });
};

