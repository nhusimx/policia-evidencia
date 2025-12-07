'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            Seguridad + Evidencia
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/soluciones" className="text-gray-700 hover:text-blue-600 transition">
              Soluciones
            </Link>
            <Link href="/casos-estudio" className="text-gray-700 hover:text-blue-600 transition">
              Casos de Estudio
            </Link>
            <Link href="/recursos" className="text-gray-700 hover:text-blue-600 transition">
              Recursos
            </Link>
            <Link href="/contacto" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Contacto
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/soluciones" className="block text-gray-700 hover:text-blue-600 py-2">
              Soluciones
            </Link>
            <Link href="/casos-estudio" className="block text-gray-700 hover:text-blue-600 py-2">
              Casos de Estudio
            </Link>
            <Link href="/recursos" className="block text-gray-700 hover:text-blue-600 py-2">
              Recursos
            </Link>
            <Link href="/contacto" className="block bg-blue-600 text-white px-4 py-2 rounded-md text-center">
              Contacto
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}