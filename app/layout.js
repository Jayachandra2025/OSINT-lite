import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const plusJakartaSans = localFont({
  src: "./fonts/PlusJakartaVF.ttf",
  variable: "--font-plus-jakarta-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "OSINT",
  description: "An Infosec K2K app",
  icons: {
    icon: "/icon/favicon/favicon.ico",
    shortcut: "/icon/favicon/favicon.ico",
    apple: "/icon/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/icon/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
