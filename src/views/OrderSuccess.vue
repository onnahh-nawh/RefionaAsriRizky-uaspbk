<template>
  <div class="order-success-page py-16 bg-milk">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Success Icon -->
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        
        <h1 class="text-3xl font-bold text-coffee-500 mb-4">Order Placed Successfully!</h1>
        <p class="text-lg text-coffee-600 mb-8">
          Thank you for your order. We've received your request and will prepare it shortly.
        </p>
        
        <!-- Order Details -->
        <div v-if="currentOrder" class="bg-white rounded-xl shadow-lg p-6 mb-8 text-left">
          <h2 class="text-xl font-semibold text-coffee-500 mb-4">Order Details</h2>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-coffee-600">Order ID:</span>
              <span class="font-semibold text-coffee-500">#{{ currentOrder.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-coffee-600">Customer:</span>
              <span class="font-semibold text-coffee-500">{{ currentOrder.customerName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-coffee-600">Table Number:</span>
              <span class="font-semibold text-coffee-500">{{ currentOrder.tableNumber }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-coffee-600">Payment Method:</span>
              <span class="font-semibold text-coffee-500 capitalize">{{ currentOrder.paymentMethod.replace('-', ' ') }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-coffee-600">Total:</span>
              <span class="font-semibold text-coffee-500">Rp {{ currentOrder.total.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-coffee-600">Status:</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize">
                {{ currentOrder.status }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Status Information -->
        <div class="bg-coffee-50 rounded-xl p-6 mb-8">
          <h3 class="text-lg font-semibold text-coffee-500 mb-4">What's Next?</h3>
          <div class="space-y-3 text-left">
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-coffee-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <p class="font-medium text-coffee-500">Order Received</p>
                <p class="text-sm text-coffee-600">We've received your order and will start preparing it.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-coffee-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <p class="font-medium text-coffee-500">Processing</p>
                <p class="text-sm text-coffee-600">Our baristas are carefully crafting your order.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-coffee-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <p class="font-medium text-coffee-500">Ready</p>
                <p class="text-sm text-coffee-600">Your order is ready for pickup or delivery to your table.</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Payment Information -->
        <div v-if="currentOrder && currentOrder.paymentMethod !== 'cash'" class="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 class="text-lg font-semibold text-coffee-500 mb-4">Payment Information</h3>
          <div v-if="currentOrder.paymentMethod === 'mobile-banking'" class="text-left">
            <p class="text-coffee-600 mb-2">Please transfer to our account:</p>
            <p class="font-semibold text-coffee-500">Bank: BCA</p>
            <p class="font-semibold text-coffee-500">Account: 1234567890</p>
            <p class="font-semibold text-coffee-500">Amount: Rp {{ currentOrder.total.toLocaleString() }}</p>
          </div>
          <div v-else-if="currentOrder.paymentMethod === 'qris'" class="text-left">
            <p class="text-coffee-600 mb-4">Please scan the QR code at the counter to complete payment.</p>
            <p class="font-semibold text-coffee-500">Amount: Rp {{ currentOrder.total.toLocaleString() }}</p>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="space-y-4">
          <RouterLink to="/menu" class="btn-primary">
            Order More Items
          </RouterLink>
          <RouterLink to="/" class="btn-outline">
            Back to Home
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../store/orders'

const router = useRouter()
const orderStore = useOrderStore()

const currentOrder = computed(() => orderStore.currentOrder)

onMounted(() => {
  if (!currentOrder.value) {
    router.push('/menu')
  }
})
</script>