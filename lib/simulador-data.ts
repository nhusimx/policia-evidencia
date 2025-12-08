// lib/simulador-data.ts

export interface TipoDelito {
  id: string
  nombre: string
  descripcion: string
  icono: string
  factoresRiesgo: string[]
  zonasTipicas: string[]
}

export interface Intervencion {
  sector: 'gobierno' | 'sociedad_civil' | 'academia' | 'iniciativa_privada'
  nombreSector: string
  color: string
  icono: string
  acciones: string[]
  responsable: string
  timeline: string
}

export interface ResultadoProyectado {
  metrica: string
  valorEsperado: string
  plazo: string
}

export const tiposDelito: TipoDelito[] = [
  {
    id: 'robo-transeuntes',
    nombre: 'Robo a Transeúntes',
    descripcion: 'Robo a personas en vía pública, especialmente en zonas comerciales y paradas de transporte',
    icono: '👤',
    factoresRiesgo: [
      'Calles con poca iluminación',
      'Zonas con alta afluencia peatonal',
      'Paradas de transporte público',
      'Cajeros automáticos aislados',
      'Horarios de entrada/salida laboral'
    ],
    zonasTipicas: [
      'Centro comercial',
      'Estaciones de metro/autobús',
      'Calles con bancos y cajeros',
      'Zonas universitarias'
    ]
  },
  {
    id: 'robo-vehiculos',
    nombre: 'Robo de Vehículos',
    descripcion: 'Robo de automóviles en estacionamientos y vía pública',
    icono: '🚗',
    factoresRiesgo: [
      'Estacionamientos sin vigilancia',
      'Zonas con poca videovigilancia',
      'Calles sin alumbrado público',
      'Vehículos de alta gama desprotegidos',
      'Horario nocturno (10pm - 4am)'
    ],
    zonasTipicas: [
      'Estacionamientos públicos',
      'Calles residenciales sin vigilancia',
      'Centros comerciales',
      'Zonas de oficinas'
    ]
  },
  {
    id: 'robo-negocio',
    nombre: 'Robo a Negocio',
    descripcion: 'Asaltos a comercios, principalmente tiendas de conveniencia y pequeños negocios',
    icono: '🏪',
    factoresRiesgo: [
      'Negocios en esquinas aisladas',
      'Sin cámaras de seguridad',
      'Personal sin capacitación',
      'Horarios de cierre (9pm - 11pm)',
      'Falta de botones de pánico'
    ],
    zonasTipicas: [
      'Tiendas de conveniencia',
      'Farmacias 24 horas',
      'Gasolineras',
      'Pequeños comercios'
    ]
  },
  {
    id: 'violencia-domestica',
    nombre: 'Violencia Doméstica',
    descripcion: 'Agresiones en el entorno familiar y del hogar',
    icono: '🏠',
    factoresRiesgo: [
      'Zonas con indicadores de vulnerabilidad social',
      'Falta de redes de apoyo comunitario',
      'Consumo de alcohol en la zona',
      'Espacios públicos degradados',
      'Ausencia de servicios de atención'
    ],
    zonasTipicas: [
      'Colonias con alta densidad poblacional',
      'Zonas periféricas',
      'Áreas con limitados servicios sociales'
    ]
  }
]

