'use strict';

const { SilexServer, Config } = require('silex-website-builder');
const CustomService = require('./custom-service');

// create a default config
const config = new Config();

// disable other services
config.ceOptions.enableSftp = false;

// create the Silex server
const silex = new SilexServer(config);

// add our custom service
silex.unifile.use(new CustomService());

// define a form to get the user login and password
silex.app.use('/login-form.html', (req, res) => res.sendFile(__dirname + '/login-form.html'));

// start Silex
silex.start(function() {
  console.log('server started');
});

