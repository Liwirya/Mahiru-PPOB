# Mahiru PPOB Bot 🤖

Selamat datang di Mahiru PPOB, sebuah *framework* bot WhatsApp yang dirancang untuk mengotomatisasi transaksi PPOB (Payment Point Online Bank) melalui **API Atlantic**. Dokumentasi ini akan memandu Anda melalui seluruh proses, mulai dari penyiapan kredensial API hingga bot Anda siap beroperasi.

![Versi](https://img.shields.io/badge/versi-1.0.0-blue.svg)
![Lisensi](https://img.shields.io/badge/lisensi-MIT-green.svg)
![Status](https://img.shields.io/badge/status-Aktif-brightgreen.svg)

---

## 🖼️ Tampilan Antarmuka
![Showcase Bot Mahiru](https://files.catbox.moe/h9tt6l.jpg)

---

## 📖 Konsep Dasar & Arsitektur

Mahiru PPOB berfungsi sebagai *client* yang menjembatani interaksi pengguna di WhatsApp dengan *endpoint* dari **Atlantic PPOB H2H (Host-to-Host)**. Setiap perintah transaksi yang dikirim oleh pengguna akan diteruskan ke API Atlantic untuk dieksekusi, dan hasilnya akan dikembalikan kepada pengguna melalui WhatsApp.

**Alur Kerja Sistem:**
`Pengguna (WhatsApp) -> Bot Mahiru (Server Anda) -> API Atlantic -> Eksekusi Transaksi`

---

## 🛠️ Fase 1: Penyiapan Kredensial API Atlantic

Sebelum menginstal bot, Anda wajib memiliki **API Key** dan **API Secret** (jika ada) dari Atlantic. Kredensial ini adalah kunci otentikasi agar bot Anda dikenali oleh server Atlantic.

### Langkah 1: Registrasi & Upgrade Akun
Proses ini krusial dan membutuhkan verifikasi manual dari pihak Atlantic.

1.  **Registrasi Akun Utama**
    - Akses portal pendaftaran di [**Atlantic Pedia**](https://m.atlantic-pedia.co.id/).
    - Lakukan registrasi dengan data yang valid dan selesaikan proses verifikasi email.

2.  **Permintaan Upgrade Akun H2H**
    - Setelah login, navigasikan ke menu **Profile** dan temukan opsi **Upgrade Akun H2H**.
    - Isi formulir pengajuan dengan detail berikut:
        - **Penggunaan API**: `Bot Transaksi WhatsApp Otomatis`
        - **URL/Nomor Bot**: Masukkan nomor WhatsApp yang akan Anda gunakan untuk bot.
        - **Deskripsi**: `Bot untuk melayani transaksi PPOB via WhatsApp menggunakan API Atlantic.`
    - Kirim formulir dan tunggu proses approval. **Proses ini dapat memakan waktu hingga 3 hari kerja.**
    ![Proses Upgrade H2H](https://img1.pixhost.to/images/6555/612032552_skyzo.jpg)

### Langkah 2: Pengambilan Kredensial API
Setelah akun Anda disetujui untuk akses H2H, Anda dapat mengambil kredensial.

1.  **Login ke Portal H2H**
    - Kunjungi portal khusus developer di [**Atlantic H2H**](https://atlantich2h.com/).
    - Gunakan kredensial akun yang sama dengan Atlantic Pedia.

2.  **Ambil API Key**
    - Masuk ke menu **Pengaturan API**. Di halaman ini, Anda akan menemukan **API Key** Anda.
    - **Salin** dan simpan kredensial ini di tempat yang aman. Kredensial ini bersifat rahasia.
    ![Lokasi API Key](https://img1.pixhost.to/images/6555/612033713_skyzo.jpg)

### Langkah 3: Konfigurasi Keamanan API
Untuk memastikan bot dapat berkomunikasi dengan server, konfigurasikan *whitelist IP*.

-   Di menu yang sama, temukan pengaturan **Whitelist IP**.
-   Atur nilainya ke `0.0.0.0`. Pengaturan ini mengizinkan koneksi dari alamat IP manapun. Untuk keamanan tingkat lanjut, Anda bisa memasukkan alamat IP spesifik dari server tempat bot Anda di-host.

---

## ⚙️ Fase 2: Instalasi & Konfigurasi Bot

Dengan kredensial API di tangan, kini saatnya mengkonfigurasi dan menjalankan bot Mahiru.

### Prasyarat
-   Node.js (v16 atau lebih tinggi)
-   Git
-   Koneksi internet yang stabil

### Langkah 1: Clone Repositori
Buka terminal atau command prompt Anda, lalu jalankan perintah berikut untuk mengunduh kode sumber bot.
```bash
git clone [https://github.com/liwiryasenka/Mahiru-PPOB.git](https://github.com/liwiryasenka/Mahiru-PPOB.git)
cd Mahiru-PPOB
```

### Langkah 2: Instalasi Dependensi
Instal semua package Node.js yang dibutuhkan oleh bot.
```bash
npm install
```

### Langkah 3: Konfigurasi Environment
Buka file settings.js dan masukkan semua informasi yang diperlukan. File ini adalah pusat konfigurasi bot Anda
```bash
const payment = {

    all: {

        atas_nama: "wira" // 📛 Nama untuk transaksi

    }

};

// 🔑 API Key untuk Atlantic

const apikeyAtlantic = "4Davk3CWkdZ2HnrsuvIGkCRPeeIhFm8pY9BrMEr9pxjpZCCsuGlC8U83OOK2SK8TlqaSwYdusWpuBLNZwLyAg5SAmE2WIvGr26VB"; // 🔐 Masukkan API Key Atlantic di sini

// ⚙️ Pengaturan Bot

global.ownerNumber = "6283879152564@s.whatsapp.net"; // 📱 Nomor WhatsApp Owner ( Kamu )
```

### Langkah 4: Jalankan Bot
Setelah konfigurasi selesai, jalankan bot menggunakan perintah berikut.
```bash
npm start
```

---

# 💡 Troubleshooting & FAQ
# T: Proses upgrade H2H saya lebih dari 3 hari. Apa yang harus dilakukan?
<b>J</b>: Hubungi layanan pelanggan (CS) resmi Atlantic Pedia melalui kontak yang tersedia di situs mereka. Lampirkan email atau username Anda untuk mempercepat pengecekan.

# T: Bot menampilkan error terkait "Authentication Failed" atau "Invalid API Key".
<b>J</b>: Ini berarti API Key Anda salah atau belum aktif. Pastikan Anda telah menyalinnya dengan benar dari portal Atlantic H2H dan akun Anda sudah berstatus H2H.

# T: Apakah bot ini gratis?
<b>J</b>: Framework bot Mahiru ini gratis dan open-source. Namun, Anda tetap bertanggung jawab atas biaya transaksi dan saldo yang Anda depositkan ke akun Atlantic Pedia.

---

# 📢 Dukungan & Komunitas
Untuk pertanyaan, diskusi, atau laporan bug, silakan hubungi kami melalui:

Email Pengembang: wiraliwirya@gmail.com

Channel Komunitas WhatsApp: Gabung di Sini

Laporkan Isu: Buka issue baru di halaman GitHub.

--

Dibuat dengan ❤️ oleh Liwirya x Mahiru © 2025 Liwirya. All rights reserved.
