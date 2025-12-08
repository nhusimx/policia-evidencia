'use client'

import { useState } from 'react'
import { preguntasEvaluador, calcularNivel } from '../../lib/evaluador-logic'
import { useRouter } from 'next/navigation'

export default function EvaluadorQuiz() {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({})
  const [preguntaActual, setPreguntaActual] = useState(0)
  const router = useRouter()

  const pregunta = preguntasEvaluador[preguntaActual]
  const totalPreguntas = preguntasEvaluador.length
  const progreso = ((preguntaActual + 1) / totalPreguntas) * 100

  const handleRespuesta = (puntos: number) => {
    const nuevasRespuestas = {
      ...respuestas,
      [pregunta.id]: puntos
    }
    setRespuestas(nuevasRespuestas)

    // Si es la última pregunta, calcular y redirigir
    if (preguntaActual === totalPreguntas - 1) {
      const resultado = calcularNivel(nuevasRespuestas)
      // Guardar en localStorage para la página de resultados
      localStorage.setItem('evaluador-resultado', JSON.stringify(resultado))
      router.push('/soluciones/resultados')
    } else {
      // Siguiente pregunta
      setPreguntaActual(preguntaActual + 1)
    }
  }

  const handleAnterior = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1)
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Pregunta {preguntaActual + 1} de {totalPreguntas}</span>
          <span>{Math.round(progreso)}% completado</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* Indicador de pilar */}
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
          pregunta.pilar === 'talento' ? 'bg-purple-100 text-purple-700' :
          pregunta.pilar === 'procesos' ? 'bg-green-100 text-green-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {pregunta.pilar === 'talento' ? '👥 Talento Humano' :
           pregunta.pilar === 'procesos' ? '⚙️ Procesos' :
           '💻 Tecnología'}
        </span>
      </div>

      {/* Pregunta */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {pregunta.pregunta}
      </h3>

      {/* Opciones */}
      <div className="space-y-3">
        {pregunta.opciones.map((opcion, idx) => (
          <button
            key={idx}
            onClick={() => handleRespuesta(opcion.puntos)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              respuestas[pregunta.id] === opcion.puntos
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mt-0.5 mr-3 flex items-center justify-center ${
                respuestas[pregunta.id] === opcion.puntos
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-gray-300'
              }`}>
                {respuestas[pregunta.id] === opcion.puntos && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-gray-700">{opcion.texto}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Botones de navegación */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={handleAnterior}
          disabled={preguntaActual === 0}
          className="px-6 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>
        
        <div className="text-sm text-gray-500">
          {respuestas[pregunta.id] !== undefined ? (
            <span className="text-green-600">✓ Respondida</span>
          ) : (
            <span>Selecciona una opción</span>
          )}
        </div>
      </div>
    </div>
  )
}