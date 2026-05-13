import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'cv_builder — LaTeX CVs without the LaTeX',
  description: 'Import from LinkedIn, edit live in your browser, download a pixel-perfect PDF. No LaTeX knowledge required.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cv-cream text-cv-forest antialiased">
        {children}
      </body>
    </html>
  )
}
