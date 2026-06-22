import type { Metadata } from "next";
import "../globals.css";
import Container from "../components/layout/Container";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
      <div className="min-h-screen flex flex-col">
        <Header/>
          <main className="flex-1 pt-16">
            {children}
          </main>
        <Footer/>
      </div>
    </Container>
  );
}
