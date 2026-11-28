import localFont from "next/font/local";
import { profile } from "./data/profile";
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
const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const metadataBase = productionDomain ? new URL(`https://${productionDomain}`) : undefined;

export const metadata = {
  title,
  description,
  metadataBase,
  alternates: metadataBase ? { canonical: "/" } : undefined,
  openGraph: {
    title,
    description,
    siteName: "Portofolio Izar",
    locale: "id_ID",
    type: "website",
    url: metadataBase ? "/" : undefined,
  },
};

export const viewport = { themeColor: "#111210" };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={plexSans.variable}>
      <body>{children}</body>
    </html>
  );
}
