# Info


This project is based on the [official laravel-echo package](https://laravel.com/docs/5.6/broadcasting)

I tried to implement as much as I could from the docomentation

This plugin works using `socket.io` as broadcaster

### Install

#### Install the package 

```js
npm i @mr_chick/vue_laravel_echo
```

#### with the package installed, you have to import it

```js
import echo from '@mr_chick/vue_laravel_echo'
```
### Attach `socket.io` to window

```js
window.io = require('socket.io-client');
```

#### Attach the plugin to Vue

```js
Vue.use(echo, {
  'broadcaster': {
    'name': 'socket.io'
   },
  'host': window.location.hostname + ':6001',
  'auth' :{
    'headers': {
      'Authorization': 'Bearer ' + process.env.BEARER
    }
  }
})
```

The auth member is needed to authenticate private channels.

If you use public channels, auth is not needed

### Usage

After installation, you will be able to access echo via `this.$echo`


