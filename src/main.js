import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoodTablePlugin from 'vue-good-table-next'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

createApp(App)
  .use(router)
  .use(Toast)
  .use(VueGoodTablePlugin)
  .mount('#app')
