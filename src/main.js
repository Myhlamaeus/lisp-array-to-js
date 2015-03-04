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
