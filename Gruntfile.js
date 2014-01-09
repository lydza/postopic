'use strict';

module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      livereload: {
        files: [
          '<%= yeoman.app %>/*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,**/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,**/}*.js',
          '{.tmp,<%= yeoman.app %>}/scripts/{,**/}*.hbs',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
          'test/spec/{,**/}*.js'
        ],
        tasks: ['exec', 'jshint'],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      testserver: {
        options: {
          port: 1234,
          base: '.'
        }
      }
    },
    exec: {
      mocha: {
        command: 'mocha-phantomjs http://localhost:<%= connect.testserver.options.port %>/test',
        stdout: true
      }
    },
    express: {
      options: {
        port: '9000'
      },
      dev: {
        options: {
          script: 'server/app.js'
        }
      },
      prod: {
        options: {
          script: 'server/app.js'
        }
      },
      test: {
        options: {
          script: 'server/app.js'
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= express.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,**/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    requirejs: {
      compile: {
        options: {
          name: 'main',
          baseUrl: '<%= yeoman.app %>/scripts',
          mainConfigFile: '<%= yeoman.app %>/scripts/init.js',
          out: '<%= yeoman.dist %>/r.js'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'bower_components/requirejs/require.js'
          ]
        }]
      }
    },
    bower: {
      all: {
        rjsConfig: '<%= yeoman.app %>/scripts/main.js'
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: 'JST',
          amd: true
        },
        files: {
          '.tmp/scripts/templates.js': ['templates/**/*.hbs']
        }
      }
    }
  });

  grunt.registerTask('createDefaultTemplate', function () {
    grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  grunt.registerTask('default', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }
    grunt.option('force', true);
    grunt.task.run([
      'clean:server',
      'connect:testserver',
      'express:dev',
      'exec',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'createDefaultTemplate',
    'connect:testserver',
    'exec:mocha'
  ]);

  grunt.registerTask('build', [
    'createDefaultTemplate',
//    'requirejs',
//    'concat',
//    'uglify',
    'copy',
  ]);

};
