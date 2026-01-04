// 📄 app/layout.tsx
import "./globals.css";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-orbitron",
});

export const metadata = {
  title: "Cosmic Data",
  description: "An interactive galaxy of hidden knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${orbitron.variable} font-orbitron bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
