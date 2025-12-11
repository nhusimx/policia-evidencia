export default function AvisoPrivacidad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-husi-dark mb-4">
            Aviso de Privacidad
          </h1>
          <p className="text-neutral-gray">
            Última actualización: Diciembre 2025
          </p>
        </div>

        {/* Contenido */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-husi-light/20 prose prose-lg max-w-none">
          
          <section className="mb-8">
            <p className="text-neutral-gray leading-relaxed">
              En conformidad con lo establecido en la Ley Federal de Protección de Datos Personales 
              en Posesión de los Particulares, Beatriz Santiago Ramírez pone a tu disposición el 
              siguiente aviso de privacidad.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-husi-dark mb-4">Responsable</h2>
            <p className="text-neutral-gray leading-relaxed mb-2">
              <strong>Beatriz Santiago Ramírez</strong>, con domicilio en:
            </p>
            <p className="text-neutral-gray leading-relaxed ml-4">
              Av. Insurgentes 404 1<br />
              Col. Roma Sur. C.P 06760<br />
              Cuauhtémoc, Ciudad de México
            </p>
            <p className="text-neutral-gray leading-relaxed mt-4">
              Es responsable del uso y protección de sus datos personales, en este sentido y 
              atendiendo las disposiciones legales establecidas en la Ley Federal de Protección 
              de Datos Personales en Posesión de los Particulares, a través de este instrumento 
              se informa a los titulares de los datos, la información que de ellos se recaba y 
              los fines que se le darán a dicha información.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-husi-dark mb-4">Datos Personales Recabados</h2>
            <p className="text-neutral-gray leading-relaxed mb-4">
              Los datos personales que recabamos de usted serán utilizados para conocer las 
              preferencias de nuestro mercado objetivo, analizar los patrones de consumo del 
              mercado y diseñar productos que se adapten a sus necesidades. Dichas finalidades 
              son necesarias para concretar nuestra relación con usted, así como para atender 
              los servicios y/o pedidos que solicite.
            </p>
            <p className="text-neutral-gray leading-relaxed">
              Para realizar los fines anteriormente descritos, utilizaremos los siguientes datos 
              personales:
            </p>
            <ul className="list-disc list-inside text-neutral-gray ml-4 mt-2 space-y-1">
              <li>Nombre</li>
              <li>Teléfono</li>
              <li>Domicilio</li>
              <li>Correo electrónico</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-husi-dark mb-4">Uso y Compartición de Datos</h2>
            <p className="text-neutral-gray leading-relaxed">
              Le informamos que sus datos personales no serán compartidos con ninguna autoridad, 
              empresa, organización o persona distintas a nosotros y serán utilizados exclusivamente 
              para los fines señalados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-husi-dark mb-4">Derechos ARCO</h2>
            <p className="text-neutral-gray leading-relaxed mb-4">
              Le informamos sobre el reconocimiento de los derechos ARCO (Acceso, Rectificación, 
              Cancelación y Oposición):
            </p>
            <ul className="space-y-3 text-neutral-gray">
              <li>
                <strong className="text-husi-dark">Acceso:</strong> Usted tiene en todo momento 
                el derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos 
                y las condiciones del uso que les damos.
              </li>
              <li>
                <strong className="text-husi-dark">Rectificación:</strong> Es su derecho solicitar 
                la corrección de su información personal en caso de que esté desactualizada, sea 
                inexacta o incompleta.
              </li>
              <li>
                <strong className="text-husi-dark">Cancelación:</strong> Tiene derecho a que su 
                información se elimine de nuestros registros o bases de datos cuando considere que 
                ésta no está siendo utilizada adecuadamente.
              </li>
              <li>
                <strong className="text-husi-dark">Oposición:</strong> Tiene derecho a oponerse 
                al uso de sus datos personales para fines específicos.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-husi-dark mb-4">Ejercicio de Derechos ARCO</h2>
            <p className="text-neutral-gray leading-relaxed mb-4">
              Para ejercer cualquiera de los derechos ARCO, deberá enviar un correo a la dirección{' '}
              <a href="mailto:hola@husi.mx" className="text-husi-accent hover:underline">
                hola@husi.mx
              </a>, expresando sus necesidades en términos de acceso, rectificación, cancelación u 
              oposición. En todo caso la respuesta a su solicitud se dará en un plazo de 48 horas.
            </p>
            <div className="bg-husi-light/10 p-6 rounded-lg border-l-4 border-husi-light">
              <h3 className="font-bold text-husi-dark mb-2">Datos de Contacto</h3>
              <p className="text-neutral-gray">
                <strong>Responsable:</strong> Beatriz Santiago Meza<br />
                <strong>Domicilio:</strong> Av. Insurgentes 404 1, Col. Roma Sur. C.P 06760, 
                Cuauhtémoc, Ciudad de México<br />
                <strong>Email:</strong>{' '}
                <a href="mailto:hola@husi.mx" className="text-husi-accent hover:underline">
                  hola@husi.mx
                </a>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-husi-dark mb-4">Revocación del Consentimiento</h2>
            <p className="text-neutral-gray leading-relaxed mb-4">
              Cabe mencionar que en cualquier momento usted puede revocar su consentimiento para 
              el uso de sus datos personales. Del mismo modo, usted puede revocar el consentimiento 
              que, en su caso, nos haya otorgado para el tratamiento de sus datos personales.
            </p>
            <p className="text-neutral-gray leading-relaxed mb-4">
              Asimismo, usted deberá considerar que para ciertos fines la revocación de su 
              consentimiento implica que no podamos seguir prestando el servicio que nos solicitó, 
              o la conclusión de su relación con nosotros.
            </p>
            <p className="text-neutral-gray leading-relaxed">
              Para revocar el consentimiento que usted otorga en este acto o para limitar su 
              divulgación, deberá solicitarlo al correo electrónico{' '}
              <a href="mailto:hola@husi.mx" className="text-husi-accent hover:underline">
                hola@husi.mx
              </a>. 
              La respuesta a las peticiones se dará a conocer en un plazo de 48 horas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-husi-dark mb-4">Cambios al Aviso de Privacidad</h2>
            <p className="text-neutral-gray leading-relaxed">
              Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el 
              presente aviso de privacidad y le reiteramos que usted puede solicitar información 
              sobre si el mismo ha sufrido alguna modificación a través de la siguiente dirección 
              electrónica:{' '}
              <a href="mailto:hola@husi.mx" className="text-husi-accent hover:underline">
                hola@husi.mx
              </a>
            </p>
          </section>

        </div>

      </div>
    </div>
  )
}