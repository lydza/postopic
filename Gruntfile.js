'use strict';

module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  grunt.initConfig({
    postopic: {
      app: 'app',
      dest: 'dest',
      tmp: '.tmp'
    },//postopic hash
    watch: {
      livereload: {
        files: [
          '<%= postopic.app %>/*.html',
          '{<%= postopic.tmp %>,<%= postopic.app %>}/styles/{,**/}*.css',
          '{<%= postopic.tmp %>,<%= postopic.app %>}/scripts/{,**/}*.js',
          '{<%= postopic.tmp %>,<%= postopic.app %>}/scripts/{,**/}*.hbs',
          '<%= postopic.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
          //'test/spec/{,**/}*.js'
        ],//watch:livereload:files
        tasks: ['exec', 'jshint'],
        options: {
          livereload: true
        }//watch:livereload:options
      }//watch:livereload
    },//watch
    connect: {
      testserver: {
        options: {
          port: 1234,
          base: '.'
        }//connect:testserver:options
      }//connect:testserver
    },//connect
    exec: {
      mocha: {
        command: 'mocha-phantomjs http://localhost:<%= connect.testserver.options.port %>/test',
        stdout: true
      }//exec:mocha
    },//exec
    express: {
      options: {
        port: '9000'
      },//express:options
      dev: {
        options: {
          script: 'server/app.js'
        }//express:dev:options
      },//express:dev
      prod: {
        options: {
          script: 'server/app.js'
        }//express:prod:options
      },//express:prod
      test: {
        options: {
          script: 'server/app.js'
        }//express:test:options
      }//express:test
    },//express
    open: {
      server: {
        path: 'http://localhost:<%= express.options.port %>'
      }//open:server
    },//open
    clean: {
      dest: '<%= postopic.dest %>',
      tmp: '<%= postopic.tmp %>'
    },//clean
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },//jshint:options
      all: [
        'Gruntfile.js',
        '<%= postopic.app %>/scripts/{,**/}*.js',
        '!<%= postopic.app %>/scripts/vendor/*',
//        'test/spec/{,*/}*.js'
      ]//jshint:all
    },
    requirejs: {
      compile: {
        options: {
          name: 'main',
          baseUrl: '<%= postopic.app %>/scripts',
          mainConfigFile: '<%= postopic.app %>/scripts/init.js',
          out: '<%= postopic.dest %>/r.js'
        }//requirejs:compile:options
      }//requirejs:compile
    },//requirejs
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= postopic.app %>',
          dest: '<%= postopic.dest %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'bower_components/requirejs/require.js'
          ]//copy:dist:files:src
        }]//copy:dist:files
      }//copy:dist
    }//copy
  });//grunt.initConfig


  grunt.registerTask('default', [
    'clean:server',
    'connect:testserver',
    'express:dev',
    'exec',
    'open',
    'watch'
  ]);//grunt.registerTask

  grunt.registerTask('test', [
    'clean:server',
    'connect:testserver',
    'exec:mocha'
  ]);//grunt.registerTask

  grunt.registerTask('build', [
    'createDefaultTemplate',
    'requirejs',
    'copy',
  ]);//grunt.registerTask

};//module.exports
