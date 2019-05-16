module.exports = function(unifile) {
  this.unifile = unifile;
};

module.exports.prototype.getOptions = function(session) {
  const infos = this.unifile.getInfos(session, 'custom-service');
  return {
    name: 'custom-hosting-provider',
    displayName: 'Custom hosting provider based on custom-service',
    isLoggedIn: infos.isLoggedIn,
    username: infos.username,
    authorizeUrl: '/ce/custom-service/authorize',
    dashboardUrl: 'https://www.custom-provider.com/projects',
    pleaseCreateAVhost: 'create a new project in our service.',
    vhostsUrl: '/hosting/custom-hosting-provider/vhost', // route created by silex automatically
    buyDomainUrl: 'https://www.custom-provider.com/domains',
    skipVhostSelection: true,
    skipFolderSelection: true,
    afterPublishMessage: 'Thx for using our service.<br><br>',
  };
};

const WEBSITE_FOLDER_NAME = 'Website';
module.exports.prototype.getVhosts = async function(session) {
  return [{
    name: WEBSITE_FOLDER_NAME,
    // domainUrl: `/hosting/custom-provider/vhost/get`,
    skipDomainSelection: true,
    publicationPath: {
      //absPath: `/ce/github/get/${ WEBSITE_FOLDER_NAME }/gh-pages`,
      name: WEBSITE_FOLDER_NAME,
      folder: WEBSITE_FOLDER_NAME,
      path: `${ WEBSITE_FOLDER_NAME }/`,
      service: 'custom-service',
      url: `/ce/custom-service/get/Website/`
    }
  }];
};
module.exports.prototype.finalizePublication = (from, to, session, onStatus) => Promise.resolve();
module.exports.prototype.getDefaultPageFileName = () => 'index.html';
