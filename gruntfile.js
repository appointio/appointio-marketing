'use strict'

var path = require('path');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        app: {
            app: 'app',
            dist: 'dist'
        },
        express: {
            dev: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    bases: [
                        '<%= app.dist %>',
                    ],
                    livereload: true
                }
            }
        },
        watch: {
            reload: {
                files: [
                    '<%= app.app %>/**/*'
                ],
                tasks: ['compile'],
                options: {
                    livereload: true
                }
            }
        },
        copy: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= app.app %>',
                    src: [
                        'assets/**/*',
                        'index.html'
                    ],
                    dest: '<%= app.dist %>/'
                }]
            }
        },
        clean: {
            prod: ['<%= app.dist %>']
        },
        ngtemplates: {
            templates: {
                src: ['<%= app.app %>/pages/**/*.html'],
                dest: '<%= app.dist %>/assets/js/templates.js',
                options: {
                    bootstrap: function(module, script) {
                        return "(function(angular) {\n\n" +
                            "   var app = angular.module('appointio-marketing');" +
                            "   app.run(['$templateCache', function($templateCache) {\n\n" + script + "\n\n}]);\n\n" +
                            "}(window.angular));";
                    },
                    url: function(url) {
                        var parts = url.match(/app\/pages\/(.*)\.html/);
                        var name = parts[1];
                        console.log('    - ' + name + ' packaged');
                        return name;

                    }
                }
            }
        },

    });

    grunt.registerTask('compile', ['clean', 'copy', 'ngtemplates']);
    grunt.registerTask('default', ['compile', 'express', 'watch']);
};