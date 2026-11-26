import styles from "../page.module.css";

export const metadata = {
  title: "Proyek | Muhammad Nabil Aizar Ramadhan",
};

const daftarProyek = [
  {
    id: "basdattravel",
    nama: "BasdatTravel",
    deskripsi:
      "Proyek akademik kelompok untuk merancang basis data pemesanan penerbangan dan hotel.",
    kontribusi:
      "Berkontribusi pada bagian customer, telepon customer, traveler, dan pemesanan.",
    teknologi: ["MySQL", "SQL"],
  },
];

function KartuProyek({ nama, deskripsi, kontribusi, teknologi }) {
  return (
    <article className={styles.kartu}>
      <h2>{nama}</h2>
      <p>{deskripsi}</p>

      <h3>Kontribusi Saya</h3>
      <p>{kontribusi}</p>

      <h3>Teknologi</h3>
      <ul>
        {teknologi.map((namaTeknologi) => (
          <li key={namaTeknologi}>{namaTeknologi}</li>
        ))}
      </ul>
    </article>
  );
}

export default function ProyekPage() {
  return (
    <main className={styles.halaman}>
      <div className={styles.konten}>
        <section className={styles.perkenalan}>
          <h1>Proyek</h1>
          <p>
            Pengalaman menerapkan pemrograman dan perancangan
            sistem melalui proyek akademik.
          </p>
        </section>

        <div className={styles.daftar}>
          {daftarProyek.map((proyek) => (
            <KartuProyek
              key={proyek.id}
              nama={proyek.nama}
              deskripsi={proyek.deskripsi}
              kontribusi={proyek.kontribusi}
              teknologi={proyek.teknologi}
            />
          ))}
        </div>
      </div>
    </main>
  );
}