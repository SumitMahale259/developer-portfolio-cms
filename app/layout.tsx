import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ThemeProvider from "./components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* <body className="min-h-full flex flex-col"> */}
      <body>
        <ThemeProvider>
          <Container>
            <div className="min-h-screen flex flex-col">
              <Navbar/>
                <main className="flex-1">
                  {children}
                </main>
              <Footer/>
            </div>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
