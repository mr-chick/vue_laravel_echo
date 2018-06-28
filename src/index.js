/**
 * Main object
 */

import echo from 'laravel-echo'
import echoStore from './store/';

const vue_laravel_echo = class VLE {

  constructor(echo) {
    this.rawEcho = echo;
    this.debug = false;
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
    // set debugger
    if (settings.debug && typeof settings.debug === "boolean") this.debug = settings.debug;
    if (this.debug) console.log("initializing!");

    // set broadcaster
    if (settings.broadcaster && typeof settings.broadcaster === "object") {
      this.options.broadcaster.name = settings.broadcaster.name;
      // this.options.broadcaster.object = settings.broadcaster.object
    }
    if (this.debug) console.log("Broadcaster set to " + this.options.broadcaster.name);

    // set host
    if (settings.host && typeof settings.host === "string") {
      this.options.host = settings.host
    }
    if(this.debug) console.log("Host set to " + this.options.host)

    // set auth headers
    if (settings.auth && typeof settings.auth === 'object' && settings.auth.headers && typeof settings.auth.headers === "object") {
      for (let [header, value] of Object.entries(settings.auth.headers)) {
          this.addAuthHeader(header,value)
          if(this.debug) console.log("Auth header set to " + header + value);
      } 
    }

    // set the store
    if (settings.store && typeof settings.store === 'object') {
      this.store = settings.store
      console.log('echo store', echoStore);
      this.store.registerModule(['echo'], echoStore)
    }
    if (this.debug) console.log('Store is set to ', this.store)

    let options = {
      broadcaster: this.options.broadcaster.name,
      host: this.options.host,
    }

    if (this.options.auth) options.auth = this.options.auth;

    this.echo = new this.rawEcho(options);
    if (this.debug) console.log("echo set to ", this.echo);

  }

  /**
 * private
 */

  private (channel) {
    if (this.debug) console.log("Joining private channel " + channel);
    const response = this.echo.private(channel);
    this.store.dispatch('echo/addChannel', channel);
    return response;
  }

  /**
   * public 
   */

  public (channel) {
    return this.echo.channel(channel)
  }

  channel (channel ) {
    if (this.debug) console.log("Joining public channel " + channel);
    const response = this.echo.private(channel);
    this.store.dispatch('echo/addChannel', channel);
    return response;
  }

  /**
 * Add auth header
 */

  addAuthHeader (header, value) {
    if (!this.options.auth) this.options.auth = {}
    if (!this.options.auth.headers) this.options.auth.headers = {}

    this.options.auth.headers[header] = value
  }

  addAuthToken (token) {
    // check if object is set
    if (this.echo.connector._defaultOptions.auth) {
      this.echo.connector._defaultOptions.auth.headers['Authorization'] = 'Bearer ' + token;
    }
    if (this.debug) console.log('settings auth token to ' + token);
  }
  
  /**
 * List channels
 */

  channels () {
    return Object.getOwnPropertyNames(this.echo.connector.channels)
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


export default new vue_laravel_echo(echo, echoStore)




