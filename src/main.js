import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './styles/application.scss'
import './assets/fonts/streamline-icons/css/style.css'
import * as VueGoogleMaps from "vue2-google-maps";
import Notifications from 'vue-notification';
import Cloudinary from 'cloudinary-vue';
Vue.use(Cloudinary, {
  configuration: {
    cloudName: "pictogramcloud"
  }
});

Vue.use(require('vue-moment'));
Vue.use(Notifications)



Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAY3sSuIsbs3ZDKn_2_-xGEJHgOW8Wmrdk",
    libraries: "places" ,// necessary for places input
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
