'use strict';

const { SilexServer, Config } = require('silex-website-builder');

const config = new Config();
const silex = new SilexServer(config);

silex.start(function() {
  console.log('server started');
});