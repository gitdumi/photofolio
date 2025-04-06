import React from "react";

import { Metadata } from "next";
import { Sora } from "next/font/google";
import { generateMetadataObject } from "@/lib/shared/metadata";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar/navbar";
import { CartProvider } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { UserProvider } from "@/context/user-context";
import { Modal } from "@/components/ui/animated-modal";
import { CartModal } from "@/components/containers/cart/cart-modal";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Default Global SEO for pages without them
export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    "global",
    {
      filters: { locale: params.locale },
      populate: "photos",
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const pageData = await fetchContentType(
    "global",
    { filters: { locale } },
    true
  );

  return (
    // <html lang={locale}>
    <ViewTransitions>
      <UserProvider>
        <CartProvider>
          <body
            className={cn(
              sora.className,
              "antialiased h-full w-full min-h-screen flex flex-col"
            )}
          >
            <Navbar currencyConfig={pageData.currencyConfig} />
            {children}
            <Footer data={pageData.footer} locale={locale} />
          </body>
        </CartProvider>
      </UserProvider>
    </ViewTransitions>
    // </html>
  );
}
