var path = require('path');

module.exports = {
  entry: 'semver',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'umd-semver.js',
    libraryTarget: 'umd',
    library: 'Semver'
  }
};
