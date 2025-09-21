<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style>
/* Reset cơ bản */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Container chính */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

/* Header & Footer có thể fix màu nền và padding */
header, footer {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

/* Main content chiếm phần còn lại */
main {
  flex: 1;
  padding: 2rem;
}
</style>
