import { AuthContextProvider } from "@/context/Auth";
import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { ThemeProvider } from "@/context/Theme";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "App to practice coding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={notoSans.className}>
        <ThemeProvider
          themes={["dark", "light", "system"]}
          attribute="class"
          defaultTheme="dark"
          storageKey="discord-clone-theme"
        >
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
