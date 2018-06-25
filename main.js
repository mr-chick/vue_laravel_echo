// import main vue
import Vue from 'vue'

// import vue router
import VueRouter from 'vue-router'

import LightBootstrap from './light-bootstrap-main'

// Plugins
import App from './App.vue'

// store
import store from './store' // brackets for named variable (not default)

// localisation
import vuexI18n from 'vuex-i18n'
Vue.use(vuexI18n.plugin, store)

import translationsRo from '../static/resources/i18n/ro.json'
Vue.i18n.add('ro', translationsRo)
Vue.i18n.set('ro')

// router setup
import routes from './routes/routes'
// plugin setup
Vue.use(VueRouter)

Vue.use(LightBootstrap)

// modals
import VModal from 'vue-js-modal'
Vue.use(VModal, { dynamic: true })


// laravel echo
import echo from 'src/plugins/vue_laravel_echo/'
echo.addAuthHeader({'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI3NjllNTM0ZTI4ZjUyMTI0NmQ2NDcyNWM2YWQ3MmU3NWFkZjcyMjhhZTUxMWQ4YzYxNTg3ZDUwYjdiZjZmZjNkZDA4NjJiMTgyOWFmMWZlIn0.eyJhdWQiOiI3IiwianRpIjoiMjc2OWU1MzRlMjhmNTIxMjQ2ZDY0NzI1YzZhZDcyZTc1YWRmNzIyOGFlNTExZDhjNjE1ODdkNTBiN2JmNmZmM2RkMDg2MmIxODI5YWYxZmUiLCJpYXQiOjE1Mjk5MzM5NTYsIm5iZiI6MTUyOTkzMzk1NiwiZXhwIjoxNTMyNTI1OTU1LCJzdWIiOiIyNTUzZWEwMC03ODdkLTExZTgtYjVlMC1lMzNlZTZjZjdhOTQiLCJzY29wZXMiOlsiKiJdfQ.PWpiSCNCfZO6w7V_i6f_hzbdzkPnk_UnF04J4YUnHF092iBZIR0gtdXdQl_CmFIzl8SeSKnAr9E8zyQbdX2XALWqqWgJ3nfMPPmEeYQNQw48SpsOWxVHetnpKPz_EtYD7RzKQjmqCfwGSTnpTXNxQ1ZyXkpsd2yKP38kW6kiI9r0hSQ_Z2p57Mi-eYCw-kQukU3yjElpPHd1ac_fGtBH4fRA-j2kyqg5lVEoRLuLhky6IJ7bcZ06Ay3JBzQ-3bMc-vsEMT2J1oL6mW1YFQyEMnq44k4InTYIxjO01HueETgkDnBztjWRxYjx3cC2ba3XwNU7pmB0epnCoBbmQifLKF5Zdaa-htq9AOv1OLjc9sedO14lsqDoAf7rFEn3M7VWRcupVHBhmgcPl9EDxC-ox_DHtIfmaYiGm3Q9buh6IP5xGL70dia6rP-8KsaL86AteCeywnPwjjvnTcIxoKyQBEQa_UQ-vB-RoECCUW2tPwyMBYLIg3hS6P8keCp_yrv4HDflcanZCTe63d946BNDQx66-l15lCInkgnz4N-V6jY_lOSv6XsnlGDl1Cfb9Z2lQRzFiYZ1QzRdUPBnwZ38spPCWNt1E0sGgx58vFq5Ngg5wwSs90xrIN85UI6M-xT43NZKf735WoLWJvNqfm6BJJVcJ2QyzCDtdO1aVb3XsPk'})
Vue.use(echo,{})

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

// check for ability rules, see if they should be updated (for page reload)

// router.beforeEach((to, from, next) => {

// })

import Filters from './vue_filters'
Vue.use(Filters);

/* eslint-disable no-new */
new Vue({
  el: '#app',
    // extensions
  router,
  store,
  render: h => h(App),
  mounted () {
    // restore abilities / rules
    //! todopc: restore this
    // if (this.$store.getters['casl/rules'].length > 0) {
    //   this.$ability.update(this.$store.getters['casl/rules'])
    // }

    this.$echo.private('user.2553ea00-787d-11e8-b5e0-e33ee6cf7a94').notification((notification) => {
      console.log(notification);
    });

    this.$echo.private('user.2553ea00-787d-11e8-b5e0-e33ee6cf7a94').listen('TestEvent', (e) => {
      console.log(e);
    });
  }
})
