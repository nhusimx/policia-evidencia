'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { calcularNivelGRC, calcularPuntosPorDimension } from '../../../../lib/evaluador-grc-logic'
import jsPDF from 'jspdf'

export default function ResultadosGRCPage() {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({})
  const [nivel, setNivel] = useState<any>(null)
  const [puntosTotales, setPuntosTotales] = useState(0)
  const [puntosPorDimension, setPuntosPorDimension] = useState<any>(null)

  useEffect(() => {
    const respuestasGuardadas = localStorage.getItem('evaluadorGRCRespuestas')
    if (respuestasGuardadas) {
      const respuestasObj = JSON.parse(respuestasGuardadas)
      setRespuestas(respuestasObj)

      let total = 0
      Object.values(respuestasObj).forEach((valor: any) => {
        total += valor
      })

      setPuntosTotales(total)
      const nivelCalculado = calcularNivelGRC(respuestasObj)
      setNivel(nivelCalculado)
      
      const puntosDim = calcularPuntosPorDimension(respuestasObj)
      setPuntosPorDimension(puntosDim)
    }
  }, [])

  if (!nivel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-light to-white">
        <div className="text-center">
          <p className="text-xl text-neutral-gray mb-4">No se encontraron resultados</p>
          <Link href="/evaluadores/grc" className="text-husi-dark hover:text-husi-accent underline">
            Realizar evaluación
          </Link>
        </div>
      </div>
    )
  }

  const porcentaje = Math.round((puntosTotales / 150) * 100)

  const dimensionesInfo = [
    { key: 'gobernanza', nombre: 'Gobernanza', color: 'bg-husi-dark', max: 50 },
    { key: 'riesgos_estrategicos', nombre: 'Riesgos Estratégicos', color: 'bg-husi-medium', max: 30 },
    { key: 'riesgos_operacionales', nombre: 'Riesgos Operacionales', color: 'bg-husi-accent', max: 30 },
    { key: 'cumplimiento', nombre: 'Cumplimiento', color: 'bg-husi-light', max: 20 },
    { key: 'cultura', nombre: 'Cultura de Integridad', color: 'bg-purple-500', max: 20 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header con Nivel */}
        <div className="bg-gradient-to-r from-husi-dark to-husi-medium text-white p-8 rounded-t-xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              Nivel {nivel.nivel}: {nivel.nombre}
            </h1>
            <p className="text-2xl opacity-90">
              {puntosTotales} de 150 puntos ({porcentaje}%)
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-b-xl shadow-xl">
          
          {/* Puntuación por Dimensión */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-husi-dark">Puntuación por Dimensión</h2>
            <div className="space-y-4">
              {dimensionesInfo.map((dim) => (
                <div key={dim.key}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-neutral-gray">{dim.nombre}</h3>
                    <span className="text-sm font-bold text-husi-dark">
                      {puntosPorDimension[dim.key]}/{dim.max}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${dim.color} h-3 rounded-full transition-all`}
                      style={{ width: `${(puntosPorDimension[dim.key] / dim.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-husi-dark">Diagnóstico</h2>
            <p className="text-neutral-gray text-lg leading-relaxed">
              {nivel.descripcion}
            </p>
          </div>

          {/* Características */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-husi-dark">Características de tu Organización</h2>
            <ul className="space-y-3">
              {nivel.caracteristicas.map((car: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <span className="text-husi-accent mr-3 text-xl">✓</span>
                  <span className="text-neutral-gray">{car}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recomendaciones */}
          <div className="mb-8 bg-husi-accent/5 border-l-4 border-husi-accent p-6 rounded">
            <h2 className="text-xl font-bold mb-4 text-husi-dark">💡 Recomendaciones Prioritarias</h2>
            <ul className="space-y-2">
              {nivel.recomendaciones.map((rec: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <span className="text-husi-accent mr-3">•</span>
                  <span className="text-neutral-gray">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ruta de Transformación */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-husi-dark">Tu Ruta de Transformación GRC</h2>
            <div className="space-y-6">
              {nivel.ruta.map((fase: any, idx: number) => (
                <div key={idx} className="border-l-4 border-husi-accent pl-6 py-4">
                  <div className="flex items-center mb-2">
                    <span className="bg-husi-dark text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                      {idx + 1}
                    </span>
                    <h3 className="text-xl font-bold text-husi-dark">{fase.fase}</h3>
                    <span className="ml-auto text-sm text-neutral-gray bg-neutral-light px-3 py-1 rounded-full">
                      {fase.duracion}
                    </span>
                  </div>
                  <p className="text-neutral-gray mb-3">{fase.objetivo}</p>
                  <div className="bg-neutral-light p-4 rounded-lg">
                    <p className="text-sm font-semibold text-husi-dark mb-2">Entregables:</p>
                    <ul className="space-y-1">
                      {fase.entregables.map((ent: string, i: number) => (
                        <li key={i} className="text-sm text-neutral-gray flex items-start">
                          <span className="text-husi-accent mr-2">✓</span>
                          <span>{ent}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs Finales */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-husi-dark">
              Siguientes Pasos
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto?tipo=grc"
                className="bg-husi-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-husi-medium transition text-center"
              >
                Solicitar Consultoría GRC
              </Link>
              <button
                onClick={() => {
                  // Función para generar PDF (similar a la del evaluador institucional)
                  const doc = new jsPDF()
                  const pageWidth = doc.internal.pageSize.getWidth()
                  const margin = 20
                  let y = 20
                  
                  doc.setFillColor(10, 61, 92)
                  doc.rect(0, 0, pageWidth, 40, 'F')
                  doc.setTextColor(255, 255, 255)
                  doc.setFontSize(24)
                  doc.text('Evaluación GRC', pageWidth / 2, 25, { align: 'center' })
                  
                  doc.setTextColor(0, 0, 0)
                  y = 60
                  
                  doc.setFontSize(18)
                  doc.setFont('helvetica', 'bold')
                  doc.text(`Nivel ${nivel.nivel}: ${nivel.nombre}`, margin, y)
                  y += 10
                  
                  doc.setFontSize(12)
                  doc.setFont('helvetica', 'normal')
                  doc.text(`Puntuación: ${puntosTotales}/150 (${porcentaje}%)`, margin, y)
                  y += 15
                  
                  doc.setFont('helvetica', 'bold')
                  doc.text('Diagnóstico:', margin, y)
                  y += 7
                  doc.setFont('helvetica', 'normal')
                  const diagLines = doc.splitTextToSize(nivel.descripcion, pageWidth - 2 * margin)
                  doc.text(diagLines, margin, y)
                  y += diagLines.length * 7 + 10
                  
                  doc.addPage()
                  y = 20
                  doc.setFontSize(18)
                  doc.setFont('helvetica', 'bold')
                  doc.text('Ruta de Transformación', margin, y)
                  y += 15
                  
                  doc.setFontSize(12)
                  nivel.ruta.forEach((fase: any, idx: number) => {
                    if (y > 250) {
                      doc.addPage()
                      y = 20
                    }
                    
                    doc.setFont('helvetica', 'bold')
                    doc.text(`${idx + 1}. ${fase.fase}`, margin, y)
                    y += 7
                    doc.setFont('helvetica', 'normal')
                    const objLines = doc.splitTextToSize(fase.objetivo, pageWidth - 2 * margin - 5)
                    doc.text(objLines, margin + 5, y)
                    y += objLines.length * 7 + 10
                  })
                  
                  const totalPages = doc.internal.pages.length - 1
                  for (let i = 1; i <= totalPages; i++) {
                    doc.setPage(i)
                    doc.setFontSize(10)
                    doc.setTextColor(128, 128, 128)
                    doc.text('Husi Strategics - hola@husi.mx', pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' })
                  }
                  
                  doc.save(`evaluacion-grc-${nivel.nombre.toLowerCase().replace(/ /g, '-')}.pdf`)
                }}
                className="bg-husi-medium text-white px-8 py-3 rounded-lg font-semibold hover:bg-husi-accent transition"
              >
                Descargar Resultados (PDF)
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link 
                href="/evaluadores/grc" 
                className="text-husi-accent hover:text-husi-dark underline"
              >
                ← Volver al Evaluador
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}