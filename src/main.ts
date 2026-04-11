import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import '@/assets/styles.scss'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark'
    }
  }
})
app.use(ToastService)
app.use(ConfirmationService)
app.use(VCalendar, {})
app.use(pinia)
app.mount('#app')
