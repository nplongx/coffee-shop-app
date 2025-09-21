<script setup>
import { ref } from "vue"
import { useAuthStore } from "@/store/auth"

const hoverItem = ref("")
const auth = useAuthStore()

const menuItems = [
  { name: "Về chúng tôi", subMenu: [{ name: "Giới thiệu", link: "#" }, { name: "Lịch sử", link: "#" }] },
  { name: "Hệ thống không gian", subMenu: [{ name: "Cửa hàng", link: "#" }] },
  { name: "Sản phẩm", subMenu: [{ name: "Cà phê rang xay", link: "#" }, { name: "Cà phê hòa tan", link: "#" }] },
  { name: "Ưu đãi" },
  { name: "Thẻ khách hàng thân thiết" },
  { name: "Hợp tác kinh doanh" },
  { name: "Lối sống cà phê", subMenu: [{ name: "Tin tức", link: "#" }] },
  { name: "Tuyển dụng" },
]

function handleLogout() {
  auth.logout()
  window.location.href = "/"
}
</script>

<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li
        v-for="item in menuItems"
        :key="item.name"
        class="nav-item"
        @mouseover="hoverItem = item.name"
        @mouseleave="hoverItem = ''"
      >
        <a href="#">
          {{ item.name }}
          <span v-if="item.subMenu" class="arrow">▼</span>
        </a>
        <ul
          v-if="item.subMenu && hoverItem === item.name"
          class="dropdown"
        >
          <li v-for="sub in item.subMenu" :key="sub.name">
            <a :href="sub.link">{{ sub.name }}</a>
          </li>
        </ul>
      </li>

      <!-- Login / Logout -->
      <li v-if="!auth.isLoggedIn" class="nav-item">
        <a href="/login">Login</a>
      </li>
      <li v-else class="nav-item">
        <a href="#" @click.prevent="handleLogout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background: #fff;
  border-bottom: 1px solid #ccc;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative;
  margin-right: 20px;
}

.nav-item a {
  text-decoration: none;
  color: #333;
  padding: 10px 5px;
  display: inline-block;
  font-size: smaller;
}

.arrow {
  margin-left: 5px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  list-style: none;
  padding: 5px 0;
  margin: 0;
  border: 1px solid #ccc;
  min-width: 150px;
  z-index: 1000;
}

.dropdown li a {
  display: flex;
  padding: 5px 15px;
  color: #333;
}

.dropdown li a:hover {
  background: #f5f5f5;
}
</style>