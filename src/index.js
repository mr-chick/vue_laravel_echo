/**
 * Main object
 */

const vue_laravel_echo = class VLE {

  constructor() {
    
    this.options = {
      'host': '',
      'auth': null,
      'broadcaster': '',
      'pusher_key': null
    }
  }


  // /**
  //  * Install function
  //  */

  install (Vue, settings) {

    this.rawEcho = settings.rawEcho
    // settings should be an object
    if (typeof settings !== "object") {
        // throw error
    }

    this.initialize(settings);
    Vue.prototype.$echo = this;
  }

  // /**
  //  * Initializing echo
  //  */

  initialize (settings) {
    // set broadcaster
    if (settings.broadcaster && typeof settings.broadcaster === "string") {
      this.options.broadcaster = settings.broadcaster
    }

    // set host
    if (settings.host && typeof settings.host === "string") {
      this.options.host = settings.host
    }

    // set auth headers
    if (settings.auth && typeof settings.auth === 'object' && settings.auth.headers && typeof settings.auth.headers === "object") {
      for (let [header, value] of Object.entries(settings.auth.headers)) {
          this.addAuthHeader(header,value)
      } 
    }

    let options = {
      broadcaster: this.options.broadcaster,
      host: this.options.host,
    }

    if (this.options.auth) options.auth = this.options.auth
    
    options.authEndpoint = 'google.com';
    
    switch (this.options.broadcaster) {
      case 'socket.io':
        window.io = require('socket.io-client');

        this.echo = new this.rawEcho(options);
        console.log("raw",this.rawEcho);
        console.log("insatnce", new this.rawEcho(options));
      break;
      case 'pusher':
        console.log("pusher is not yet implemented")
        // window.Pusher = require('pusher-js');
        break;
    }
  }

  /**
 * private
 */

  private (channel) {
    console.log('channel',channel)
    return this.echo.private(channel)
  }

  /**
 * Add auth header
 */

  addAuthHeader (header, value) {
    if (!this.options.auth) this.options.auth = {}
    if (!this.options.auth.headers) this.options.auth.headers = {}

    this.options.auth.headers[header] = value
  }

  /**
 * List channels
 */

  channels () {
    return this.echo.connector.channels;
  }

  /**
   * Status
   */

  isConnected () { 
    return this.echo.connector.socket.connected; 
  }

  /** 
   * Get the raw echo instance
   */

};

export default new vue_laravel_echo()






