# DentalScan

DentalScan adalah aplikasi mobile yang menghubungkan pasien dengan dokter gigi dan menyediakan fitur deteksi kesehatan gigi menggunakan AI. Aplikasi ini dibangun dengan React Native dan Expo.

## Fitur Utama

### 1. Deteksi Kesehatan Gigi dengan AI
- Upload foto gigi melalui kamera atau galeri
- Deteksi kondisi gigi menggunakan model AI Roboflow
- Hasil deteksi menampilkan kondisi gigi dan rekomendasi perawatan

### 2. Konsultasi dengan Dokter Gigi
- Lihat daftar dokter gigi beserta rating dan informasi klinik
- Jadwalkan konsultasi dengan memilih tanggal dan waktu
- Tunjukkan lokasi masalah gigi melalui diagram interaktif
- Pembayaran konsultasi yang mudah

### 3. Manajemen Profil
- Edit foto profil
- Lihat riwayat konsultasi
- Pengaturan akun
- Detail pembayaran

## Teknologi yang Digunakan

- React Native
- Expo
- Firebase (Authentication & Storage)
- Roboflow API untuk deteksi AI
- React Navigation untuk navigasi
- Expo Image Picker untuk manajemen gambar

## Instalasi

1. Clone repositori
```bash
git clone https://github.com/username/dentalscan.git
cd dentalscan
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
- Rename `.env.example` ke `.env`
- Isi kredensial Firebase dan Roboflow API key

4. Jalankan aplikasi
```bash
npx expo start
```

## Struktur Proyek

```
dentalscan/
├── assets/          # Gambar dan aset lainnya
├── components/      # Komponen React yang dapat digunakan kembali
├── config/          # Konfigurasi Firebase
├── navigation/      # Setup navigasi
├── screens/         # Halaman-halaman aplikasi
└── utils/          # Fungsi utilitas
```

## Lisensi

Distributed under the MIT License. See `LICENSE` for more information.


Project Link: [https://github.com/username/dentalscan](https://github.com/username/dentalscan)
