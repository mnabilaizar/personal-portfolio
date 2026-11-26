import Link from "next/link";
import styles from "../page.module.css";

export default function TentangPage() {
  return (
    <main className={styles.halaman}>
      <div className={styles.konten}>
        <section className={styles.perkenalan}>
          <h1>Tentang Saya</h1>
          <p>
            Saya Izar, mahasiswa Sistem dan Teknologi Informasi
            di Institut Teknologi Bandung.
          </p>
        </section>

        <section className={styles.kartu}>
          <h2>Latar Belakang</h2>
          <p>
            Saya memiliki dasar pemrograman menggunakan C, Java,
            dan Python serta pengalaman mempelajari basis data
            dan SQL.
          </p>
          <p>
            Saat ini saya sedang mengembangkan kemampuan web
            development melalui proyek portofolio pribadi.
          </p>
        </section>

        <Link href="/">Kembali ke halaman utama</Link>
      </div>
    </main>
  );
}