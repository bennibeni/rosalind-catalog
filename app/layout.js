import { IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata = {
  title: "Catalogo Rosalind",
  description:
    "Archivio personale dei problemi Rosalind risolti, organizzato per argomento.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${plexMono.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
