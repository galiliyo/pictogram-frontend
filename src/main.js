import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './styles/application.scss'
import './assets/fonts/streamline-icons/css/style.css'
import Notifications from 'vue-notification';
import cloudinary from 'cloudinary-vue';
Vue.use(cloudinary, {
  configuration: {
    cloudName: "pictogramcloud"
  }
});

Vue.use(require('vue-moment'));
Vue.use(Notifications)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
