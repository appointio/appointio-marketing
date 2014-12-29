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
                        'assets/img/**/*',
                        'index.html',

                    ],
                    dest: '<%= app.dist %>/'
                },
                {
                    expand: true,
                    cwd: '<%= app.app %>/assets/bower_components/jquery/dist',
                    src: [
                        'jquery.min.map',

                    ],
                    dest: '<%= app.dist %>/assets/js'
                },
                {
                    expand: true,
                    cwd: '<%= app.app %>/assets/bower_components/components-font-awesome/fonts',
                    src: [
                        '**/*',

                    ],
                    dest: '<%= app.dist %>/assets/fonts'
                }]
            }
        },
        clean: {
            prod: ['<%= app.dist %>']
        },
        ngtemplates: {
            templates: {
                src: ['<%= app.app %>/pages/**/*.html'],
                dest: '<%= app.app %>/assets/js/templates.js',
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
        concat: {
            prodCss: {
                src: [
                    '<%= app.app %>/assets/bower_components/bootstrap/dist/css/bootstrap.min.css',
                    '<%= app.app %>/assets/bower_components/components-font-awesome/css/font-awesome.min.css',
                    '<%= app.app %>/assets/css/style.css',
                ],
                dest: '<%= app.dist %>/assets/css/full.min.css'
            },
            prodJs: {
                src: [
                    '<%= app.app %>/assets/bower_components/angular/angular.min.js',
                    '<%= app.app %>/assets/bower_components/angular-route/angular-route.min.js',
                    '<%= app.app %>/assets/bower_components/jquery/dist/jquery.min.js',
                    '<%= app.app %>/assets/bower_components/modernizer/modernizr.js',
                    '<%= app.app %>/assets/bower_components/classie/classie.js',
                    '<%= app.app %>/assets/js/script.js',
                    '<%= app.app %>/assets/js/templates.js',
                ],
                dest: '<%= app.dist %>/assets/js/full.min.js'
            }
        },

        aws: grunt.file.readJSON('aws-keys.json'), // Read the file
        aws_s3: {
            options: {
                accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
                secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
                region: 'eu-west-1',
                uploadConcurrency: 5, // 5 simultaneous uploads
                downloadConcurrency: 5, // 5 simultaneous downloads,
                mime: {
                    '**/*.js': 'application/javascript',
                    '**/*.html': 'text/html',
                    '**/*.css': 'text/css',
                    '**/*.png': 'image/png',
                    '**/*.jp(e?)g': 'image/jpeg'
                }
            },
            clear_prod: {
                options: {
                    bucket: 'www.appoint.io'
                },
                dest: '/',
                action: 'delete'
            },
            prod: {
                options: {
                    bucket: 'www.appoint.io'
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/',
                    src: ['**'],
                    dest: '.'
                }]
            }
        },

    });

    grunt.registerTask('compile', ['clean', 'copy', 'concat', 'ngtemplates']);
    grunt.registerTask('default', ['compile', 'express', 'watch']);
};