export function getIntervencionesPorDelito(delitoId: string): Intervencion[] {
  const intervenciones: Record<string, Intervencion[]> = {
    'robo-transeuntes': [
      {
        sector: 'gobierno',
        nombreSector: 'Gobierno Municipal',
        color: '#3B82F6',
        icono: '🏛️',
        responsable: 'Secretaría de Seguridad Pública',
        timeline: 'Semanas 1-12',
        acciones: [
          'Análisis territorial de puntos calientes (hotspots)',
          'Patrullaje focalizado en horarios críticos: 7-9am, 1-3pm, 6-8pm',
          'Mejora de alumbrado público en 15 puntos identificados',
          'Instalación de 8 cámaras de videovigilancia',
          'Poda de árboles que obstruyen visibilidad',
          'Operativos coordinados con transporte público'
        ]
      },
      {
        sector: 'sociedad_civil',
        nombreSector: 'Sociedad Civil Organizada',
        color: '#10B981',
        icono: '🤝',
        responsable: 'Observatorio Ciudadano + Comités Vecinales',
        timeline: 'Semanas 2-16',
        acciones: [
          'Conformación de red de vigilancia vecinal (WhatsApp)',
          'Observadores ciudadanos en 5 puntos críticos',
          'Campañas de prevención "Viaja Seguro"',
          'Monitoreo de cumplimiento de compromisos gubernamentales',
          'Reportes quincenales de percepción de seguridad',
          'Activación de espacios públicos (plazas, parques)'
        ]
      },
      {
        sector: 'academia',
        nombreSector: 'Universidad / Centro de Investigación',
        color: '#8B5CF6',
        icono: '🎓',
        responsable: 'Facultad de Ciencias Sociales',
        timeline: 'Semanas 1-20',
        acciones: [
          'Diseño metodológico de la evaluación de impacto',
          'Definición de grupo de control y grupo de tratamiento',
          'Encuestas de victimización (línea base y seguimiento)',
          'Análisis estadístico de efectividad por componente',
          'Mapeo de factores criminógenos con SIG',
          'Publicación de resultados y lecciones aprendidas'
        ]
      },
      {
        sector: 'iniciativa_privada',
        nombreSector: 'Iniciativa Privada',
        color: '#F59E0B',
        icono: '🏢',
        responsable: 'Cámara de Comercio + Empresas Locales',
        timeline: 'Semanas 3-12',
        acciones: [
          'Financiamiento de 8 cámaras de seguridad ($120,000 MXN)',
          'Mejora de iluminación en 3 calles comerciales ($80,000 MXN)',
          'Programa de empleo juvenil en zona de intervención (15 plazas)',
          'Capacitación en prevención situacional para comercios',
          'Botones de pánico en 20 establecimientos',
          'Coordinación con empresas de transporte privado'
        ]
      }
    ],
    'robo-vehiculos': [
      {
        sector: 'gobierno',
        nombreSector: 'Gobierno Municipal',
        color: '#3B82F6',
        icono: '🏛️',
        responsable: 'Dirección de Seguridad Pública',
        timeline: 'Semanas 1-12',
        acciones: [
          'Mapeo de estacionamientos vulnerables',
          'Patrullaje en horarios nocturnos (10pm-4am)',
          'Instalación de cámaras con reconocimiento de placas (LPR)',
          'Operativos de verificación de documentos vehiculares',
          'Coordinación con policía estatal para recuperación',
          'Iluminación de estacionamientos públicos'
        ]
      },
      {
        sector: 'sociedad_civil',
        nombreSector: 'Sociedad Civil Organizada',
        color: '#10B981',
        icono: '🤝',
        responsable: 'Asociaciones de Vecinos',
        timeline: 'Semanas 2-16',
        acciones: [
          'Redes de alerta temprana entre vecinos',
          'Registro comunitario de vehículos sospechosos',
          'Campaña "Asegura tu Auto" con tips de prevención',
          'Monitoreo de zonas de desmantelamiento',
          'Colaboración con aseguradoras para datos',
          'Reuniones mensuales con autoridades'
        ]
      },
      {
        sector: 'academia',
        nombreSector: 'Instituto Tecnológico',
        color: '#8B5CF6',
        icono: '🎓',
        responsable: 'Departamento de Ingeniería',
        timeline: 'Semanas 1-20',
        acciones: [
          'Análisis de patrones de robo (marcas, modelos, horarios)',
          'Modelado predictivo de zonas de riesgo',
          'Evaluación de efectividad de cámaras LPR',
          'Estudio de redes de comercialización ilegal',
          'Desarrollo de app ciudadana de reporte',
          'Tesis de estudiantes sobre el fenómeno'
        ]
      },
      {
        sector: 'iniciativa_privada',
        nombreSector: 'Iniciativa Privada',
        color: '#F59E0B',
        icono: '🏢',
        responsable: 'Estacionamientos + Aseguradoras',
        timeline: 'Semanas 3-12',
        acciones: [
          'Inversión en sistemas de seguridad ($200,000 MXN)',
          'Capacitación de personal de estacionamientos',
          'Descuentos en seguros para autos con GPS',
          'Financiamiento de cámaras LPR',
          'App de estacionamientos seguros certificados',
          'Empleos de vigilancia privada (20 plazas)'
        ]
      }
    ],
    'robo-negocio': [
      {
        sector: 'gobierno',
        nombreSector: 'Gobierno Municipal',
        color: '#3B82F6',
        icono: '🏛️',
        responsable: 'Comisaría de Seguridad',
        timeline: 'Semanas 1-12',
        acciones: [
          'Mapeo de comercios con mayor incidencia',
          'Patrullaje en horarios de cierre (9pm-11pm)',
          'Programa de vinculación comerciantes-policía',
          'Instalación de cámaras en zonas comerciales',
          'Operativos sorpresa de prevención',
          'Línea directa de emergencias para comercios'
        ]
      },
      {
        sector: 'sociedad_civil',
        nombreSector: 'Sociedad Civil Organizada',
        color: '#10B981',
        icono: '🤝',
        responsable: 'Organizaciones Vecinales',
        timeline: 'Semanas 2-16',
        acciones: [
          'Red de comerciantes con chat de alertas',
          'Campaña "Comercio Seguro"',
          'Talleres de prevención situacional',
          'Acompañamiento a comerciantes en denuncias',
          'Observación de cumplimiento de medidas',
          'Foros de intercambio de experiencias'
        ]
      },
      {
        sector: 'academia',
        nombreSector: 'Universidad Local',
        color: '#8B5CF6',
        icono: '🎓',
        responsable: 'Escuela de Negocios',
        timeline: 'Semanas 1-20',
        acciones: [
          'Análisis de perfiles de víctimas y victimarios',
          'Estudio de modus operandi en la zona',
          'Evaluación costo-beneficio de medidas',
          'Encuestas de victimización a comerciantes',
          'Análisis de impacto económico del delito',
          'Recomendaciones de política pública'
        ]
      },
      {
        sector: 'iniciativa_privada',
        nombreSector: 'Iniciativa Privada',
        color: '#F59E0B',
        icono: '🏢',
        responsable: 'Cámara de Comercio',
        timeline: 'Semanas 3-12',
        acciones: [
          'Fondo para botones de pánico ($100,000 MXN)',
          'Subsidio para cámaras de seguridad (50% costo)',
          'Capacitación en prevención (200 comerciantes)',
          'Seguro colectivo contra robo',
          'Sistema de alertas entre comercios',
          'Empleos de seguridad privada compartida'
        ]
      }
    ],
    'violencia-domestica': [
      {
        sector: 'gobierno',
        nombreSector: 'Gobierno Municipal',
        color: '#3B82F6',
        icono: '🏛️',
        responsable: 'DIF + Seguridad Pública',
        timeline: 'Semanas 1-16',
        acciones: [
          'Mapeo de zonas con mayor incidencia',
          'Protocolo de atención inmediata 24/7',
          'Unidades especializadas en violencia familiar',
          'Refugio temporal para víctimas',
          'Programa de atención psicológica',
          'Mejora de espacios públicos en la zona'
        ]
      },
      {
        sector: 'sociedad_civil',
        nombreSector: 'Sociedad Civil Organizada',
        color: '#10B981',
        icono: '🤝',
        responsable: 'ONGs especializadas',
        timeline: 'Semanas 2-20',
        acciones: [
          'Red de apoyo entre mujeres de la comunidad',
          'Talleres de empoderamiento y derechos',
          'Línea de escucha y orientación',
          'Acompañamiento legal y psicológico',
          'Grupos de ayuda mutua',
          'Campañas de sensibilización comunitaria'
        ]
      },
      {
        sector: 'academia',
        nombreSector: 'Universidad',
        color: '#8B5CF6',
        icono: '🎓',
        responsable: 'Facultad de Psicología',
        timeline: 'Semanas 1-24',
        acciones: [
          'Investigación sobre factores de riesgo locales',
          'Diseño de programa de prevención basado en evidencia',
          'Evaluación de servicios de atención existentes',
          'Formación de estudiantes en atención a víctimas',
          'Encuestas de prevalencia en la zona',
          'Publicación de hallazgos y recomendaciones'
        ]
      },
      {
        sector: 'iniciativa_privada',
        nombreSector: 'Iniciativa Privada',
        color: '#F59E0B',
        icono: '🏢',
        responsable: 'Empresas + Fundaciones',
        timeline: 'Semanas 3-16',
        acciones: [
          'Financiamiento de refugio temporal ($300,000 MXN)',
          'Programa de empleo para víctimas (25 plazas)',
          'Capacitación laboral y autonomía económica',
          'Donación de insumos para talleres',
          'Becas escolares para hijos de víctimas',
          'Campaña de responsabilidad social "Tolerancia Cero"'
        ]
      }
    ]
  }

  return intervenciones[delitoId] || []
}

