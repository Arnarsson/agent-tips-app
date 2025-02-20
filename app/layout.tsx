import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter_Tight } from "next/font/google"
import { AI } from "./ai/actions"
import { Provider } from "jotai"
import { Toaster } from "sonner"

import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"

// Optimize font loading
const inter = Inter_Tight({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
})

export const metadata: Metadata = {
  title: "Agent.tips",
  description: "A safe local first place to stash, test and improve your favorite prompts.",
  applicationName: 'Agent.tips',
  authors: [{ name: 'Agent.tips Team' }],
  keywords: ['AI', 'Prompts', 'ChatGPT', 'OpenAI', 'Prompt Engineering'],
  creator: 'Agent.tips Team',
  publisher: 'Agent.tips',
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  metadataBase: new URL('https://agent.tips'),
  openGraph: {
    title: 'Agent.tips',
    description: 'A safe local first place to stash, test and improve your favorite prompts.',
    url: 'https://agent.tips',
    siteName: 'Agent.tips',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent.tips',
    description: 'A safe local first place to stash, test and improve your favorite prompts.',
    creator: '@agent_tips',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={cn("antialiased", inter.className)}
    >
      <head>
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/api/messages" 
          as="fetch" 
          crossOrigin="anonymous" 
        />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "selection:bg-primary/10 selection:text-primary"
        )}
      >
        <AI>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                <main className="bg-background relative flex min-h-screen flex-col">
                  {children}
                </main>
              </TooltipProvider>

              <Toaster />
            </ThemeProvider>
          </Provider>
        </AI>
      </body>
    </html>
  )
}
