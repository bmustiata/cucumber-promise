/**
 * ReflectionUtil - Utility methods for reflection.
 * @type {ReflectionUtil}
 */
var ReflectionUtil = createClass("ReflectionUtil", {
}, {
    /**
     * functionParameters - Returns the parameter names in an array of the given function.
     * @param {Function} fn
     * @return {Array<string>}
     */
    functionParameters : function(fn) {
        var result = [];

        if (!fn) {
            return result;
        }

        var m = /^\s*function[^(]*?\((.*?)\).*$/m.exec(fn.toString());

        if (m) {
            var paramsToken = m[1].split(/\s*,\s*/);

            for (var i = 0; i < paramsToken.length; i++) {
                var item = paramsToken[i];

                if (/^\s*$/.test(item)) { // empty parameter
                    continue;
                }

                result.push(item);
            }
        }

        return result;
    }
});
