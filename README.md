
---

# ☕ Café Bliss

**Café Bliss** adalah proyek tugas akhir mata kuliah **Pemrograman Berbasis Komponen (PBK)**. Aplikasi ini merupakan website pemesanan kopi secara online yang dikembangkan menggunakan pendekatan berbasis komponen dengan **Vue.js 3** dan **JSON Server** sebagai mock backend.

---
## untuk akses agar terdapat data!!
- harus menjalannkan backendnya pada file ini di git bash = 
npx json-server --watch db.json --port 3001
- 
## 🔐 Akses Admin

Untuk mengakses halaman admin, login diperlukan menggunakan kredensial khusus yang telah ditentukan. Setelah login, admin dapat mengelola menu dan pesanan.

untuk mengakses cukup tambah ' /admin ' 
ex: https://refionaasririzky-uaspbk.netlify.app/admin

dan login menggunakan
username = admin
password = admin123 

## 🧱 Teknologi yang Digunakan

Berikut adalah teknologi utama yang digunakan dalam pengembangan aplikasi ini:

* **Vue 3 (Composition API):** Framework frontend berbasis komponen yang modern dan efisien.
* **Pinia:** Manajemen state global aplikasi.
* **Vue Router (History Mode):** Navigasi antar halaman dalam bentuk single-page application (SPA).
* **Tailwind CSS v3:** Framework CSS utility-first untuk membangun UI yang responsif.
* **JSON Server:** Mock REST API untuk pengelolaan data lokal selama pengembangan.
* **Axios:** HTTP client untuk komunikasi dengan API.
* **Vitest:** Unit testing untuk logic store dan komponen.
* **Vite:** Build tool modern dan cepat.

---

## ✨ Fitur Aplikasi

### 👤 Untuk Pengunjung (Tanpa Login)

* 🏠 Halaman landing dengan slogan dan CTA.
* 📋 Melihat menu berdasarkan kategori (kopi, non-kopi, makanan ringan).
* 🛒 Menambah atau menghapus item dari keranjang.
* 🧾 Melakukan checkout dengan mengisi nama dan nomor meja.
* 💳 Memilih metode pembayaran: Tunai, Mobile Banking, atau QRIS.
* 📦 Melacak status pesanan: *Diterima → Diproses → Siap*.
* 🖼️ Melihat galeri dan foto café.
* ❓ Mengakses FAQ dan informasi kontak.

> 🔎 Login tidak diterapkan untuk pengguna agar proses pemesanan lebih sederhana dan cepat. Pengguna hanya perlu mengisi nama dan nomor meja saat checkout.

### 🔐 Untuk Admin

* 🔐 Login admin menggunakan kredensial tertentu.
* 📊 Dashboard ringkasan informasi pesanan dan statistik.
* 📦 CRUD Menu: tambah, ubah, dan hapus item menu.
* 🧾 Manajemen Pesanan: mengubah status pesanan.

---

## 🧭 Struktur Navigasi Halaman

### Untuk Pengguna:

* `/` – Beranda
* `/menu` – Daftar Menu
* `/menu/:id` – Detail Menu
* `/cart` – Keranjang Belanja
* `/checkout` – Checkout
* `/order-success` – Konfirmasi Pesanan

### Untuk Admin:

* `/admin/login` – Login Admin
* `/admin/dashboard` – Dashboard
* `/admin/menu` – Kelola Menu
* `/admin/orders` – Kelola Pesanan

---

## 📂 Struktur Folder Proyek

```
src/
├── assets/               
├── components/       
│   ├── CartSidebar.vue
│   ├── Footer.vue
│   ├── HelloWorld.vue
│   ├── MenuCard.vue
│   ├── Navbar.vue
├── views/ 
│   ├── Home.vue
│   ├── Menu.vue
│   ├── ItemDetail.vue
│   ├── Cart.vue
│   ├── Checkout.vue
│   ├── OrderSuccess.vue
│   └── admin/
│       ├── AdminLogin.vue
│       ├── Dashboard.vue
│       ├── ManageMenu.vue
│       └── ManageOrders.vue
├── router/      
│   └── index.js
├── store/       
│   ├── cart.js
│   ├── menu.js
│   ├── orders.js
│   └── admin.js
├── App.vue
├── main.js
```

---

## 🌐 Struktur JSON Server (Mock API)

```
/menu          → Data menu (GET, POST, PUT, DELETE)
/cart          → Keranjang pengguna
/orders        → Daftar dan status pesanan
/admin/login   → Validasi login admin (simulasi)
/reviews       → Ulasan pelanggan (opsional)
/users         → Data pengguna (opsional)
```

---

## 🧪 Unit Testing

Aplikasi ini menggunakan **Vitest** untuk menguji logic pada store dan komponen Vue.

### Menjalankan Test:

```
npx vitest run
```

---

## 🖥️ Tampilan Responsif

Aplikasi telah dioptimalkan untuk berbagai ukuran layar:

* ✅ **Desktop:** Tampilan penuh, termasuk fitur admin lengkap.
* ✅ **Tablet:** Grid menu fleksibel dan nyaman dibaca.
* ✅ **Mobile:** Navigasi disederhanakan, checkout mudah.

Responsif diatur menggunakan Tailwind breakpoints seperti `md:`, `lg:`, dan `xl:`.

---

## 🚀 Cara Menjalankan Proyek

1. **Clone repository:**

```
git clone link gitnya
cd 
```

2. **Install dependencies:**

```
npm install
```

3. **Jalankan JSON Server di terminal lain:**

```
npx json-server --watch db.json --port 3001
```

4. **Jalankan proyek Vue:**

```
npm run dev
```

5. **Buka di browser:**

```hasil dari npm run dev
```

---

## 📌 Kesimpulan

Proyek **Café Bliss** menunjukkan penerapan nyata dari teknologi **Vue 3**, **Pinia**, dan **Tailwind CSS** dalam membangun aplikasi web modern dan interaktif. Dengan bantuan mock API dari **JSON Server**, aplikasi ini bisa menjadi fondasi awal untuk membangun sistem pemesanan atau POS café yang lebih kompleks dan profesional di masa depan.

---


