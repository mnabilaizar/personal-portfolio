import Image from "next/image";
import Link from "next/link";
import ContentEntrance from "./components/ContentEntrance";
import CertificateGallery from "./components/CertificateGallery";
import Navigasi from "./components/Navigasi";
import { certificates } from "./data/certificates";
import { profile } from "./data/profile";
import { siteUrl } from "./data/site";
import styles from "./page.module.css";

const navigation = [
  { id: "home", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "kemampuan", label: "Kemampuan" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "sertifikat", label: "Sertifikat" },
  { id: "personal", label: "Di luar kampus" },
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

function SocialLinks({ contacts, label }) {
  return (
    <ul className={styles.contactLinks} aria-label={label} role="list">
      {contacts.map(({ label, icon, url }) => (
        <li key={label}>
          <a href={url}>
            <Image src={icon} alt="" width={20} height={20} unoptimized />
            <span>{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const { institution, program } = profile.education[0];
  const [first, middle, ...rest] = profile.name.split(" ");
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.nickname,
    affiliation: { "@type": "CollegeOrUniversity", name: institution },
    sameAs: profile.contacts.map(({ url }) => url),
    ...(siteUrl && { url: siteUrl.href, image: new URL("/portrait/izar-original.webp", siteUrl).href }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <a className="skip-link" href="#home">Lewati ke konten</a>
      <Navigasi items={navigation} name={profile.nickname} />

      <main id="portfolio-main">
        <ContentEntrance />
        <section id="home" aria-labelledby="home-title" tabIndex={-1} className={`${styles.container} ${styles.hero}`}>
          <div className={styles.heroInner} data-entrance>
            <h1 id="home-title">
              <span>{first} {middle}</span>{" "}<span>{rest.join(" ")}</span>
            </h1>
            <p className={styles.heroEducation}>Mahasiswa {program} di {institution}.</p>
            <p className={styles.heroSummary}>{profile.introduction}</p>
            <SocialLinks contacts={profile.contacts.filter(({ label }) => label !== "Instagram")} label="Tautan profesional" />
          </div>
          <div className={styles.heroVisual} data-entrance data-entrance-delay>
            <div className={styles.heroMask}>
              <Image
                className={styles.heroPhoto}
                src="/portrait/izar-original.webp"
                alt="Potret Izar"
                fill
                sizes="(max-width: 680px) 90vw, (max-width: 1300px) 46vw, 560px"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <div className={styles.container}>
          <section id="tentang" aria-labelledby="about-title" tabIndex={-1} className={styles.section}>
            <h2 id="about-title" className={styles.sectionTitle} data-entrance>Tentang saya</h2>
            <div className={styles.aboutGrid}>
              <figure className={styles.aboutFigure}>
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
                {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>

            <div className={styles.education}>
              <h3 className={styles.detailHeading}>Pendidikan</h3>
              <ul role="list">
                {profile.education.map(({ institution, program, from, to, estimatedGraduation, gpa }) => (
                  <li key={institution} className={styles.educationRow}>
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
            <h2 id="skills-title" className={styles.sectionTitle} data-entrance>Kemampuan dan tools</h2>
            <div className={styles.skillGroups}>
              {profile.skills.map(({ label, description, tools }) => (
                <div className={styles.skillGroup} key={label}>
                  <div>
                    <h3>{label}</h3>
                    <p>{description}</p>
                  </div>
                  <ul className={styles.technologyList} role="list">
                    {tools.map(({ name, icon, iconWidth = 26 }) => (
                      <li key={icon}>
                        <div className={styles.technologyIcon}>
                          <Image src={`/technology/${icon}.svg`} alt="" width={iconWidth} height={26} unoptimized />
                        </div>
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="pengalaman" aria-labelledby="experience-title" tabIndex={-1} className={styles.section}>
            <h2 id="experience-title" className={styles.sectionTitle} data-entrance>Pengalaman</h2>
            <ol className={styles.timeline} role="list">
              {profile.experience.map(({ organization, division, description, roles }) => (
                <li key={organization} className={styles.experienceEntry}>
                  <div className={styles.organization}>
                    <h3>{organization}</h3>
                    {division && <p>{division}</p>}
                    {description && <p>{description}</p>}
                  </div>
                  {roles.map(({ title, start, end, highlights }) => (
                    <div key={title} className={styles.experienceRole}>
                      <ExperiencePeriod start={start} end={end} />
                      <div>
                        <h4>{title}</h4>
                        <ul className={styles.experiencePoints} role="list">
                          {highlights.map((point) => <li key={point}>{point}</li>)}
                        </ul>
                      </div>
                    </div>
                  ))}
                </li>
              ))}
            </ol>
          </section>

          <section id="sertifikat" aria-labelledby="certificates-title" tabIndex={-1} className={styles.section}>
            <h2 id="certificates-title" className={styles.sectionTitle} data-entrance>Sertifikat</h2>
            <CertificateGallery certificates={certificates} />
          </section>

          <section id="personal" aria-labelledby="personal-title" tabIndex={-1} className={styles.section}>
            <div className={styles.personalTeaser}>
              <div>
                <h2 id="personal-title" className={styles.sectionTitle} data-entrance>Di luar kampus</h2>
                <p>Saya suka naik gunung dan mendengarkan musik di waktu luang.</p>
                <Link href="/tentang-saya" className={styles.textLink}>Kenali sisi personal saya</Link>
              </div>
              <figure className={styles.personalFigure}>
                <div className={styles.personalPhoto}>
                  <Image
                    src="/portrait/puntang.webp"
                    alt="Izar duduk di atas batu menghadap pegunungan di Gunung Puntang"
                    fill
                    sizes="(max-width: 740px) 90vw, 42vw"
                  />
                </div>
                <figcaption>Gunung Puntang</figcaption>
              </figure>
            </div>
          </section>

          <section id="kontak" aria-labelledby="contact-title" tabIndex={-1} className={`${styles.section} ${styles.contact}`}>
            <h2 id="contact-title" className={styles.sectionTitle} data-entrance>Kontak</h2>
            <SocialLinks contacts={profile.contacts} label="Kontak dan media sosial" />
          </section>
        </div>
      </main>

      <footer className={`${styles.container} ${styles.footer}`}>
        <p>{profile.name} · {profile.portfolioYear}</p>
        <a className={styles.textLink} href="#home">Kembali ke atas</a>
      </footer>
    </>
  );
}
