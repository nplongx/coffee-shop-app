import { createRouter, createWebHistory } from 'vue-router'
import About from '@/components/About.vue'
import ProductPage from '@/views/ProductPage.vue'
import Login from '@/views/Login.vue'

const routes = [
  { path: '/about', name: 'About', component: About },
  { path: '/', name: 'Products', component: ProductPage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/products/:id', name: 'ProductDetails', component: () => import('@/views/ProductDetail.vue'), props: true }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router