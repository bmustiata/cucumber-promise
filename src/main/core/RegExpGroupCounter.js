/**
 * RegExpGroupCounter - Counts how many groups are defined in a regexp.
 * @type {RegExpGroupCounter}
 */
var RegExpGroupCounter = createClass("RegExpGroupCounter", {
	_re : null,
    _groupCount : 0,

    /**
     * constructor
     * @param {} re
	 */
    constructor: function(re) {
        this._re = re;

        var state = "NONE"; // can be NONE, ESCAPE, OPTION or OPTION_ESCAPE

        for (var i = 0; i < re.length; i++) {
            if (state == "NONE") {
                if (re[i] == "(") {
                    this._groupCount++;
                    continue;
                }

                if (re[i] == "\\") {
                    state = "ESCAPE";
                    continue;
                }

                if (re[i] == "[") {
                    state = "OPTION";
                    continue;
                }
            }

            if (state == "ESCAPE") { // whatever the char is, ignore it.
                state = "NONE";
                continue;
            }

            if (state == "OPTION") {
                if (re[i] == "]") {
                    state = "NONE";
                    continue;
                }

                if (re[i] == "\\") {
                    state = "OPTION_ESCAPE";
                    continue;
                }
            }

            if (state == "OPTION_ESCAPE") {
                state = "OPTION";
                continue;
            }
        }
    },

    /**
     * getGroupCount - Returns the number of groups in the parsed RE.
     * @return {number}
     */
    getGroupCount : function() {
        return this._groupCount;
    }
});
