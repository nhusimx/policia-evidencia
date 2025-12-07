import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            De la Intuición Policial a la<br />
            <span className="text-blue-600">Inteligencia Territorial</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transformamos instituciones de seguridad reactivas en organizaciones estratégicas basadas en evidencia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/soluciones#evaluador"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Evalúa tu Institución
            </Link>
            <Link 
              href="/casos-estudio"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Ver Casos de Éxito
            </Link>
          </div>
        </div>
      </section>

      {/* Problema vs Solución */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">El Cambio que Necesitas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              titulo: "Institución Reactiva",
              items: [
                "Patrullaje aleatorio",
                "Decisiones por intuición",
                "Datos dispersos",
                "Sin coordinación",
                "Capacitación esporádica"
              ],
              color: "red"
            },
            {
              titulo: "En Transición",
              items: [
                "Análisis básicos",
                "Capacitación sin evaluación",
                "Tecnología fragmentada",
                "Coordinación informal",
                "Resultados no medibles"
              ],
              color: "yellow"
            },
            {
              titulo: "Basada en Evidencia",
              items: [
                "Análisis predictivo",
                "Personal certificado",
                "Sistema integrado",
                "Coordinación formal",
                "Mejora continua"
              ],
              color: "green"
            }
          ].map((columna, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">{columna.titulo}</h3>
              <ul className="space-y-2">
                {columna.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para Transformar tu Institución?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comienza con una evaluación gratuita de madurez institucional
          </p>
          <Link 
            href="/soluciones"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Evaluar mi Institución
          </Link>
        </div>
      </section>
    </div>
  )
}