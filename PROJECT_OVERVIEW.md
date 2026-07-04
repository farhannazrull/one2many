# one2many - B2B Digital Creative Agency

Dokumen ini berfungsi sebagai panduan komprehensif mengenai arsitektur, model bisnis, dan struktur teknis dari platform website agensi digital **one2many**.

---

## 1. Identitas & Model Bisnis

**one2many** adalah agensi kreatif digital terintegrasi yang beroperasi di bawah model B2B. 
Fokus utamanya adalah menjadi **satu titik kontak (one-stop solution)** bagi UMKM premium, *seed-stage startup*, dan perusahaan korporat menengah yang ingin melakukan transformasi digital secara penuh.

### Target Pasar
*   **Startup & UMKM:** Membutuhkan *time-to-market* yang cepat untuk MVP dan *rebranding*.
*   **F&B, Pariwisata, dan Hospitality:** Sektor bisnis yang mengandalkan estetika visual tinggi untuk sosial media dan *booking engine*.
*   **Korporat B2B:** Mencari transisi yang mulus ke digital tanpa harus menghadapi *friction* atau miskomunikasi karena menyewa vendor terpisah (desainer, web dev, videografer).

### Unique Value Proposition (UVP)
Meniadakan kebingungan dan hambatan biaya dari multi-vendor. Menggabungkan pembuatan *Brand Identity*, *UI/UX Design*, *Web Development*, hingga *Video Production* ke dalam **satu pipeline terpadu**.

---

## 2. Struktur Arsitektur & Routing Platform

Platform web dibangun menggunakan arsitektur *Multi-Page Application (MPA)* modern. Seluruh halaman telah di-*generate* secara statis untuk performa maksimal dan optimalisasi SEO.

### Peta Navigasi
Platform ini terdiri dari 6 halaman utama yang melayani *user journey* B2B:

1.  **`/` (Home):** 
    Halaman *landing* utama. Menyajikan *Hero Section* dengan kalimat *hook* yang tegas ("Satu Vendor. Solusi Bisnis Anda."), dilanjutkan dengan pameran kilat (*overview*) dari *value proposition* dan deretan testimoni/logo klien.
    
2.  **`/services` (Layanan):** 
    Etalase layanan utama agensi. 
    *   **Fitur:** Menampilkan 4 pilar utama layanan. Setiap layanan memiliki *link* dinamis (`/services/[slug]`).
    *   **Dynamic Routes (`/services/[slug]`):** Halaman spesifik (misal: `/services/ui-ux-design`) yang merinci *output* deliverables, penjelasan detail, dan tombol pemesanan *call-to-action* (CTA) langsung.

3.  **`/work` (Karya & Portofolio):** 
    Penggabungan antara halaman *highlight* (Karya Terbaik) dan direktori lengkap (Katalog Proyek).
    *   **Fitur:** Dilengkapi dengan fitur filter responsif (berdasarkan *tags*: Web Dev, Branding, Video, dll) dan *search bar* pintar untuk mencari studi kasus spesifik.

4.  **`/pricing` (Investasi & Harga):** 
    Halaman transparansi biaya B2B.
    *   **Bundle:** Menampilkan paket *End-to-End* (*Seed Startup* dan *Digital Transformation*).
    *   **A-la-carte (Satuan):** Menampilkan *grid* layanan satuan. Jika diklik, akan memunculkan *Pop-up Modal* berisi rincian item (*itemized pricing*) sehingga layar tidak terlihat sumpek oleh angka.

5.  **`/team` (Tentang Kami / Tim Inti):** 
    Menonjolkan profil "Pasukan Khusus".
    *   **Konteks:** Agensi B2B lebih suka bekerja dengan spesialis. Halaman ini memperlihatkan *Core Team* (Creative Director, Frontend Lead, dsb) lengkap dengan tautan sosial mereka, alih-alih deretan ratusan nama anonim. Terdapat juga menu untuk rekrutmen.

6.  **`/contact` (Hubungi Kami):** 
    Mesin utama untuk mengonversi pengunjung menjadi prospek (*Leads/Booking*).
    *   **Fitur Auto-Select:** Jika *user* datang dari halaman detail layanan (misal dari halaman `/pricing` atau `/services/graphic-design`), form `Layanan yang Dibutuhkan` di halaman kontak ini akan langsung terisi secara otomatis berkat *URL query params* (`?service=...`).

---

## 3. Teknologi (Tech Stack)

Aplikasi dibangun menggunakan alat berstandar industri dengan fokus pada **kecepatan (Lightning Fast)** dan skalabilitas jangka panjang:

