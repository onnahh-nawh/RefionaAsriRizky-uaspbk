<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center bg-gradient-to-br from-coffee-500 via-coffee-600 to-coffee-700">
      <div class="absolute inset-0 bg-black/30"></div>
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')"></div>
      <div class="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Welcome to <span class="text-cream">Café Bliss</span>
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-coffee-100 animate-slide-up">
          Where every cup tells a story of passion and perfection
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <RouterLink to="/menu" class="bg-cream text-coffee-700 px-8 py-4 rounded-lg font-semibold hover:bg-white transition-colors duration-300 transform hover:scale-105">
            Order Now
          </RouterLink>
          <a href="#about" class="border-2 border-cream text-cream px-8 py-4 rounded-lg font-semibold hover:bg-cream hover:text-coffee-700 transition-colors duration-300 transform hover:scale-105">
            Learn More
          </a>
        </div>
      </div>
    </section>

    <!-- Featured Menu -->
    <section class="py-16 bg-milk">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">Featured Menu</h2>
          <p class="section-subtitle">Discover our handcrafted favorites</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="item in featuredItems" :key="item.id">
            <MenuCard :item="item" />
          </div>
        </div>
        
        <div class="text-center mt-12">
          <RouterLink to="/menu" class="btn-primary">
            View Full Menu
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="section-title text-left">Our Story</h2>
            <p class="text-lg text-coffee-600 mb-6">
              Founded in 2025, Café Bliss has been serving the finest coffee experience to our beloved customers. 
              We believe that great coffee brings people together and creates moments of pure bliss.
            </p>
            <p class="text-lg text-coffee-600 mb-8">
              Our skilled baristas carefully craft each cup using premium beans sourced from sustainable farms around the world.
              Every sip is a testament to our commitment to quality and passion for coffee.
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <h3 class="text-2xl font-bold text-coffee-500 mb-2">500+</h3>
                <p class="text-coffee-600">Happy Customers</p>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-coffee-500 mb-2">20+</h3>
                <p class="text-coffee-600">Menu Items</p>
              </div>
            </div>
          </div>
          <div class="relative">
            <img src="https://images.pexels.com/photos/4350055/pexels-photo-4350055.jpeg?auto=compress&cs=tinysrgb&w=600" 
                 alt="Coffee preparation" 
                 class="rounded-2xl shadow-xl">
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-coffee-500 rounded-full opacity-20"></div>
            <div class="absolute -top-6 -right-6 w-24 h-24 bg-sage rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-16 bg-coffee-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">Gallery</h2>
          <p class="section-subtitle">Moments captured at Café Bliss</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(image, index) in galleryImages" :key="index" class="group cursor-pointer overflow-hidden rounded-xl">
            <img :src="image" :alt="`Gallery image ${index + 1}`" 
                 class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300">
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">Visit Us</h2>
          <p class="section-subtitle">Find us at the heart of the city</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div class="bg-coffee-50 rounded-xl p-8 h-full">
              <h3 class="text-2xl font-bold text-coffee-500 mb-6">Get in Touch</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-coffee-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-coffee-500">Address</p>
                    <p class="text-coffee-600">Karya I, Pekanbaru, Riau</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-coffee-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-coffee-500">Phone</p>
                    <p class="text-coffee-600">+62 822 8951 0703</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-coffee-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-coffee-500">Email</p>
                    <p class="text-coffee-600">helloJawa@cafebliss.com</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-8">
                <h4 class="font-semibold text-coffee-500 mb-4">Opening Hours</h4>
                <div class="space-y-2 text-coffee-600">
                  <div class="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>7:00 AM - 10:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Saturday</span>
                    <span>8:00 AM - 11:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Sunday</span>
                    <span>8:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div class="bg-gray-300 rounded-xl h-96 flex items-center justify-center">
              <div class="text-center">
                <svg class="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p class="text-gray-600">Interactive map here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMenuStore } from '../store/menu'
import MenuCard from '../components/MenuCard.vue'

const menuStore = useMenuStore()
const featuredItems = ref([])

const galleryImages = [
  'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1833399/pexels-photo-1833399.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/27009514/pexels-photo-27009514.jpeg?auto=compress&cs=tinysrgb&w=400', // ✅ GANTI INI
  'https://images.pexels.com/photos/1833586/pexels-photo-1833586.jpeg?auto=compress&cs=tinysrgb&w=400'
]


onMounted(async () => {
  await menuStore.fetchItems()
  featuredItems.value = menuStore.availableItems.slice(0, 6)
})
</script>