<template>
  <div class="admin-login min-h-screen bg-coffee-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-coffee-500">Admin Login</h2>
        <p class="mt-2 text-sm text-coffee-600">Sign in to access the admin dashboard</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="space-y-4">
            <div>
              <label for="username" class="block text-sm font-medium text-coffee-500 mb-2">Username</label>
              <input 
                type="text" 
                id="username"
                v-model="credentials.username"
                class="input-field"
                placeholder="Enter username"
                required
              >
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-coffee-500 mb-2">Password</label>
              <input 
                type="password" 
                id="password"
                v-model="credentials.password"
                class="input-field"
                placeholder="Enter password"
                required
              >
            </div>
          </div>
          
          <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {{ error }}
          </div>
          
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign In</span>
          </button>
        </div>
      </form>
      
      <div class="text-center">
        <p class="text-sm text-coffee-600">
          Demo credentials: admin / admin123
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../store/admin'

const router = useRouter()
const adminStore = useAdminStore()

const credentials = ref({
  username: '',
  password: ''
})

const loading = computed(() => adminStore.loading)
const error = computed(() => adminStore.error)

const handleLogin = async () => {
  const success = await adminStore.login(credentials.value)
  
  if (success) {
    router.push('/admin/dashboard')
  }
}
</script>