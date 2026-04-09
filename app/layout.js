import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { NotificationProvider } from "@/lib/contexts/serviceContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DocuMaker",
  description: "Create Document without hassle",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <NotificationProvider>
          <Navbar />
          <div className="">{children}</div>
          <Footer />
          </NotificationProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
