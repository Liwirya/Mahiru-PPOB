# 🚀 **Mahiru PPOB - Panduan Setup Bot Mahiru Shiina PPOB** 🛒

Selamat datang di panduan lengkap untuk menyiapkan **Bot Mahiru Shiina PPOB**! 🎉 Bot ini memungkinkan kamu untuk menjalankan transaksi pulsa, top-up game, token listrik, dan berbagai layanan PPOB lainnya menggunakan **API Atlantic**. Ikuti langkah-langkah di bawah ini untuk memulai dengan mudah dan cepat! 🚀

---

## 📖 **Apa Itu Mahiru PPOB?**
Mahiru PPOB adalah bot WhatsApp berbasis **API Atlantic** yang dirancang untuk memudahkan transaksi digital seperti pembelian pulsa, paket data, token listrik, voucher game, dan lainnya. Dengan setup yang tepat, bot ini akan menjadi asisten andalanmu untuk bisnis PPOB! 💼

---

## 🔑 **Cara Mendapatkan API Key Atlantic**

Bot Mahiru Shiina PPOB menggunakan **API Atlantic** untuk menjalankan semua transaksi. Berikut adalah panduan lengkap untuk mendapatkan **API Key** dan menyiapkannya:

### 🛠 **Langkah-langkah Mendapatkan API Key**

1. **Daftar di Atlantic Pedia** 🖱️
   - Kunjungi situs resmi [Atlantic Pedia](https://m.atlantic-pedia.co.id/).
   - Klik tombol **Daftar**, lalu isi formulir pendaftaran dengan data yang valid (nama, email, nomor telepon, dll.).
   - Setelah pendaftaran selesai, login ke **Dashboard** menggunakan akun yang baru dibuat.

2. **Upgrade Akun ke H2H** 🔧
   - Di dalam dashboard, navigasikan ke menu **Profile** atau **Pengaturan Akun**.
   - Pilih opsi **Upgrade Akun H2H** untuk mengaktifkan akses API.
   - Isi formulir upgrade dengan informasi berikut:
     - **Penggunaan**: Tulis bahwa kamu akan menggunakan API untuk *Bot WhatsApp*.
     - **URL/No Bot**: Masukkan nomor WhatsApp yang akan digunakan untuk bot (contoh: *+62xxxxxxxxxx*).
     - **Deskripsi**: Jelaskan secara singkat tujuan penggunaan bot (contoh: "Untuk transaksi PPOB otomatis via WhatsApp").
   - Kirim permintaan upgrade dan tunggu proses verifikasi dari tim CS Atlantic (biasanya memakan waktu hingga **3 hari kerja**).
   - **[Gambar 2: https://img1.pixhost.to/images/6555/612032552_skyzo.jpg]**.

3. **Ambil API Key** 🔐
   - Setelah akunmu diupgrade, kunjungi [Atlantic H2H](https://atlantich2h.com/).
   - Login menggunakan akun Atlantic Pedia yang telah diupgrade.
   - Navigasikan ke menu **API** atau **Pengaturan API** di dashboard.
   - Salin **API Key** yang tersedia di halaman tersebut.
   - **[Gambar 3: https://img1.pixhost.to/images/6555/612033713_skyzo.jpg]**.
   - Paste **API Key** ke konfigurasi bot Mahiru Shiina PPOB (lihat panduan konfigurasi bot di bawah).

4. **Setting Whitelist IP** 🌐
   - Pada pengaturan API, atur **Whitelist IP** ke `0.0.0.0` untuk memungkinkan akses dari semua IP (atau masukkan IP server botmu jika diperlukan untuk keamanan tambahan).
   - Simpan pengaturan dan pastikan API Key sudah aktif.

---

## ⚙️ **Konfigurasi Bot Mahiru Shiina PPOB**

Setelah mendapatkan **API Key**, langkah selanjutnya adalah mengatur bot agar terhubung dengan API Atlantic. Berikut langkah-langkahnya:

1. **Unduh dan Instal Bot** 📥
   - Pastikan kamu sudah memiliki kode sumber atau aplikasi bot Mahiru Shiina PPOB (dapat diunduh dari github resmi [https://github.com/liwiryasenka/Mahiru-PPOB](#)).

2. **Masukkan API Key ke Bot** 🔗
   - Buka file konfigurasi bot bernama `settings.js`.
   - Cari bagian untuk memasukkan **API Key** dan paste kunci yang sudah kamu salin dari Atlantic H2H.
   - Simpan perubahan dan restart bot.

3. **Uji Coba Bot** 🧪
   - Jalankan bot di server ( Panel Ptreodactly, Dll ) atau lokal ( Termux ).
   - Kirim perintah uji coba melalui WhatsApp (contoh: `/deposit` atau `/ceksaldo`).
   - Pastikan bot merespons dengan benar dan dapat menjalankan transaksi via API Atlantic.  
   
---

## 💡 **Tips dan Catatan Penting**
- **Keamanan API Key**: Jangan bagikan API Key kepada siapa pun dan simpan dengan aman.
- **Cek Status Upgrade**: Jika proses upgrade H2H memakan waktu lebih dari 3 hari, hubungi CS Atlantic melalui WhatsApp atau kontak resmi.
- **Backup Konfigurasi**: Selalu buat cadangan file konfigurasi bot sebelum melakukan perubahan.

---

## ❓ **FAQ (Pertanyaan Umum)**

**Q: Berapa lama proses upgrade akun H2H?**  
A: Biasanya memakan waktu hingga 3 hari kerja, tergantung verifikasi dari tim Atlantic.

**Q: Apakah saya perlu server khusus untuk bot?**  
A: Tidak selalu, tetapi server dengan koneksi stabil (seperti VPS) disarankan untuk menjalankan bot 24/7.

**Q: Bagaimana jika bot tidak merespons?**  
A: Periksa kembali API Key, koneksi internet, dan pastikan nomor WhatsApp bot tidak terblokir.

---

## 📢 **Kontak dan Dukungan**
Jika kamu mengalami kendala atau memiliki pertanyaan, hubungi tim pengembang atau komunitas Mahiru PPOB melalui:
- **Email**: wiraliwirya@gmail.com.
- **Chanell WhatsApp**: [https://whatsapp.com/channel/0029VadHRVCEQIagiLHVJV0d](#).

---

**Dibuat dengan ❤️ oleh Liwirya x Mahiru**  
**Credit: By 2025 Liwirya**  
**Terima kasih telah menggunakan Mahiru PPOB! Semoga bisnis PPOB-mu sukses!** 🌟
