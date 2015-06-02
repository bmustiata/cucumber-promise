/**
 * CucumberWrapper - Wraps the cucumber runner, and allows using promises.
 * @type {CucumberWrapper}
 */
var CucumberWrapper = createClass("CucumberWrapper", {
	_cucumberInstance : null,

    /**
     * constructor - default constructor.
     * @param {Cucumber} cucumberInstance
	 */
    constructor: function(cucumberInstance) {
        this._cucumberInstance = cucumberInstance;
    },

    /**
     * Given - Delegates the Given call.
     * @return {any}
     */
    Given : function() {
        return this.defineStep.apply(this, arguments);
    },

    /**
     * When - Delegates the when call.
     * @return {any}
     */
    When : function() {
        return this.defineStep.apply(this, arguments);
    },

    /**
     * Then - Delegates the Then call.
     * @return {any}
     */
    Then : function() {
        return this.defineStep.apply(this, arguments);
    },

    /**
     * Before - Delegates the Before call.
     * @return {any}
     */
    Before : function() {
        var result = this._cucumberInstance.Before.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * After - Delegates the After call.
     * @return {any}
     */
    After : function() {
        var result = this._cucumberInstance.After.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * registerListener - Delegates the register listener call.
     * @return {any}
     */
    registerListener : function() {
        var result = this._cucumberInstance.registerListener.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * registerHandler - Delegates the register handler call.
     * @return {any}
     */
    registerHandler : function() {
        var result = this._cucumberInstance.registerHandler.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * World - Delegates the world call.
     * @return {any}
     */
    World : function() {
        var result = this._cucumberInstance.World.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * BeforeFeatures - Delegates the before features call.
     * @return {any}
     */
    BeforeFeatures : function() {
        var result = this._cucumberInstance.BeforeFeatures.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * BeforeFeature - Delegates the before feature call.
     * @return {any}
     */
    BeforeFeature : function() {
        var result = this._cucumberInstance.BeforeFeature.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * Background - Delegates the Background call.
     * @return {any}
     */
    Background : function() {
        var result = this._cucumberInstance.Background.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * BeforeScenario - Delegates the before scenario call.
     * @return {any}
     */
    BeforeScenario : function() {
        var result = this._cucumberInstance.BeforeScenario.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * BeforeStep - Delegates the before step.
     * @return {any}
     */
    BeforeStep : function() {
        var result = this._cucumberInstance.BeforeStep.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * StepResult - Delegates the step result
     * @return {any}
     */
    StepResult : function() {
        var result = this._cucumberInstance.StepResult.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * AfterStep - Delegates the after step result.
     * @return {any}
     */
    AfterStep : function() {
        var result = this._cucumberInstance.AfterStep.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * AfterScenario - Delegates the after scenario.
     * @return {any}
     */
    AfterScenario : function() {
        var result = this._cucumberInstance.AfterScenario.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * AfterFeature - Delegates the after feature.
     * @return {any}
     */
    AfterFeature : function() {
        var result = this._cucumberInstance.AfterFeature.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * AfterFeatures - Delegates the after features.
     * @return {any}
     */
    AfterFeatures : function() {
        var result = this._cucumberInstance.AfterFeatures.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * Around - Delegates the Around call.
     * @return {any}
     */
    Around : function() {
        var result = this._cucumberInstance.Around.apply(this._cucumberInstance, arguments);
        return result;
    },

    /**
     * defineStep - Delegates the defineStep call.
     * @return {any}
     */
    defineStep : function(re, implementationFunction) {
        if (!this._hasCallbackMethod(re, implementationFunction)) {
            var oldStepImplementation = implementationFunction;

            implementationFunction = function NoCallbackWrapper() {
                // the callback it's the last argument.
                var result,
                    callback = arguments[ arguments.length - 1 ];

                try {
                    result = oldStepImplementation.apply(this, arguments);
                } catch(e) {
                    result = Promise.reject(e);
                }

                // do the promise resolving, and then call teh callback
                Promise.resolve(result).then(function(data) {
                    callback();
                }, function(e) {
                    callback.fail(e);
                });
            }
        }

        var result = this._cucumberInstance.defineStep.apply(this._cucumberInstance, [re, implementationFunction]);
        return result;
    },

    /**
     * _hasCallbackMethod - Checks if in the given arguments, there is a
     * callback method definition.
     * @param {string|RegExp} re The step expression.
     * @param {Function} implementationFunction The implementation function for the test.
     * @return {boolean}
     */
    _hasCallbackMethod : function(re, implementationFunction) {
        var args = ReflectionUtil.functionParameters(implementationFunction);

        if (typeof re == "string") {
            return args.length >= re.split("$").length;
        }

        var reExpression = "" + re;
        var regExpGroupCounter = new RegExpGroupCounter(reExpression);

        return args.length > regExpGroupCounter.getGroupCount();
    },
});

