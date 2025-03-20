import "@/app/global.css";
import { Metadata } from "next";
import { Providers } from "@/components/Providers";
import SideNav from "@/components/SideNav";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#00003c] text-white min-h-screen flex flex-col">
        <Providers>
          {/* Header */}
          <Header />

          {/* Main Layout */}
          <div className="flex flex-col md:flex-row flex-grow w-full">
            {/* Sidebar */}
            <SideNav />

            {/* Content */}
            <main className="flex-1 overflow-auto bg-[#00003c]">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
