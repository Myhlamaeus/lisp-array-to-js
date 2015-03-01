function Quoted(str) {
    this.str = str;
}

Quoted.prototype.toString = function() {
    return JSON.stringify(String(this.str));
};

module.exports = function(str) {
    if(typeof(str) === "object" && str instanceof Quoted) {
        return str;
    }
    return new Quoted(str);
};
