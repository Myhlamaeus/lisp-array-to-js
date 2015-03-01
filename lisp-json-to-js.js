/* jshint node: true */

var stmts = require("./lib/tools/stmts"),
    iife = require("./lib/tools/iife"),
    transpile = require("./lib/transpile");

function transpileProgram(val) {
    return stmts([iife([transpile(val)], ["env"], ["Object.create(null)"])]);
}

module.exports = transpileProgram;
transpileProgram.transpile = transpile;
transpileProgram.exec = function(arr) {
    /* jshint evil: true */
    return eval(this(arr));
};
