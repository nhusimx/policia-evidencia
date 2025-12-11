import EvaluadorGRC from '@/components/evaluador-grc/EvaluadorGRC'
import Link from 'next/link'

export default function EvaluadorGRCPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="flex text-sm text-neutral-gray">
            <Link href="/" className="hover:text-husi-accent transition">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/evaluadores" className="hover:text-husi-accent transition">Evaluadores</Link>
            <span className="mx-2">/</span>
            <span className="text-husi-accent font-semibold">Evaluador GRC</span>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-husi-dark mb-4">
            Evaluador de Madurez GRC
          </h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
            Descubre el nivel de madurez de tu sistema de Gobernanza, Riesgos y Cumplimiento
          </p>
        </div>

        {/* Descripción */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-3xl mx-auto border border-husi-light/20">
          <h2 className="text-2xl font-bold text-husi-dark mb-4">
            ¿Qué evaluaremos?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-husi-dark rounded-full mt-2 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-husi-dark">Gobernanza</h3>
                <p className="text-sm text-neutral-gray">Estructura de gobierno y toma de decisiones</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-husi-medium rounded-full mt-2 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-husi-medium">Riesgos Estratégicos</h3>
                <p className="text-sm text-neutral-gray">Gestión de amenazas a objetivos estratégicos</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-husi-accent rounded-full mt-2 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-husi-accent">Riesgos Operacionales</h3>
                <p className="text-sm text-neutral-gray">Controles y gestión de riesgos en procesos</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-husi-light rounded-full mt-2 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-husi-light">Cumplimiento</h3>
                <p className="text-sm text-neutral-gray">Normativas nacionales e internacionales</p>
              </div>
            </div>
            <div className="flex items-start md:col-span-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-purple-600">Cultura de Integridad</h3>
                <p className="text-sm text-neutral-gray">Ética, valores y conducta organizacional</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info importante */}
        <div className="bg-husi-dark/5 rounded-lg p-6 mb-12 max-w-3xl mx-auto border-l-4 border-husi-dark">
          <div className="flex items-start">
            <span className="text-2xl mr-3">ℹ️</span>
            <div>
              <h3 className="font-semibold text-husi-dark mb-2">Información importante</h3>
              <ul className="text-sm text-neutral-gray space-y-1">
                <li>• Tiempo estimado: <strong>8-10 minutos</strong></li>
                <li>• Total de preguntas: <strong>15</strong></li>
                <li>• Al finalizar recibirás un diagnóstico personalizado</li>
                <li>• Podrás descargar tus resultados en PDF</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Evaluador */}
        <EvaluadorGRC />

        {/* Link de regreso */}
        <div className="text-center mt-12">
          <Link 
            href="/soluciones/privado"
            className="text-husi-accent hover:text-husi-dark underline"
          >
            ← Conocer más sobre nuestras soluciones GRC
          </Link>
        </div>

      </div>
    </div>
  )
}