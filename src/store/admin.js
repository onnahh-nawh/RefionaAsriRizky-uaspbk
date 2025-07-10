import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3001'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  

  actions: {
   async login(credentials) {
  this.loading = true
  this.error = null

  try {
    const response = await axios.get(`${API_URL}/admin`)
    const adminList = response.data
    const admin = Array.isArray(adminList) ? adminList[0] : adminList

    if (!admin) {
      this.error = 'Admin not found'
      return false
    }

    if (
      credentials.username === admin.username &&
      credentials.password === admin.password
    ) {
      this.user = { username: admin.username }
      this.isAuthenticated = true
      localStorage.setItem('admin_token', 'authenticated')
      return true
    } else {
      this.error = 'Invalid credentials'
      return false
    }
  } catch (error) {
    this.error = 'Login failed'
    console.error('Error during login:', error)
    return false
  } finally {
    this.loading = false
  }
},


    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('admin_token')
    },

    checkAuth() {
      const token = localStorage.getItem('admin_token')
      if (token === 'authenticated') {
        this.isAuthenticated = true
        this.user = { username: 'admin' }
      }
    }
  }
})