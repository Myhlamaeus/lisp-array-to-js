var Expression = require("../tools/expression"),
    transpile = require("../transpile");

module.exports = function(a, b) {
    return new Expression(transpile(a) + " === " + transpile(b));
};
