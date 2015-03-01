function Expression(val) {
    this.val = val;
}

Expression.prototype.toString = function() {
    return this.val;
};

module.exports = Expression;
