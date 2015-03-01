var iife = require("../tools/iife"),
    transpile = require("../transpile"),
    def = require("./def");

module.exports = function(vars, content) {
    var defs = [];
    vars.forEach(function(val, i) {
        if(i % 2) {
            defs.push(def(vars[i - 1], vars[i]));
        }
    }, this);
    return iife(defs.concat([transpile(content)]), ["env"], ["Object.create(env)"]);
};
