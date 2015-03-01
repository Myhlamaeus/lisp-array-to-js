var Expression = require("./expression"),
    transpile = require("../transpile");

module.exports = function(operand, maxArgs) {
    maxArgs = maxArgs || 2;
    return function() {
        return new Expression([].slice.call(arguments, 0, maxArgs).map(transpile).join(" " + operand + " "));
    };
};
