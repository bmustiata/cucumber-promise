
/**
 * ModuleWrapper - Wraps the given steps function, and provides a this object that can handle promises.
 * @param {Function} stepsFunction
 * @return {Function}
 */
function ModuleWrapper(stepsFunction) {
    var cucumberWrapper;

    return function() {
        cucumberWrapper = new CucumberWrapper(this);

        return stepsFunction.apply(cucumberWrapper, arguments);
    }
}
