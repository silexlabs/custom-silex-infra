'use strict';

const { SilexServer, Config } = require('silex-website-builder');

console.log('config', Config)

const config = new Config();
const silex = new SilexServer(config);

silex.start(function() {
  console.log('server started');
});