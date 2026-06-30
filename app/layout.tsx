import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ketan Mittal - Data Scientist | AI Developer",
  description:
    "Portfolio of Ketan Mittal, a student studying Data Science at UCSD and aspiring AI/ML Engineer",
  openGraph: {
    title: "Ketan Mittal - Data Scientist | AI Developer",
    description:
      "Portfolio of Ketan Mittal, a student studying Data Science at UCSD and aspiring AI/ML Engineer",
    type: "website",
    url: "https://km322.github.io",
  },
  twitter: {
    card: "summary",
    title: "Ketan Mittal - Data Scientist | AI Developer",
    description:
      "Portfolio of Ketan Mittal, a student studying Data Science at UCSD and aspiring AI/ML Engineer",
  },
  icons: {
    icon: [
      {
        url: "/favicon/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },

  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')return;document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
