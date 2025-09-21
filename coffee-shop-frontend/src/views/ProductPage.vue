<script setup>
import { ref, onMounted } from "vue"
import ProductCard from '@/components/ProductCard.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { getProducts } from "@/api/products"

const products = ref([])

onMounted(async () => {
  try {
    var token = localStorage.getItem("token")
    if (!token) {
      console.warn("No token found in localStorage")
      // Chuyển hướng người dùng đến trang đăng nhập nếu cần
      return
    }
    const res = await getProducts(token)
    console.log("API response:", res)
    products.value = res.results
  } catch (err) {
    console.error("Failed to fetch products:", err)
  }
})
</script>

<template>
  <main>
    <div class="product-list">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </main>
</template>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
  gap: 20px;
  justify-content: start; 
  padding: 20px;
}
</style>