const path = require('path');

module.exports = {
  entry: './public/js/index.js', // entry file
  output: {
    filename: 'bundle.js', // output file name
    path: path.resolve(__dirname, 'public/js'),
   
  },
  target: 'node', // target node environment
  mode: 'development', // development mode
  externals: {
    express: 'express',
  },
};

