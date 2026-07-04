# Sistem Konteks & Memori Otak: one2many (Versi Lengkap & Diperbarui)

Dokumen ini berfungsi sebagai bank memori komprehensif untuk **one2many**. File ini dirancang untuk mentransfer seluruh pengetahuan domain bisnis, peta persaingan, analisis pasar, spesifikasi teknis prototipe, dan instruksi perilaku kepada LLM (seperti Claude) agar dapat memberikan asistensi yang sangat akurat.

---

## 1. Identitas Inti & Visi Bisnis
**one2many** adalah agensi kreatif digital terintegrasi model B2B yang bertindak sebagai **one-stop solution** untuk transformasi digital.

**Masalah Utama (Pain Points):** Banyak UMKM premium dan founder startup tahap awal kesulitan melakukan transformasi digital karena harus mengoordinasikan banyak vendor terpisah (UI/UX, web dev, grafis, video). Hal ini memicu pembengkakan biaya, miskomunikasi antar-divisi, dan inkonsistensi identitas merek lintas media.
**Solusi:** one2many menangani seluruh siklus secara *end-to-end* dalam satu titik kontak, menghilangkan *friction* (gesekan) operasional multi-vendor.

---

## 2. Unique Value Proposition (UVP)
* **End-to-End Single-Vendor Bundling:** Satu kontrak dan satu *Dedicated Project Manager* yang mengeksekusi pipeline lengkap dari desain hingga video.
* **Apple-Inspired Minimalist Aesthetic & Modern Tech Stack:** Kombinasi estetika agensi premium global dengan performa *lightning-fast* (berkat Next.js & WebGL) di rentang harga yang ramah UMKM & Startup.
* **Internal Component Library & SOP:** Kepemilikan repositori komponen *private* (UI kit & design tokens) yang memangkas waktu rilis (time-to-launch) hingga 40% lebih cepat tanpa mengorbankan kualitas desain *custom*.

---

## 3. Peta Kompetisi & Positioning Pasar
one2many memosisikan diri di tengah-tengah: lebih terjangkau dari agensi enterprise global, namun jauh lebih premium dan terstruktur dibanding *marketplace freelancer* atau *website builder* instan.
* **Pesaing Langsung (Direct):** Agensi kreatif digital seperti Doxadigital, Arfadia, BrandZtory (lokal), serta Toptal dan Webflow/Framer Studios (global).
* **Pesaing Tidak Langsung (Indirect):** Platform *freelance* (Sribu, Fiverr, Upwork), *tools* desain/web DIY (Canva, Wix, Squarespace, WordPress), dan agensi *performance marketing*.
* **Celah Pasar:** Tidak ada pemain yang konsisten menjembatani gap antara harga yang terjangkau bagi UMKM/Startup dengan kualitas eksekusi bertaraf agensi desain global.

---

## 4. Analisis Ukuran Pasar (TAM, SAM, SOM)
Model bisnis ini didukung oleh analisis ukuran pasar yang terukur secara *bottom-up* dan *top-down*:
* **TAM (Total Addressable Market):** Bernilai **USD 8-10 Miliar** (2025). Mencakup agregasi pasar transformasi digital, layanan IT, dan iklan digital kreatif di seluruh Indonesia dengan tingkat pertumbuhan (CAGR) sekitar 15%.
* **SAM (Serviceable Available Market):** Bernilai **Rp 1,5 Triliun (USD 95 juta)**. Target populasi sekitar 150.000 bisnis (UMKM premium, F&B, pariwisata, seed-stage startup) yang berpusat di ekosistem digital matang seperti Surabaya, Bali, dan Jakarta, dengan asumsi 20% tingkat konversi pasar yang dapat dijangkau.
* **SOM (Serviceable Obtainable Market):** Bernilai **Rp 3,15 Miliar** dalam 2 tahun pertama operasi. Terdiri dari target akuisisi kumulatif **35 klien B2B** (10 klien di Tahun 1; 25 klien di Tahun 2). Terdapat *Quality Control Cap* maksimal 30-50 klien dalam 24 bulan pertama untuk menjaga kualitas premium. Rata-rata pendapatan per klien (Blended ARPC) diestimasi sebesar Rp 78.000.000.

---

## 5. Standar Rekayasa & Teknologi (Tech Stack)
Prototipe dan layanan pelanggan one2many dibangun di atas infrastruktur modern:
* **Frontend & UI/UX:** Next.js 14+ (App Router), React 18+, Tailwind CSS, Three.js & React Three Fiber (untuk WebGL 3D showcase), Framer Motion (animasi UI), Figma (single source of truth).
* **Backend & Infrastruktur:** Node.js/Bun, PostgreSQL (Prisma ORM), Vercel & AWS, Cloudflare, Midtrans/Xendit (Payment Gateway).
* **Mobile:** Kotlin (Native Android), React Native/Flutter.
* **Metodologi:** Agile Scrum (sprint 2 minggu), Design Thinking, Atomic Design System, dan CI/CD automation.

---

## 6. Format Prototipe & Interaksi Klien
Solusi operasional mengusung hibrida *Professional Services* dan *Interactive Web Platform*:
* **Interactive Web Platform (Showcase):** Website agensi dibangun menggunakan WebGL/Three.js sebagai bukti kompetensi *immersive web* dan etalase portofolio.
* **Client Portal (Dashboard Transparansi):** Area khusus B2B yang dilengkapi pelacakan proyek *real-time* (terintegrasi langsung dengan Notion Board & Figma Workspace) serta manajemen penagihan (*invoice*) dan serah terima aset.

---

## 7. Instruksi Operasional untuk LLM (Directives for AI)
Saat memberikan saran, menyusun kode, atau merancang strategi untuk **one2many**, Anda WAJIB mematuhi:
1.  **Kawal Standar Estetika:** Selalu gunakan prinsip desain Apple-style: *whitespace* yang luas, tipografi terkurasi, tata letak bersih, dan *dark mode palette* yang elegan. Tolak ide desain yang berantakan, gradasi norak, atau bergaya *AI slop/template* murahan.
2.  **Kawal Kualitas Kode:** Hasilkan cuplikan kode modern menggunakan React Hooks, utilitas efisien Tailwind CSS, integrasi komponen Next.js terbaru, dan implementasi 3D Three.js jika diminta.
3.  **Pola Pikir B2B & Strategis:** Selalu posisikan solusi untuk meminimalkan *friction* klien, mempertahankan *Quality Control*, dan mengamankan target 35 klien (SOM) dengan nilai ARPC tinggi di dua tahun pertama.