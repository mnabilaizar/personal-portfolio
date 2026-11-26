"use client";

import { useState } from "react";
import styles from "../page.module.css";

export default function LatihanApiPage() {
  const [profil, setProfil] = useState(null);
  const [terbuka, setTerbuka] = useState(false);
  const [memuat, setMemuat] = useState(false);
  const [pesanError, setPesanError] = useState("");

  async function ubahTampilan() {
    if (profil) {
      setTerbuka((sebelumnya) => !sebelumnya);
      return;
    }

    setMemuat(true);
    setPesanError("");

    try {
      const response = await fetch("/api/profil");

      if (!response.ok) {
        throw new Error(`Permintaan gagal (${response.status}).`);
      }

      const data = await response.json();

      setProfil(data);
      setTerbuka(true);
    } catch (error) {
      setPesanError(error.message);
    } finally {
      setMemuat(false);
    }
  }

  return (
    <main className={styles.halaman}>
      <div className={styles.konten}>
        <h1>Latihan API</h1>

        <button
          type="button"
          onClick={ubahTampilan}
          disabled={memuat}
          aria-expanded={terbuka}
          aria-controls="hasil-profil"
        >
          {memuat
            ? "Memuat..."
            : terbuka
              ? "Sembunyikan profil"
              : "Tampilkan profil"}
        </button>

        {pesanError && <p role="alert">{pesanError}</p>}

        <div aria-live="polite" aria-busy={memuat}>
          <div id="hasil-profil" hidden={!terbuka}>
            {profil && (
              <section className={styles.kartu}>
                <h2>{profil.nama}</h2>
                <p>{profil.pendidikan}</p>

                <h3>Skills</h3>
                <ul>
                  {profil.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}