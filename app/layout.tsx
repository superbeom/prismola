import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Locale } from "@/types";
import { LocaleProvider } from "@/context/LocaleContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prismola | The 3-Minute Native Upgrade",
  description: "Master English expressions through a multi-language prism. Experience the 3-minute native upgrade with deep nuance analysis and cinematic dialogue.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const locale = (headerList.get("x-prismola-locale") as Locale) || "en";

  return (
    <html lang={locale} className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <LocaleProvider initialLocale={locale}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
