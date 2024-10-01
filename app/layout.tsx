import "@/styles/globals.css"
import { Metadata } from "next"
import Link from "next/link"
import { GoogleOAuthProvider } from "@react-oauth/google"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Providers } from "@/app/providers"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            <Providers>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white py-12 px-4">
                  <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">SoulSeva</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Connecting volunteers with impactful NGOs worldwide.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-4">
                        Quick Links
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/about"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/projects"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            Projects
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/ngos"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            NGOs
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/contact"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Legal</h4>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="#"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            Terms of Service
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Stay updated with our latest opportunities.
                      </p>
                      <div className="flex">
                        <Input
                          type="email"
                          placeholder="Your email"
                          className="rounded-r-none"
                        />
                        <Button className="rounded-l-none">Subscribe</Button>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
              <TailwindIndicator />
            </Providers>
          </GoogleOAuthProvider>
        </body>
      </html>
    </>
  )
}
