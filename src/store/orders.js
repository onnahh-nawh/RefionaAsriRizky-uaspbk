import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3001'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
  }),

  getters: {
    getOrderById: (state) => (id) => {
      return state.orders.find(order => order.id === parseInt(id))
    },
    
    pendingOrders: (state) => {
      return state.orders.filter(order => order.status === 'received' || order.status === 'processing')
    },
    
    completedOrders: (state) => {
      return state.orders.filter(order => order.status === 'ready' || order.status === 'completed')
    }
  },

  actions: {
    async createOrder(orderData) {
      this.loading = true
      this.error = null
      
      try {
        const order = {
          ...orderData,
          id: Date.now(),
          status: 'received',
          createdAt: new Date().toISOString()
        }
        
        const response = await axios.post(`${API_URL}/orders`, order)
        this.currentOrder = response.data
        this.orders.push(response.data)
        return response.data
      } catch (error) {
        this.error = 'Failed to create order'
        console.error('Error creating order:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchOrders() {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`${API_URL}/orders`)
        this.orders = response.data
      } catch (error) {
        this.error = 'Failed to fetch orders'
        console.error('Error fetching orders:', error)
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(orderId, status) {
      try {
        const order = this.orders.find(o => o.id === orderId)
        if (order) {
          const updatedOrder = { ...order, status }
          const response = await axios.put(`${API_URL}/orders/${orderId}`, updatedOrder)
          
          const index = this.orders.findIndex(o => o.id === orderId)
          if (index !== -1) {
            this.orders[index] = response.data
          }
          return response.data
        }
      } catch (error) {
        this.error = 'Failed to update order status'
        console.error('Error updating order status:', error)
        throw error
      }
    },

    clearCurrentOrder() {
      this.currentOrder = null
    }
  }
})