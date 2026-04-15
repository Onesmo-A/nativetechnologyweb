import GoogleAnalytics from "@/components/Analytics/GoogleAnalytics";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://nativetechnology.africa";
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Native Technology",
  url: siteUrl,
  logo: `${siteUrl}/images/logo/native-technology-dark.png`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Native Technology | Web & Mobile Development",
    template: "%s | Native Technology",
  },
  description:
    "Native Technology builds web apps, mobile apps, business systems, and provides maintenance and IT consulting.",
  applicationName: "Native Technology",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Native Technology",
    title: "Native Technology | Web & Mobile Development",
    description:
      "Web & mobile application development, design & product development, business systems, maintenance & support, and IT consulting.",
    images: [
      {
        url: "/images/logo/native-technology-dark.png",
        alt: "Native Technology",
      },
      { url: "/icon.png", alt: "Native Technology logo" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Native Technology | Web & Mobile Development",
    description:
      "We build modern web and mobile products, business systems, and provide maintenance & IT consulting.",
    images: ["/images/logo/native-technology-dark.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`bg-white text-black antialiased dark:bg-black dark:text-white ${inter.className}`}
      >
        <Providers>
          {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
