var prefixToInfix = require("./tools/prefix-to-infix");

module.exports = {
    js: require("./functions/js"),
    def: require("./functions/def"),
    let: require("./functions/let"),
    "`": require("./functions/`"),
    try: require("./functions/try"),
    catch: require("./functions/catch"),
    ".-": require("./functions/.-"),
    ".": require("./functions/..js"),
    do: require("./functions/do"),
    if: require("./functions/if"),
    fn: require("./functions/fn"),
    "=": require("./functions/="),
    with: require("./functions/with"),
    import: require("./functions/import"),
    export: require("./functions/export")
};

function defPrefixToInfix(operand, maxArgs) {
    module.exports[operand] = prefixToInfix(operand, maxArgs);
}

["<", "+", "-", "*", "/", "%"].forEach(function(symbol) {
    defPrefixToInfix(symbol);
});
