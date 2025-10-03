<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
        <p>Forgot your password? <router-link to="/forgot-password">Forgot password</router-link></p>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { login } from "@/api/auth"
import { useAuthStore } from "@/store/auth"
import { ref } from "vue"
import { useRouter } from "vue-router"  // 👈 import router

const email = ref("")
const password = ref("")
const auth = useAuthStore()
const router = useRouter() // 👈 khởi tạo

const handleLogin = async () => {
  try {
    const data = await login(email.value, password.value)

    console.log("Login successful:", data)

    // lưu token vào store
    auth.login(data.tokens.access.token)

    // 👉 chuyển hướng sang Home (hoặc Dashboard)
    router.push("/") // hoặc "/dashboard"
  } catch (error) {
    console.error("Error during login:", error)
    alert("Login failed. Please check your credentials.")
  }
}
</script>
