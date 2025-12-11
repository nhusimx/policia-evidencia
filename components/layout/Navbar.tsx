'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center py-3">
            <Image 
              src="/hu-logo-transparente.png" 
              alt="Husi Strategics" 
              width={350}
              height={110}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              href="/soluciones/publico" 
              className="text-neutral-text hover:text-husi-accent transition font-medium"
            >
              Sector Público
            </Link>
            <Link 
              href="/soluciones/privado" 
              className="text-neutral-text hover:text-husi-accent transition font-medium"
            >
              Sector Privado
            </Link>
            <Link 
              href="/evaluadores" 
              className="text-neutral-text hover:text-husi-accent transition font-medium"
            >
              Evaluadores
            </Link>
            <Link 
              href="/contacto" 
              className="bg-husi-dark text-white px-6 py-2.5 rounded-md hover:bg-husi-medium transition font-medium"
            >
              Contacto
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-text"
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
            <Link 
              href="/soluciones/publico" 
              className="block text-neutral-text hover:text-husi-accent py-2 transition"
              onClick={() => setIsOpen(false)}
            >
              Sector Público
            </Link>
            <Link 
              href="/soluciones/privado" 
              className="block text-neutral-text hover:text-husi-accent py-2 transition"
              onClick={() => setIsOpen(false)}
            >
              Sector Privado
            </Link>
            <Link 
              href="/evaluadores" 
              className="block text-neutral-text hover:text-husi-accent py-2 transition"
              onClick={() => setIsOpen(false)}
            >
              Evaluadores
            </Link>
            <Link 
              href="/contacto" 
              className="block bg-husi-dark text-white px-4 py-2 rounded-md text-center hover:bg-husi-medium transition"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}