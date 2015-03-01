#!/usr/bin/env node
/* jshint node: true */

var cli = require("cli"),
    lispArrayToJs = require("./"),
    fs = require("fs");

cli.parse({
    output: ["o", "File to save output to", "file"],
    exec: ["e", "Execute"]
});

cli.main(function(args, options) {
    if(args.length !== 1) {
        cli.error("Exactly 1 input file must be supplied");
        cli.getUsage();
    }
    fs.readFile(args[0], function(err, content) {
        var out;

        if(err) {
            console.log(err);
            cli.fatal("An error occured while reading '" + args[0] + "'");
        }

        content = JSON.parse(String(content));
        if(options.exec) {
            out = JSON.stringify(lispArrayToJs.exec(content));
        } else {
            out = lispArrayToJs(content);
        }

        if(options.output) {
            fs.writeFile(options.output, out, function(err) {
                if(err) {
                    console.log(err);
                    cli.fatal("An error occured while writing '" + options.output + "'");
                }
            });
        } else {
            console.log(out);
        }
    });
});
