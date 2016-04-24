const assign = require('lodash/fp/assign')

const settings = assign({
  PORT: 3333,
  HOSTNAME: 'localhost',
}, process.env)

module.exports = settings
