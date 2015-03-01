var quote = require("../tools/quote"),
    transpile = require("../transpile");

module.exports = function(obj, name, val) {
    var ret = "env[" + quote(obj) + "][" + quote(transpile(name)) + "]";
    if(arguments.length > 2) {
        ret += " = " + transpile(val);
    }
    return ret;
};
