# cucumber-promise

Backwards compatible cucumber promise support.

_All these features are implemented in the core `cucumber` starting with
version `0.5.0`. If you are using it you don't need `cucumber-promise` anymore_

## Usage

Just wrap your implementation steps function into `cpromise`, and
use promises, or implement steps without explicitly calling the
callback function.

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

