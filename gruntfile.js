'use strict'

var path = require('path');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        app: {
            app: 'app'
        },
        express: {
            dev: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    bases: ['<%= app.app %>'],
                    livereload: true
                }
            }
          }

    });

    grunt.registerTask('default', ['express', 'express-keepalive']);
};