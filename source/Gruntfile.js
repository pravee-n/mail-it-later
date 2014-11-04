module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Settings for LESS development
        less: {
          dev: {
            options: {
                compress: true,
                cleancss: true,
                sourceMap : true,
            },
            files: {
              "css/compiled.css": "less/main.less"
            }
          }
        },

        // Setting up JS development
        uglify: {
          options: {
            mangle: false
          },
          dev: {
            files: {
              'js/compiled/compiled.min.js': ['js/source/**/*.js']
            }
          }
        },

        // Setting up a local server for development
        connect: {
          server: {
            options: {
              port: 9001,
              livereload: true,
              keepalive: true,
              open : 'http://0.0.0.0:3000'
            }
          }
        },

        // Setting up the watch settings
        watch: {
          options: {
            spawn: false,
            livereload: 35729
          },
          scripts: {
            files: ['js/source/**/*.js'],
            tasks: ['newer:uglify:dev'],
          },
          less : {
            files: ['less/**/*.less'],
            tasks: ['newer:less:dev'],
          }
        },

    });

    require('load-grunt-tasks')(grunt);
    // Default task(s).
    grunt.registerTask( 'start', ['uglify:dev','less:dev', 'connect', 'watch'] );

};