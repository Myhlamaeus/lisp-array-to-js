var Expression = require("../tools/expression"),
    transpile = require("../transpile");

module.exports = function(content) {
    var expr = "module.exports";
    if(arguments.length > 1) {
        expr += "[" + transpile(arguments[0]) + "]";
        content = arguments[1];
    }
    return new Expression(expr + " = " + transpile(content));
};
