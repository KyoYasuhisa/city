// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/firestore'
import VueFire from 'vuefire'

Vue.use(VueFire)

firebase.initializeApp({
  apiKey: "AIzaSyBZEsrXVFrvM-bNWiJoE69zGKKiDoapU4I",
  authDomain: "city-turorial.firebaseapp.com",
  databaseURL: "https://city-turorial.firebaseio.com",
  projectId: "city-turorial",
  storageBucket: "city-turorial.appspot.com",
  messagingSenderId: "720654638556"
})
export const db = firebase.firestore()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

