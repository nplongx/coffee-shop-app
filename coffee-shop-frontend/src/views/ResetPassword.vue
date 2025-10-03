<template>
    <div class="reset-password-container">
        <h1>Reset Password</h1>
        <form @submit.prevent="handleResetPassword">
        <div class="form-group">
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" v-model="newPassword" required />
        </div>
        <button type="submit">Reset Password</button>
        </form>
    </div>
</template>

<script setup>
import { resetPassword } from "@/api/auth"
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"  // 👈 import router
const router = useRouter() // 👈 khởi tạo

const props = defineProps({
  token: {
    type: String,
    required: true
  }
})

const newPassword = ref("")
const handleResetPassword = async () => {
    try {
        const data = await resetPassword(props.token, newPassword.value)
        console.log("Password reset successful:", data)
        alert("Password reset successful! Please log in with your new password.")
        router.push("/login") // Chuyển hướng đến trang đăng nhập sau khi đặt lại mật khẩu
    } catch (error) {
        console.error("Error during password reset:", error)
        alert("Password reset failed. Please try again.")
    }
}

</script>