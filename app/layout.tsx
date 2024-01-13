import type { Metadata } from "next";
import React from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import Layout from "@/components/layout";

import ModalProvider from "@/providers/ModalProvider";

const inter = Inter({ subsets: ["latin"], variable: "--body-font" });
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--display-font",
});

export const metadata: Metadata = {
  title: "AniLearn",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" id="top">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} bg-background font-body text-foreground`}
      >
        <Layout>
          <ModalProvider />
          <Navbar />
          {children}
        </Layout>
      </body>
    </html>
  );
}
