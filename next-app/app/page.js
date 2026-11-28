import Image from "next/image";
import Link from "next/link";
import CertificateGallery from "./components/CertificateGallery";
import Navigasi from "./components/Navigasi";
import { certificates } from "./data/certificates";
import { profile } from "./data/profile";
import styles from "./page.module.css";

const navigation = [
  { id: "home", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "kemampuan", label: "Kemampuan" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "sertifikat", label: "Sertifikat" },
  { id: "kontak", label: "Kontak" },
];

const month = new Intl.DateTimeFormat("id-ID", {
  month: "long",
  timeZone: "UTC",
});

const monthAndYear = new Intl.DateTimeFormat("id-ID", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function ExperiencePeriod({ start, end }) {
  const sameYear = end && start.slice(0, 4) === end.slice(0, 4);
  const startFormat = sameYear ? month : monthAndYear;

  return (
    <p className={styles.experiencePeriod}>
      <time dateTime={start}>{startFormat.format(new Date(start))}</time>
      {"–"}
      {end ? <time dateTime={end}>{monthAndYear.format(new Date(end))}</time> : "sekarang"}
    </p>
  );
}

export default function Home() {
  const { institution, program } = profile.education[0];

  return (
    <>
      <a className="skip-link" href="#home">Lewati ke konten</a>
      <Navigasi items={navigation} name={profile.nickname} />

      <main>
        <section id="home" aria-labelledby="home-title" tabIndex={-1} className={styles.hero}>
          <div className={styles.heroVisual}>
            <Image
              className={styles.heroPhoto}
              src="/portrait/izar-original.webp"
              alt="Potret Izar"
              fill
              sizes="(max-width: 540px) and (orientation: portrait) 165vw, (max-width: 680px) 100vw, 70vw"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className={`${styles.container} ${styles.heroInner}`}>
            <h1 id="home-title">{profile.name}</h1>
          </div>
        </section>

        <div className={styles.container}>
          <section id="tentang" aria-labelledby="about-title" tabIndex={-1} className={styles.section}>
            <h2 id="about-title" className={styles.sectionTitle}>Tentang saya</h2>
            <div className={styles.aboutGrid}>
              <figure className={styles.aboutFigure} data-scroll-fade>
                <div className={styles.aboutPhoto}>
                  <Image
                    src="/portrait/papandayan.webp"
                    alt="Izar berdiri di tengah hutan berkabut di Gunung Papandayan"
                    fill
                    sizes="(max-width: 740px) 90vw, 38vw"
                  />
                </div>
                <figcaption>Gunung Papandayan</figcaption>
              </figure>
              <div className={styles.aboutCopy}>
                <p className={styles.aboutLead}>Saya Izar, mahasiswa {program} di {institution}.</p>
                <p className={styles.aboutSummary}>{profile.introduction}</p>
                <ul className={styles.aboutPoints} role="list">
                  {profile.about.map(({ title, description }) => (
                    <li key={title} data-scroll-fade>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </li>
                  ))}
                </ul>
                <Link href="/tentang-saya" className={styles.textLink}>Di luar kampus</Link>
              </div>
            </div>

            <div className={styles.education}>
              <h3 className={styles.detailHeading}>Pendidikan</h3>
              <ul role="list">
                {profile.education.map(({ institution, program, from, to, estimatedGraduation, gpa }) => (
                  <li key={institution} className={styles.educationRow} data-scroll-fade>
                    <div>
                      <h4>{institution}</h4>
                      {program && <p>{program}</p>}
                    </div>
                    <div className={styles.educationMeta}>
                      <p>
                        <time dateTime={from}>{from}</time>{"–"}<time dateTime={to}>{to}</time>
                        {estimatedGraduation && " (perkiraan lulus)"}
                      </p>
                      {gpa && <p className={styles.gpa}>IPK {gpa}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="kemampuan" aria-labelledby="skills-title" tabIndex={-1} className={styles.section}>
            <h2 id="skills-title" className={styles.sectionTitle}>Kemampuan dan tools</h2>
            <div className={styles.skillLevels}>
              {profile.skills.map(({ level, groups }) => (
                <div className={styles.skillLevel} key={level}>
                  <h3>{level}</h3>
                  {groups.map(({ label, description, tools }) => (
                    <div className={styles.skillGroup} key={label} data-scroll-fade>
                      <div>
                        <h4>{label}</h4>
                        <p>{description}</p>
                      </div>
                      <ul className={styles.technologyList} role="list">
                        {tools.map(({ name, icon, iconWidth = 26 }) => (
                          <li key={icon}>
                            <Image
                              src={`/technology/${icon}.svg`}
                              alt=""
                              width={iconWidth}
                              height={26}
                              unoptimized
                            />
                            <span>{name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section id="pengalaman" aria-labelledby="experience-title" tabIndex={-1} className={styles.section}>
            <h2 id="experience-title" className={styles.sectionTitle}>Pengalaman</h2>
            <ol className={styles.timeline} role="list">
              {profile.experience.map(({ organization, division, roles }) => (
                <li key={organization} className={styles.experienceEntry} data-scroll-fade>
                  <div className={styles.organization}>
                    <h3>{organization}</h3>
                    {division && <p>{division}</p>}
                  </div>
                  {roles.map(({ title, start, end, highlights }) => (
                    <div key={title} className={styles.experienceRole}>
                      <div className={styles.roleHeader}>
                        <h4>{title}</h4>
                        <ExperiencePeriod start={start} end={end} />
                      </div>
                      <ul className={styles.experiencePoints} role="list">
                        {highlights.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    </div>
                  ))}
                </li>
              ))}
            </ol>
          </section>

          <section id="sertifikat" aria-labelledby="certificates-title" tabIndex={-1} className={styles.section}>
            <h2 id="certificates-title" className={styles.sectionTitle}>Sertifikat</h2>
            <CertificateGallery certificates={certificates} />
          </section>

          <section id="kontak" aria-labelledby="contact-title" tabIndex={-1} className={`${styles.section} ${styles.contact}`}>
            <h2 id="contact-title" className={styles.sectionTitle}>Kontak</h2>
            <ul className={styles.contactLinks} role="list" data-scroll-fade>
              {profile.contacts.map(({ label, icon, url }) => (
                <li key={label}>
                  <a href={url} aria-label={label} title={label}>
                    <Image src={icon} alt="" width={23} height={23} unoptimized />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className={`${styles.container} ${styles.footer}`}>
        <p>{profile.name}</p>
        <a className={styles.textLink} href="#home">Kembali ke atas</a>
      </footer>
    </>
  );
}
