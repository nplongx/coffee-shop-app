import '/src/assets/main.css'
import { createApp } from 'vue'
import App from '/src/App.vue'
import router from './router '
import { createPinia } from 'pinia'
import { clerkPlugin } from '@clerk/vue'

const app = createApp(App)

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

app.use(createPinia()) // 👈 dùng pinia
app.use(router)  // Vue.use() is gone, use app.use()
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })
app.mount('#app') // replaces .$mount('#app')