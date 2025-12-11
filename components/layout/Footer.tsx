import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-husi-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Contenido Principal del Footer */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* Columna 1: Sobre Husi */}
          <div>
            <h3 className="text-lg font-bold mb-4">Husi Strategics</h3>
            <p className="text-sm text-white/80 mb-4">
              Transformamos organizaciones con metodologías basadas en evidencia
            </p>
            <div className="text-sm text-white/80">
              <p className="mb-1">📧 hola@husi.mx</p>
              <p>🕐 Lun-Vie, 9:00-18:00 hrs</p>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Soluciones</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/soluciones/publico" className="text-white/80 hover:text-white transition">
                  Sector Público
                </Link>
              </li>
              <li>
                <Link href="/soluciones/privado" className="text-white/80 hover:text-white transition">
                  Sector Privado
                </Link>
              </li>
              <li>
                <Link href="/evaluadores" className="text-white/80 hover:text-white transition">
                  Evaluadores
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-white/80 hover:text-white transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Oficinas */}
          <div>
            <h3 className="text-lg font-bold mb-4">Oficinas</h3>
            <address className="text-sm text-white/80 not-italic">
              Av. Insurgentes 404 1<br />
              Col. Roma Sur<br />
              C.P. 06760<br />
              Cuauhtémoc, Ciudad de México
            </address>
          </div>

        </div>

        {/* Separador */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
            <p>© {new Date().getFullYear()} Husi Strategics. Todos los derechos reservados.</p>
            <div className="mt-4 md:mt-0">
              <Link 
                href="/aviso-privacidad" 
                className="hover:text-white transition underline"
              >
                Aviso de Privacidad
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}