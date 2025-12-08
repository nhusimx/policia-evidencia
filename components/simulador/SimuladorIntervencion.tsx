'use client'

import { useState } from 'react'
import { tiposDelito, getIntervencionesPorDelito, getResultadosProyectados, TipoDelito } from '../../lib/simulador-data'

export default function SimuladorIntervencion() {
  const [paso, setPaso] = useState(1)
  const [delitoSeleccionado, setDelitoSeleccionado] = useState<TipoDelito | null>(null)

  const handleSeleccionDelito = (delito: TipoDelito) => {
    setDelitoSeleccionado(delito)
    setPaso(2)
  }

  const reiniciar = () => {
    setPaso(1)
    setDelitoSeleccionado(null)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Indicador de pasos */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                paso >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {num}
              </div>
              {num < 4 && (
                <div className={`w-16 h-1 ${paso > num ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PASO 1: Selección de Delito */}
      {paso === 1 && (
        <div>
          <h3 className="text-2xl font-bold text-center mb-4">
            Selecciona el Tipo de Delito a Intervenir
          </h3>
          <p className="text-gray-600 text-center mb-8">
            Elige el problema delictivo que quieres abordar
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {tiposDelito.map((delito) => (
              <button
                key={delito.id}
                onClick={() => handleSeleccionDelito(delito)}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-left border-2 border-transparent hover:border-blue-500"
              >
                <div className="text-4xl mb-3">{delito.icono}</div>
                <h4 className="text-xl font-bold mb-2">{delito.nombre}</h4>
                <p className="text-gray-600 text-sm">{delito.descripcion}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PASO 2: Análisis del Problema */}
      {paso === 2 && delitoSeleccionado && (
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Análisis: {delitoSeleccionado.nombre}
          </h3>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h4 className="text-xl font-bold mb-4">Factores de Riesgo Identificados</h4>
            <ul className="space-y-2">
              {delitoSeleccionado.factoresRiesgo.map((factor, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-red-500 mr-2">⚠️</span>
                  <span className="text-gray-700">{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h4 className="text-xl font-bold mb-4">Zonas Típicas de Ocurrencia</h4>
            <div className="flex flex-wrap gap-3">
              {delitoSeleccionado.zonasTipicas.map((zona, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                  📍 {zona}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={reiniciar}
              className="px-6 py-3 text-gray-600 hover:text-gray-900"
            >
              ← Cambiar Delito
            </button>
            <button
              onClick={() => setPaso(3)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Ver Modelo de Intervención
            </button>
          </div>
        </div>
      )}

      {/* PASO 3: Modelo de 4 Hélices */}
      {paso === 3 && delitoSeleccionado && (
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Modelo de Intervención: 4 Hélices
          </h3>
          <p className="text-gray-600 mb-8">
            Cada sector aporta capacidades específicas para atacar el problema desde múltiples ángulos
          </p>

          <div className="space-y-6">
            {getIntervencionesPorDelito(delitoSeleccionado.id).map((intervencion, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4"
                style={{ borderColor: intervencion.color }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{intervencion.icono}</span>
                    <div>
                      <h4 className="text-xl font-bold">{intervencion.nombreSector}</h4>
                      <p className="text-sm text-gray-600">{intervencion.responsable}</p>
                    </div>
                  </div>
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                    {intervencion.timeline}
                  </span>
                </div>

                <h5 className="font-semibold mb-2">Acciones Específicas:</h5>
                <ul className="space-y-2">
                  {intervencion.acciones.map((accion, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="mr-2">✓</span>
                      <span className="text-gray-700">{accion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setPaso(2)}
              className="px-6 py-3 text-gray-600 hover:text-gray-900"
            >
              ← Regresar
            </button>
            <button
              onClick={() => setPaso(4)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Ver Resultados Esperados
            </button>
          </div>
        </div>
      )}

      {/* PASO 4: Resultados Proyectados */}
      {paso === 4 && delitoSeleccionado && (
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Resultados Esperados
          </h3>
          <p className="text-gray-600 mb-8">
            Basados en intervenciones similares implementadas previamente
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {getResultadosProyectados(delitoSeleccionado.id).map((resultado, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-gray-700 mb-2">{resultado.metrica}</h4>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {resultado.valorEsperado}
                </div>
                <p className="text-sm text-gray-500">Plazo: {resultado.plazo}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para Implementar una Intervención en tu Territorio?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Solicita un análisis preliminar sin costo para tu zona específica
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacto"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
              >
                Solicitar Análisis Preliminar
              </a>
              <button
                onClick={reiniciar}
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Simular Otro Delito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}