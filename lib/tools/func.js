var wrap = require("./wrap"),
    stmts = require("./stmts");

module.exports = function(content, args) {
    var execs = content.slice(),
        val = execs.pop();

    return wrap("(function(" + (args || []).join(", ") + ") {", stmts(execs.concat(["return " + val])), "})");
};
