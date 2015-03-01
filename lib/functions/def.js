var quote = require("../tools/quote"),
    transpile = require("../transpile"),
    Expression = require("../tools/expression");

module.exports = function(name, val) {
    return new Expression("env[" + quote(name) + "] = " + transpile(val));
};
