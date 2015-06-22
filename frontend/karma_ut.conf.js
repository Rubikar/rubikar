'use strict';
var sourcePreprocessors = 'coverage';
/*function isDebug(argument) {
  return argument === '--debug';
}

if(process.args.some(isDebug) {
  sourcePreprocessors = [];
}*/

// Karma configuration
// Generated on Fri Jun 19 2015 15:01:50 GMT-0300 (ART)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/angular/angular.min.js',
      'node_modules/angular-resource/angular-resource.min.js',
      'node_modules/angular-route/angular-route.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'js/app/config/init.js',
      'js/app/config/routes.js',
      'js/app/controllers/home/homeController.js',

      'test/unittesting/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.js': sourcePreprocessors
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'coverage'],

    coverageReporter: {
      reporters: [{
        type : 'html',
        dir : 'karma_reports/coverage/',
        subdir: function(browser) {
          // normalization process to keep a consistent browser name accross different
          // OS
          return browser.toLowerCase().split(/[ /-]/)[0];
        }
      }]
    },

    htmlReporter: {
      outputDir: 'karma_reports/html'
    },

    junitReporter: {
      outputFile: 'karma_reports/xml/karma-ut-results.xml',
      suite: ''
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    browserNoActivityTimeout: 15000,

    reportSlowerThan: 0,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    proxies: {
      '/_generated/views': '/base/_generated/views'
    }
  });
};
