function loadConfig(task) {
  return require('./tasks/options/' + task);
}

module.exports = function(grunt) {
  var path = require('path');

  grunt.file.readIf = function(filepath, condition, options) {
    if(!grunt.util._.isEmpty(condition)) {
      return grunt.file.read(filepath, options);
    }

    return null;
  };

  function configFileName() {
    return grunt.option('config') || 'configs/default.json';
  }

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    buildConfig: grunt.file.readJSON(configFileName()),
    dockerfileExt: path.basename(configFileName(), ".json"),
    copy: loadConfig('copy'),
    concat: loadConfig('concat')
  });

  grunt.registerTask('printOpts', 'print options', function() {
    grunt.log.verbose.subhead('Creating Dockerfile with options:');
    grunt.log.verbose.writeln(JSON.stringify(grunt.config('buildConfig')));
    grunt.log.verbose.writeln('Options read from: ', grunt.config('configFile'));
  });

  grunt.registerTask('dockerfile:generate', ['printOpts', 'copy:stage', 'concat:images', 'concat:main']);

};
