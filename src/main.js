import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '../src/styles/application.scss'
import '../src/assets/fonts/streamline-icons/css/style.css'
import * as VueGoogleMaps from "vue2-google-maps";
import Notifications from 'vue-notification';


Vue.use(require('vue-moment'));
Vue.use(Notifications)

const options = {
  // confirmButtonColor: '#41b882',
  // cancelButtonColor: '#ff7674',
  toast:true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000
}


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
