/*jshint strict:false */

module.exports = function(grunt) {
  var frameworksFiles =
  [
    './assets/js/frameworks/jquery/jquery-1.11.3.min.js',
    './assets/js/frameworks/underscore/underscore-min.js',
    './assets/js/frameworks/angular/angular.min.js',
    './assets/js/frameworks/angular/angular-resource.min.js',
    './assets/js/frameworks/angular/angular-route.min.js'
  ];
  var appConcatFile = './app/app_concat.js';
  var appMinFile = './app/app.min.js';
  var frameworksConcatFile = './assets/js/frameworks/frameworks.js';
  var indexNonMin = 'index-non-min.html';

  var jscsFiles = [
    './app/**/*.js',
    './test/**/*.js',
    '!./app/app_concat.js',
    '!./app/app.min.js'
  ];

  var jshintFiles = [
    './app/**/*.js',
    './test/**/*.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      options: {
        force: true
      },
      karmaReports: ['karma_reports'],
      app: [
        appConcatFile,
        appMinFile,
        appMinFile + '.map',
        appConcatFile + '.map'
      ],
      frameworks: [frameworksConcatFile],
      index:[indexNonMin]
    },
    karma: {
      coverage: {
        configFile: 'karma_jenkins_ut.conf.js'
      },
      minimized: {
        configFile: 'karma_minimized_ut.conf.js'
      },
      dev: {
        configFile: 'karma_ut.conf.js'
      }
    },
    jshint: {
      options: {
        force: true,
        jshintrc: true
      },
      jenkins: {
        options: {
          reporter: 'jslint',
          reporterOutput: 'karma_reports/jshint/jshint.xml'
        },
        src: jshintFiles
      },
      dev: {
        options: {
          force: false,
          reporter: require('jshint-stylish'),
          reporterOutput: null
        },
        files: {
          src: jshintFiles
        }
      },
    },
    jscs: {
      options: {
        force: true,
        config: '.jscsrc'
      },
      jenkins: {
        options: {
          reporter: 'checkstyle',
          reporterOutput: 'karma_reports/jscs/checkstyle-result.xml'
        },
        files: {
          src: jscsFiles
        }
      },
      dev: {
        files: {
          src: jscsFiles
        }
      }
    },
    concat: {
      app: {
        options: {
          separator: ';',
          sourceMap: true
        },
        src: ['./app/config/init.js', './app/**/*.js'],
        dest: appConcatFile,
      },
      framework: {
        src: frameworksFiles,
        dest: frameworksConcatFile
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n',
        sourceMap: true,
        sourceMapIncludeSources: true,
        mangle: {
          except: ['angular']
        }
      },
      app: {
        options: {
          sourceMapIn: appConcatFile + '.map',
        },
        files: {
          './app/app.min.js' : [appConcatFile]
        }
      }
    },
    rename: {
      index: {
        src: 'index.html',
        dest: indexNonMin
      }
    },
    processhtml: {
      app: {
        files: {
          'index.html': [indexNonMin]
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-rename');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.registerTask('default', [
    'clean',
    'karma:coverage',
    'jshint:jenkins',
    'jscs:jenkins',
    'concat:framework',
    'concat:app',
    'uglify:app',
    'rename:index',
    'processhtml:app',
    'karma:minimized'
  ]);
};