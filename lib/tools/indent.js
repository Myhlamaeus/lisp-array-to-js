var Expression = require("./expression");

module.exports = function indent(str) {
    if(typeof(str) === "object" && str instanceof Expression) {
        return new Expression(indent(str.val));
    }
    return "    " + str.replace(/\n/g, "\n    ");
};
