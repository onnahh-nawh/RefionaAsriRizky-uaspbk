<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeCart"></div>
    
    <!-- Sidebar -->
    <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-lg font-semibold text-coffee-500">Shopping Cart</h2>
          <button @click="closeCart" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="isEmpty" class="text-center py-12">
            <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"/>
            </svg>
            <p class="text-gray-500 mb-4">Your cart is empty</p>
            <button @click="closeCart" class="btn-primary">Continue Shopping</button>
          </div>

          <div v-else class="space-y-4">
            <div v-for="item in items" :key="item.id" class="flex items-center space-x-4 p-4 border rounded-lg">
              <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg">
              <div class="flex-1">
                <h3 class="font-medium text-coffee-500">{{ item.name }}</h3>
                <p class="text-sm text-gray-600">Rp {{ item.price.toLocaleString() }}</p>
                <div class="flex items-center space-x-2 mt-2">
                  <button @click="updateQuantity(item.id, item.quantity - 1)" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                    </svg>
                  </button>
                  <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.id, item.quantity + 1)" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                  </button>
                </div>
              </div>
              <button @click="removeItem(item.id)" class="text-red-500 hover:text-red-700 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="!isEmpty" class="border-t p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold text-coffee-500">Total:</span>
            <span class="text-xl font-bold text-coffee-500">Rp {{ totalPrice.toLocaleString() }}</span>
          </div>
          <div class="space-y-2">
            <RouterLink to="/cart" @click="closeCart" class="w-full btn-outline block text-center">
              View Cart
            </RouterLink>
            <RouterLink to="/checkout" @click="closeCart" class="w-full btn-primary block text-center">
              Checkout
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../store/cart'

const cartStore = useCartStore()

const isOpen = computed(() => cartStore.isOpen)
const items = computed(() => cartStore.items)
const isEmpty = computed(() => cartStore.isEmpty)
const totalPrice = computed(() => cartStore.totalPrice)

const closeCart = () => cartStore.closeCart()
const removeItem = (id) => cartStore.removeItem(id)
const updateQuantity = (id, quantity) => cartStore.updateQuantity(id, quantity)
</script>