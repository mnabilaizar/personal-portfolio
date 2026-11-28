import Image from "next/image";
import Link from "next/link";
import { profile } from "../data/profile";
import styles from "../page.module.css";

const title = `Di luar kampus | ${profile.nickname}`;
const description = "Hobi Izar di luar kampus, dari naik gunung hingga mendengarkan musik.";
const canonical = process.env.VERCEL_PROJECT_PRODUCTION_URL ? "/tentang-saya" : undefined;

export const metadata = {
  title,
  description,
  alternates: canonical ? { canonical } : undefined,
  openGraph: { title, description, url: canonical, locale: "id_ID", type: "website" },
};

export default function PersonalPage() {
  return (
    <>
      <header className={`${styles.container} ${styles.personalNav}`}>
        <Link className={styles.personalBrand} href="/" aria-label="Izar, beranda">
          {profile.nickname}<span aria-hidden="true">.</span>
        </Link>
        <Link className={styles.textLink} href="/#tentang">Kembali ke profil</Link>
      </header>
      <main className={`${styles.container} ${styles.personalMain}`}>
        <h1 className={styles.sectionTitle}>Di luar kampus</h1>
        <div className={styles.personalGrid}>
          <figure className={styles.personalFigure}>
            <div className={styles.personalPhoto}>
              <Image
                src="/portrait/puntang.webp"
                alt="Izar duduk di atas batu menghadap pegunungan di Gunung Puntang"
                fill
                sizes="(max-width: 740px) 90vw, 44vw"
                loading="eager"
              />
            </div>
            <figcaption>Gunung Puntang</figcaption>
          </figure>
          <div className={styles.personalCopy}>
            <section aria-labelledby="hiking-title">
              <h2 id="hiking-title" className={styles.detailHeading}>Naik gunung</h2>
              <p>Saya suka mendaki gunung di waktu luang, termasuk perjalanan ke Gunung Papandayan dan Gunung Puntang.</p>
            </section>
            <section aria-labelledby="music-title">
              <h2 id="music-title" className={styles.detailHeading}>Musik</h2>
              <p>Beberapa musisi dan band yang sering saya dengarkan.</p>
              <ul className={styles.artistList} role="list">
                {profile.interests.musicArtists.map((artist) => <li key={artist}>{artist}</li>)}
              </ul>
            </section>
          </div>
        </div>
      </main>
      <footer className={`${styles.container} ${styles.footer}`}>
        <p>{profile.name} · {profile.portfolioYear}</p>
      </footer>
    </>
  );
}
