import Link from 'next/link'

export default function EvaluadoresHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-husi-dark mb-6">
            Evaluadores Husi Strategics
          </h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
            Diagnósticos gratuitos para conocer el nivel de madurez de tu organización
          </p>
        </div>

        {/* Dos Evaluadores */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Evaluador Institucional */}
          <div className="bg-white border-2 border-husi-dark/20 rounded-2xl p-8 hover:shadow-2xl transition-all">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🏛️</div>
              <h2 className="text-3xl font-bold text-husi-dark mb-3">
                Evaluador Institucional
              </h2>
              <span className="inline-block bg-husi-dark/10 text-husi-dark text-sm font-semibold px-4 py-1 rounded-full mb-4">
                Sector Público
              </span>
              <p className="text-neutral-gray mb-6">
                Para instituciones de seguridad pública, procuradurías y fuerzas del orden
              </p>
            </div>

            {/* Qué evalúa */}
            <div className="mb-6">
              <h3 className="font-semibold text-husi-dark mb-3">¿Qué evalúa?</h3>
              <ul className="space-y-2 text-sm text-neutral-gray">
                <li className="flex items-start">
                  <span className="text-husi-dark mr-2">•</span>
                  Madurez en análisis criminal
                </li>
                <li className="flex items-start">
                  <span className="text-husi-dark mr-2">•</span>
                  Capacidades de inteligencia territorial
                </li>
                <li className="flex items-start">
                  <span className="text-husi-dark mr-2">•</span>
                  Uso de evidencia en la toma de decisiones
                </li>
              </ul>
            </div>

            {/* Detalles */}
            <div className="bg-neutral-light p-4 rounded-lg mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-gray">⏱️ Duración:</span>
                <span className="font-semibold text-husi-dark">2 minutos</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-gray">📋 Preguntas:</span>
                <span className="font-semibold text-husi-dark">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-gray">📊 Niveles:</span>
                <span className="font-semibold text-husi-dark">4</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/soluciones/publico#evaluador"
              className="block w-full bg-husi-dark text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-husi-medium transition"
            >
              Evaluar mi Institución
            </Link>

            <div className="text-center mt-4">
              <Link 
                href="/soluciones/publico"
                className="text-sm text-husi-dark hover:text-husi-accent underline"
              >
                Ver más sobre Transformación Institucional →
              </Link>
            </div>
          </div>

          {/* Evaluador GRC */}
          <div className="bg-white border-2 border-husi-accent/20 rounded-2xl p-8 hover:shadow-2xl transition-all">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🏢</div>
              <h2 className="text-3xl font-bold text-husi-accent mb-3">
                Evaluador GRC
              </h2>
              <span className="inline-block bg-husi-accent/10 text-husi-accent text-sm font-semibold px-4 py-1 rounded-full mb-4">
                Sector Privado
              </span>
              <p className="text-neutral-gray mb-6">
                Para empresas y corporativos que gestionan gobernanza, riesgos y cumplimiento
              </p>
            </div>

            {/* Qué evalúa */}
            <div className="mb-6">
              <h3 className="font-semibold text-husi-accent mb-3">¿Qué evalúa?</h3>
              <ul className="space-y-2 text-sm text-neutral-gray">
                <li className="flex items-start">
                  <span className="text-husi-accent mr-2">•</span>
                  Madurez en gobierno corporativo
                </li>
                <li className="flex items-start">
                  <span className="text-husi-accent mr-2">•</span>
                  Gestión de riesgos estratégicos y operacionales
                </li>
                <li className="flex items-start">
                  <span className="text-husi-accent mr-2">•</span>
                  Cumplimiento normativo y cultura de integridad
                </li>
              </ul>
            </div>

            {/* Detalles */}
            <div className="bg-neutral-light p-4 rounded-lg mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-gray">⏱️ Duración:</span>
                <span className="font-semibold text-husi-accent">8 minutos</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-gray">📋 Preguntas:</span>
                <span className="font-semibold text-husi-accent">15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-gray">📊 Niveles:</span>
                <span className="font-semibold text-husi-accent">5</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/evaluadores/grc"
              className="block w-full bg-husi-accent text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-husi-light transition"
            >
              Evaluar mi Empresa
            </Link>

            <div className="text-center mt-4">
              <Link 
                href="/soluciones/privado"
                className="text-sm text-husi-accent hover:text-husi-dark underline"
              >
                Ver más sobre Modelo GRC →
              </Link>
            </div>
          </div>
        </div>

        {/* Beneficios */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-husi-light/20">
            <h3 className="text-2xl font-bold text-center text-husi-dark mb-6">
              ¿Por qué realizar un evaluador?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-bold text-husi-dark mb-2">Diagnóstico Objetivo</h4>
                <p className="text-sm text-neutral-gray">
                  Conoce el nivel real de madurez de tu organización
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🗺️</div>
                <h4 className="font-bold text-husi-dark mb-2">Ruta Personalizada</h4>
                <p className="text-sm text-neutral-gray">
                  Recibe un plan de transformación adaptado a tu nivel
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📄</div>
                <h4 className="font-bold text-husi-dark mb-2">Reporte Descargable</h4>
                <p className="text-sm text-neutral-gray">
                  Descarga tus resultados en PDF para compartir
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-16 text-center">
          <p className="text-neutral-gray mb-6">
            ¿Necesitas ayuda para elegir el evaluador correcto?
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-husi-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-husi-medium transition"
          >
            Contactar con un Asesor
          </Link>
        </div>

      </div>
    </div>
  )
}