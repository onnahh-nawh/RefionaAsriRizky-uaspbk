<template>
  <div class="manage-menu py-8 bg-coffee-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-coffee-500">Manage Menu</h1>
          <p class="text-coffee-600">Add, edit, and manage your menu items</p>
        </div>
        <div class="flex space-x-4">
          <button @click="showAddForm = true" class="btn-primary">
            Add New Item
          </button>
          <RouterLink to="/admin/dashboard" class="btn-outline">
            Back to Dashboard
          </RouterLink>
        </div>
      </div>

      <!-- Add/Edit Form Modal -->
      <div v-if="showAddForm || editingItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-coffee-500">
                {{ editingItem ? 'Edit Menu Item' : 'Add New Menu Item' }}
              </h2>
              <button @click="closeForm" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="saveItem" class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-coffee-500 mb-2">Name *</label>
                <input 
                  type="text" 
                  id="name"
                  v-model="itemForm.name"
                  class="input-field"
                  required
                >
              </div>
              
              <div>
                <label for="category" class="block text-sm font-medium text-coffee-500 mb-2">Category *</label>
                <select 
                  id="category"
                  v-model="itemForm.category"
                  class="input-field"
                  required
                >
                  <option value="">Select category</option>
                  <option value="coffee">Coffee</option>
                  <option value="non-coffee">Non-Coffee</option>
                  <option value="snacks">Snacks</option>
                </select>
              </div>
              
              <div>
                <label for="price" class="block text-sm font-medium text-coffee-500 mb-2">Price (Rp) *</label>
                <input 
                  type="number" 
                  id="price"
                  v-model="itemForm.price"
                  class="input-field"
                  min="0"
                  required
                >
              </div>
              
              <div>
                <label for="description" class="block text-sm font-medium text-coffee-500 mb-2">Description *</label>
                <textarea 
                  id="description"
                  v-model="itemForm.description"
                  rows="3"
                  class="input-field"
                  required
                ></textarea>
              </div>
              
              <div>
                <label for="image" class="block text-sm font-medium text-coffee-500 mb-2">Image URL *</label>
                <input 
                  type="url" 
                  id="image"
                  v-model="itemForm.image"
                  class="input-field"
                  required
                >
              </div>
              
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="available"
                  v-model="itemForm.available"
                  class="w-4 h-4 text-coffee-500 border-coffee-300 rounded focus:ring-coffee-500"
                >
                <label for="available" class="ml-2 text-sm text-coffee-600">Available</label>
              </div>
              
              <div class="flex space-x-4 pt-4">
                <button type="submit" class="btn-primary flex-1">
                  {{ editingItem ? 'Update Item' : 'Add Item' }}
                </button>
                <button type="button" @click="closeForm" class="btn-outline flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Menu Items Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in items" :key="item.id" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover">
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-semibold text-coffee-500">{{ item.name }}</h3>
              <span class="text-lg font-bold text-coffee-500">Rp {{ item.price.toLocaleString() }}</span>
            </div>
            
            <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
            
            <div class="flex items-center justify-between mb-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-coffee-100 text-coffee-800 capitalize">
                {{ item.category.replace('-', ' ') }}
              </span>
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              ]">
                {{ item.available ? 'Available' : 'Out of Stock' }}
              </span>
            </div>
            
            <div class="flex space-x-2">
              <button @click="editItem(item)" class="btn-primary flex-1 text-sm py-2">
                Edit
              </button>
              <button @click="deleteItem(item.id)" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMenuStore } from '../../store/menu'

const menuStore = useMenuStore()

const showAddForm = ref(false)
const editingItem = ref(null)
const itemForm = ref({
  name: '',
  category: '',
  price: 0,
  description: '',
  image: '',
  available: true
})

const items = computed(() => menuStore.items)

const resetForm = () => {
  itemForm.value = {
    name: '',
    category: '',
    price: 0,
    description: '',
    image: '',
    available: true
  }
}

const closeForm = () => {
  showAddForm.value = false
  editingItem.value = null
  resetForm()
}

const editItem = (item) => {
  editingItem.value = item
  itemForm.value = { ...item }
}

const saveItem = async () => {
  try {
    if (editingItem.value) {
      await menuStore.updateItem(editingItem.value.id, itemForm.value)
    } else {
      await menuStore.createItem(itemForm.value)
    }
    closeForm()
  } catch (error) {
    console.error('Error saving item:', error)
    alert('Failed to save item. Please try again.')
  }
}

const deleteItem = async (id) => {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      await menuStore.deleteItem(id)
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item. Please try again.')
    }
  }
}

onMounted(() => {
  menuStore.fetchItems()
})
</script>