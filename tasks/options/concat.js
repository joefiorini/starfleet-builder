var grunt = require('grunt'),
    path = require('path');

module.exports = {
  options: {
    process: true
  },
  main: {
    files: {
      'builds/Dockerfile.<%= dockerfileExt %>': ['tmp/preface.docker', 'tmp/main.docker', 'tmp/epilogue.docker']
    }
  },
  images: {
    options: {
      process: function(src, filepath) {
        var images = grunt.util._.keys(grunt.config('buildConfig'));
        if(images.indexOf(path.basename(filepath, '.docker')) > 0) {
          return grunt.template.process(src);
        } else {
          return null;
        }
      }
    },
    expand: true,
    cwd: 'images',
    src: ['*.docker'],
    dest: 'tmp/images/'
  }
};
