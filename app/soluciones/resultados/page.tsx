'use client'

import { useEffect, useState } from 'react'
import { NivelMadurez, Pilar } from '../../../lib/evaluador-logic'
import Link from 'next/link'

export default function ResultadosPage() {
  const [resultado, setResultado] = useState<{
    puntosTotales: number
    puntosPorPilar: Record<Pilar, number>
    nivel: NivelMadurez
    porcentaje: number
  } | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('evaluador-resultado')
    if (data) {
      setResultado(JSON.parse(data))
    }
  }, [])

  if (!resultado) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600">Cargando resultados...</p>
      </div>
    )
  }

  const { nivel, puntosTotales, puntosPorPilar, porcentaje } = resultado

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header con resultado */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
            Nivel {nivel.nivel} de 4
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {nivel.nombre}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Obtuviste {puntosTotales} de 120 puntos ({porcentaje}%)
          </p>
        </div>

        {/* Gráfica de pilares */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Puntuación por Pilar</h2>
          <div className="space-y-6">
            {[
              { pilar: 'talento' as Pilar, nombre: 'Talento Humano', icono: '👥', max: 40 },
              { pilar: 'procesos' as Pilar, nombre: 'Procesos', icono: '⚙️', max: 40 },
              { pilar: 'tecnologia' as Pilar, nombre: 'Tecnología', icono: '💻', max: 40 }
            ].map(({ pilar, nombre, icono, max }) => (
              <div key={pilar}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">
                    {icono} {nombre}
                  </span>
                  <span className="text-gray-600">
                    {puntosPorPilar[pilar]} / {max} puntos
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${(puntosPorPilar[pilar] / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnóstico */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Diagnóstico</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {nivel.diagnostico}
          </p>
        </div>

        {/* Características actuales */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Características de tu Institución</h2>
          <ul className="space-y-3">
            {nivel.caracteristicas.map((caracteristica, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">●</span>
                <span className="text-gray-700">{caracteristica}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Riesgos */}
        {nivel.riesgos && nivel.riesgos.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-red-900">Riesgos de No Actuar</h2>
            <ul className="space-y-3">
              {nivel.riesgos.map((riesgo, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">⚠</span>
                  <span className="text-red-800">{riesgo}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ruta de transformación */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Tu Ruta de Transformación</h2>
          <div className="space-y-6">
            {nivel.ruta.map((fase, idx) => (
              <div key={idx} className="border-l-4 border-blue-600 pl-6 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{fase.fase}</h3>
                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full whitespace-nowrap ml-2">
                    {fase.duracion}
                  </span>
                </div>
                <p className="text-gray-700 mb-3 font-semibold">{fase.objetivo}</p>
                <p className="text-sm text-gray-600 mb-2">Entregables:</p>
                <ul className="space-y-1">
                  {fase.entregables.map((entregable, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="mr-2">✓</span>
                      <span>{entregable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="bg-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Dar el Siguiente Paso?</h2>
          <p className="text-xl mb-6 opacity-90">
            Agenda una consultoría gratuita para diseñar tu plan personalizado
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contacto?tipo=consultoria"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Agendar Consultoría Gratuita
            </Link>
            <button
              onClick={() => window.print()}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Descargar Resultados (PDF)
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}