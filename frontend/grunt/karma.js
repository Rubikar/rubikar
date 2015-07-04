'use strict';

module.exports = function(grunt, options){
  return {
    coverage: {
      configFile: 'karma_ut_jenkins_coverage.conf.js'
    },
    minimized: {
      configFile: 'karma_ut_jenkins_minimized.conf.js'
    },
    dev: {
      configFile: 'karma_ut.conf.js'
    }
  };
};