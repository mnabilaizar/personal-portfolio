import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <main className={`${styles.container} ${styles.notFound}`}>
      <h1 className={styles.sectionTitle}>Halaman tidak ditemukan</h1>
      <Link className={styles.primaryAction} href="/">Kembali ke beranda</Link>
    </main>
  );
}
