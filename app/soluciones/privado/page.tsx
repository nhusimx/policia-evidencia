import Link from 'next/link'

export default function SolucionesPrivado() {
  return (
    <div className="bg-gradient-to-b from-neutral-light to-white">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏢</div>
          <h1 className="text-4xl md:text-5xl font-bold text-husi-accent mb-6">
            Gobernanza, Riesgos y Cumplimiento (GRC)
          </h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
            Fortalecemos la gobernanza corporativa, gestionamos riesgos estratégicos y operacionales, 
            y aseguramos el cumplimiento de normativas nacionales e internacionales
          </p>
        </div>
      </section>

      {/* Modelo GRC */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-husi-light/20">
          <h2 className="text-3xl font-bold mb-6 text-husi-accent text-center">
            Modelo GRC México
          </h2>
          
          <p className="text-neutral-gray text-lg mb-8 text-center max-w-3xl mx-auto">
            Un sistema integrado que conecta la gobernanza estratégica con la gestión de riesgos 
            y el cumplimiento normativo, generando valor sostenible para la organización.
          </p>

          {/* Tres componentes del modelo */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-husi-dark/5 p-6 rounded-lg border-2 border-husi-dark">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-husi-dark">Gobernanza</h3>
              <p className="text-neutral-gray text-sm mb-4">
                Estructuras de gobierno corporativo que aseguran transparencia y toma de decisiones informada
              </p>
              <ul className="text-xs text-neutral-gray space-y-2">
                <li className="flex items-start">
                  <span className="text-husi-dark mr-2">✓</span>
                  Diseño de órganos de gobierno
                </li>
                <li className="flex items-start">
                  <span className="text-husi-dark mr-2">✓</span>
                  Políticas corporativas
                </li>
                <li className="flex items-start">
                  <span className="text-husi-dark mr-2">✓</span>
                  Comités especializados
                </li>
                <li className="flex items-start">
                  <span className="text-husi-dark mr-2">✓</span>
                  Estructura organizacional
                </li>
              </ul>
            </div>

            <div className="bg-husi-medium/5 p-6 rounded-lg border-2 border-husi-medium">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-xl font-bold mb-3 text-husi-medium">Riesgos</h3>
              <p className="text-neutral-gray text-sm mb-4">
                Identificación, evaluación y mitigación de riesgos estratégicos y operacionales
              </p>
              <ul className="text-xs text-neutral-gray space-y-2">
                <li className="flex items-start">
                  <span className="text-husi-medium mr-2">✓</span>
                  Metodología de gestión de riesgos
                </li>
                <li className="flex items-start">
                  <span className="text-husi-medium mr-2">✓</span>
                  Matrices de riesgo
                </li>
                <li className="flex items-start">
                  <span className="text-husi-medium mr-2">✓</span>
                  Apetito y tolerancia al riesgo
                </li>
                <li className="flex items-start">
                  <span className="text-husi-medium mr-2">✓</span>
                  Planes de contingencia
                </li>
              </ul>
            </div>

            <div className="bg-husi-accent/5 p-6 rounded-lg border-2 border-husi-accent">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="text-xl font-bold mb-3 text-husi-accent">Cumplimiento</h3>
              <p className="text-neutral-gray text-sm mb-4">
                Monitoreo de normativas nacionales e internacionales aplicables a la organización
              </p>
              <ul className="text-xs text-neutral-gray space-y-2">
                <li className="flex items-start">
                  <span className="text-husi-accent mr-2">✓</span>
                  Inventario de obligaciones legales
                </li>
                <li className="flex items-start">
                  <span className="text-husi-accent mr-2">✓</span>
                  Monitoreo de cumplimiento
                </li>
                <li className="flex items-start">
                  <span className="text-husi-accent mr-2">✓</span>
                  Programa de ética e integridad
                </li>
                <li className="flex items-start">
                  <span className="text-husi-accent mr-2">✓</span>
                  Canales de denuncia
                </li>
              </ul>
            </div>
          </div>

          {/* Normativas */}
          <div className="bg-husi-light/10 border-l-4 border-husi-light p-6 rounded mb-8">
            <h3 className="font-bold text-husi-dark mb-3 flex items-center">
              <span className="text-2xl mr-2">🌐</span>
              Cumplimiento de Normativas Nacionales e Internacionales
            </h3>
            <p className="text-neutral-gray text-sm mb-3">
              Ayudamos a tu organización a cumplir con marcos normativos clave:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-gray">
              <div>
                <p className="font-semibold text-husi-dark mb-2">Nacionales:</p>
                <ul className="space-y-1">
                  <li>• Ley General de Protección de Datos Personales</li>
                  <li>• Ley General de Responsabilidades Administrativas</li>
                  <li>• NOM-035-STPS (Riesgos psicosociales)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-husi-dark mb-2">Internacionales:</p>
                <ul className="space-y-1">
                  <li>• ISO 31000 (Gestión de Riesgos)</li>
                  <li>• ISO 37001 (Sistema Anti-soborno)</li>
                  <li>• COSO ERM (Gestión de Riesgos Empresariales)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tres pilares aplicados a GRC */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-husi-light/20">
          <h2 className="text-3xl font-bold mb-4 text-husi-accent">
            Implementación con Nuestro Modelo de 3 Pilares
          </h2>
          <p className="text-neutral-gray text-lg mb-8">
            Aplicamos nuestra metodología probada de talento, procesos y tecnología para implementar 
            tu sistema GRC de manera efectiva y sostenible.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-husi-dark/5 rounded-lg p-6 border-2 border-husi-dark">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-xl font-bold mb-2 text-husi-dark">Talento Humano</h3>
              <p className="text-neutral-gray text-sm mb-3">
                Desarrollo de competencias GRC en tu equipo
              </p>
              <ul className="text-xs text-neutral-gray space-y-1">
                <li>→ Capacitación en gestión de riesgos</li>
                <li>→ Formación de oficiales de cumplimiento</li>
                <li>→ Cultura de integridad organizacional</li>
              </ul>
            </div>

            <div className="bg-husi-medium/5 rounded-lg p-6 border-2 border-husi-medium">
              <div className="text-4xl mb-3">⚙️</div>
              <h3 className="text-xl font-bold mb-2 text-husi-dark">Procesos</h3>
              <p className="text-neutral-gray text-sm mb-3">
                Procedimientos GRC institucionalizados
              </p>
              <ul className="text-xs text-neutral-gray space-y-1">
                <li>→ Políticas y procedimientos GRC</li>
                <li>→ Protocolos de evaluación de riesgos</li>
                <li>→ Proceso de monitoreo de cumplimiento</li>
              </ul>
            </div>

            <div className="bg-husi-accent/5 rounded-lg p-6 border-2 border-husi-accent">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="text-xl font-bold mb-2 text-husi-dark">Tecnología</h3>
              <p className="text-neutral-gray text-sm mb-3">
                Plataformas que automatizan controles GRC
              </p>
              <ul className="text-xs text-neutral-gray space-y-1">
                <li>→ Sistema de gestión de riesgos</li>
                <li>→ Dashboard ejecutivo integrado</li>
                <li>→ Alertas automáticas de cumplimiento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Evaluador */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-husi-accent to-husi-light rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Cuál es el Nivel de Madurez GRC de tu Empresa?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Realiza nuestro evaluador de 15 preguntas (8 minutos) y recibe un diagnóstico 
            personalizado con ruta de mejora
          </p>
          <Link 
            href="/evaluadores/grc"
            className="inline-block bg-white text-husi-accent px-8 py-4 rounded-lg text-lg font-semibold hover:bg-neutral-light transition mr-4"
          >
            Evaluar mi Empresa
          </Link>
          <Link 
            href="/contacto?tipo=grc"
            className="inline-block bg-husi-dark text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-husi-medium transition border-2 border-white"
          >
            Solicitar Consultoría
          </Link>
        </div>
      </section>

    </div>
  )
}