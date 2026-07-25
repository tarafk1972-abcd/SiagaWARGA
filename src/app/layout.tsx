import type { Metadata, Viewport } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { LanguageProvider } from "@/lib/i18n";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WargaJagaWarga",
  description: "Security App for Community",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 text-gray-900 antialiased font-sans`}>
        <LanguageProvider>
          {/* Mobile App Shell */}
          <div className="max-w-md mx-auto min-h-screen bg-white relative shadow-2xl overflow-x-hidden pb-16">
            <header className="bg-red-600 text-white p-4 sticky top-0 z-40 shadow-md">
              <h1 className="text-xl font-bold tracking-tight text-center">WargaJagaWarga</h1>
            </header>
            
            <main className="min-h-full">
              {children}
            </main>
            
            <BottomNav />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}