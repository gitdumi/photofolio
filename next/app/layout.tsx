import type { Viewport } from "next";
import { Locale, i18n } from "@/i18n.config";

import "./globals.css";

import { SlugProvider } from "./context/SlugContext";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning data-theme="light">
      {/* <body suppressHydrationWarning> */}
      <SlugProvider>{children}</SlugProvider>
      {/* </body> */}
    </html>
  );
}
