// app/evaluacion-sio/page.tsx
// Esta página NO aparece en el sitemap público ni en la navegación.
// El acceso está protegido por contraseña en el componente cliente.

import type { Metadata } from 'next'
import EvaluacionSIO from '@/components/evaluacion-sio/EvaluacionSIO'

export const metadata: Metadata = {
  title:  'Evaluación de Competencias — SIO',
  robots: {
    index:  false,   // no indexar en buscadores
    follow: false,
  },
}

export default function EvaluacionSIOPage() {
  return <EvaluacionSIO />
}
