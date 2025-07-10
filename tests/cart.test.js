import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../src/store/cart'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should start with an empty cart', () => {
    const cartStore = useCartStore()
    expect(cartStore.items).toEqual([])
    expect(cartStore.isEmpty).toBe(true)
    expect(cartStore.totalItems).toBe(0)
    expect(cartStore.totalPrice).toBe(0)
  })

  it('should add items to cart', () => {
    const cartStore = useCartStore()
    const mockItem = {
      id: 1,
      name: 'Espresso',
      price: 25000,
      category: 'coffee',
      image: 'test.jpg'
    }

    cartStore.addItem(mockItem)
    
    expect(cartStore.items).toHaveLength(1)
    expect(cartStore.items[0]).toEqual({
      ...mockItem,
      quantity: 1,
      notes: ''
    })
    expect(cartStore.totalItems).toBe(1)
    expect(cartStore.totalPrice).toBe(25000)
  })

  it('should increase quantity when adding same item', () => {
    const cartStore = useCartStore()
    const mockItem = {
      id: 1,
      name: 'Espresso',
      price: 25000,
      category: 'coffee',
      image: 'test.jpg'
    }

    cartStore.addItem(mockItem)
    cartStore.addItem(mockItem)
    
    expect(cartStore.items).toHaveLength(1)
    expect(cartStore.items[0].quantity).toBe(2)
    expect(cartStore.totalItems).toBe(2)
    expect(cartStore.totalPrice).toBe(50000)
  })

  it('should update item quantity', () => {
    const cartStore = useCartStore()
    const mockItem = {
      id: 1,
      name: 'Espresso',
      price: 25000,
      category: 'coffee',
      image: 'test.jpg'
    }

    cartStore.addItem(mockItem)
    cartStore.updateQuantity(1, 3)
    
    expect(cartStore.items[0].quantity).toBe(3)
    expect(cartStore.totalItems).toBe(3)
    expect(cartStore.totalPrice).toBe(75000)
  })

  it('should remove item when quantity is 0', () => {
    const cartStore = useCartStore()
    const mockItem = {
      id: 1,
      name: 'Espresso',
      price: 25000,
      category: 'coffee',
      image: 'test.jpg'
    }

    cartStore.addItem(mockItem)
    cartStore.updateQuantity(1, 0)
    
    expect(cartStore.items).toHaveLength(0)
    expect(cartStore.isEmpty).toBe(true)
  })

  it('should remove item from cart', () => {
    const cartStore = useCartStore()
    const mockItem = {
      id: 1,
      name: 'Espresso',
      price: 25000,
      category: 'coffee',
      image: 'test.jpg'
    }

    cartStore.addItem(mockItem)
    cartStore.removeItem(1)
    
    expect(cartStore.items).toHaveLength(0)
    expect(cartStore.isEmpty).toBe(true)
  })

  it('should clear cart', () => {
    const cartStore = useCartStore()
    const mockItem = {
      id: 1,
      name: 'Espresso',
      price: 25000,
      category: 'coffee',
      image: 'test.jpg'
    }

    cartStore.addItem(mockItem)
    cartStore.clearCart()
    
    expect(cartStore.items).toHaveLength(0)
    expect(cartStore.isEmpty).toBe(true)
  })

  it('should toggle cart visibility', () => {
    const cartStore = useCartStore()
    
    expect(cartStore.isOpen).toBe(false)
    
    cartStore.toggleCart()
    expect(cartStore.isOpen).toBe(true)
    
    cartStore.toggleCart()
    expect(cartStore.isOpen).toBe(false)
  })
})