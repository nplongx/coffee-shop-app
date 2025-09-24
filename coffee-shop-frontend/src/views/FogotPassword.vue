<template>
    <div class="forgot-email-container">
        <h1>Forgot Password</h1>
        <form @submit.prevent="handleForgotEmail">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="email" required />
            </div>
            <button type="submit">Retrieve Email</button>
        </form>
    </div>
</template>

<script setup>

import { forgotPassword } from "@/api/auth"
import { ref } from "vue"
import { useRouter } from "vue-router"  // 👈 import router

const router = useRouter() // 👈 khởi tạo

const email = ref("")
const handleForgotEmail = async () => {
    await forgotPassword(email.value)
    console.log("Forgot email request successful:")
    alert("Request successful! Please check your email.")
    router.push("/login")    
}
</script>