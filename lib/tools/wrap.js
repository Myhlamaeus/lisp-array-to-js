var indent = require("./indent");

module.exports = function(str1, str2, str3) {
    return str1 + "\n" + indent(str2) + "\n" + str3;
};
