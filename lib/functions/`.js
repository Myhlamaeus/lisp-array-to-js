var quote = require("../tools/quote");

module.exports = function(val) {
    if(typeof(val) === "string") {
        return quote(val);
    }
    return JSON.stringify(val);
};
