import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3001'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    items: [],
    categories: ['coffee', 'non-coffee', 'snacks'],
    loading: false,
    error: null
  }),

  getters: {
    getItemById: (state) => (id) => {
      return state.items.find(item => item.id === parseInt(id))
    },
    
    getItemsByCategory: (state) => (category) => {
      return state.items.filter(item => item.category === category && item.available)
    },
    
    availableItems: (state) => {
      return state.items.filter(item => item.available)
    }
  },

  actions: {
    async fetchItems() {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`${API_URL}/menu`)
        this.items = response.data
      } catch (error) {
        this.error = 'Failed to fetch menu items'
        console.error('Error fetching menu items:', error)
      } finally {
        this.loading = false
      }
    },

    async createItem(item) {
      try {
        const response = await axios.post(`${API_URL}/menu`, item)
        this.items.push(response.data)
        return response.data
      } catch (error) {
        this.error = 'Failed to create menu item'
        console.error('Error creating menu item:', error)
        throw error
      }
    },

    async updateItem(id, updates) {
      try {
        const response = await axios.put(`${API_URL}/menu/${id}`, updates)
        const index = this.items.findIndex(item => item.id === id)
        if (index !== -1) {
          this.items[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = 'Failed to update menu item'
        console.error('Error updating menu item:', error)
        throw error
      }
    },

    async deleteItem(id) {
      try {
        await axios.delete(`${API_URL}/menu/${id}`)
        this.items = this.items.filter(item => item.id !== id)
      } catch (error) {
        this.error = 'Failed to delete menu item'
        console.error('Error deleting menu item:', error)
        throw error
      }
    }
  }
})