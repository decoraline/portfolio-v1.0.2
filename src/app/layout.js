import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteNavbar } from "@/components/ui/site-navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "decayla anthony",
  description: "decayla's portfolio website",
};

const themeInitScript = `(function(){try{var m=window.matchMedia("(prefers-color-scheme: dark)");function d(){document.documentElement.classList.toggle("dark",m.matches)}d();m.addEventListener("change",d)}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={geistSans.className}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}
