'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { preguntasGRC } from '../../lib/evaluador-grc-logic'

export default function EvaluadorGRC() {
  const router = useRouter()
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<number, number>>({})

  const pregunta = preguntasGRC[preguntaActual]
  const progreso = ((preguntaActual + 1) / preguntasGRC.length) * 100

  const handleRespuesta = (valor: number) => {
    const nuevasRespuestas = {
      ...respuestas,
      [pregunta.id]: valor
    }
    setRespuestas(nuevasRespuestas)

    // Guardar en localStorage
    localStorage.setItem('evaluadorGRCRespuestas', JSON.stringify(nuevasRespuestas))

    // Si es la última pregunta, ir a resultados
    if (preguntaActual === preguntasGRC.length - 1) {
      router.push('/evaluadores/grc/resultados')
    } else {
      setPreguntaActual(preguntaActual + 1)
    }
  }

  const handleAnterior = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1)
    }
  }

  // Mapeo de colores por dimensión
  const coloresDimension = {
    gobernanza: 'bg-husi-dark',
    riesgos_estrategicos: 'bg-husi-medium',
    riesgos_operacionales: 'bg-husi-accent',
    cumplimiento: 'bg-husi-light',
    cultura: 'bg-purple-500'
  }

  const nombresDimension = {
    gobernanza: 'Gobernanza',
    riesgos_estrategicos: 'Riesgos Estratégicos',
    riesgos_operacionales: 'Riesgos Operacionales',
    cumplimiento: 'Cumplimiento',
    cultura: 'Cultura de Integridad'
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-neutral-gray">
            Pregunta {preguntaActual + 1} de {preguntasGRC.length}
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${coloresDimension[pregunta.dimension]}`}>
            {nombresDimension[pregunta.dimension]}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-husi-dark h-3 rounded-full transition-all duration-300"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* Pregunta */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border-2 border-husi-light/20">
        <h3 className="text-xl font-bold text-husi-dark mb-6">
          {pregunta.texto}
        </h3>

        {/* Opciones */}
        <div className="space-y-3">
          {pregunta.opciones.map((opcion, idx) => (
            <button
              key={idx}
              onClick={() => handleRespuesta(opcion.valor)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                respuestas[pregunta.id] === opcion.valor
                  ? 'border-husi-dark bg-husi-dark/5'
                  : 'border-gray-200 hover:border-husi-accent hover:bg-husi-accent/5'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                  respuestas[pregunta.id] === opcion.valor
                    ? 'border-husi-dark bg-husi-dark'
                    : 'border-gray-300'
                }`}>
                  {respuestas[pregunta.id] === opcion.valor && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-neutral-text">{opcion.texto}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navegación */}
      <div className="flex justify-between">
        <button
          onClick={handleAnterior}
          disabled={preguntaActual === 0}
          className="px-6 py-3 text-neutral-gray hover:text-husi-dark disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          ← Anterior
        </button>
        <span className="text-sm text-neutral-gray self-center">
          {Object.keys(respuestas).length} de {preguntasGRC.length} respondidas
        </span>
      </div>
    </div>
  )
}