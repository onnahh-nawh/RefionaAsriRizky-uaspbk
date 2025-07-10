<template>
  <div class="card group cursor-pointer" @click="viewDetails">
    <div class="relative overflow-hidden">
      <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div v-if="!item.available" class="absolute inset-0 bg-black/50 flex items-center justify-center">
        <span class="text-white font-semibold">Out of Stock</span>
      </div>
    </div>
    <div class="p-6">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-coffee-500 group-hover:text-coffee-600 transition-colors">{{ item.name }}</h3>
        <span class="text-lg font-bold text-coffee-500">Rp {{ item.price.toLocaleString() }}</span>
      </div>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ item.description }}</p>
      <div class="flex items-center justify-between">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-coffee-100 text-coffee-800 capitalize">
          {{ item.category.replace('-', ' ') }}
        </span>
        <button 
          @click.stop="addToCart" 
          :disabled="!item.available"
          class="btn-primary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-coffee-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const cartStore = useCartStore()

const viewDetails = () => {
  router.push(`/menu/${props.item.id}`)
}

const addToCart = () => {
  if (props.item.available) {
    cartStore.addItem(props.item)
  }
}
</script>