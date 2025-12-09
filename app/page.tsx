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
            De la Intuición Policial a la<br />
            <span className="text-husi-dark">Inteligencia Territorial</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-gray mb-8 max-w-3xl mx-auto"
          >
            Transformamos instituciones de seguridad reactivas en organizaciones estratégicas basadas en evidencia
          </motion.p>
          
          {/* Dos CTAs lado a lado con animación */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <Link 
              href="/soluciones#evaluador"
              className="group bg-white border-2 border-husi-dark p-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-neutral-text group-hover:text-husi-dark transition">
                Evalúa tu Institución
              </h3>
              <p className="text-neutral-gray mb-4">
                Descubre en 2 minutos el nivel de madurez de tu organización y recibe una ruta personalizada de transformación
              </p>
              <span className="text-husi-dark font-semibold group-hover:underline">
                Iniciar Evaluación Gratuita
              </span>
            </Link>

            <Link 
              href="/soluciones#simulador"
              className="group bg-white border-2 border-husi-accent p-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3 text-neutral-text group-hover:text-husi-accent transition">
                Simula una Intervención
              </h3>
              <p className="text-neutral-gray mb-4">
                Explora cómo funciona nuestro modelo de 4 hélices para reducir delitos específicos en tu territorio
              </p>
              <span className="text-husi-accent font-semibold group-hover:underline">
                Ver Simulador Interactivo
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Problema vs Solución */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          El Cambio que Necesitas
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              tipo: "Institución Reactiva",
              items: [
                "Patrullaje aleatorio",
                "Decisiones por intuición",
                "Datos dispersos",
                "Sin coordinación",
                "Capacitación esporádica"
              ],
              color: "border-neutral-gray",  // ← Cambió de border-red-500
              bgColor: "bg-gray-50",         // ← Nuevo
              badge: "❌ Situación Actual"
            },
            {
              tipo: "En Transición",
              items: [
                "Análisis básicos",
                "Capacitación sin evaluación",
                "Tecnología fragmentada",
                "Coordinación informal",
                "Resultados no medibles"
              ],
              color: "border-husi-medium",   // ← Cambió de border-yellow-500
              bgColor: "bg-husi-light/5",    // ← Nuevo
              badge: "⚠️ Riesgo de Estancamiento"
            },
            {
              tipo: "Basada en Evidencia",
              items: [
                "Análisis predictivo",
                "Personal certificado",
                "Sistema integrado",
                "Coordinación formal",
                "Mejora continua"
              ],
              color: "border-husi-accent",   // ← Ya estaba bien
              bgColor: "bg-husi-accent/5",   // ← Nuevo
              badge: "✅ Objetivo"
            }
          ].map((columna, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={`${columna.bgColor} p-6 rounded-lg shadow-md border-l-4 ${columna.color} hover:shadow-xl transition-shadow`}
            >
              <span className="text-xs font-semibold bg-white px-3 py-1 rounded-full mb-3 inline-block border border-gray-200">
                {columna.badge}
              </span>
              <h3 className="text-xl font-bold mb-4 text-husi-dark">{columna.tipo}</h3>
              <ul className="space-y-2">
                {columna.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-husi-dark">•</span>
                    <span className="text-neutral-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tres Pilares */}
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
              Tres pilares integrados para resultados sostenibles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icono: '👥',
                titulo: 'Talento Humano',
                descripcion: 'Capacitación especializada y evaluación de competencias para profesionalizar tu equipo de análisis criminal',
                color: 'bg-husi-dark/5',        // ← Cambió de bg-purple-50
                borderColor: 'border-husi-dark' // ← Nuevo
              },
              {
                icono: '⚙️',
                titulo: 'Procesos',
                descripcion: 'Diseño e implementación de procedimientos que institucionalizan la operación basada en evidencia',
                color: 'bg-husi-medium/5',         // ← Cambió
                borderColor: 'border-husi-medium'  // ← Nuevo
              },
              {
                icono: '💻',
                titulo: 'Tecnología',
                descripcion: 'Sistema de análisis que automatiza la ingesta de datos y genera inteligencia accionable',
                color: 'bg-husi-accent/5',        // ← Cambió
                borderColor: 'border-husi-accent' // ← Nuevo
              }
            ].map((pilar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ scale: 1.05 }}
                className={`${pilar.color} p-8 rounded-xl cursor-pointer transition-shadow hover:shadow-xl border-2 ${pilar.borderColor}`}
              >
                <div className="text-5xl mb-4">{pilar.icono}</div>
                <h3 className="text-xl font-bold mb-3 text-husi-dark">{pilar.titulo}</h3>
                <p className="text-neutral-gray">{pilar.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-husi-dark text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para Transformar tu Institución?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comienza con una evaluación gratuita o explora nuestras soluciones
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/soluciones#evaluador"
              className="inline-block bg-white text-husi-dark px-8 py-3 rounded-lg text-lg font-semibold hover:bg-neutral-light transition"
            >
              Evaluar mi Institución
            </Link>
            <Link 
              href="/contacto"
              className="inline-block bg-husi-medium text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-husi-accent transition border-2 border-white"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}