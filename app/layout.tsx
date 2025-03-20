import "@/app/global.css";
import { Metadata } from "next";
import { Providers } from "@/components/Providers";
import  SideNav  from "@/components/SideNav";
import  Header  from "@/components/Header";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-#000021 text-white">
        <Providers>
        <Header />
          <div className="flex h-screen">
            <SideNav />
            <div className="flex-1 flex flex-col overflow-hidden">
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
