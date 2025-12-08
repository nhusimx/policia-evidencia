// lib/evaluador-logic.ts

export type Pilar = 'talento' | 'procesos' | 'tecnologia'

export interface Pregunta {
  id: number
  pilar: Pilar
  pregunta: string
  opciones: {
    texto: string
    puntos: number
  }[]
}

export const preguntasEvaluador: Pregunta[] = [
  // TALENTO HUMANO (4 preguntas)
  {
    id: 1,
    pilar: 'talento',
    pregunta: '¿Tu personal de análisis criminal tiene certificación o capacitación formal especializada?',
    opciones: [
      { texto: 'No contamos con personal dedicado a análisis criminal', puntos: 0 },
      { texto: 'Tenemos personal asignado pero sin capacitación especializada', puntos: 3 },
      { texto: 'Algunos han tomado cursos básicos de análisis', puntos: 6 },
      { texto: 'La mayoría tiene certificación formal en análisis criminal', puntos: 10 }
    ]
  },
  {
    id: 2,
    pilar: 'talento',
    pregunta: '¿Existe un sistema de evaluación de competencias para el personal de análisis?',
    opciones: [
      { texto: 'No evaluamos competencias específicas de análisis', puntos: 0 },
      { texto: 'Evaluaciones generales sin enfoque en análisis', puntos: 3 },
      { texto: 'Evaluamos competencias pero de forma irregular', puntos: 6 },
      { texto: 'Sistema formal de evaluación continua implementado', puntos: 10 }
    ]
  },
  {
    id: 3,
    pilar: 'talento',
    pregunta: '¿Qué porcentaje de tu personal operativo ha recibido capacitación en uso de análisis criminal en los últimos 12 meses?',
    opciones: [
      { texto: 'Menos del 10%', puntos: 0 },
      { texto: '10% - 30%', puntos: 3 },
      { texto: '31% - 60%', puntos: 7 },
      { texto: 'Más del 60%', puntos: 10 }
    ]
  },
  {
    id: 4,
    pilar: 'talento',
    pregunta: '¿Cómo se toman las decisiones operativas sobre dónde y cuándo patrullar?',
    opciones: [
      { texto: 'Por experiencia e intuición de mandos', puntos: 0 },
      { texto: 'Combinación de experiencia y algunos datos básicos', puntos: 4 },
      { texto: 'Principalmente por análisis de datos, validado por experiencia', puntos: 8 },
      { texto: 'Totalmente basado en análisis de datos y evidencia', puntos: 10 }
    ]
  },
  
  // PROCESOS (4 preguntas)
  {
    id: 5,
    pilar: 'procesos',
    pregunta: '¿Cuentan con una unidad o área de análisis criminal formalmente establecida y operando?',
    opciones: [
      { texto: 'No existe tal unidad', puntos: 0 },
      { texto: 'Está en papel pero no opera consistentemente', puntos: 3 },
      { texto: 'Opera pero con recursos limitados', puntos: 7 },
      { texto: 'Unidad consolidada con recursos y autoridad', puntos: 10 }
    ]
  },
  {
    id: 6,
    pilar: 'procesos',
    pregunta: '¿Los procedimientos operativos estándar (POEs) están documentados y se utilizan consistentemente?',
    opciones: [
      { texto: 'No tenemos POEs documentados', puntos: 0 },
      { texto: 'Existen pero están desactualizados o no se siguen', puntos: 3 },
      { texto: 'Documentados y se siguen la mayor parte del tiempo', puntos: 7 },
      { texto: 'Totalmente documentados, actualizados y auditados', puntos: 10 }
    ]
  },
  {
    id: 7,
    pilar: 'procesos',
    pregunta: '¿Existe coordinación formal con otros actores (C4/C5, sociedad civil, academia, iniciativa privada)?',
    opciones: [
      { texto: 'No hay coordinación formal con otros sectores', puntos: 0 },
      { texto: 'Coordinación informal y esporádica', puntos: 3 },
      { texto: 'Acuerdos con algunos actores pero sin sistematizar', puntos: 6 },
      { texto: 'Convenios formales y reuniones periódicas estructuradas', puntos: 10 }
    ]
  },
  {
    id: 8,
    pilar: 'procesos',
    pregunta: '¿Miden la efectividad de sus intervenciones operativas con indicadores específicos?',
    opciones: [
      { texto: 'No medimos resultados de intervenciones', puntos: 0 },
      { texto: 'Medimos delitos generales pero no por intervención', puntos: 3 },
      { texto: 'Tenemos algunos indicadores pero inconsistentes', puntos: 6 },
      { texto: 'Sistema robusto de KPIs por intervención', puntos: 10 }
    ]
  },
  
  // TECNOLOGÍA (4 preguntas)
  {
    id: 9,
    pilar: 'tecnologia',
    pregunta: '¿Cómo ingresan y procesan los datos de incidencia delictiva actualmente?',
    opciones: [
      { texto: 'Hojas de cálculo manuales o registros en papel', puntos: 0 },
      { texto: 'Excel con algunos intentos de análisis básico', puntos: 3 },
      { texto: 'Sistema básico de gestión pero sin análisis avanzado', puntos: 6 },
      { texto: 'Plataforma integrada con análisis automático', puntos: 10 }
    ]
  },
  {
    id: 10,
    pilar: 'tecnologia',
    pregunta: '¿Tienen integración automática con fuentes externas de datos (C4, 911, denuncias ciudadanas)?',
    opciones: [
      { texto: 'No hay integración, todo es manual', puntos: 0 },
      { texto: 'Recibimos reportes que capturamos manualmente', puntos: 2 },
      { texto: 'Integración parcial con 1-2 fuentes', puntos: 6 },
      { texto: 'Ingesta automática de múltiples fuentes', puntos: 10 }
    ]
  },
  {
    id: 11,
    pilar: 'tecnologia',
    pregunta: '¿Generan mapas de calor o análisis geoespacial del delito?',
    opciones: [
      { texto: 'No generamos visualizaciones geoespaciales', puntos: 0 },
      { texto: 'Mapas básicos ocasionales en Google Maps', puntos: 3 },
      { texto: 'Mapas en software GIS pero proceso manual', puntos: 7 },
      { texto: 'Mapas de calor automáticos y dashboards interactivos', puntos: 10 }
    ]
  },
  {
    id: 12,
    pilar: 'tecnologia',
    pregunta: '¿El sistema permite generar y dar seguimiento a órdenes de servicio para el personal operativo?',
    opciones: [
      { texto: 'Órdenes verbales o en papel sin seguimiento', puntos: 0 },
      { texto: 'Órdenes escritas pero seguimiento manual', puntos: 3 },
      { texto: 'Sistema digital básico de asignación', puntos: 6 },
      { texto: 'App móvil con geolocalización y seguimiento en tiempo real', puntos: 10 }
    ]
  }
]

