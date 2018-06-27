# Info


This project is based on the [official laravel-echo package](https://laravel.com/docs/5.6/broadcasting)

I tried to implement as much as I could from the docomentation

This plugin works using `socket.io` as broadcaster


--- 

Settings laravel echo is not part of this readme.

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
npm install --save socket.io-client
```

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

#### Joining a private channel

You use the `.private(channel)` method to join a private channel
Then, you can chain the listener on the returned instance
```js
this.$echo.private(`user.${process.env.USER_ID_TEST}`).notification((notification) => {
  console.log(notification);
});
```

It will join the private channel `user.${process.env.USER_ID_TEST}` and it will listen for notifications sent from that channel


You can also listen to `events`, the same as notifications, you chain the listener on the returned instance

```js
this.$echo.private(`user.${process.env.USER_ID_TEST}`).listen('TestEvent', (e) => {
  console.log(e);
});
```