'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ResultadosPrivadoRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir a los resultados del evaluador GRC
    router.replace('/evaluadores/grc/resultados')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-light to-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-husi-accent mx-auto mb-4"></div>
        <p className="text-neutral-gray">Redirigiendo a resultados...</p>
      </div>
    </div>
  )
}