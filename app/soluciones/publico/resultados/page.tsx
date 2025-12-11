'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { calcularNivel } from '../../../../lib/evaluador-logic'
import jsPDF from 'jspdf'

export default function ResultadosPage() {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({})
  const [nivel, setNivel] = useState<any>(null)
  const [puntosTotales, setPuntosTotales] = useState(0)
  const [puntosPorPilar, setPuntosPorPilar] = useState({
    talento: 0,
    procesos: 0,
    tecnologia: 0
  })

  useEffect(() => {
    const respuestasGuardadas = localStorage.getItem('evaluadorRespuestas')
    if (respuestasGuardadas) {
      const respuestasObj = JSON.parse(respuestasGuardadas)
      setRespuestas(respuestasObj)

      // Usar la función calcularNivel que hace todo el cálculo
      const resultado = calcularNivel(respuestasObj)
      
      console.log('Resultado calcularNivel:', resultado)
      console.log('Nivel:', resultado.nivel)
      console.log('Características:', resultado.nivel?.caracteristicas)

      setPuntosTotales(resultado.puntosTotales)
      setPuntosPorPilar(resultado.puntosPorPilar)
      setNivel(resultado.nivel)
    }
  }, [])

  if (!nivel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-light to-white">
        <div className="text-center">
          <p className="text-xl text-neutral-gray mb-4">No se encontraron resultados</p>
          <Link href="/soluciones/publico#evaluador" className="text-husi-dark hover:text-husi-accent underline">
            Realizar evaluación
          </Link>
        </div>
      </div>
    )
  }

  const porcentaje = Math.round((puntosTotales / 120) * 100)

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
              {puntosTotales} de 120 puntos ({porcentaje}%)
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-b-xl shadow-xl">
          
          {/* Puntuación por Pilar */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-husi-dark">Puntuación por Pilar</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-husi-dark/5 p-6 rounded-lg border-2 border-husi-dark">
                <h3 className="text-sm font-semibold text-neutral-gray mb-2">Talento Humano</h3>
                <div className="text-3xl font-bold text-husi-dark mb-2">{puntosPorPilar.talento}/40</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-husi-dark h-3 rounded-full transition-all" 
                    style={{ width: `${(puntosPorPilar.talento / 40) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-husi-medium/5 p-6 rounded-lg border-2 border-husi-medium">
                <h3 className="text-sm font-semibold text-neutral-gray mb-2">Procesos</h3>
                <div className="text-3xl font-bold text-husi-medium mb-2">{puntosPorPilar.procesos}/40</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-husi-medium h-3 rounded-full transition-all" 
                    style={{ width: `${(puntosPorPilar.procesos / 40) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-husi-accent/5 p-6 rounded-lg border-2 border-husi-accent">
                <h3 className="text-sm font-semibold text-neutral-gray mb-2">Tecnología</h3>
                <div className="text-3xl font-bold text-husi-accent mb-2">{puntosPorPilar.tecnologia}/40</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-husi-accent h-3 rounded-full transition-all" 
                    style={{ width: `${(puntosPorPilar.tecnologia / 40) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Diagnóstico */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-husi-dark">Diagnóstico</h2>
            <p className="text-neutral-gray text-lg leading-relaxed">
              {nivel.diagnostico}
            </p>
          </div>

          {/* Características */}
          {nivel.caracteristicas && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-husi-dark">Características de tu Institución</h2>
              <ul className="space-y-3">
                {nivel.caracteristicas.map((caracteristica: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-husi-accent mr-3 text-xl">✓</span>
                    <span className="text-neutral-gray">{caracteristica}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Riesgos (si aplica) */}
          {nivel.riesgos && nivel.riesgos.length > 0 && (
            <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <h2 className="text-xl font-bold mb-4 text-red-700">⚠️ Riesgos de No Actuar</h2>
              <ul className="space-y-2">
                {nivel.riesgos.map((riesgo: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span className="text-red-700">{riesgo}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ruta de Transformación */}
          {nivel.ruta && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-husi-dark">Tu Ruta de Transformación</h2>
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
                        {fase.entregables.map((entregable: string, i: number) => (
                          <li key={i} className="text-sm text-neutral-gray flex items-start">
                            <span className="text-husi-accent mr-2">✓</span>
                            <span>{entregable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTAs Finales */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-husi-dark">
              Siguientes Pasos
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto?tipo=consultoria"
                className="bg-husi-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-husi-medium transition text-center"
              >
                Agendar Consultoría Personalizada
              </Link>
              <button
                onClick={() => {
                  const doc = new jsPDF()
                  const pageWidth = doc.internal.pageSize.getWidth()
                  const margin = 20
                  let y = 20
                  
                  doc.setFillColor(10, 61, 92)
                  doc.rect(0, 0, pageWidth, 40, 'F')
                  doc.setTextColor(255, 255, 255)
                  doc.setFontSize(24)
                  doc.text('Resultados de Evaluación', pageWidth / 2, 25, { align: 'center' })
                  
                  doc.setTextColor(0, 0, 0)
                  y = 60
                  
                  doc.setFontSize(18)
                  doc.setFont('helvetica', 'bold')
                  doc.text(`Nivel ${nivel.nivel}: ${nivel.nombre}`, margin, y)
                  y += 10
                  
                  doc.setFontSize(12)
                  doc.setFont('helvetica', 'normal')
                  doc.text(`Puntuación: ${puntosTotales}/120 (${porcentaje}%)`, margin, y)
                  y += 15
                  
                  doc.setFont('helvetica', 'bold')
                  doc.text('Diagnóstico:', margin, y)
                  y += 7
                  doc.setFont('helvetica', 'normal')
                  const diagnosticoLines = doc.splitTextToSize(nivel.diagnostico, pageWidth - 2 * margin)
                  doc.text(diagnosticoLines, margin, y)
                  y += diagnosticoLines.length * 7 + 10
                  
                  doc.setFont('helvetica', 'bold')
                  doc.text('Puntuación por Pilar:', margin, y)
                  y += 10
                  doc.setFont('helvetica', 'normal')
                  doc.text(`• Talento Humano: ${puntosPorPilar.talento}/40`, margin + 5, y)
                  y += 7
                  doc.text(`• Procesos: ${puntosPorPilar.procesos}/40`, margin + 5, y)
                  y += 7
                  doc.text(`• Tecnología: ${puntosPorPilar.tecnologia}/40`, margin + 5, y)
                  y += 15
                  
                  if (nivel.caracteristicas) {
                    doc.setFont('helvetica', 'bold')
                    doc.text('Características de tu Institución:', margin, y)
                    y += 7
                    doc.setFont('helvetica', 'normal')
                    nivel.caracteristicas.forEach((car: string) => {
                      const lines = doc.splitTextToSize(`• ${car}`, pageWidth - 2 * margin - 5)
                      doc.text(lines, margin + 5, y)
                      y += lines.length * 7
                    })
                  }
                  
                  if (nivel.ruta) {
                    doc.addPage()
                    y = 20
                    
                    doc.setFillColor(10, 61, 92)
                    doc.rect(0, 0, pageWidth, 30, 'F')
                    doc.setTextColor(255, 255, 255)
                    doc.setFontSize(18)
                    doc.setFont('helvetica', 'bold')
                    doc.text('Tu Ruta de Transformacion', pageWidth / 2, 20, { align: 'center' })
                    
                    doc.setTextColor(0, 0, 0)
                    y = 45
                    
                    doc.setFontSize(11)
                    nivel.ruta.forEach((fase: any, idx: number) => {
                      // Verificar espacio para nueva fase
                      if (y > 240) {
                        doc.addPage()
                        y = 20
                      }
                      
                      // Número de fase
                      doc.setFillColor(10, 61, 92)
                      doc.circle(margin + 5, y + 3, 5, 'F')
                      doc.setTextColor(255, 255, 255)
                      doc.setFontSize(10)
                      doc.text(`${idx + 1}`, margin + 5, y + 5, { align: 'center' })
                      
                      // Título de fase
                      doc.setTextColor(0, 0, 0)
                      doc.setFontSize(12)
                      doc.setFont('helvetica', 'bold')
                      const tituloFase = `${fase.fase}`
                      doc.text(tituloFase, margin + 15, y + 5)
                      
                      // Duración
                      doc.setFontSize(9)
                      doc.setFont('helvetica', 'normal')
                      doc.setTextColor(100, 100, 100)
                      doc.text(`(${fase.duracion})`, margin + 15, y + 11)
                      
                      y += 18
                      
                      // Objetivo
                      doc.setTextColor(0, 0, 0)
                      doc.setFontSize(10)
                      doc.setFont('helvetica', 'bold')
                      doc.text('Objetivo:', margin + 15, y)
                      y += 6
                      
                      doc.setFont('helvetica', 'normal')
                      const maxWidth = pageWidth - margin - 20
                      const objLines = doc.splitTextToSize(fase.objetivo, maxWidth)
                      
                      objLines.forEach((line: string) => {
                        if (y > 270) {
                          doc.addPage()
                          y = 20
                        }
                        doc.text(line, margin + 15, y)
                        y += 5
                      })
                      
                      y += 3
                      
                      // Entregables
                      doc.setFont('helvetica', 'bold')
                      doc.text('Entregables:', margin + 15, y)
                      y += 6
                      
                      doc.setFont('helvetica', 'normal')
                      fase.entregables.forEach((ent: string) => {
                        if (y > 270) {
                          doc.addPage()
                          y = 20
                        }
                        
                        // Bullet point
                        doc.setFontSize(8)
                        doc.text('✓', margin + 15, y)
                        
                        // Texto del entregable
                        doc.setFontSize(10)
                        const entLines = doc.splitTextToSize(ent, maxWidth - 10)
                        
                        entLines.forEach((line: string, lineIdx: number) => {
                          if (y > 270) {
                            doc.addPage()
                            y = 20
                          }
                          doc.text(line, margin + 20, y)
                          y += 5
                        })
                      })
                      
                      y += 8
                      
                      // Línea separadora
                      if (idx < nivel.ruta.length - 1) {
                        doc.setDrawColor(200, 200, 200)
                        doc.line(margin, y, pageWidth - margin, y)
                        y += 10
                      }
                    })
                  }
                  
                  const totalPages = doc.internal.pages.length - 1
                  for (let i = 1; i <= totalPages; i++) {
                    doc.setPage(i)
                    doc.setFontSize(10)
                    doc.setTextColor(128, 128, 128)
                    doc.text('Husi Strategics - hola@husi.mx', pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' })
                  }
                  
                  doc.save(`evaluacion-${nivel.nombre.toLowerCase().replace(/ /g, '-')}.pdf`)
                }}
                className="bg-husi-medium text-white px-8 py-3 rounded-lg font-semibold hover:bg-husi-accent transition"
              >
                Descargar Resultados (PDF)
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link 
                href="/soluciones/publico#evaluador" 
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