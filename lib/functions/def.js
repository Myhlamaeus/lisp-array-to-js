var quote = require("../tools/quote"),
    transpile = require("../transpile");

module.exports = function(name, val) {
    return "env[" + quote(name) + "] = " + transpile(val);
};
