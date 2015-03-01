var iife = require("../tools/iife"),
    transpile = require("../transpile");

module.exports = function() {
    return iife([].slice.call(arguments).map(transpile));
};
