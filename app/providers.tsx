"use client"

import { ThemeProvider } from "next-themes"

import { TokenRefresherProvider } from "../contexts/apiWrapper"
import { AuthProvider } from "../contexts/authContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TokenRefresherProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="dark"
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    </TokenRefresherProvider>
  )
}
