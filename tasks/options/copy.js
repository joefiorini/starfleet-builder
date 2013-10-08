module.exports = {
  stage: {
    expand: true,
    cwd: 'templates',
    src: ['preface.docker', 'main.docker', 'epilogue.docker'],
    dest: 'tmp/stage/'
  },
  finalize: {
    expand: true,
    cwd: 'tmp/built/',
    src: ['Dockerfile.*'],
    dest: 'dist/'
  }
};
