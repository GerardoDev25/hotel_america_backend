require('@babel/register')({
  presets: ['@babel/preset-env'],
  cache: true,
});

//
module.exports = require('./src');
