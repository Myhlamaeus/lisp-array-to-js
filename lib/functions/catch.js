var wrap = require("../tools/wrap"),
    _let = require("./let");

module.exports = function(varName, content) {
    return wrap("catch(__e) {",
            _let([varName, "__e"], content),
        "}");
};
