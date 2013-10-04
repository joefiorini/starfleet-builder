module.exports = {
  stage: {
    expand: true,
    cwd: 'templates',
    src: ['preface.docker', 'main.docker', 'epilogue.docker'],
    dest: 'tmp/'
  }
};
