<template>
  <div class="cart-page py-16 bg-milk">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="section-title">Shopping Cart</h1>
        <p class="section-subtitle">Review your order before checkout</p>
      </div>

      <!-- Empty Cart -->
      <div v-if="isEmpty" class="text-center py-12">
        <div class="text-coffee-300 mb-6">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"/>
          </svg>
        </div>
        <p class="text-coffee-600 mb-6 text-lg">Your cart is empty</p>
        <RouterLink to="/menu" class="btn-primary">
          Start Shopping
        </RouterLink>
      </div>

      <!-- Cart Items -->
      <div v-else class="space-y-6">
        <!-- Cart Items List -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-6 border-b">
            <h2 class="text-lg font-semibold text-coffee-500">Order Items</h2>
          </div>
          
          <div class="divide-y divide-gray-200">
            <div v-for="item in items" :key="item.id" class="p-6 hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-6">
                <!-- Item Image -->
                <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-lg">
                
                <!-- Item Details -->
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-coffee-500">{{ item.name }}</h3>
                  <p class="text-coffee-600 text-sm mb-2">{{ item.description }}</p>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-coffee-100 text-coffee-800 capitalize">
                    {{ item.category.replace('-', ' ') }}
                  </span>
                  <p v-if="item.notes" class="text-sm text-coffee-600 mt-2">
                    <span class="font-medium">Note:</span> {{ item.notes }}
                  </p>
                </div>
                
                <!-- Price & Quantity -->
                <div class="text-right">
                  <p class="text-lg font-semibold text-coffee-500 mb-4">Rp {{ item.price.toLocaleString() }}</p>
                  
                  <div class="flex items-center space-x-3 mb-4">
                    <button @click="updateQuantity(item.id, item.quantity - 1)" class="w-8 h-8 rounded-full bg-coffee-100 flex items-center justify-center hover:bg-coffee-200 transition-colors">
                      <svg class="w-4 h-4 text-coffee-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                      </svg>
                    </button>
                    <span class="w-8 text-center font-semibold text-coffee-500">{{ item.quantity }}</span>
                    <button @click="updateQuantity(item.id, item.quantity + 1)" class="w-8 h-8 rounded-full bg-coffee-100 flex items-center justify-center hover:bg-coffee-200 transition-colors">
                      <svg class="w-4 h-4 text-coffee-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                      </svg>
                    </button>
                  </div>
                  
                  <button @click="removeItem(item.id)" class="text-red-500 hover:text-red-700 text-sm transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-lg font-semibold text-coffee-500 mb-6">Order Summary</h2>
          
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-coffee-600">Subtotal ({{ totalItems }} items)</span>
              <span class="font-semibold text-coffee-500">Rp {{ totalPrice.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-coffee-600">Tax (10%)</span>
              <span class="font-semibold text-coffee-500">Rp {{ Math.round(totalPrice * 0.1).toLocaleString() }}</span>
            </div>
            <div class="border-t pt-3">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-coffee-500">Total</span>
                <span class="text-xl font-bold text-coffee-500">Rp {{ Math.round(totalPrice * 1.1).toLocaleString() }}</span>
              </div>
            </div>
          </div>
          
          <div class="mt-6 space-y-3">
            <RouterLink to="/checkout" class="w-full btn-primary text-center block">
              Proceed to Checkout
            </RouterLink>
            <RouterLink to="/menu" class="w-full btn-outline text-center block">
              Continue Shopping
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

const items = computed(() => cartStore.items)
const isEmpty = computed(() => cartStore.isEmpty)
const totalItems = computed(() => cartStore.totalItems)
const totalPrice = computed(() => cartStore.totalPrice)

const updateQuantity = (id, quantity) => {
  cartStore.updateQuantity(id, quantity)
}

const removeItem = (id) => {
  cartStore.removeItem(id)
}
</script>