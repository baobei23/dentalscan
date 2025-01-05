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

### Persiapan Awal

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

### Instalasi untuk Android

1. Persiapan Development Environment
   - Install Android Studio
   - Install Android SDK (minimal API level 21)
   - Setup ANDROID_HOME environment variable
   - Tambahkan platform-tools ke PATH

2. Setup Emulator/Device
   - Buat Android Virtual Device (AVD) melalui Android Studio
   - Atau gunakan device fisik dengan USB Debugging diaktifkan

3. Jalankan aplikasi
```bash
# Start Metro bundler
npx expo start

# Tekan 'a' untuk menjalankan di Android
# atau
npx expo run:android
```

Untuk panduan lebih lanjut, bisa dilihat di [https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated)

### Instalasi untuk iOS

1. Persiapan Development Environment
   - Install Xcode (versi terbaru)
   - Install Xcode Command Line Tools
   - Install Watchmen
```bash
brew install watchman
```

2. Setup iOS Simulator/Device
   - Buka Xcode dan install iOS Simulator
   - Untuk device fisik, daftar Apple Developer account

3. Install dependencies iOS
```bash
cd ios
pod install
cd ..
```

4. Jalankan aplikasi
```bash
# Start Metro bundler
npx expo start

# Tekan 'i' untuk menjalankan di iOS
# atau
npx expo run:ios
```
Untuk panduan lebih lanjut, bisa dilihat di [https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated)

### Troubleshooting

#### Android
- Pastikan ANDROID_HOME sudah diset dengan benar
- Cek USB Debugging sudah aktif jika menggunakan device fisik
- Bersihkan cache jika terjadi error:
```bash
cd android
./gradlew clean
```

#### iOS
- Pastikan Xcode sudah terinstall dengan benar
- Jika ada error pods, coba:
```bash
cd ios
pod deintegrate
pod install
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

# Demo Video

Anda dapat melihat video demo penggunaan [https://drive.google.com/file/d/1ZJlR2tSJoZS-r3-tkgVy__gqU5bZ7c_L/view?usp=sharing](https://drive.google.com/file/d/1ZJlR2tSJoZS-r3-tkgVy__gqU5bZ7c_L/view?usp=sharing).
