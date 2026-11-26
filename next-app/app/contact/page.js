import styles from "../page.module.css";

export const metadata = {
  title: "Contact | Muhammad Nabil Aizar Ramadhan",
};

export default function ContactPage() {
  return (
    <main className={styles.halaman}>
      <div className={styles.konten}>
        <section className={styles.perkenalan}>
          <h1>Contact</h1>
          <p>
            Temukan proyek dan profil profesional saya melalui
            GitHub dan LinkedIn.
          </p>
        </section>

        <div className={styles.daftar}>
          <section className={styles.kartu}>
            <h2>GitHub</h2>
            <p>Lihat kode dan perkembangan proyek saya.</p>
            <a href="https://github.com/mnabilaizar">
              Kunjungi GitHub Izar
            </a>
          </section>

          <section className={styles.kartu}>
            <h2>LinkedIn</h2>
            <p>Lihat profil pendidikan dan pengalaman saya.</p>
            <a href="https://www.linkedin.com/in/muhammad-nabil-aizar-ramadhan-3210b638b/">
              Kunjungi LinkedIn Izar
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
