# Portofolio Izar

Aplikasi Next.js berada di `next-app/`. Direktori ini juga menjadi Root Directory di Vercel.

## Pratinjau lokal

Jalankan perintah berikut dari root repositori.

```sh
cd next-app
npm ci
npm run dev
```

Buka `http://localhost:3000`. Dari direktori `next-app/`, jalankan `npm run lint` untuk memeriksa kode atau `npm run build` untuk membuat build produksi. `npm run start` menjalankan build tersebut.

## Memperbarui konten

- `app/data/profile.js` memuat identitas, pendidikan, kemampuan, pengalaman, kontak, dan daftar musisi pada halaman `/tentang-saya`.
- `app/data/certificates.js` memuat daftar kredensial. Setiap entri membutuhkan `id` unik dan `title`. Isi `issuer` dan `date` jika diketahui. Tanggal menerima format `YYYY`, `YYYY-MM`, atau `YYYY-MM-DD`.
- Tambahkan `thumbnail` sebagai objek berisi `src`, `width`, `height`, dan `alt` opsional. `documentUrl` dan `verificationUrl` juga opsional. Viewer tersedia untuk entri yang memiliki thumbnail atau dokumen asli.
- Simpan aset sertifikat yang disiapkan untuk publik di `public/credentials/`. Gunakan jalur seperti `/credentials/nama-file.webp` untuk thumbnail dan `/credentials/nama-file.pdf` untuk dokumen asli. Untuk pratinjau yang jelas, gunakan salinan gambar dengan proporsi dokumen aslinya.
