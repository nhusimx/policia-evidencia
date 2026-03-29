// app/evaluacion-sio/page.tsx
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Cargar el componente cliente dinámicamente para evitar
// conflicto entre metadata (server) y 'use client'
const EvaluacionSIO = dynamic(
  () => import('@/components/evaluacion-sio/EvaluacionSIO'),
  { ssr: false }
)

export const metadata: Metadata = {
  title:  'Evaluación de Competencias — SIO',
  robots: { index: false, follow: false },
}

export default function EvaluacionSIOPage() {
  return <EvaluacionSIO />
}
