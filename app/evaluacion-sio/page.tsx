'use client'

// app/evaluacion-sio/page.tsx
// Página de acceso restringido — no aparece en navegación ni en buscadores.
// El noindex se maneja en next.config.ts (ver abajo).

import EvaluacionSIO from '@/components/evaluacion-sio/EvaluacionSIO'

export default function EvaluacionSIOPage() {
  return <EvaluacionSIO />
}
