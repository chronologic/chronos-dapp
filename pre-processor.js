const sass = require('node-sass');

module.exports = (data, filename) => sass.renderSync({
  data,
  file: filename,
  indentedSyntax: true,
  outputStyle: 'compressed',
}).css.toString('utf8');
