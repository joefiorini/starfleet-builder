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
    aws: grunt.file.readJSON(process.env.HOME + '/grunt-aws.json'),
    copy: loadConfig('copy'),
    concat: loadConfig('concat'),
    s3: loadConfig('s3')
  });

  grunt.registerTask('printOpts', 'print options', function() {
    grunt.log.verbose.subhead('Creating Dockerfile with options:');
    grunt.log.verbose.writeln(JSON.stringify(grunt.config('buildConfig')));
    grunt.log.verbose.writeln('Options read from: ', grunt.config('configFile'));
  });

  grunt.registerTask('dockerfile:generate', ['copy:stage', 'concat', 'copy:finalize']);
  grunt.registerTask('dockerfile:deploy', ['copy:stage', 'concat', 'copy:finalize', 's3:master']);

};
