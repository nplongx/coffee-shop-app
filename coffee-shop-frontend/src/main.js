import '/src/assets/main.css'
import { createApp } from 'vue'
import App from '/src/App.vue'
import router from './router '
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia()) // 👈 dùng pinia
app.use(router)  // Vue.use() is gone, use app.use()
app.mount('#app') // replaces .$mount('#app')