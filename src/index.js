/**
 * Main object
 */

import echo from 'laravel-echo'

const vue_laravel_echo = class VLE {

  constructor(echo) {
    this.rawEcho = echo;

    this.options = {
      'host': '',
      'auth': null,
      'broadcaster': {},
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
    if (settings.broadcaster && typeof settings.broadcaster === "object") {
      this.options.broadcaster.name = settings.broadcaster.name
      // this.options.broadcaster.object = settings.broadcaster.object
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
      broadcaster: this.options.broadcaster.name,
      host: this.options.host,
    }

    if (this.options.auth) options.auth = this.options.auth

    this.echo = new this.rawEcho(options);

  }

  /**
 * private
 */

  private (channel) {
    return this.echo.private(channel)
  }


  /**
   * public 
   */

  public (channel) {
    return this.echo.public(channel)
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


export default new vue_laravel_echo(echo)




