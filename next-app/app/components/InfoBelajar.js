"use client";

import { useState } from "react";

export default function InfoBelajar() {
  const [terbuka, setTerbuka] = useState(false);

  function ubahTampilan() {
    setTerbuka((sebelumnya) => !sebelumnya);
  }

  return (
    <section>
      <h2>Proses Belajar</h2>

      <button
        type="button"
        onClick={ubahTampilan}
        aria-expanded={terbuka}
        aria-controls="info-belajar"
      >
        {terbuka ? "Tutup keterangan" : "Lihat keterangan"}
      </button>

      <p id="info-belajar" hidden={!terbuka}>
        Saya membangun portofolio ini sambil mempelajari komponen,
        props, CSS Modules, dan state di React.
      </p>
    </section>
  );
}