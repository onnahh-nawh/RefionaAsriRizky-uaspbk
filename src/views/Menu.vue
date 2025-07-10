<template>
  <div class="menu-page py-16 bg-milk">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="section-title">Our Menu</h1>
        <p class="section-subtitle">Explore our carefully curated selection of coffees, beverages, and snacks</p>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-6 py-3 rounded-full font-medium transition-colors duration-200',
            selectedCategory === category 
              ? 'bg-coffee-500 text-white' 
              : 'bg-white text-coffee-500 hover:bg-coffee-100'
          ]"
        >
          {{ category === 'all' ? 'All Items' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-500 mx-auto"></div>
        <p class="mt-4 text-coffee-600">Loading menu items...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-500 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p class="text-red-600">{{ error }}</p>
        <button @click="fetchMenu" class="mt-4 btn-primary">Try Again</button>
      </div>

      <!-- Menu Grid -->
      <div v-else-if="filteredItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="item in filteredItems" :key="item.id" class="animate-fade-in">
          <MenuCard :item="item" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-coffee-300 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
        </div>
        <p class="text-coffee-600">No items found in this category</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMenuStore } from '../store/menu'
import MenuCard from '../components/MenuCard.vue'

const menuStore = useMenuStore()
const selectedCategory = ref('all')

const categories = computed(() => ['all', ...menuStore.categories])
const loading = computed(() => menuStore.loading)
const error = computed(() => menuStore.error)

const filteredItems = computed(() => {
  if (selectedCategory.value === 'all') {
    return menuStore.availableItems
  }
  return menuStore.getItemsByCategory(selectedCategory.value)
})

const fetchMenu = async () => {
  await menuStore.fetchItems()
}

onMounted(() => {
  fetchMenu()
})
</script>