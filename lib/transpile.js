var quote = require("./tools/quote"),
    functions;

module.exports = function transpile(val) {
    if(typeof(val) === "string") {
        return "env[" + quote(val) + "]";
    }
    if(typeof(val) !== "object") {
        return JSON.stringify(val);
    }
    if(!Array.isArray(val)) {
        return val;
    }

    if(val[0] in functions) {
        if(typeof(functions[val[0]]) !== "function") {
            console.log(val[0]);
        }
        return functions[val[0]].apply(functions, val.slice(1));
    }
    val = val.map(transpile);
    return val[0] + "(" + val.slice(1).join(", ") + ")";
};

functions = require("./functions");
