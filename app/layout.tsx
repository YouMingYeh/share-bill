import { GeistSans } from "geist/font/sans";
import "@/app/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import { Hint } from "@/components/Hint";
import AuthButton from "@/components/AuthButton";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Share Bill",
  description: "大人都不當面談錢。會私底下再算錢",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground h-screen w-screen flex-1 flex flex-col align-middle justify-center items-center">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed bottom-1 left-1 m-1 flex flex-col gap-1">
            <Hint />
            <ModeToggle />
          </div>
          <div className="fixed bottom-1 right-1 m-1">
            <AuthButton />
          </div>
          <div className="h-screen flex justify-center align-middle items-center">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
