<template>
  <div class="admin-dashboard py-8 bg-coffee-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-coffee-500">Admin Dashboard</h1>
          <p class="text-coffee-600">Welcome back, {{ adminStore.user?.username }}</p>
        </div>
        <button @click="logout" class="btn-outline">
          Logout
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 bg-coffee-100 rounded-lg">
              <svg class="w-6 h-6 text-coffee-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-coffee-500">Total Orders</h3>
              <p class="text-2xl font-bold text-coffee-600">{{ orders.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-coffee-500">Pending Orders</h3>
              <p class="text-2xl font-bold text-coffee-600">{{ pendingOrders.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-coffee-500">Completed</h3>
              <p class="text-2xl font-bold text-coffee-600">{{ completedOrders.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 bg-sage/20 rounded-lg">
              <svg class="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-coffee-500">Total Revenue</h3>
              <p class="text-2xl font-bold text-coffee-600">Rp {{ totalRevenue.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-coffee-500 mb-4">Quick Actions</h2>
          <div class="space-y-3">
            <RouterLink to="/admin/menu" class="flex items-center p-3 bg-coffee-50 rounded-lg hover:bg-coffee-100 transition-colors">
              <svg class="w-5 h-5 text-coffee-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <span>Manage Menu</span>
            </RouterLink>
            <RouterLink to="/admin/orders" class="flex items-center p-3 bg-coffee-50 rounded-lg hover:bg-coffee-100 transition-colors">
              <svg class="w-5 h-5 text-coffee-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <span>View Orders</span>
            </RouterLink>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-coffee-500 mb-4">Recent Orders</h2>
          <div class="space-y-3">
            <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between p-3 bg-coffee-50 rounded-lg">
              <div>
                <p class="font-medium text-coffee-500">#{{ order.id }}</p>
                <p class="text-sm text-coffee-600">{{ order.customerName }} - Table {{ order.tableNumber }}</p>
              </div>
              <span :class="[
                'px-2 py-1 text-xs font-medium rounded-full',
                order.status === 'received' ? 'bg-blue-100 text-blue-800' :
                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'ready' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              ]">
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../store/admin'
import { useOrderStore } from '../../store/orders'

const router = useRouter()
const adminStore = useAdminStore()
const orderStore = useOrderStore()

const orders = computed(() => orderStore.orders)
const pendingOrders = computed(() => orderStore.pendingOrders)
const completedOrders = computed(() => orderStore.completedOrders)
const recentOrders = computed(() => orders.value.slice(0, 5))

const totalRevenue = computed(() => {
  return orders.value.reduce((total, order) => total + order.total, 0)
})

const logout = () => {
  adminStore.logout()
  router.push('/admin/login')
}

onMounted(() => {
  orderStore.fetchOrders()
})
</script>