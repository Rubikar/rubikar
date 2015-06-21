/*jshint strict:false */

module.exports = function(grunt) {
  var frameworksFiles =
  [
    './js/vendor/jquery/jquery-1.11.3.min.js',
    './node_modules/underscore/underscore-min.js',
    './node_modules/angular/angular.min.js',
    './node_modules/angular-resource/angular-resource.min.js',
    './node_modules/angular-route/angular-route.min.js'
  ];
  var appConcatFile = './js/app/app_concat.js';
  var appMinFile = './js/app/app.min.js';
  var frameworksConcatFile = './js/vendor/frameworks.js';
  var indexNonMin = 'index-non-min.html';

  var jscsFiles = [
    './js/app/**/*.js',
    './test/**/*.js',
    '!./js/app/app_concat.js',
    '!./js/app/app.min.js'
  ];

  var jshintFiles = [
    './js/app/**/*.js',
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
        configFile: 'karma_ut_jenkins_coverage.conf.js'
      },
      minimized: {
        configFile: 'karma_ut_jenkins_minimized.conf.js'
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
        src: ['./js/app/config/init.js', './js/app/**/*.js'],
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
          './js/app/app.min.js' : [appConcatFile]
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