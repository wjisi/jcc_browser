'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./dev.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"testing"',
  infoHosts: '["192.168.66.249"]',
  infoPort: '1337'
})