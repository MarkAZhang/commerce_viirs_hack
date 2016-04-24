const assign = require('lodash/fp/assign')

const settings = assign({
  PORT: 3000,
  HOSTNAME: 'localhost',
}, process.env)

module.exports = settings