*   **Framework Utama:** Next.js (App Router) & React.
*   **Styling:** Tailwind CSS (dikombinasikan dengan modul *globals.css* untuk pendefinisian token *light/dark mode* yang konsisten).
*   **Tipografi:** Plus Jakarta Sans (diintegrasikan via `next/font/google`). Menggantikan *Inter* untuk memberikan kesan *high-end/premium agency*.
*   **Animasi:** Framer Motion (Transisi halus di tiap *scroll*, *hover effects*, dan interaksi Modal Pop-up).
*   **Ikonografi:** FontAwesome 6 (CDN).

---

## 4. Fitur Teknis Utama (Key Technical Features)

1.  **Light/Dark Mode Dinamis:**
    Terintegrasi di level fundamental aplikasi (`layout.tsx`). Tema tersimpan di `localStorage` dan merespons preferensi sistem jika belum pernah diatur. Navbar dan seluruh antarmuka bereaksi mulus terhadap pergantian tema tanpa *flash*.

2.  **Statik & SEO Friendly (SSG):**
    Semua halaman di-*build* sebagai konten statis, kecuali parameter pencarian dinamis (seperti form *Contact* yang menggunakan `<Suspense>`). Ini menjamin skor Core Web Vitals yang nyaris sempurna.

3.  **Data Manajemen Sentralistik:**
    Aset-aset proyek dan portofolio diambil dari sentra data lokal (`data/projects.ts`) sehingga memudahkan pengelolaan konten baru tanpa harus memodifikasi struktur komponen.

---

*(Dokumen ini dapat digunakan sebagai referensi cepat atau prompt masukan kepada AI lain untuk mengembangkan fitur lanjutan)*

---

## 5. Log Perubahan Terbaru (Recent Updates)

1.  **Migrasi ke Multi-Page Application (MPA):**
    *   Mengubah struktur website dari satu halaman panjang (*SPA*) menjadi rute-rute terpisah: `/` (Home), `/services`, `/work`, `/pricing`, `/team`, dan `/contact`.
    *   Memindahkan `Navbar` dan `Footer` ke dalam `RootLayout` agar persisten di seluruh halaman tanpa *reload*.

2.  **Rombak Total Tipografi & Estetika:**
    *   Mengganti font dari **Inter** (yang dianggap terlalu generik/vibe coding) menjadi **Plus Jakarta Sans** untuk kesan premium agensi global.
    *   Melakukan penyesuaian *tracking* (*letter-spacing*) negatif (`-0.05em`) pada seluruh *heading* utama agar tampilan lebih mampat dan elegan (Apple-style).
    *   Menetapkan **Light Mode** sebagai tema bawaan (*default*).

3.  **Standarisasi Header Halaman:**
    *   Menyamakan seluruh judul di halaman internal (`/services`, `/work`, dsb) dengan format *Left-Aligned Display Title* yang konsisten.
    *   Menghapus elemen visual yang terlalu ramai (seperti poster "KARYA TERBAIK" yang besar) digantikan dengan desain yang lebih bersih dan profesional.

4.  **Sistem Pricing & Konversi Pintar:**
    *   **Detailed Pricing:** Menambahkan rincian harga per item layanan satuan (misal: Logo, Landing Page, dsb).
    *   **Interaction Design:** Mengimplementasikan `PricingModal`, sehingga rincian harga hanya muncul saat kartu layanan diklik (menjaga UI tetap bersih).
    *   **Auto-Fill Service Parameter:** Menghubungkan halaman layanan dan harga ke halaman kontak via *URL Query Params* (`?service=...`). Form kontak kini otomatis memilih layanan yang diinginkan pengguna saat mereka datang dari halaman spesifik.

5.  **Optimasi & Perbaikan Bug:**
    *   **Fix Layout Clipping:** Memperbaiki animasi teks *rotating* di Hero yang sebelumnya terpotong pada kata-kata panjang.
    *   **Clean-up Cache:** Membersihkan folder `.next` dan menghentikan proses *zombie* untuk mengatasi *error compaction/lock* pada Turbopack.
    *   **Linter Fix:** Memperbaiki *ReferenceError* (`menuOpen`) dan mematuhi aturan *React Hooks* pada pengaturan tema di Navbar.

6.  **Penggabungan & Reorganisasi Konten:**
    *   Menggabungkan `Work` (Highlight) dan `Repository` (Katalog Lengkap) ke dalam satu halaman `/work` yang kohesif.
    *   Membuat halaman `/team` khusus untuk menonjolkan kredibilitas tim inti agensi.
