'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

type TipoConsulta = 'consultoria' | 'intervencion' | 'demo' | 'grc' | 'general'

export default function FormularioContacto() {
  const searchParams = useSearchParams()
  const tipoParam = searchParams.get('tipo') as TipoConsulta | null
  
  const [tipoConsulta, setTipoConsulta] = useState<TipoConsulta>(
    tipoParam || 'general'
  )
  const [formData, setFormData] = useState({
    nombre: '',
    cargo: '',
    institucion: '',
    email: '',
    telefono: '',
    mensaje: ''
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    if (tipoParam && ['consultoria', 'intervencion', 'demo', 'grc', 'general'].includes(tipoParam)) {
      setTipoConsulta(tipoParam)
    }
  }, [tipoParam])

  const tiposConsulta: Record<TipoConsulta, { icono: string; titulo: string; descripcion: string }> = {
    consultoria: {
      icono: '🏛️',
      titulo: 'Consultoría en Transformación Institucional',
      descripcion: 'Solicita una sesión personalizada para conocer cómo transformar tu institución de seguridad'
    },
    intervencion: {
      icono: '🎯',
      titulo: 'Intervención Territorial',
      descripcion: 'Diseñemos juntos una intervención focalizada para reducir delitos específicos'
    },
    demo: {
      icono: '💻',
      titulo: 'Demostración de Tecnología',
      descripcion: 'Conoce nuestras plataformas de análisis criminal en acción'
    },
    grc: {
      icono: '🏢',
      titulo: 'Consultoría GRC',
      descripcion: 'Solicita una sesión personalizada sobre Gobernanza, Riesgos y Cumplimiento para tu empresa'
    },
    general: {
      icono: '📧',
      titulo: 'Contacto General',
      descripcion: 'Envíanos tu mensaje y te responderemos a la brevedad'
    }
  }

  const placeholdersMensaje: Record<TipoConsulta, string> = {
    consultoria: 'Cuéntanos sobre tu institución: tamaño, principales desafíos en análisis criminal, objetivos que buscas alcanzar...',
    intervencion: 'Describe el problema delictivo que enfrentas: tipo de delito, zona afectada, situación actual...',
    demo: '¿Qué capacidades te gustaría conocer? ¿Análisis territorial, dashboards ejecutivos, alertas automáticas?',
    grc: 'Cuéntanos sobre tu empresa: sector, tamaño, principales retos en gobernanza, riesgos o cumplimiento que enfrentas...',
    general: 'Escribe tu mensaje aquí...'
  }

  const infoActual = tiposConsulta[tipoConsulta]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tipoConsulta: tiposConsulta[tipoConsulta].titulo
        }),
      })

      if (response.ok) {
        setEnviado(true)
        setFormData({
          nombre: '',
          cargo: '',
          institucion: '',
          email: '',
          telefono: '',
          mensaje: ''
        })
      } else {
        alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">{infoActual.icono}</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-husi-dark">
          {infoActual.titulo}
        </h1>
        <p className="text-xl text-neutral-gray">
          {infoActual.descripcion}
        </p>
      </div>

      {/* Selector de Tipo de Consulta */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-husi-dark">Tipo de Consulta</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {(Object.keys(tiposConsulta) as TipoConsulta[]).map((tipo) => (
            <button
              key={tipo}
              onClick={() => setTipoConsulta(tipo)}
              className={`p-4 rounded-lg border-2 transition-all ${
                tipoConsulta === tipo
                  ? 'border-husi-dark bg-husi-dark/5'
                  : 'border-gray-200 hover:border-husi-accent'
              }`}
            >
              <div className="text-3xl mb-2">{tiposConsulta[tipo].icono}</div>
              <div className="text-xs font-semibold text-neutral-text">
                {tipo === 'consultoria' && 'Consultoría'}
                {tipo === 'intervencion' && 'Intervención'}
                {tipo === 'demo' && 'Demo'}
                {tipo === 'grc' && 'GRC'}
                {tipo === 'general' && 'General'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Formulario */}
      {!enviado ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 border border-husi-light/20">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-semibold text-husi-dark mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-husi-accent focus:border-transparent"
                placeholder="Juan Pérez"
              />
            </div>

            {/* Cargo */}
            <div>
              <label htmlFor="cargo" className="block text-sm font-semibold text-husi-dark mb-2">
                Cargo *
              </label>
              <input
                type="text"
                id="cargo"
                name="cargo"
                required
                value={formData.cargo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-husi-accent focus:border-transparent"
                placeholder="Director de Análisis"
              />
            </div>

            {/* Institución */}
            <div>
              <label htmlFor="institucion" className="block text-sm font-semibold text-husi-dark mb-2">
                {tipoConsulta === 'grc' ? 'Empresa *' : 'Institución *'}
              </label>
              <input
                type="text"
                id="institucion"
                name="institucion"
                required
                value={formData.institucion}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-husi-accent focus:border-transparent"
                placeholder={tipoConsulta === 'grc' ? 'Nombre de tu empresa' : 'Nombre de tu institución'}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-husi-dark mb-2">
                Email Corporativo *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-husi-accent focus:border-transparent"
                placeholder="juan.perez@institucion.gob.mx"
              />
            </div>

            {/* Teléfono */}
            <div className="md:col-span-2">
              <label htmlFor="telefono" className="block text-sm font-semibold text-husi-dark mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-husi-accent focus:border-transparent"
                placeholder="+52 55 1234 5678"
              />
            </div>
          </div>

          {/* Mensaje */}
          <div className="mb-6">
            <label htmlFor="mensaje" className="block text-sm font-semibold text-husi-dark mb-2">
              Mensaje *
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              required
              value={formData.mensaje}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-husi-accent focus:border-transparent"
              placeholder={placeholdersMensaje[tipoConsulta]}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={enviando}
            className="w-full bg-husi-dark text-white px-8 py-4 rounded-lg font-semibold hover:bg-husi-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {enviando ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-husi-light/20">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-husi-dark mb-4">
            ¡Mensaje Enviado!
          </h2>
          <p className="text-neutral-gray mb-6">
            Gracias por contactarnos. Nos pondremos en contacto contigo a la brevedad.
          </p>
          <button
            onClick={() => setEnviado(false)}
            className="text-husi-accent hover:text-husi-dark underline"
          >
            Enviar otro mensaje
          </button>
        </div>
      )}

      {/* Información de Contacto */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold text-husi-dark mb-4">
          O contáctanos directamente
        </h3>
        <div className="space-y-2">
          <p className="text-neutral-gray">
            📧 Email: <a href="mailto:hola@husi.mx" className="text-husi-accent hover:underline">hola@husi.mx</a>
          </p>
          <p className="text-neutral-gray">
            🕐 Horario de atención: Lunes a Viernes, 9:00 - 18:00 hrs (GMT-6)
          </p>
        </div>
      </div>
    </div>
  )
}