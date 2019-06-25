const { FsConnector } = require('unifile');
const fs = require('fs')

/**
 * Service connector extends the local filesystem connector (unifile-fs)
 * The root URL will depend on the user name, i.e. in ${ rootUrl }/${ session.user }/
 */
class CustomService extends FsConnector {
  // **
  // extend Fs service
  constructor(config) {
    super(config);
    // change fs infos
    this.name = 'custom-service';
    this.infos.name = 'custom-service';
    this.infos.displayName = 'Custom Service disaplay name';
    this.infos.description = 'Custom Service description';
  }

  // **
  //Auth commands
  getInfos(session) {
    return Object.assign({
      isLoggedIn: !!session.user,
      isOAuth: false,
      username: session.user
    }, this.infos);
  }
  // In this example the form will set a user in the session
  // The form is one specific form for this example
  getAuthorizeURL(session) { return Promise.resolve('/login-form.html') }

  // check authentication
  // and create a root folder for the user
  login(session, loginInfos) {
    if(loginInfos.password === 'pass') {
      // store the user
      session.user = loginInfos.user;
      // create the user's directory if it does not exist already
      return this.mkdir(session, '')
      .then(() => this.mkdir(session, 'Website'))
      .catch((e) => session);
    }
    // logout if pass is not correct
    session.user = null;
    return Promise.resolve(session);
  }
  // **
  //Filesystem commands: prepend the user to all paths
  readdir(session, path) { return super.readdir(session, `/tmp/${ session.user }/${ path }`) }
  stat(session, path) { return super.stat(session, `/tmp/${ session.user }/${ path }`) }
  mkdir(session, path) { return super.mkdir(session, `/tmp/${ session.user }/${ path }`) }
  writeFile(session, path, data) {
    return super.writeFile(session, `/tmp/${ session.user }/${ path }`, data)
    .then(function() {
      fs.copyFileSync(`/tmp/${ session.user }/${ path }`, `/tmp/${ session.user }/${ path }.bkp`)
    })
  }
  createWriteStream(session, path) { return super.createWriteStream(session, `/tmp/${ session.user }/${ path }`) }
  readFile(session, path) { return super.readFile(session, `/tmp/${ session.user }/${ path }`) }
  createReadStream(session, path) { return super.createReadStream(session, `/tmp/${ session.user }/${ path }`) }
  rename(session, src, dest) { return super.rename(session, src, dest) }
  unlink(session, path) { return super.unlink(session, `/tmp/${ session.user }/${ path }`) }
  rmdir(session, path) { return super.rmdir(session, `/tmp/${ session.user }/${ path }`) }
  batch(session, actions, message) { return super.batch(session, actions, message) }
}
// export for use in index.js
module.exports = CustomService;