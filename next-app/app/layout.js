import "./globals.css";
import Navigasi from "./components/Navigasi";

export const metadata = {
  title: "Muhammad Nabil Aizar Ramadhan | Portfolio",
  description:
    "Portofolio Izar, mahasiswa Sistem dan Teknologi Informasi ITB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navigasi />
        {children}
      </body>
    </html>
  );
}