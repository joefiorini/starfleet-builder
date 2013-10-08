module.exports = {
  main: {
    options: {
      mode: 'gzip'
    },
    expand: true,
    cwd: 'tmp/built',
    src: ['Dockerfile.*'],
    dest: 'tmp/compressed'
  }
};

