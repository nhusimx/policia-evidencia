import { Suspense } from 'react'
import FormularioContacto from '../../components/contacto/FormularioContacto'

function FormularioWrapper() {
  return <FormularioContacto />
}

export default function Contacto() {
  return (
    <div className="bg-gradient-to-b from-neutral-light to-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-husi-dark mx-auto mb-4"></div>
              <p className="text-neutral-gray">Cargando formulario...</p>
            </div>
          </div>
        }>
          <FormularioWrapper />
        </Suspense>
      </div>
    </div>
  )
}