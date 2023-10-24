import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/provider/Theme_Provider'
import { cn } from '@/lib/utils'
import Auth0_Provider from '@/components/provider/Auth0_Provider'
import React_Query from '@/components/provider/React-Query_Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={cn(inter.className,
        "transition-all animate-in delay-75 duration-150")}>
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          attribute='class'
          storageKey="theme">
          <Auth0_Provider>
            <React_Query>
              {children}
            </React_Query>
          </Auth0_Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}