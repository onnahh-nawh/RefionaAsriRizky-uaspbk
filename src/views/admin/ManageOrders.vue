<template>
  <div class="manage-orders py-8 bg-coffee-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-coffee-500">Manage Orders</h1>
          <p class="text-coffee-600">View and update order statuses</p>
        </div>
        <RouterLink to="/admin/dashboard" class="btn-outline">
          Back to Dashboard
        </RouterLink>
      </div>

      <!-- Status Filter -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-lg font-semibold text-coffee-500 mb-4">Filter by Status</h2>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="status in statusOptions" 
            :key="status.value"
            @click="selectedStatus = status.value"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              selectedStatus === status.value 
                ? 'bg-coffee-500 text-white' 
                : 'bg-coffee-100 text-coffee-600 hover:bg-coffee-200'
            ]"
          >
            {{ status.label }}
          </button>
        </div>
      </div>

      <!-- Orders List -->
      <div class="space-y-6">
        <div v-for="order in filteredOrders" :key="order.id" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-coffee-500">Order #{{ order.id }}</h3>
                <p class="text-coffee-600">{{ order.customerName }} - Table {{ order.tableNumber }}</p>
                <p class="text-sm text-coffee-500">{{ formatDate(order.createdAt) }}</p>
              </div>
              <div class="text-right">
                <span :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                  order.status === 'received' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'ready' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                ]">
                  {{ order.status }}
                </span>
                <p class="text-lg font-bold text-coffee-500 mt-2">Rp {{ order.total.toLocaleString() }}</p>
              </div>
            </div>
            
            <!-- Order Items -->
            <div class="mb-4">
              <h4 class="font-medium text-coffee-500 mb-2">Items:</h4>
              <div class="space-y-2">
                <div v-for="item in order.items" :key="item.id" class="flex justify-between items-center text-sm">
                  <span class="text-coffee-600">{{ item.name }} x{{ item.quantity }}</span>
                  <span class="font-medium text-coffee-500">Rp {{ (item.price * item.quantity).toLocaleString() }}</span>
                </div>
              </div>
            </div>
            
            <!-- Order Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p class="text-coffee-600"><span class="font-medium">Payment:</span> {{ order.paymentMethod.replace('-', ' ') }}</p>
                <p v-if="order.phone" class="text-coffee-600"><span class="font-medium">Phone:</span> {{ order.phone }}</p>
              </div>
              <div>
                <p v-if="order.specialRequests" class="text-coffee-600">
                  <span class="font-medium">Special Requests:</span> {{ order.specialRequests }}
                </p>
              </div>
            </div>
            
            <!-- Status Update -->
            <div class="flex items-center justify-between pt-4 border-t">
              <div class="flex space-x-2">
                <button 
                  v-for="status in orderStatuses" 
                  :key="status"
                  @click="updateOrderStatus(order.id, status)"
                  :disabled="order.status === status"
                  :class="[
                    'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                    order.status === status 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-coffee-100 text-coffee-600 hover:bg-coffee-200 cursor-pointer'
                  ]"
                >
                  Mark as {{ status }}
                </button>
              </div>
              <div class="text-sm text-coffee-600">
                Last updated: {{ formatDate(order.updatedAt || order.createdAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredOrders.length === 0" class="text-center py-12">
        <div class="text-coffee-300 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        </div>
        <p class="text-coffee-600">No orders found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrderStore } from '../../store/orders'

const orderStore = useOrderStore()

const selectedStatus = ref('all')
const orderStatuses = ['received', 'processing', 'ready', 'completed']

const statusOptions = [
  { value: 'all', label: 'All Orders' },
  { value: 'received', label: 'Received' },
  { value: 'processing', label: 'Processing' },
  { value: 'ready', label: 'Ready' },
  { value: 'completed', label: 'Completed' }
]

const filteredOrders = computed(() => {
  if (selectedStatus.value === 'all') {
    return orderStore.orders
  }
  return orderStore.orders.filter(order => order.status === selectedStatus.value)
})

const updateOrderStatus = async (orderId, status) => {
  try {
    await orderStore.updateOrderStatus(orderId, status)
  } catch (error) {
    console.error('Error updating order status:', error)
    alert('Failed to update order status. Please try again.')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  orderStore.fetchOrders()
})
</script>