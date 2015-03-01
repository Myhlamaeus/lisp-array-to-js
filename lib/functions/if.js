var indent = require("../tools/indent"),
    transpile = require("../transpile");

module.exports = function(cond, truthy, falsy) {
    return "((" + transpile(cond) + ")\n" +
            indent("? " + transpile(truthy)) + "\n" +
            indent(": " + transpile(falsy)) + ")";
};
