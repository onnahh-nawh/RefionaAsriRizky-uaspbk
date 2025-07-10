<template>
  <div id="app">
    <Navbar />
    <main class="min-h-screen">
      <RouterView />
    </main>
    <Footer />
    <CartSidebar />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CartSidebar from './components/CartSidebar.vue'
import { useAdminStore } from './store/admin'

const adminStore = useAdminStore()

onMounted(() => {
  adminStore.checkAuth()
})
</script>