export function getResultadosProyectados(delitoId: string): ResultadoProyectado[] {
  const resultados: Record<string, ResultadoProyectado[]> = {
    'robo-transeuntes': [
      {
        metrica: 'Reducción del delito objetivo',
        valorEsperado: '30% - 42%',
        plazo: '4 meses'
      },
      {
        metrica: 'Mantenimiento post-intervención',
        valorEsperado: '70% de la reducción',
        plazo: '6 meses después'
      },
      {
        metrica: 'Percepción de seguridad',
        valorEsperado: '+45%',
        plazo: '3 meses'
      },
      {
        metrica: 'Denuncias realizadas',
        valorEsperado: '+25%',
        plazo: '4 meses'
      }
    ],
    'robo-vehiculos': [
      {
        metrica: 'Reducción del delito objetivo',
        valorEsperado: '25% - 38%',
        plazo: '5 meses'
      },
      {
        metrica: 'Vehículos recuperados',
        valorEsperado: '+60%',
        plazo: '3 meses'
      },
      {
        metrica: 'Mantenimiento post-intervención',
        valorEsperado: '65% de la reducción',
        plazo: '6 meses después'
      },
      {
        metrica: 'Percepción de seguridad',
        valorEsperado: '+35%',
        plazo: '4 meses'
      }
    ],
    'robo-negocio': [
      {
        metrica: 'Reducción del delito objetivo',
        valorEsperado: '35% - 48%',
        plazo: '4 meses'
      },
      {
        metrica: 'Comercios con medidas de seguridad',
        valorEsperado: '85%',
        plazo: '3 meses'
      },
      {
        metrica: 'Mantenimiento post-intervención',
        valorEsperado: '75% de la reducción',
        plazo: '6 meses después'
      },
      {
        metrica: 'Satisfacción de comerciantes',
        valorEsperado: '80%',
        plazo: '4 meses'
      }
    ],
    'violencia-domestica': [
      {
        metrica: 'Reducción de incidentes reportados',
        valorEsperado: '20% - 30%',
        plazo: '6 meses'
      },
      {
        metrica: 'Víctimas atendidas',
        valorEsperado: '+150%',
        plazo: '4 meses'
      },
      {
        metrica: 'Mujeres en programa de autonomía',
        valorEsperado: '50 casos',
        plazo: '6 meses'
      },
      {
        metrica: 'Percepción de apoyo institucional',
        valorEsperado: '+60%',
        plazo: '5 meses'
      }
    ]
  }

  return resultados[delitoId] || []
}