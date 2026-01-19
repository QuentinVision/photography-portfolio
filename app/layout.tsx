import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";

import ContactButton from "./components/ContactButton";
import AboutProvider from "./components/AboutProvider";
import ContactProvider from "./components/ContactProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Quentin Rigaud | Photography Portfolio",
  description:
    "Portrait photographer based in Paris. Capturing memories for models, brands, and events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <ContactProvider>
          <AboutProvider>
            {children}
            <footer className="footer-glass">
              <div className="footer-glass__content">
                <p className="footer-glass__text">
                  All photographs and content are protected by copyright.
                  <br />
                  Unauthorized use, reproduction, or distribution is prohibited.
                </p>
                <p className="footer-glass__copyright">
                  © {currentYear} Quentin Rigaud. All rights reserved.
                </p>
              </div>
            </footer>
            <ContactButton />
          </AboutProvider>
        </ContactProvider>
      </body>
    </html>
  );
}
