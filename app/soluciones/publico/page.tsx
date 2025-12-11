import EvaluadorQuiz from '@/components/evaluador/EvaluadorQuiz'
import SimuladorIntervencion from '@/components/simulador/SimuladorIntervencion'
import Link from 'next/link'

export default function SolucionesPublico() {
  return (
    <div className="bg-gradient-to-b from-neutral-light to-white">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏛️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-husi-dark mb-6">
            Transformación Institucional de Seguridad
          </h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
            Convertimos instituciones policiales y de procuración de justicia en organizaciones 
            de alto desempeño basadas en evidencia
          </p>
        </div>
      </section>

      {/* El Problema */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-husi-light/20">
          <h2 className="text-3xl font-bold mb-6 text-husi-dark text-center">
            De la Intuición Policial a la Inteligencia Territorial
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-neutral-gray">
              <span className="text-xs font-semibold bg-white px-3 py-1 rounded-full mb-3 inline-block border border-gray-200">
                ❌ Situación Actual
              </span>
              <h3 className="text-xl font-bold mb-4 text-husi-dark">Institución Reactiva</h3>
              <ul className="space-y-2 text-sm text-neutral-gray">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Patrullaje aleatorio sin focalización
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Decisiones basadas en intuición
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Datos dispersos sin análisis
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Sin coordinación interinstitucional
                </li>
              </ul>
            </div>

            <div className="bg-husi-light/5 p-6 rounded-lg border-l-4 border-husi-medium">
              <span className="text-xs font-semibold bg-white px-3 py-1 rounded-full mb-3 inline-block border border-gray-200">
                ⚠️ En Transición
              </span>
              <h3 className="text-xl font-bold mb-4 text-husi-dark">Esfuerzos Aislados</h3>
              <ul className="space-y-2 text-sm text-neutral-gray">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Análisis básicos sin metodología
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Capacitación sin evaluación
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Tecnología fragmentada
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Resultados no medibles
                </li>
              </ul>
            </div>

            <div className="bg-husi-accent/5 p-6 rounded-lg border-l-4 border-husi-accent">
              <span className="text-xs font-semibold bg-white px-3 py-1 rounded-full mb-3 inline-block border border-gray-200">
                ✅ Objetivo
              </span>
              <h3 className="text-xl font-bold mb-4 text-husi-dark">Basada en Evidencia</h3>
              <ul className="space-y-2 text-sm text-neutral-gray">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Análisis predictivo territorial
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Personal certificado y evaluado
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Sistema integrado de análisis
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Coordinación formal 4 hélices
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solución 1: Transformación Institucional */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-husi-light/20">
          <h2 className="text-3xl font-bold mb-4 text-husi-dark">
            Transformación Institucional Integral
          </h2>
          <p className="text-neutral-gray text-lg mb-8">
            Nuestro modelo de tres pilares garantiza que la transformación sea sostenible y escalable, 
            profesionalizando el talento, institucionalizando procesos e implementando tecnología habilitadora.
          </p>

          {/* Tres pilares específicos para sector público */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-husi-dark/5 rounded-lg p-6 border-2 border-husi-dark">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-xl font-bold mb-2 text-husi-dark">Talento Humano</h3>
              <p className="text-neutral-gray text-sm mb-3">
                Capacitación especializada en análisis criminal y evaluación de competencias
              </p>
              <ul className="text-xs text-neutral-gray space-y-1">
                <li>→ Evaluación de habilidades analíticas</li>
                <li>→ Certificación en metodologías de análisis</li>
                <li>→ Desarrollo de analistas criminales</li>
              </ul>
            </div>

            <div className="bg-husi-medium/5 rounded-lg p-6 border-2 border-husi-medium">
              <div className="text-4xl mb-3">⚙️</div>
              <h3 className="text-xl font-bold mb-2 text-husi-dark">Procesos</h3>
              <p className="text-neutral-gray text-sm mb-3">
                Protocolos de análisis criminal y operación basada en inteligencia
              </p>
              <ul className="text-xs text-neutral-gray space-y-1">
                <li>→ Protocolo de análisis delictivo</li>
                <li>→ Proceso de patrullaje focalizado</li>
                <li>→ Evaluación de resultados operativos</li>
              </ul>
            </div>

            <div className="bg-husi-accent/5 rounded-lg p-6 border-2 border-husi-accent">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="text-xl font-bold mb-2 text-husi-dark">Tecnología</h3>
              <p className="text-neutral-gray text-sm mb-3">
                Sistema de análisis criminal que automatiza ingesta y genera inteligencia
              </p>
              <ul className="text-xs text-neutral-gray space-y-1">
                <li>→ Plataforma de análisis territorial</li>
                <li>→ Dashboards operativos en tiempo real</li>
                <li>→ Alertas automáticas de patrones</li>
              </ul>
            </div>
          </div>

          {/* Evaluador embebido */}
          <div id="evaluador" className="scroll-mt-20">
            <div className="bg-gradient-to-r from-husi-dark to-husi-medium rounded-xl p-8 text-white text-center mb-8">
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

      {/* Solución 2: Intervención Territorial */}
      <section className="max-w-7xl mx-auto px-4 py-12" id="simulador">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-husi-light/20">
          <h2 className="text-3xl font-bold mb-4 text-husi-dark">
            Intervenciones Territoriales para Reducción de Delitos
          </h2>
          <p className="text-neutral-gray text-lg mb-8">
            Cuando existe un problema delictivo específico en una zona definida, diseñamos 
            intervenciones que articulan gobierno, sociedad civil, academia e iniciativa privada 
            en el modelo de cuatro hélices para resultados medibles.
          </p>

          <div className="bg-gradient-to-r from-husi-accent to-husi-light rounded-xl p-8 text-white text-center mb-8">
            <h3 className="text-2xl font-bold mb-3">
              Simulador Interactivo de Intervención
            </h3>
            <p className="text-lg opacity-90">
              Selecciona un tipo de delito y descubre cómo funciona el modelo paso a paso
            </p>
          </div>

          <SimuladorIntervencion />
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-husi-dark to-husi-medium rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Transforma tu Institución</h2>
          <p className="text-lg mb-8 opacity-90">
            Agenda una consultoría personalizada para conocer cómo podemos ayudarte
          </p>
          <Link 
            href="/contacto?tipo=consultoria"
            className="inline-block bg-white text-husi-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-neutral-light transition"
          >
            Agendar Consultoría
          </Link>
        </div>
      </section>

    </div>
  )
}