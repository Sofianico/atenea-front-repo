import UserContextProvider from "@/stores/UserContextProvider";
import TranslationContextProvider from "@/stores/TranslationContextProvider";
import ModalContextProvider from "@/stores/ModalContextProvider";

import Modal from "@/components/organisms/modal/modal";
import Header from "@/components/organisms/header/header";

import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Athena AI",
  description: "",
};
export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <UserContextProvider>
          <TranslationContextProvider>
            <ModalContextProvider>
              <Header />
              {children}
              <Modal />
            </ModalContextProvider>
          </TranslationContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
