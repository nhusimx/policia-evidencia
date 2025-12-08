import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Husi Strategics - Transformación Institucional de Seguridad',
  description: 'Transformamos instituciones policiales y de procuración de justicia en organizaciones basadas en evidencia. Modelo integral de talento humano, procesos y tecnología.',
  keywords: 'seguridad pública, análisis criminal, transformación institucional, policía basada en evidencia, reducción de delitos, análisis territorial',
  authors: [{ name: 'Husi Strategics' }],
  openGraph: {
    title: 'Husi Strategics - Seguridad Basada en Evidencia',
    description: 'De la intuición policial a la inteligencia territorial',
    url: 'https://husi.mx',
    siteName: 'Husi Strategics',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Husi Strategics - Transformación Institucional',
    description: 'Transformamos instituciones de seguridad con un modelo basado en evidencia',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}