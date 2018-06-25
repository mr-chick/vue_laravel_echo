import Echo from 'laravel-echo'
window.io = require('socket.io-client')

/**
 * Main object
 */
let vue_laravel_echo = {
  'host': window.location.hostname + ':6001',
  'auth': {},
  'broadcaster': 'socket.io'
}

/**
 * Install function
 */

vue_laravel_echo.install = function (Vue, settings) {
  // settings should be an object
  if (typeof settings !== "object") {
      // throw error
  }

  /**
   * Initializing using the stored options
   */
  
  vue_laravel_echo.initalize()

  Vue.prototype.$echo = vue_laravel_echo
}

/**
 * Initializing echo
 */

vue_laravel_echo.initalize = function() {
  vue_laravel_echo.echo = new Echo({
    broadcaster: vue_laravel_echo.broadcaster,
    host: vue_laravel_echo.host,
    auth: vue_laravel_echo.auth
  });
}


/**
 * private
 */

vue_laravel_echo.private = (channel) => {
  return vue_laravel_echo.echo.private(channel)
}


/**
 * Add auth header
 */

vue_laravel_echo.addAuthHeader = (header) => {
  if (!vue_laravel_echo.auth.headers) vue_laravel_echo.auth.headers = {}
  let keys = Object.keys(header)

  keys.forEach(key => {
    vue_laravel_echo.auth.headers[key] = header[key]
  })
}

export default vue_laravel_echo