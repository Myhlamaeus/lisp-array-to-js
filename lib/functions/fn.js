var Expression = require("../tools/expression"),
    func = require("../tools/func"),
    _let = require("./let");

module.exports = function(args, body) {
    return func(["var __args = arguments",
        _let(args.reduce(function(arr, name, i) {
            if(name !== "&") {
                arr.push(name, new Expression("__args[" + i + "]"));
            }
            return arr;
        }, []), body)]);
};
