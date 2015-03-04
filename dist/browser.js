(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.lispToArray = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./functions/.-":2,"./functions/..js":3,"./functions/=":4,"./functions/`":5,"./functions/catch":6,"./functions/def":7,"./functions/do":8,"./functions/export":9,"./functions/fn":10,"./functions/if":11,"./functions/import":12,"./functions/js":13,"./functions/let":14,"./functions/try":15,"./functions/with":16,"./tools/prefix-to-infix":21}],2:[function(require,module,exports){
var quote = require("../tools/quote"),
    transpile = require("../transpile");

module.exports = function(obj, name, val) {
    var ret = "env[" + quote(obj) + "][" + quote(transpile(name)) + "]";
    if(arguments.length > 2) {
        ret += " = " + transpile(val);
    }
    return ret;
};

},{"../tools/quote":22,"../transpile":25}],3:[function(require,module,exports){
var transpile = require("../transpile");

module.exports = function(obj, name) {
    return this[".-"](obj, name) + "(" + [].slice.call(arguments, 2).map(transpile).join(", ") + ")";
};

},{"../transpile":25}],4:[function(require,module,exports){
var Expression = require("../tools/expression"),
    transpile = require("../transpile");

module.exports = function(a, b) {
    return new Expression(transpile(a) + " === " + transpile(b));
};

},{"../tools/expression":17,"../transpile":25}],5:[function(require,module,exports){
var quote = require("../tools/quote");

module.exports = function(val) {
    if(typeof(val) === "string") {
        return quote(val);
    }
    return JSON.stringify(val);
};

},{"../tools/quote":22}],6:[function(require,module,exports){
var wrap = require("../tools/wrap"),
    _let = require("./let");

module.exports = function(varName, content) {
    return wrap("catch(__e) {",
            _let([varName, "__e"], content),
        "}");
};

},{"../tools/wrap":24,"./let":14}],7:[function(require,module,exports){
var quote = require("../tools/quote"),
    transpile = require("../transpile"),
    Expression = require("../tools/expression");

module.exports = function(name, val) {
    return new Expression("env[" + quote(name) + "] = " + transpile(val));
};

},{"../tools/expression":17,"../tools/quote":22,"../transpile":25}],8:[function(require,module,exports){
var iife = require("../tools/iife"),
    transpile = require("../transpile");

module.exports = function() {
    return iife([].slice.call(arguments).map(transpile));
};

},{"../tools/iife":19,"../transpile":25}],9:[function(require,module,exports){
var Expression = require("../tools/expression"),
    transpile = require("../transpile");

module.exports = function(content) {
    var expr = "module.exports";
    if(arguments.length > 1) {
        expr += "[" + transpile(arguments[0]) + "]";
        content = arguments[1];
    }
    return new Expression(expr + " = " + transpile(content));
};

},{"../tools/expression":17,"../transpile":25}],10:[function(require,module,exports){
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

},{"../tools/expression":17,"../tools/func":18,"./let":14}],11:[function(require,module,exports){
var indent = require("../tools/indent"),
    transpile = require("../transpile");

module.exports = function(cond, truthy, falsy) {
    return "((" + transpile(cond) + ")\n" +
            indent("? " + transpile(truthy)) + "\n" +
            indent(": " + transpile(falsy)) + ")";
};

},{"../tools/indent":20,"../transpile":25}],12:[function(require,module,exports){
var Expression = require("../tools/expression"),
    transpile = require("../transpile");

module.exports = function(name) {
    return new Expression("require(" + transpile(name) + ")");
};

},{"../tools/expression":17,"../transpile":25}],13:[function(require,module,exports){
module.exports = function(src) {
    return src;
};

},{}],14:[function(require,module,exports){
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

},{"../tools/expression":17,"./def":7,"./with":16}],15:[function(require,module,exports){
var wrap = require("../tools/wrap"),
    transpile = require("../transpile");

module.exports = function(src, ctch) {
    if(!Array.isArray(ctch) || ctch[0] !== "catch" || ctch.length !== 3) {
        throw new Error("Expects argument 1 of try to be a catch with length 3");
    }

    return wrap("try {",
            transpile(src),
        "} " + transpile(ctch));
};

},{"../tools/wrap":24,"../transpile":25}],16:[function(require,module,exports){
var iife = require("../tools/iife"),
    transpile = require("../transpile");

module.exports = function(scope, content) {
    return iife([transpile(content)], ["env"], [transpile(scope)]);
};

},{"../tools/iife":19,"../transpile":25}],17:[function(require,module,exports){
function Expression(val) {
    this.val = val;
}

Expression.prototype.toString = function() {
    return this.val;
};

module.exports = Expression;

},{}],18:[function(require,module,exports){
var wrap = require("./wrap"),
    stmts = require("./stmts");

module.exports = function(content, args) {
    var execs = content.slice(),
        val = execs.pop();

    return wrap("(function(" + (args || []).join(", ") + ") {", stmts(execs.concat(["return " + val])), "})");
};

},{"./stmts":23,"./wrap":24}],19:[function(require,module,exports){
var func = require("./func");

module.exports = function(content, args, outerArgs) {
    return func(content, args) + "(" + (outerArgs || []).join(", ") + ")";
};

},{"./func":18}],20:[function(require,module,exports){
var Expression = require("./expression");

module.exports = function indent(str) {
    if(typeof(str) === "object" && str instanceof Expression) {
        return new Expression(indent(str.val));
    }
    return "    " + str.replace(/\n/g, "\n    ");
};

},{"./expression":17}],21:[function(require,module,exports){
var Expression = require("./expression"),
    transpile = require("../transpile");

module.exports = function(operand, maxArgs) {
    maxArgs = maxArgs || 2;
    return function() {
        return new Expression([].slice.call(arguments, 0, maxArgs).map(transpile).join(" " + operand + " "));
    };
};

},{"../transpile":25,"./expression":17}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
module.exports = function(arr) {
    return arr.join(";\n") + (arr.length ? ";" : "");
};

},{}],24:[function(require,module,exports){
var indent = require("./indent");

module.exports = function(str1, str2, str3) {
    return str1 + "\n" + indent(str2) + "\n" + str3;
};

},{"./indent":20}],25:[function(require,module,exports){
var quote = require("./tools/quote"),
    functions;

module.exports = function transpile(val) {
    if(typeof(val) === "string") {
        return "env[" + quote(val) + "]";
    }
    if(typeof(val) !== "object") {
        return JSON.stringify(val);
    }
    if(!Array.isArray(val)) {
        return val;
    }

    if(val[0] in functions) {
        if(typeof(functions[val[0]]) !== "function") {
            console.log(val[0]);
        }
        return functions[val[0]].apply(functions, val.slice(1));
    }
    val = val.map(transpile);
    return val[0] + "(" + val.slice(1).join(", ") + ")";
};

functions = require("./functions");

},{"./functions":1,"./tools/quote":22}],26:[function(require,module,exports){
/* jshint node: true */

var stmts = require("./lib/tools/stmts"),
    iife = require("./lib/tools/iife"),
    transpile = require("./lib/transpile");

function transpileProgram(val) {
    return stmts([iife([transpile(val)], ["env"], ["Object.create(null)"])]);
}

module.exports = transpileProgram;
transpileProgram.transpile = transpile;
transpileProgram.exec = function(arr) {
    /* jshint evil: true */
    return eval(this(arr));
};

},{"./lib/tools/iife":19,"./lib/tools/stmts":23,"./lib/transpile":25}],27:[function(require,module,exports){
/* jshint browser: true */
/* global ace */

(function(document) {
    var lispToArray = require("lisp-array-to-js"),
        form = document.querySelector("form[name=\"lisp-array-to-js\"]"),
        inp = ace.edit(form.querySelector("[name=\"input\"]")),
        out = ace.edit(form.querySelector("[name=\"output\"]")),
        err = form.querySelector("[name=\"error\"]");

    inp.getSession().on("change", function() {
        var content;

        try {
            content = lispToArray(JSON.parse(inp.getValue()));
        } catch(e) {
            err.textContent = e.toString();
        }

        if(content) {
            inp.getSession().setAnnotations([]);
            out.setValue(content, -1);
            err.textContent = "";
        }
    });

    [inp, out].forEach(function(editor) {
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/" + editor.container.dataset.mode);
        editor.setReadOnly("disabled" in editor.container.dataset);
    });

    inp.setValue(inp.getValue(), 1);
})(document);

},{"lisp-array-to-js":26}]},{},[27])(27)
});