<template>
    <div class="product-page" @click="showDetails">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description ?? "" }}</p>
        <p v-if="product && product.price !== undefined">
          {{ product.price.toLocaleString("vi-VN") }} đ
        </p>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object,
  },
  methods: {
    addToCart(product) {
      // Logic thêm sản phẩm vào giỏ
    },
    showDetails() {
      this.$router.push({ name: 'ProductDetails', params: { id: this.product.id } });
    }
  },
};
</script>

<style scoped>
.product-page {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 250px;
}
.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.product-name {
  font-size: 1.5em;
  margin: 10px 0;
}
.product-description {
  font-size: 1em;
  color: #666;
}
.product-price {
  font-size: 1.2em;
  color: #333;
  margin: 10px 0;
}
.add-to-cart-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.add-to-cart-button:hover {
  background-color: #369870;
}
</style>