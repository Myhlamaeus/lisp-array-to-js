var transpile = require("../transpile");

module.exports = function(obj, name) {
    return this[".-"](obj, name) + "(" + [].slice.call(arguments, 2).map(transpile).join(", ") + ")";
};
