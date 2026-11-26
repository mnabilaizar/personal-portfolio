import styles from "./page.module.css";
import KartuSkill from "./components/KartuSkill";
import InfoBelajar from "./components/InfoBelajar";

const daftarSkills = [
  {
    id: "java",
    nama: "Java",
    keterangan:
      "Digunakan dalam pembelajaran pemrograman berorientasi objek.",
  },
  {
    id: "sql",
    nama: "SQL",
    keterangan:
      "Digunakan dalam pembelajaran dan proyek basis data.",
  },
  {
    id: "web",
    nama: "Web Development",
    keterangan:
      "Sedang mempelajari HTML, CSS, JavaScript, React, dan Next.js.",
  },
  {
    id: "python",
    nama: "Python",
    keterangan: "Digunakan dalam pembelajaran dasar pemrograman.",
  },
];

function Perkenalan({ nama, pendidikan }) {
  return (
    <section className={styles.perkenalan}>
      <h1>Halo, saya {nama}.</h1>
      <p>{pendidikan}</p>
    </section>
  );
}

export default function Home() {
  return (
    <main className={styles.halaman}>
      <div className={styles.konten}>
        <Perkenalan
          nama="Izar"
          pendidikan="Mahasiswa Sistem dan Teknologi Informasi di ITB."
        />

        <section aria-labelledby="judul-skills">
          <h2 id="judul-skills" className={styles.judulBagian}>
            Skills
          </h2>

          <div className={styles.daftar}>
            {daftarSkills.map((skill) => (
              <KartuSkill
                key={skill.id}
                nama={skill.nama}
                keterangan={skill.keterangan}
              />
            ))}
          </div>
        </section>

        <InfoBelajar />
      </div>
    </main>
  );
}