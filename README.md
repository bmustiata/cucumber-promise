# cucumber-promise

Backwards compatible cucumber promise support.

Just wrap your previous implementation step function
into the `cucumber-promise`'s `cpromise`.

# Usage

```javascript
var cpromise = require("cucumber-promise").cpromise;

module.exports = cpromise(function() {
    // the old way works
    this.Given(/^I run a test with cucumber\-promise$/, function(callback) {
        callback();
    });

    // code without callbacks works
    this.Then(/^I run code without callbacks$/, function() {
        // if no callback it's present, this also works
    });

    // and promises also work
    this.Then(/^I run a promise call$/, function() {
        return new Promise(function(fulfill, reject) {
            // promise resolving
            fulfill();
        });
    });
});
```

## Install

In order to install this just run:

```sh
npm install --save-dev cucumber-promise
```

