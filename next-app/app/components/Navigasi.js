import Link from "next/link";
import styles from "./Navigasi.module.css";

export default function Navigasi() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigasi} aria-label="Navigasi utama">
        <Link href="/" className={styles.nama}>
          Izar
        </Link>

        <div className={styles.tautan}>
          <Link href="/">Home</Link>
          <Link href="/tentang">Tentang</Link>
          <Link href="/proyek">Proyek</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/latihan-api">Latihan API</Link>
        </div>
      </nav>
    </header>
  );
}