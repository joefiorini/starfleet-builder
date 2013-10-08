module.exports = {
  options: {
    key: '<%= aws.key %>',
    secret: '<%= aws.secret %>',
    access: 'public-read',
    bucket: 'images.static.triforce.io'
  },
  master: {
    upload: [{
      src: 'dist/Dockerfile.*'
    }]
  }
};

