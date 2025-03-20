import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./global.css"
import { AuthProvider } from "./auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Guide",
  description: "Guia inteligente para transporte público",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-primary min-h-screen flex flex-col`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

