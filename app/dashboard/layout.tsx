import { Inter } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={inter.className}>
      <body className="bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#0071e3] selection:text-white">
        {children}
      </body>
    </html>
  );
}