export interface NivelMadurez {
  nivel: number
  nombre: string
  rango: [number, number]
  diagnostico: string
  caracteristicas: string[]
  riesgos: string[]
  ruta: {
    fase: string
    duracion: string
    objetivo: string
    entregables: string[]
  }[]
  inversion_estimada: string
  retorno_esperado: string
  caso_exito?: {
    institucion: string
    situacion_inicial: string
    resultados: string[]
  }
}

export const nivelesMadurez: NivelMadurez[] = [
  {
    nivel: 1,
    nombre: 'Institución Reactiva',
    rango: [0, 40],
    diagnostico: 'Tu institución opera principalmente por intuición y experiencia sin fundamentos sistemáticos de análisis. Hay una brecha significativa entre las capacidades actuales y una operación basada en evidencia.',
    caracteristicas: [
      'Decisiones operativas basadas en experiencia de mandos',
      'Datos dispersos en múltiples sistemas sin integrar',
      'No existe personal dedicado formalmente al análisis criminal',
      'Patrullaje y operativos sin sustento estadístico',
      'No se mide efectividad de intervenciones'
    ],
    riesgos: [
      'Ineficiencia en uso de recursos (hasta 60% del tiempo en zonas de bajo riesgo)',
      'Imposibilidad de demostrar resultados a autoridades',
      'Vulnerabilidad a críticas por falta de transparencia',
      'Pérdida de oportunidades de financiamiento que requiere evidencia'
    ],
    ruta: [
      {
        fase: 'Diagnóstico y Sensibilización',
        duracion: '1 mes',
        objetivo: 'Mapear capacidades actuales y generar compromiso directivo',
        entregables: [
          'Diagnóstico de madurez institucional detallado',
          'Taller de sensibilización con mandos (8 horas)',
          'Roadmap de transformación a 12 meses',
          'Quick wins identificados'
        ]
      },
      {
        fase: 'Capacitación Fundacional',
        duracion: '2-3 meses',
        objetivo: 'Desarrollar competencias básicas en análisis criminal',
        entregables: [
          'Capacitación de 40 horas en análisis criminal para 8-12 personas',
          'Certificación básica de competencias',
          'Manual de procedimientos de análisis',
          'Primeros reportes de análisis generados'
        ]
      },
      {
        fase: 'Implementación de Procesos',
        duracion: '3-4 meses',
        objetivo: 'Establecer unidad de análisis y procedimientos operativos',
        entregables: [
          'Unidad de análisis formalmente establecida',
          'POEs documentados para ciclo de análisis',
          'Primeros planes territoriales de operación',
          'Sistema de indicadores básico'
        ]
      },
      {
        fase: 'Tecnología Básica',
        duracion: '4-5 meses',
        objetivo: 'Implementar herramientas tecnológicas esenciales',
        entregables: [
          'Base de datos centralizada operando',
          'Capacidad de generar mapas de calor',
          'Dashboard básico de indicadores',
          'Integración con al menos 2 fuentes de datos'
        ]
      }
    ],
    inversion_estimada: '$80,000 - $150,000 USD (año 1)',
    retorno_esperado: 'Reducción de 15-25% en delitos focalizados en 6-9 meses. Ahorro en horas-hombre por eficiencia operativa: equivalente a 20-30% del presupuesto operativo.',
    caso_exito: {
      institucion: 'Policía Municipal (50 elementos)',
      situacion_inicial: 'Sin personal capacitado en análisis, datos en Excel, patrullaje aleatorio',
      resultados: [
        'Unidad de análisis operando en 4 meses',
        '12 analistas certificados',
        'Reducción de 32% en robo a negocio en zonas focalizadas',
        'Primer lugar estatal en evaluación de capacidades'
      ]
    }
  },
  
  {
    nivel: 2,
    nombre: 'Institución en Desarrollo',
    rango: [41, 65],
    diagnostico: 'Tienes fundamentos de operación basada en evidencia pero falta integración, sistematización y tecnología para escalar. Existen islas de capacidad que no están conectadas.',
    caracteristicas: [
      'Algunos analistas capacitados pero sin certificación formal',
      'Se generan análisis básicos pero de forma irregular',
      'Datos en sistemas parcialmente digitalizados',
      'Coordinación informal con algunos actores externos',
      'Medición de resultados inconsistente'
    ],
    riesgos: [
      'Personal capacitado se va y no hay transferencia de conocimiento',
      'Análisis no se traduce en operativos por falta de proceso',
      'Información en silos impide visión integral',
      'Retroceso a operación intuitiva ante cambios de administración'
    ],
    ruta: [
      {
        fase: 'Auditoría de Capacidades',
        duracion: '3 semanas',
        objetivo: 'Identificar brechas específicas y activos existentes',
        entregables: [
          'Auditoría de competencias del personal actual',
          'Evaluación de procedimientos y tecnología',
          'Análisis de integraciones necesarias',
          'Plan de optimización personalizado'
        ]
      },
      {
        fase: 'Certificación y Estandarización',
        duracion: '2 meses',
        objetivo: 'Profesionalizar y homologar capacidades',
        entregables: [
          'Certificación formal de analistas existentes',
          'POEs actualizados y estandarizados',
          'Modelo de evaluación de competencias implementado',
          'Plan de desarrollo profesional por rol'
        ]
      },
      {
        fase: 'Implementación Tecnológica',
        duracion: '3-4 meses',
        objetivo: 'Sistema de análisis integrado operando',
        entregables: [
          'Plataforma de análisis criminal implementada',
          'Integraciones con C4/C5 y fuentes críticas',
          'Migración de datos históricos',
          'Capacitación en uso del sistema (40 horas)'
        ]
      },
      {
        fase: 'Coordinación Intersectorial',
        duracion: '2-3 meses (paralelo)',
        objetivo: 'Formalizar colaboración con otros sectores',
        entregables: [
          'Convenios firmados con al menos 3 sectores',
          'Comité intersectorial operando',
          'Protocolos de intercambio de información',
          'Primera intervención territorial conjunta'
        ]
      }
    ],
    inversion_estimada: '$120,000 - $250,000 USD',
    retorno_esperado: 'Reducción de 25-40% en delitos focalizados. Eficiencia operativa: 30-45% menos horas-hombre en tareas manuales.',
    caso_exito: {
      institucion: 'Fiscalía Regional (120 elementos)',
      situacion_inicial: 'Analistas sin certificar, datos en 4 sistemas diferentes, tecnología obsoleta',
      resultados: [
        'Sistema integrado en 5 meses',
        '18 analistas certificados nivel avanzado',
        'Reducción de 38% en homicidios en zona de intervención',
        'Tiempo de análisis reducido de 3 días a 4 horas'
      ]
    }
  },
  
  {
    nivel: 3,
    nombre: 'Institución Avanzada',
    rango: [66, 85],
    diagnostico: 'Operas con fundamentos sólidos de evidencia. El siguiente paso es optimización, innovación y posicionamiento como referente.',
    caracteristicas: [
      'Unidad de análisis consolidada con personal certificado',
      'Sistema de información operando e integrado',
      'Procedimientos estandarizados y auditados',
      'Coordinación formal con múltiples sectores',
      'Medición sistemática de resultados'
    ],
    riesgos: [
      'Estancamiento sin innovación continua',
      'Subutilización de capacidades avanzadas del sistema',
      'No capitalizar aprendizajes para posicionamiento institucional'
    ],
    ruta: [
      {
        fase: 'Optimización y Especialización',
        duracion: '2-3 meses',
        objetivo: 'Llevar capacidades a nivel de excelencia',
        entregables: [
          'Análisis predictivo con machine learning',
          'Especialización en delitos complejos',
          'Certificación internacional de analistas líderes',
          'Optimización de dashboards con BI avanzado'
        ]
      },
      {
        fase: 'Escalamiento y Replicabilidad',
        duracion: '3-4 meses',
        objetivo: 'Documentar modelo para replicar y entrenar a otros',
        entregables: [
          'Manual de implementación del modelo completo',
          'Programa de mentoría para otras instituciones',
          'Casos de estudio publicables',
          'Participación en congresos/foros especializados'
        ]
      }
    ],
    inversion_estimada: '$80,000 - $150,000 USD (optimización)',
    retorno_esperado: 'Consolidación de reducciones de 40%+ sostenidas. Posicionamiento como caso modelo.'
  },
  
  {
    nivel: 4,
    nombre: 'Institución de Excelencia',
    rango: [86, 120],
    diagnostico: 'Eres una institución referente en operación basada en evidencia. Tu enfoque debe ser liderazgo sectorial, innovación y transferencia de conocimiento.',
    caracteristicas: [
      'Modelo de operación basada en evidencia consolidado',
      'Resultados medibles y sostenidos en el tiempo',
      'Reconocimiento nacional/internacional',
      'Innovación continua e investigación aplicada',
      'Mentoría a otras instituciones'
    ],
    riesgos: [],
    ruta: [
      {
        fase: 'Posicionamiento como Referente',
        duracion: 'Permanente',
        objetivo: 'Liderazgo sectorial y transferencia de conocimiento',
        entregables: [
          'Programa de certificación para otras instituciones',
          'Publicaciones académicas periódicas',
          'Participación en política pública'
        ]
      }
    ],
    inversion_estimada: 'Variable según proyectos de innovación',
    retorno_esperado: 'Sostenibilidad de resultados. Ingresos por consultoría a terceros. Fondos de investigación.'
  }
]

export function calcularNivel(respuestas: Record<number, number>): {
  puntosTotales: number
  puntosPorPilar: Record<Pilar, number>
  nivel: NivelMadurez
  porcentaje: number
} {
  const puntosPorPilar: Record<Pilar, number> = {
    talento: 0,
    procesos: 0,
    tecnologia: 0
  }
  
  let puntosTotales = 0
  
  Object.entries(respuestas).forEach(([preguntaId, puntos]) => {
    const pregunta = preguntasEvaluador.find(p => p.id === Number(preguntaId))
    if (pregunta) {
      puntosPorPilar[pregunta.pilar] += puntos
      puntosTotales += puntos
    }
  })
  
  const nivel = nivelesMadurez.find(n => 
    puntosTotales >= n.rango[0] && puntosTotales <= n.rango[1]
  ) || nivelesMadurez[0]
  
  const porcentaje = Math.round((puntosTotales / 120) * 100)
  
  return {
    puntosTotales,
    puntosPorPilar,
    nivel,
    porcentaje
  }
}