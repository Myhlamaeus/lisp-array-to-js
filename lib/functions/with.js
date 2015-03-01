var iife = require("../tools/iife"),
    transpile = require("../transpile");

module.exports = function(scope, content) {
    return iife([transpile(content)], ["env"], [transpile(scope)]);
};
