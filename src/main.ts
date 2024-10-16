import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/style/inedx.css"

import router from './router'
import i18n from './plugins/i18n'
import pinia from './plugins/pinia'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')
