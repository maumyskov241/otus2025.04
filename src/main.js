import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import 'bootstrap/scss/bootstrap.scss'

createApp(App).use(router).mount('#app')
