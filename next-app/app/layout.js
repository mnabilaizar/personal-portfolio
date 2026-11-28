import localFont from "next/font/local";
import { profile } from "./data/profile";
import { siteUrl } from "./data/site";
import "./globals.css";

const plexSans = localFont({
  src: "./fonts/ibm-plex-sans-latin.woff2",
  variable: "--font-plex-sans",
  weight: "400 700",
  display: "swap",
});

const title = `${profile.name} | Portofolio`;
const description =
  "Portofolio Izar, mahasiswa Sistem dan Teknologi Informasi ITB. Kenali profil, kemampuan, sertifikat, dan pengalaman organisasinya.";
export const metadata = {
  title,
  description,
  metadataBase: siteUrl ?? new URL("http://localhost:3000"),
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    title,
    description,
    siteName: "Portofolio Izar",
    locale: "id_ID",
    type: "website",
    url: siteUrl?.href,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/opengraph-image.jpg", alt: `Potret dan nama ${profile.name}` }],
  },
};

export const viewport = { themeColor: "#141310" };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={plexSans.variable}>
      <body>{children}</body>
    </html>
  );
}
