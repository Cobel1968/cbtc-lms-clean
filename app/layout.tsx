import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CBTC - Du Banc Au Travail",
  description: "Cobel Business Training Center - Adaptive LMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen">
        <Navbar />
        <main className="pt-4">
          {children}
        </main>
      </body>
    </html>
  );
}