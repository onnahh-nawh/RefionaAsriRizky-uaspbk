<template>
  <nav class="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-coffee-500 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 21h20v-2H2v2zm1.15-4.05L4 16.5l.85.45L12 13.5l7.15 3.45L20 16.5l.85.45L22 16.5V15c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v1.5l1.15.45zM12 9c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
            <span class="text-xl font-bold text-coffee-500">Café Bliss</span>
          </RouterLink>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink to="/" class="text-coffee-600 hover:text-coffee-500 transition-colors">Home</RouterLink>
          <RouterLink to="/menu" class="text-coffee-600 hover:text-coffee-500 transition-colors">Menu</RouterLink>
          <RouterLink to="/#about" class="text-coffee-600 hover:text-coffee-500 transition-colors">About</RouterLink>
          <RouterLink to="/#contact" class="text-coffee-600 hover:text-coffee-500 transition-colors">Contact</RouterLink>

        </div>

        <!-- Cart & Mobile Menu -->
        <div class="flex items-center space-x-4">
          <!-- Cart Button -->
          <button @click="openCart" class="relative p-2 text-coffee-600 hover:text-coffee-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"/>
            </svg>
            <span v-if="totalItems > 0" class="absolute -top-2 -right-2 bg-coffee-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ totalItems }}
            </span>
          </button>

          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu" class="md:hidden p-2 text-coffee-600 hover:text-coffee-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="md:hidden border-t border-coffee-100 py-4">
        <div class="flex flex-col space-y-2">
          <RouterLink to="/" class="text-coffee-600 hover:text-coffee-500 transition-colors py-2">Home</RouterLink>
          <RouterLink to="/menu" class="text-coffee-600 hover:text-coffee-500 transition-colors py-2">Menu</RouterLink>
          <RouterLink to="/#about" class="text-coffee-600 hover:text-coffee-500 transition-colors">About</RouterLink>
          <RouterLink to="/#contact" class="text-coffee-600 hover:text-coffee-500 transition-colors">Contact</RouterLink>

        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../store/cart'

const cartStore = useCartStore()
const showMobileMenu = ref(false)

const totalItems = computed(() => cartStore.totalItems)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const openCart = () => {
  cartStore.openCart()
}
</script>