var _with = require("./with"),
    def = require("./def"),
    Expression = require("../tools/expression");

module.exports = function(vars, content) {
    var defs = [];
    vars.forEach(function(val, i) {
        if(i % 2) {
            defs.push(def(vars[i - 1], vars[i]));
        }
    }, this);
    return _with(new Expression("Object.create(env)"), defs.concat([content]));
};
