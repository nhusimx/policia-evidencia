'use client'

import { useState, useEffect } from 'react'

type TipoConsulta = 'consultoria' | 'intervencion' | 'demo' | 'general'

export default function FormularioContacto() {
  const [tipoConsulta, setTipoConsulta] = useState<TipoConsulta>('general')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    cargo: '',
    institucion: '',
    email: '',
    telefono: '',
    mensaje: ''
  })

  // Detectar tipo de consulta desde URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tipo = params.get('tipo') as TipoConsulta
    if (tipo) {
      setTipoConsulta(tipo)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

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
          tipoConsulta
        })
      })

      if (response.ok) {
        setEnviado(true)
        setEnviando(false)
      } else {
        throw new Error('Error al enviar')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.')
      setEnviando(false)
    }
  }

  const tiposConsulta = {
    consultoria: {
      titulo: 'Solicitar Consultoría de Transformación Institucional',
      descripcion: 'Evaluaremos tu institución y diseñaremos un plan personalizado',
      icono: '📊'
    },
    intervencion: {
      titulo: 'Solicitar Análisis para Intervención Territorial',
      descripcion: 'Analizaremos tu problemática delictiva y propondremos una intervención focalizada',
      icono: '🎯'
    },
    demo: {
      titulo: 'Agendar Demo del Sistema de Análisis',
      descripcion: 'Te mostraremos en vivo las capacidades de nuestra plataforma',
      icono: '💻'
    },
    general: {
      titulo: 'Contacto General',
      descripcion: 'Cuéntanos en qué podemos ayudarte',
      icono: '📧'
    }
  }

  const infoActual = tiposConsulta[tipoConsulta]

  if (enviado) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-3xl font-bold mb-4">¡Mensaje Enviado!</h2>
        <p className="text-xl text-gray-600 mb-8">
          Gracias por tu interés. Nos pondremos en contacto contigo en las próximas 24 horas.
        </p>
        <button
          onClick={() => {
            setEnviado(false)
            setFormData({
              nombre: '',
              cargo: '',
              institucion: '',
              email: '',
              telefono: '',
              mensaje: ''
            })
          }}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">{infoActual.icono}</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {infoActual.titulo}
        </h1>
        <p className="text-xl text-gray-600">
          {infoActual.descripcion}
        </p>
      </div>

      {/* Selector de tipo de consulta */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Tipo de Consulta
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(Object.keys(tiposConsulta) as TipoConsulta[]).map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => setTipoConsulta(tipo)}
              className={`p-4 rounded-lg border-2 transition-all ${
                tipoConsulta === tipo
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-2xl mb-1">{tiposConsulta[tipo].icono}</div>
              <div className="text-xs font-semibold">
                {tipo === 'consultoria' && 'Consultoría'}
                {tipo === 'intervencion' && 'Intervención'}
                {tipo === 'demo' && 'Demo'}
                {tipo === 'general' && 'General'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Juan Pérez"
            />
          </div>

          {/* Cargo */}
          <div>
            <label htmlFor="cargo" className="block text-sm font-semibold text-gray-700 mb-2">
              Cargo *
            </label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              required
              value={formData.cargo}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Director de Seguridad Pública"
            />
          </div>
        </div>

        {/* Institución */}
        <div className="mb-6">
          <label htmlFor="institucion" className="block text-sm font-semibold text-gray-700 mb-2">
            Institución / Organización *
          </label>
          <input
            type="text"
            id="institucion"
            name="institucion"
            required
            value={formData.institucion}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Secretaría de Seguridad Municipal"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ejemplo@institucion.gob.mx"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+52 55 1234 5678"
            />
          </div>
        </div>

        {/* Mensaje */}
        <div className="mb-6">
          <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-2">
            Mensaje / Detalles de tu Consulta *
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            required
            value={formData.mensaje}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={
              tipoConsulta === 'intervencion'
                ? 'Describe el problema delictivo que enfrentas, la zona afectada y cualquier dato relevante...'
                : tipoConsulta === 'consultoria'
                ? 'Cuéntanos sobre tu institución: número de elementos, capacidades actuales, principales desafíos...'
                : tipoConsulta === 'demo'
                ? 'Indícanos qué aspectos del sistema te interesan más y tu disponibilidad de horario...'
                : 'Cuéntanos cómo podemos ayudarte...'
            }
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {enviando ? 'Enviando...' : 'Enviar Solicitud'}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          * Campos obligatorios. Nos comprometemos a responder en menos de 24 horas.
        </p>
      </form>

      {/* Información de contacto adicional */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl mb-2">📧</div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-sm text-gray-600">hola@husi.mx</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl mb-2">🕒</div>
                <h3 className="font-semibold mb-1">Horario</h3>
                <p className="text-sm text-gray-600">Lun - Vie, 9:00 - 18:00</p>
            </div>
        </div>
    </div>
  )
}