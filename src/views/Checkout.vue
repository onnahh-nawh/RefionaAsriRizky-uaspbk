<template>
  <div class="checkout-page py-16 bg-milk">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="section-title">Checkout</h1>
        <p class="section-subtitle">Complete your order</p>
      </div>

      <!-- Redirect if cart is empty -->
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

      <!-- Checkout Form -->
      <form v-else @submit.prevent="submitOrder" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Customer Information -->
        <div class="space-y-6">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-lg font-semibold text-coffee-500 mb-6">Customer Information</h2>
            
            <div class="space-y-4">
              <div>
                <label for="customerName" class="block text-sm font-medium text-coffee-500 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  id="customerName"
                  v-model="form.customerName"
                  class="input-field"
                  placeholder="Enter your full name"
                  required
                >
              </div>
              
              <div>
                <label for="tableNumber" class="block text-sm font-medium text-coffee-500 mb-2">Table Number *</label>
                <input 
                  type="text" 
                  id="tableNumber"
                  v-model="form.tableNumber"
                  class="input-field"
                  placeholder="Enter your table number"
                  required
                >
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-coffee-500 mb-2">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  id="phone"
                  v-model="form.phone"
                  class="input-field"
                  placeholder="Enter your phone number"
                >
              </div>
              
              <div>
                <label for="specialRequests" class="block text-sm font-medium text-coffee-500 mb-2">Special Requests (Optional)</label>
                <textarea 
                  id="specialRequests"
                  v-model="form.specialRequests"
                  rows="3"
                  class="input-field"
                  placeholder="Any special requests or notes..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-lg font-semibold text-coffee-500 mb-6">Payment Method</h2>
            
            <div class="space-y-3">
              <div class="flex items-center">
                <input 
                  type="radio" 
                  id="cash" 
                  value="cash" 
                  v-model="form.paymentMethod"
                  class="w-4 h-4 text-coffee-500 border-coffee-300 focus:ring-coffee-500"
                >
                <label for="cash" class="ml-3 flex items-center">
                  <span class="text-coffee-600">Cash</span>
                  <span class="ml-2 text-sm text-coffee-500">(Pay at the table)</span>
                </label>
              </div>
              
              <div class="flex items-center">
                <input 
                  type="radio" 
                  id="mobile-banking" 
                  value="mobile-banking" 
                  v-model="form.paymentMethod"
                  class="w-4 h-4 text-coffee-500 border-coffee-300 focus:ring-coffee-500"
                >
                <label for="mobile-banking" class="ml-3 flex items-center">
                  <span class="text-coffee-600">Mobile Banking</span>
                  <span class="ml-2 text-sm text-coffee-500">(Transfer to our account)</span>
                </label>
              </div>
              
              <div class="flex items-center">
                <input 
                  type="radio" 
                  id="qris" 
                  value="qris" 
                  v-model="form.paymentMethod"
                  class="w-4 h-4 text-coffee-500 border-coffee-300 focus:ring-coffee-500"
                >
                <label for="qris" class="ml-3 flex items-center">
                  <span class="text-coffee-600">QRIS</span>
                  <span class="ml-2 text-sm text-coffee-500">(Scan QR code)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:sticky lg:top-24 lg:self-start">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-lg font-semibold text-coffee-500 mb-6">Order Summary</h2>
            
            <!-- Items -->
            <div class="space-y-4 mb-6">
              <div v-for="item in items" :key="item.id" class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded-lg">
                  <div>
                    <p class="font-medium text-coffee-500">{{ item.name }}</p>
                    <p class="text-sm text-coffee-600">Qty: {{ item.quantity }}</p>
                  </div>
                </div>
                <span class="font-semibold text-coffee-500">Rp {{ (item.price * item.quantity).toLocaleString() }}</span>
              </div>
            </div>
            
            <!-- Totals -->
            <div class="border-t pt-4 space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-coffee-600">Subtotal</span>
                <span class="font-semibold text-coffee-500">Rp {{ totalPrice.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-coffee-600">Tax (10%)</span>
                <span class="font-semibold text-coffee-500">Rp {{ Math.round(totalPrice * 0.1).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between items-center text-lg font-semibold text-coffee-500 border-t pt-3">
                <span>Total</span>
                <span>Rp {{ Math.round(totalPrice * 1.1).toLocaleString() }}</span>
              </div>
            </div>
            
            <!-- Submit Button -->
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Processing...</span>
              <span v-else>Place Order</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'
import { useOrderStore } from '../store/orders'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const loading = ref(false)
const form = ref({
  customerName: '',
  tableNumber: '',
  phone: '',
  specialRequests: '',
  paymentMethod: 'cash'
})

const items = computed(() => cartStore.items)
const isEmpty = computed(() => cartStore.isEmpty)
const totalPrice = computed(() => cartStore.totalPrice)

const submitOrder = async () => {
  loading.value = true
  
  try {
    const orderData = {
      customerName: form.value.customerName,
      tableNumber: form.value.tableNumber,
      phone: form.value.phone,
      specialRequests: form.value.specialRequests,
      items: items.value,
      total: Math.round(totalPrice.value * 1.1),
      paymentMethod: form.value.paymentMethod
    }
    
    await orderStore.createOrder(orderData)
    cartStore.clearCart()
    router.push('/order-success')
  } catch (error) {
    console.error('Error placing order:', error)
    alert('Failed to place order. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>