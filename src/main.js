import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import store from './store'
import router from './router'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCfnJPiii1hwwrZ5QBFKueW7nTh0ktokb0",
  authDomain: "ad-project-4c93b.firebaseapp.com",
  databaseURL: "https://ad-project-4c93b.firebaseio.com",
  projectId: "ad-project-4c93b",
  storageBucket: "ad-project-4c93b.appspot.com",
  messagingSenderId: "495125415690",
  appId: "1:495125415690:web:ed8c683f1341d76bfc5cf3",
  measurementId: "G-QNYX1201W7"
};

firebase.initializeApp(firebaseConfig);

Vue.use(VueRouter)
new Vue({
  vuetify,
  store,
  router,
  created: function () {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  },

  render: h => h(App),
}).$mount('#app')



