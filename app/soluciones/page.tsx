import EvaluadorQuiz from '@/components/evaluador/EvaluadorQuiz'
import SimuladorIntervencion from '@/components/simulador/SimuladorIntervencion'
import Link from 'next/link'

export default function Soluciones() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuestras Soluciones
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transformamos instituciones de seguridad con un modelo integral de tres pilares: 
            talento humano, procesos operativos y tecnología habilitadora
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">¿Cuál es tu Siguiente Paso?</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Link href="#evaluador" className="bg-white text-blue-600 p-6 rounded-lg hover:shadow-xl transition">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-bold mb-2">Evaluar Institución</h3>
              <p className="text-sm text-gray-600">Ideal si estás explorando opciones</p>
            </Link>
            <Link href="#simulador" className="bg-white text-blue-600 p-6 rounded-lg hover:shadow-xl transition">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold mb-2">Simular Intervención</h3>
              <p className="text-sm text-gray-600">Ve cómo funciona el modelo</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Transformación Institucional */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Transformación Institucional Integral
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Convertimos instituciones policiales y de procuración de justicia en organizaciones 
            de alto desempeño basadas en evidencia. Nuestro modelo de tres pilares garantiza 
            que la transformación sea sostenible y escalable.
          </p>

          {/* Tres pilares */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icono: '👥',
                titulo: 'Talento Humano',
                descripcion: 'Capacitación especializada y evaluación de competencias para profesionalizar tu equipo'
              },
              {
                icono: '⚙️',
                titulo: 'Procesos',
                descripcion: 'Diseño e implementación de procedimientos que institucionalizan la operación basada en evidencia'
              },
              {
                icono: '💻',
                titulo: 'Tecnología',
                descripcion: 'Sistema de análisis que automatiza la ingesta de datos y genera inteligencia accionable'
              }
            ].map((pilar, idx) => (
              <div key={idx} className="bg-blue-50 rounded-lg p-6">
                <div className="text-4xl mb-3">{pilar.icono}</div>
                <h3 className="text-xl font-bold mb-2">{pilar.titulo}</h3>
                <p className="text-gray-700">{pilar.descripcion}</p>
              </div>
            ))}
          </div>

          {/* Evaluador embebido */}
          <div id="evaluador" className="scroll-mt-20">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center mb-8">
              <h3 className="text-2xl font-bold mb-3">
                ¿En Qué Nivel Está tu Institución?
              </h3>
              <p className="text-lg opacity-90 mb-6">
                Responde 12 preguntas (2 minutos) y descubre tu nivel de madurez institucional 
                con una ruta personalizada de transformación
              </p>
            </div>
            
            <EvaluadorQuiz />
          </div>
        </div>
      </section>

      {/* Intervención Territorial */}
      <section className="max-w-7xl mx-auto px-4 py-12" id="simulador">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">
            Intervenciones Territoriales para Reducción de Delitos
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Modelo de cuatro hélices para intervenciones focalizadas con resultados medibles.
            Cuando existe un problema delictivo específico en una zona definida, diseñamos 
            intervenciones que articulan gobierno, sociedad civil, academia e iniciativa privada.
          </p>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center mb-8">
            <h3 className="text-2xl font-bold mb-3">
              Simulador Interactivo de Intervención
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Selecciona un tipo de delito y descubre cómo funciona el modelo paso a paso
            </p>
          </div>

          <SimuladorIntervencion />
        </div>
      </section>

      
    </div>
  )
}