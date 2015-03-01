var Expression = require("../tools/expression"),
    transpile = require("../transpile");

module.exports = function(name) {
    return new Expression("require(" + transpile(name) + ")");
};
