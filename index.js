'use strict';

const { SilexServer, Config } = require('silex-website-builder');
const CustomProvider = require('./custom-hosting-provider');

// create a default config
const config = new Config();

// provide only our custom hosting to user when they want to publish
config.publisherOptions.skipHostingSelection = true;
config.publisherOptions.enableHostingUnifile = false;

// disable other services, show only our custom service
config.ceOptions.enableSftp = false;

// create the Silex server
const silex = new SilexServer(config);

// add our custom service
const CustomService = require('./custom-service');
silex.unifile.use(new CustomService());

// add our custom hosting provider
silex.publishRouter.addHostingProvider(new CustomProvider(silex.unifile))

// define a form to get the user login and password
silex.app.use('/login-form.html', (req, res) => res.sendFile(__dirname + '/login-form.html'));

// start Silex
silex.start(function() {
  console.log('server started');
});

