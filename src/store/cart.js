import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isOpen: false
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    
    isEmpty: (state) => {
      return state.items.length === 0
    }
  },

  actions: {
    addItem(item) {
      const existingItem = this.items.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({
          ...item,
          quantity: 1,
          notes: ''
        })
      }
    },

    removeItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId)
    },

    updateQuantity(itemId, quantity) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(itemId)
        } else {
          item.quantity = quantity
        }
      }
    },

    updateNotes(itemId, notes) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        item.notes = notes
      }
    },

    clearCart() {
      this.items = []
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    openCart() {
      this.isOpen = true
    },

    closeCart() {
      this.isOpen = false
    }
  }
})