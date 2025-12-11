'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-neutral-light to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-neutral-text mb-6"
          >
            Transformamos Organizaciones con<br />
            <span className="text-husi-dark">Metodologías Basadas en Evidencia</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-gray mb-12 max-w-3xl mx-auto"
          >
            Soluciones especializadas para el sector público y privado
          </motion.p>
        </div>
      </section>

      {/* Dos Sectores con Evaluadores Integrados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          ¿Qué describe mejor tu organización?
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* SECTOR PÚBLICO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-husi-dark/20 rounded-2xl p-8 hover:shadow-2xl transition-all"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🏛️</div>
              <h3 className="text-3xl font-bold text-husi-dark mb-3">
                Sector Público
              </h3>
              <p className="text-neutral-gray">
                Instituciones de seguridad pública, procuradurías y fuerzas del orden
              </p>
            </div>

            {/* Servicios */}
            <div className="mb-6">
              <h4 className="font-semibold text-husi-dark mb-3">Nuestras soluciones:</h4>
              <ul className="space-y-2">
                <li className="flex items-start text-sm text-neutral-gray">
                  <span className="text-husi-dark mr-2">•</span>
                  Transformación institucional integral
                </li>
                <li className="flex items-start text-sm text-neutral-gray">
                  <span className="text-husi-dark mr-2">•</span>
                  Análisis criminal basado en evidencia
                </li>
                <li className="flex items-start text-sm text-neutral-gray">
                  <span className="text-husi-dark mr-2">•</span>
                  Intervenciones territoriales focalizadas
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link
                href="/soluciones/publico#evaluador"
                className="block w-full bg-husi-dark text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-husi-medium transition"
              >
                📊 Evalúa tu Institución
                <span className="block text-sm font-normal opacity-90 mt-1">
                  Diagnóstico de madurez institucional (2 min)
                </span>
              </Link>
              <Link
                href="/soluciones/publico"
                className="block w-full bg-white text-husi-dark text-center px-6 py-3 rounded-lg font-semibold border-2 border-husi-dark hover:bg-husi-dark/5 transition"
              >
                Ver Soluciones Completas
              </Link>
            </div>
          </motion.div>

          {/* SECTOR PRIVADO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-husi-accent/20 rounded-2xl p-8 hover:shadow-2xl transition-all"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-3xl font-bold text-husi-accent mb-3">
                Sector Privado
              </h3>
              <p className="text-neutral-gray">
                Empresas y corporativos que gestionan gobernanza, riesgos y cumplimiento
              </p>
            </div>

            {/* Servicios */}
            <div className="mb-6">
              <h4 className="font-semibold text-husi-accent mb-3">Nuestras soluciones:</h4>
              <ul className="space-y-2">
                <li className="flex items-start text-sm text-neutral-gray">
                  <span className="text-husi-accent mr-2">•</span>
                  Gobierno corporativo
                </li>
                <li className="flex items-start text-sm text-neutral-gray">
                  <span className="text-husi-accent mr-2">•</span>
                  Gestión de riesgos estratégicos y operacionales
                </li>
                <li className="flex items-start text-sm text-neutral-gray">
                  <span className="text-husi-accent mr-2">•</span>
                  Cumplimiento normativo nacional e internacional
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link
                href="/evaluadores/grc"
                className="block w-full bg-husi-accent text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-husi-light transition"
              >
                🎯 Evalúa tu Empresa
                <span className="block text-sm font-normal opacity-90 mt-1">
                  Diagnóstico de madurez GRC (8 min)
                </span>
              </Link>
              <Link
                href="/soluciones/privado"
                className="block w-full bg-white text-husi-accent text-center px-6 py-3 rounded-lg font-semibold border-2 border-husi-accent hover:bg-husi-accent/5 transition"
              >
                Ver Soluciones Completas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nuestro Modelo: Tres Pilares Transversales */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Nuestro Modelo de Transformación</h2>
            <p className="text-xl text-neutral-gray">
              Tres pilares integrados que aplicamos en ambos sectores
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icono: '👥',
                titulo: 'Talento Humano',
                descripcion: 'Ajustamos la capacitación con base en un modelo de competencias definido para cada organización',
                color: 'bg-husi-dark/5',
                borderColor: 'border-husi-dark',
                ejemplos: ['Evaluación de competencias', 'Programas de capacitación especializados', 'Desarrollo de liderazgo']
              },
              {
                icono: '⚙️',
                titulo: 'Procesos',
                descripcion: 'Diseño e implementación de procedimientos que institucionalizan la operación basada en evidencia',
                color: 'bg-husi-medium/5',
                borderColor: 'border-husi-medium',
                ejemplos: ['Mapeo y optimización de procesos', 'Procedimientos operativos estandarizados', 'Gestión del cambio']
              },
              {
                icono: '💻',
                titulo: 'Tecnología',
                descripcion: 'Sistemas que automatizan la ingesta de datos y generan inteligencia accionable',
                color: 'bg-husi-accent/5',
                borderColor: 'border-husi-accent',
                ejemplos: ['Plataformas de análisis', 'Automatización de controles', 'Dashboards ejecutivos']
              }
            ].map((pilar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`${pilar.color} p-8 rounded-xl border-2 ${pilar.borderColor} hover:shadow-xl transition-shadow`}
              >
                <div className="text-5xl mb-4">{pilar.icono}</div>
                <h3 className="text-xl font-bold mb-3 text-husi-dark">{pilar.titulo}</h3>
                <p className="text-neutral-gray mb-4">{pilar.descripcion}</p>
                
                {/* Ejemplos expandibles */}
                <details className="text-sm">
                  <summary className="cursor-pointer text-husi-dark font-semibold hover:text-husi-accent transition">
                    Ver servicios incluidos
                  </summary>
                  <ul className="mt-3 space-y-1">
                    {pilar.ejemplos.map((ejemplo, i) => (
                      <li key={i} className="text-neutral-gray flex items-start">
                        <span className="text-husi-accent mr-2">→</span>
                        {ejemplo}
                      </li>
                    ))}
                  </ul>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-husi-dark text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para Transformar tu Organización?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Agenda una consultoría personalizada sin costo
          </p>
          <Link 
            href="/contacto"
            className="inline-block bg-white text-husi-dark px-10 py-4 rounded-lg text-lg font-semibold hover:bg-neutral-light transition"
          >
            Contactar
          </Link>
        </div>
      </section>
    </div>
  )
}