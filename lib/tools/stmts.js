module.exports = function(arr) {
    return arr.join(";\n") + (arr.length ? ";" : "");
};
