<template>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" v-model="email" required />
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
    </form>
</template>

<script setup>
import { useAuthStore } from "@/store/auth"
import { ref } from "vue"

const auth = useAuthStore()

const email = ref("")
const password = ref("")
const handleRegister = async () => {
    const user = await register(email.value, password.value)
    console.log("Registration successful:", user)
    alert("Registration successful! Please log in.")
    auth.login(user.tokens.access.token)
    router.push("/login") // Chuyển hướng đến trang đăng nhập sau khi đăng ký
}

</script>