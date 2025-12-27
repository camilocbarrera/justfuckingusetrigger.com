import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://justfuckingusetrigger.com"),
  title: "Just Fucking Use Trigger.dev",
  description: "Stop overthinking your background jobs. Just fucking use Trigger.dev.",
  openGraph: {
    title: "Just Fucking Use Trigger.dev",
    description: "Stop overthinking your background jobs. Just fucking use Trigger.dev.",
    images: [
      {
        url: "/og_trigger.png",
        width: 1200,
        height: 630,
        alt: "Just Fucking Use Trigger.dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Fucking Use Trigger.dev",
    description: "Stop overthinking your background jobs. Just fucking use Trigger.dev.",
    images: ["/og_trigger.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
