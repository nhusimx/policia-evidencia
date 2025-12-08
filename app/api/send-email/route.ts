import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, cargo, institucion, email, telefono, mensaje, tipoConsulta } = body

    // Mapeo de tipos de consulta
    const tiposConsulta: Record<string, string> = {
      consultoria: 'Consultoría de Transformación Institucional',
      intervencion: 'Análisis para Intervención Territorial',
      demo: 'Demo del Sistema de Análisis',
      general: 'Consulta General'
    }

    const asunto = `Nueva Solicitud: ${tiposConsulta[tipoConsulta] || 'Contacto'}`

    // Email que recibes tú
    const { data, error } = await resend.emails.send({
      from: 'Husi Web <onboarding@resend.dev>', // Resend usa este email en plan gratuito
      to: ['hola@husi.mx'],
      subject: asunto,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #3B82F6; }
              .field-label { font-weight: bold; color: #1E40AF; margin-bottom: 5px; }
              .field-value { color: #4B5563; }
              .message-box { background: white; padding: 20px; border-radius: 6px; margin-top: 20px; border: 1px solid #E5E7EB; }
              .footer { text-align: center; margin-top: 20px; color: #6B7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Nueva Solicitud de Contacto</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">${tiposConsulta[tipoConsulta]}</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">👤 Nombre</div>
                  <div class="field-value">${nombre}</div>
                </div>
                <div class="field">
                  <div class="field-label">💼 Cargo</div>
                  <div class="field-value">${cargo}</div>
                </div>
                <div class="field">
                  <div class="field-label">🏛️ Institución</div>
                  <div class="field-value">${institucion}</div>
                </div>
                <div class="field">
                  <div class="field-label">📧 Email</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">📱 Teléfono</div>
                  <div class="field-value">${telefono}</div>
                </div>
                <div class="message-box">
                  <div class="field-label">💬 Mensaje</div>
                  <div class="field-value" style="white-space: pre-wrap;">${mensaje}</div>
                </div>
                <div class="footer">
                  <p>Este email fue enviado desde el formulario de contacto de husi.mx</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error enviando email:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Email de confirmación al usuario
    await resend.emails.send({
      from: 'Husi Strategics <onboarding@resend.dev>',
      to: [email],
      subject: 'Hemos recibido tu solicitud - Husi Strategics',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">¡Gracias por contactarnos!</h1>
              </div>
              <div class="content">
                <p>Hola <strong>${nombre}</strong>,</p>
                <p>Hemos recibido tu solicitud de <strong>${tiposConsulta[tipoConsulta]}</strong> y uno de nuestros especialistas se pondrá en contacto contigo en las próximas 24 horas.</p>
                <p><strong>Resumen de tu solicitud:</strong></p>
                <ul>
                  <li><strong>Institución:</strong> ${institucion}</li>
                  <li><strong>Cargo:</strong> ${cargo}</li>
                  <li><strong>Email:</strong> ${email}</li>
                </ul>
                <p>Mientras tanto, puedes explorar más sobre nuestras soluciones en nuestro sitio web.</p>
                <div style="text-align: center;">
                  <a href="https://husi.mx/soluciones" class="button">Ver Soluciones</a>
                </div>
                <p style="margin-top: 30px;">Saludos,<br><strong>Equipo Husi Strategics</strong></p>
                <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
                <p style="font-size: 12px; color: #6B7280; text-align: center;">
                  Husi Strategics - Transformación Institucional de Seguridad<br>
                  📧 hola@husi.mx
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error en API:', error)
    return NextResponse.json(
      { error: 'Error al enviar el email' },
      { status: 500 }
    )
  }
}