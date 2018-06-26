import Echo from 'laravel-echo'

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
    if (settings.auth && Array.isArray(settings.auth)) {
      settings.auth.forEach(header => {
        this.addAuthHeader(header)
      })
    }

    let options = {
      broadcaster: this.options.broadcaster,
      host: this.options.host,
    }

    if (this.options.auth) options.auth = this.options.auth

    switch (this.options.broadcaster) {
      case 'socket.io':
        window.io = require('socket.io-client');

        this.echo = new Echo(options);
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
    return this.echo.private(channel)
  }

  /**
 * Add auth header
 */

  addAuthHeader (header) {
    if (!this.options.auth) this.options.auth = {}
    if (!this.options.auth.headers) this.options.auth.headers = {}
    let keys = Object.keys(header)

    keys.forEach(key => {
      this.options.auth.headers[key] = header[key]
    })
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
};

export default vue_laravel_echo






