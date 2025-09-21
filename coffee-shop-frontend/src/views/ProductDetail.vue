<script setup>
import { getProductById } from "@/api/products"
import { onMounted } from "vue"

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

onMounted(() => {
    var token = localStorage.getItem("token")
    // Fetch chi tiết sản phẩm từ API nếu cần
    getProductById(props.id, token).then(data => {
        console.log("Product Data:", data)
    }).catch(err => {
        console.error("Error fetching product details:", err)
    })
})

</script>

<template>
    <h1>Product Details</h1>
</template>