import type { Metadata } from "next";
import "../styles/main.scss";
import {AuthProvider} from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Spotify Clone",  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}