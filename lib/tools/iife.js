var func = require("./func");

module.exports = function(content, args, outerArgs) {
    return "(" + func(content, args) + ")(" + (outerArgs || []).join(", ") + ")";
};
