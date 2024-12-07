import { Toaster } from "react-hot-toast";
import "./globals.css"
import { ClientWrapper } from "@/components/client-wrapper"
import { Providers } from "@/components/providers"
import { Suspense } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <Suspense fallback={null}>
            <ClientWrapper>
              {children}
            </ClientWrapper>
          </Suspense>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
