<template>
  <div class="item-detail py-16 bg-milk">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-500 mx-auto"></div>
        <p class="mt-4 text-coffee-600">Loading item details...</p>
      </div>

      <!-- Item not found -->
      <div v-else-if="!item" class="text-center py-12">
        <div class="text-coffee-300 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p class="text-coffee-600 mb-4">Item not found</p>
        <RouterLink to="/menu" class="btn-primary">Back to Menu</RouterLink>
      </div>

      <!-- Item Details -->
      <div v-else class="animate-fade-in">
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <ol class="flex items-center space-x-2 text-coffee-600">
            <li><RouterLink to="/" class="hover:text-coffee-500">Home</RouterLink></li>
            <li><span class="mx-2">/</span></li>
            <li><RouterLink to="/menu" class="hover:text-coffee-500">Menu</RouterLink></li>
            <li><span class="mx-2">/</span></li>
            <li class="text-coffee-500">{{ item.name }}</li>
          </ol>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Image -->
          <div class="relative">
            <img :src="item.image" :alt="item.name" class="w-full h-96 object-cover rounded-2xl shadow-xl">
            <div v-if="!item.available" class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
              <span class="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          </div>

          <!-- Details -->
          <div class="flex flex-col justify-center">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-coffee-100 text-coffee-800 capitalize w-fit mb-4">
              {{ item.category.replace('-', ' ') }}
            </span>
            
            <h1 class="text-4xl font-bold text-coffee-500 mb-4">{{ item.name }}</h1>
            
            <p class="text-xl text-coffee-600 mb-6">{{ item.description }}</p>
            
            <div class="flex items-center justify-between mb-8">
              <span class="text-3xl font-bold text-coffee-500">Rp {{ item.price.toLocaleString() }}</span>
              <div v-if="item.available" class="flex items-center space-x-4">
                <button @click="quantity = Math.max(1, quantity - 1)" class="w-10 h-10 rounded-full bg-coffee-100 flex items-center justify-center hover:bg-coffee-200 transition-colors">
                  <svg class="w-5 h-5 text-coffee-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <span class="text-xl font-semibold text-coffee-500 w-8 text-center">{{ quantity }}</span>
                <button @click="quantity++" class="w-10 h-10 rounded-full bg-coffee-100 flex items-center justify-center hover:bg-coffee-200 transition-colors">
                  <svg class="w-5 h-5 text-coffee-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Special Notes -->
            <div class="mb-8">
              <label for="notes" class="block text-sm font-medium text-coffee-500 mb-2">Special Notes (Optional)</label>
              <textarea 
                id="notes" 
                v-model="notes" 
                rows="3" 
                class="input-field"
                placeholder="Any special requests or customizations..."
              ></textarea>
            </div>

            <!-- Actions -->
            <div class="space-y-4">
              <button 
                @click="addToCart" 
                :disabled="!item.available"
                class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-coffee-500 text-lg py-4"
              >
                <span v-if="item.available">
                  Add {{ quantity }} to Cart - Rp {{ (item.price * quantity).toLocaleString() }}
                </span>
                <span v-else>Out of Stock</span>
              </button>
              
              <RouterLink to="/menu" class="w-full btn-outline text-center block">
                Continue Shopping
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Related Items -->
        <div v-if="relatedItems.length > 0" class="mt-16">
          <h2 class="text-2xl font-bold text-coffee-500 mb-8">You Might Also Like</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="relatedItem in relatedItems" :key="relatedItem.id">
              <MenuCard :item="relatedItem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '../store/menu'
import { useCartStore } from '../store/cart'
import MenuCard from '../components/MenuCard.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const route = useRoute()
const menuStore = useMenuStore()
const cartStore = useCartStore()

const quantity = ref(1)
const notes = ref('')
const loading = ref(true)

const item = computed(() => menuStore.getItemById(props.id))
const relatedItems = computed(() => {
  if (!item.value) return []
  return menuStore.getItemsByCategory(item.value.category)
    .filter(relatedItem => relatedItem.id !== item.value.id)
    .slice(0, 3)
})

const addToCart = () => {
  if (item.value && item.value.available) {
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addItem(item.value)
    }
    
    if (notes.value) {
      cartStore.updateNotes(item.value.id, notes.value)
    }
    
    cartStore.openCart()
  }
}

const fetchItemDetails = async () => {
  loading.value = true
  if (menuStore.items.length === 0) {
    await menuStore.fetchItems()
  }
  loading.value = false
}

watch(() => route.params.id, (newId) => {
  quantity.value = 1
  notes.value = ''
  fetchItemDetails()
}, { immediate: true })

onMounted(() => {
  fetchItemDetails()
})
</script>