/*jshint node:true*/

// Generated on <%= (new Date).toISOString().split("T")[0] %> using
// <%= pkg.name %> <%= pkg.version %>
"use strict";

// # Globbing
// for performance reasons we"re only matching one level down:
// "test/spec/{,*/}*.js"
// If you want to recursively match all subfolders, use:
// "test/spec/**/*.js"

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require("time-grunt")(grunt);

    // Load grunt tasks automatically
    require("load-grunt-tasks")(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        config: {
            main: "lisp-json-to-js",
            dist: "dist"
        },
        watch: {
            js: {
                files: [
                    "utf-8.js"
                ],
                tasks: ["jshint"]
            },
            jstest: {
                files: ["<%= config.main %>.js", "test/{,*/}*.js"],
                tasks: ["jshint", "mocha"]
            }
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc",
                reporter: require("jshint-stylish")
            },
            all: [
                "Gruntfile.js"
            ],
            test: {
                files: {
                    src: ["test/{,*/}*.js"]
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: "spec",
                    captureFile: "errors.txt"
                },
                src: ["test/{,*/}*.js"]
            }
        },
        browserify: {
            dist: {
                options: {
                    browserifyOptions: {
                        standalone: "lispJsonToJs"
                    }
                },
                files: {
                    "<%= config.dist %>/browser.js": "<%= config.main %>.js"
                }
            }
        },
        uglify: {
            options: {
                screwIE8: true
            },
            distBrowser: {
                files: {
                    "<%= config.dist %>/browser.min.js": "<%= config.dist %>/browser.js"
                }
            }
        }
    });

    grunt.task.registerTask("test", ["jshint:all", "jshint:test", "mochaTest"]);

    grunt.task.registerTask("build:browser", ["browserify:dist", "uglify:distBrowser"]);
};
