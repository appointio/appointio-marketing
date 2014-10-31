'use strict'

module.exports = function(grunt) {
    grunt.initConfig({
        express: {
            server: {
              options: {
                port: 8888,
                bases: ['.'],
                livereload: true
              }
            }
          }

    });

    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask('default', ['express', 'express-keepalive']);
};
