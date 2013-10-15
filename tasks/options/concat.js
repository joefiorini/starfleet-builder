var grunt = require('grunt'),
    path = require('path');

function image(name) {
  return {
    options: {
      process: function(src, filepath) {
        var config = grunt.file.readJSON('configs/' + name + '.json');
        var data = { buildConfig: config, pkg: grunt.config('pkg') };
        return grunt.template.process(src, {data: data});
      }
    },
    files: [{
      expand: true,
      cwd: 'tmp/stage/',
      src: ['preface.docker', 'main.docker', 'epilogue.docker'],
      dest: 'tmp/built/',
      rename: function(dest, src) {
        return path.join(dest, 'Dockerfile.' + name);
      }
    }]
  };
}

module.exports = {
  ruby: image("ruby"),
  "ruby-web": image("ruby-web"),
  node: image("node")
};
