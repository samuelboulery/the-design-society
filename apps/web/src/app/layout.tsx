import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Design Society',
  description: 'Le nouveau cercle (pas si fermé) de designers (carrément ouverts).',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" 
          rel="stylesheet" 
          media="all" 
        />
      </head>
      <body className="min-h-full text-primary flex flex-col">
        <main className="flex-1">
          {children}
        </main>
        <footer className="text-center py-5 mt-5 text-gray-500">
          Tous droits réservés - The (not so secret) Design Society - {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  )
}