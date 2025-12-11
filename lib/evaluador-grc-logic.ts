// lib/evaluador-grc-logic.ts

export interface PreguntaGRC {
  id: number
  texto: string
  dimension: 'gobernanza' | 'riesgos_estrategicos' | 'riesgos_operacionales' | 'cumplimiento' | 'cultura'
  opciones: {
    valor: number
    texto: string
  }[]
}

export interface NivelMadurezGRC {
  nivel: number
  nombre: string
  rango: [number, number]
  descripcion: string
  caracteristicas: string[]
  recomendaciones: string[]
  ruta: {
    fase: string
    duracion: string
    objetivo: string
    entregables: string[]
  }[]
}

export const preguntasGRC: PreguntaGRC[] = [
  // GOBERNANZA (5 preguntas)
  {
    id: 1,
    texto: '¿La organización cuenta con un órgano de gobierno (Consejo de Administración o equivalente) formalmente constituido?',
    dimension: 'gobernanza',
    opciones: [
      { valor: 0, texto: 'No existe' },
      { valor: 3, texto: 'Existe pero no opera regularmente' },
      { valor: 6, texto: 'Opera con reuniones esporádicas' },
      { valor: 10, texto: 'Opera formalmente con sesiones periódicas documentadas' }
    ]
  },
  {
    id: 2,
    texto: '¿Existen políticas corporativas documentadas y aprobadas por el órgano de gobierno?',
    dimension: 'gobernanza',
    opciones: [
      { valor: 0, texto: 'No existen políticas documentadas' },
      { valor: 3, texto: 'Existen algunas políticas sin aprobar' },
      { valor: 6, texto: 'Políticas documentadas pero desactualizadas' },
      { valor: 10, texto: 'Políticas vigentes, aprobadas y comunicadas' }
    ]
  },
  {
    id: 3,
    texto: '¿La estructura organizacional define claramente roles, responsabilidades y líneas de reporte?',
    dimension: 'gobernanza',
    opciones: [
      { valor: 0, texto: 'No existe estructura formal' },
      { valor: 3, texto: 'Estructura informal y poco clara' },
      { valor: 6, texto: 'Estructura definida pero no comunicada' },
      { valor: 10, texto: 'Estructura clara, documentada y conocida' }
    ]
  },
  {
    id: 4,
    texto: '¿Se cuenta con comités especializados (auditoría, riesgos, ética) que apoyen al órgano de gobierno?',
    dimension: 'gobernanza',
    opciones: [
      { valor: 0, texto: 'No existen comités' },
      { valor: 3, texto: 'Existe uno de manera informal' },
      { valor: 6, texto: '2-3 comités operando básicamente' },
      { valor: 10, texto: 'Múltiples comités con funciones claras y reportes regulares' }
    ]
  },
  {
    id: 5,
    texto: '¿La toma de decisiones estratégicas se basa en información documentada y análisis objetivos?',
    dimension: 'gobernanza',
    opciones: [
      { valor: 0, texto: 'Decisiones intuitivas sin documentación' },
      { valor: 3, texto: 'Ocasionalmente se documenta' },
      { valor: 6, texto: 'Se documenta pero sin análisis profundo' },
      { valor: 10, texto: 'Decisiones basadas en datos con análisis formal' }
    ]
  },

  // RIESGOS ESTRATÉGICOS (3 preguntas)
  {
    id: 6,
    texto: '¿La organización identifica y evalúa riesgos que puedan afectar el cumplimiento de objetivos estratégicos?',
    dimension: 'riesgos_estrategicos',
    opciones: [
      { valor: 0, texto: 'No se identifican riesgos estratégicos' },
      { valor: 3, texto: 'Identificación informal y ocasional' },
      { valor: 6, texto: 'Identificación documentada pero sin evaluación' },
      { valor: 10, texto: 'Identificación, evaluación y monitoreo sistemático' }
    ]
  },
  {
    id: 7,
    texto: '¿Existe un apetito de riesgo definido y comunicado a nivel estratégico?',
    dimension: 'riesgos_estrategicos',
    opciones: [
      { valor: 0, texto: 'No existe concepto de apetito de riesgo' },
      { valor: 3, texto: 'Definido de manera informal' },
      { valor: 6, texto: 'Definido pero no comunicado' },
      { valor: 10, texto: 'Definido, aprobado y guía la toma de decisiones' }
    ]
  },
  {
    id: 8,
    texto: '¿Se elaboran escenarios de riesgo y planes de contingencia para amenazas estratégicas?',
    dimension: 'riesgos_estrategicos',
    opciones: [
      { valor: 0, texto: 'No existen planes de contingencia' },
      { valor: 3, texto: 'Algunos planes informales' },
      { valor: 6, texto: 'Planes básicos para riesgos principales' },
      { valor: 10, texto: 'Escenarios múltiples con planes probados' }
    ]
  },

  // RIESGOS OPERACIONALES (3 preguntas)
  {
    id: 9,
    texto: '¿Los procesos clave cuentan con identificación y evaluación de riesgos operacionales?',
    dimension: 'riesgos_operacionales',
    opciones: [
      { valor: 0, texto: 'No se identifican riesgos en procesos' },
      { valor: 3, texto: 'Identificación reactiva cuando hay incidentes' },
      { valor: 6, texto: 'Evaluación básica en procesos principales' },
      { valor: 10, texto: 'Gestión integral de riesgos en todos los procesos' }
    ]
  },
  {
    id: 10,
    texto: '¿Existen controles operacionales documentados para mitigar riesgos identificados?',
    dimension: 'riesgos_operacionales',
    opciones: [
      { valor: 0, texto: 'No existen controles formales' },
      { valor: 3, texto: 'Algunos controles informales' },
      { valor: 6, texto: 'Controles documentados sin verificación' },
      { valor: 10, texto: 'Controles documentados, probados y monitoreados' }
    ]
  },
  {
    id: 11,
    texto: '¿Se registran, analizan y aprenden de los incidentes y eventos de riesgo operacional?',
    dimension: 'riesgos_operacionales',
    opciones: [
      { valor: 0, texto: 'No hay registro de incidentes' },
      { valor: 3, texto: 'Registro ocasional sin análisis' },
      { valor: 6, texto: 'Registro sistemático con análisis básico' },
      { valor: 10, texto: 'Base de datos con análisis y mejora continua' }
    ]
  },

  // CUMPLIMIENTO (2 preguntas)
  {
    id: 12,
    texto: '¿La organización identifica y mantiene actualizado un inventario de obligaciones legales y normativas aplicables?',
    dimension: 'cumplimiento',
    opciones: [
      { valor: 0, texto: 'No existe inventario de obligaciones' },
      { valor: 3, texto: 'Conocimiento informal de algunas normas' },
      { valor: 6, texto: 'Lista básica sin actualización regular' },
      { valor: 10, texto: 'Inventario completo actualizado trimestralmente' }
    ]
  },
  {
    id: 13,
    texto: '¿Se monitorea el cumplimiento de normativas nacionales e internacionales aplicables?',
    dimension: 'cumplimiento',
    opciones: [
      { valor: 0, texto: 'No hay monitoreo de cumplimiento' },
      { valor: 3, texto: 'Revisión reactiva cuando hay auditorías' },
      { valor: 6, texto: 'Revisiones semestrales básicas' },
      { valor: 10, texto: 'Monitoreo continuo con indicadores y reportes' }
    ]
  },

  // CULTURA DE INTEGRIDAD (2 preguntas)
  {
    id: 14,
    texto: '¿Existe un código de ética o conducta comunicado y conocido por todos los colaboradores?',
    dimension: 'cultura',
    opciones: [
      { valor: 0, texto: 'No existe código de ética' },
      { valor: 3, texto: 'Existe pero no se comunica' },
      { valor: 6, texto: 'Comunicado pero sin seguimiento' },
      { valor: 10, texto: 'Comunicado, firmado y con capacitación regular' }
    ]
  },
  {
    id: 15,
    texto: '¿Existen canales de denuncia confidenciales y seguros para reportar conductas indebidas?',
    dimension: 'cultura',
    opciones: [
      { valor: 0, texto: 'No existen canales de denuncia' },
      { valor: 3, texto: 'Canal informal sin protección' },
      { valor: 6, texto: 'Canal formal pero poco conocido' },
      { valor: 10, texto: 'Múltiples canales, conocidos y con protección al denunciante' }
    ]
  }
]

export const nivelesMadurezGRC: NivelMadurezGRC[] = [
  {
    nivel: 1,
    nombre: 'Inicial - Ad Hoc',
    rango: [0, 45],
    descripcion: 'La organización opera de manera reactiva sin estructuras formales de gobernanza, riesgos y cumplimiento. Las decisiones se toman de manera intuitiva y no existe documentación sistemática de procesos o controles.',
    caracteristicas: [
      'No hay estructura formal de gobierno corporativo',
      'Decisiones basadas en intuición sin análisis de riesgos',
      'Ausencia de políticas y procedimientos documentados',
      'Desconocimiento de obligaciones normativas aplicables',
      'No existe gestión de riesgos operacionales',
      'Cultura organizacional sin enfoque en integridad'
    ],
    recomendaciones: [
      'Establecer un órgano de gobierno básico',
      'Documentar procesos críticos',
      'Identificar riesgos principales',
      'Crear inventario de obligaciones legales',
      'Desarrollar código de ética básico'
    ],
    ruta: [
      {
        fase: 'Fase 1: Diagnóstico y Concientización',
        duracion: '1-2 meses',
        objetivo: 'Crear conciencia sobre la importancia de GRC y establecer bases mínimas',
        entregables: [
          'Diagnóstico de brechas GRC',
          'Identificación de riesgos críticos',
          'Propuesta de estructura de gobierno básica',
          'Inventario preliminar de obligaciones legales'
        ]
      },
      {
        fase: 'Fase 2: Fundamentos de Gobierno',
        duracion: '2-3 meses',
        objetivo: 'Establecer estructuras básicas de gobierno corporativo',
        entregables: [
          'Constitución de órgano de gobierno',
          'Manual de organización básico',
          'Políticas corporativas fundamentales',
          'Código de ética inicial'
        ]
      }
    ]
  },
  {
    nivel: 2,
    nombre: 'En Desarrollo - Reactivo',
    rango: [46, 75],
    descripcion: 'La organización ha dado los primeros pasos formales en GRC, con algunas estructuras básicas establecidas. Sin embargo, la operación sigue siendo mayormente reactiva y la documentación es incompleta.',
    caracteristicas: [
      'Órgano de gobierno constituido pero con operación irregular',
      'Algunas políticas documentadas pero desactualizadas',
      'Identificación básica de riesgos sin evaluación sistemática',
      'Conocimiento parcial de obligaciones normativas',
      'Controles operacionales informales',
      'Código de ética existente pero poco conocido'
    ],
    recomendaciones: [
      'Formalizar operación del órgano de gobierno',
      'Actualizar y completar políticas corporativas',
      'Implementar metodología básica de gestión de riesgos',
      'Establecer monitoreo de cumplimiento normativo',
      'Desarrollar programas de capacitación en ética'
    ],
    ruta: [
      {
        fase: 'Fase 1: Consolidación de Gobierno',
        duracion: '2-3 meses',
        objetivo: 'Profesionalizar la operación del órgano de gobierno',
        entregables: [
          'Calendario anual de sesiones',
          'Estatutos y reglamentos actualizados',
          'Políticas corporativas completas',
          'Comités especializados (al menos 2)'
        ]
      },
      {
        fase: 'Fase 2: Sistema de Gestión de Riesgos',
        duracion: '3-4 meses',
        objetivo: 'Implementar metodología estructurada de gestión de riesgos',
        entregables: [
          'Política de gestión de riesgos',
          'Matriz de riesgos estratégicos y operacionales',
          'Definición de apetito de riesgo',
          'Plan de tratamiento de riesgos prioritarios'
        ]
      },
      {
        fase: 'Fase 3: Programa de Cumplimiento',
        duracion: '2-3 meses',
        objetivo: 'Establecer sistema básico de gestión de cumplimiento',
        entregables: [
          'Matriz de cumplimiento legal',
          'Procedimientos de monitoreo',
          'Capacitación en normativas clave',
          'Indicadores de cumplimiento'
        ]
      }
    ]
  },
  {
    nivel: 3,
    nombre: 'Definido - Gestión Activa',
    rango: [76, 105],
    descripcion: 'La organización cuenta con un marco GRC estructurado y operativo. Los procesos están documentados y se ejecutan de manera consistente, con un enfoque proactivo en la gestión de riesgos y cumplimiento.',
    caracteristicas: [
      'Órgano de gobierno operando con sesiones regulares documentadas',
      'Políticas corporativas vigentes y comunicadas',
      'Metodología de gestión de riesgos implementada',
      'Monitoreo sistemático de cumplimiento normativo',
      'Controles operacionales documentados y verificados',
      'Cultura de integridad en desarrollo con capacitación regular'
    ],
    recomendaciones: [
      'Integrar los tres pilares GRC en un sistema unificado',
      'Implementar tecnología para automatizar controles',
      'Desarrollar indicadores de desempeño GRC',
      'Fortalecer la cultura de gestión de riesgos',
      'Establecer auditorías internas periódicas'
    ],
    ruta: [
      {
        fase: 'Fase 1: Integración GRC',
        duracion: '3-4 meses',
        objetivo: 'Integrar gobernanza, riesgos y cumplimiento en un sistema cohesivo',
        entregables: [
          'Marco integrado de GRC',
          'Procesos sincronizados entre áreas',
          'Dashboard ejecutivo de GRC',
          'Reportes integrados al órgano de gobierno'
        ]
      },
      {
        fase: 'Fase 2: Automatización y Tecnología',
        duracion: '4-6 meses',
        objetivo: 'Implementar herramientas tecnológicas para GRC',
        entregables: [
          'Plataforma GRC implementada',
          'Automatización de controles clave',
          'Alertas y notificaciones automatizadas',
          'Repositorio centralizado de documentación'
        ]
      },
      {
        fase: 'Fase 3: Maduración Cultural',
        duracion: '6-12 meses (continuo)',
        objetivo: 'Consolidar cultura organizacional de GRC',
        entregables: [
          'Programa de capacitación continua',
          'Sistema de reconocimientos por buenas prácticas',
          'Encuestas de clima ético',
          'Embajadores de GRC en cada área'
        ]
      }
    ]
  },
  {
    nivel: 4,
    nombre: 'Gestionado - Proactivo',
    rango: [106, 135],
    descripcion: 'La organización tiene un sistema GRC maduro y proactivo. Los riesgos se anticipan, el cumplimiento es parte de la operación diaria y la gobernanza es transparente y efectiva.',
    caracteristicas: [
      'Gobierno corporativo con comités especializados activos',
      'Gestión anticipada de riesgos con escenarios y simulaciones',
      'Cumplimiento normativo monitoreado en tiempo real',
      'Controles automatizados con indicadores de efectividad',
      'Cultura de integridad arraigada en toda la organización',
      'Auditorías internas y externas con resultados sobresalientes'
    ],
    recomendaciones: [
      'Optimizar procesos mediante mejora continua',
      'Certificar el sistema GRC (ISO 31000, ISO 37001, etc.)',
      'Benchmark con mejores prácticas internacionales',
      'Expandir alcance de GRC a subsidiarias y proveedores',
      'Participar en foros y liderazgo de pensamiento en GRC'
    ],
    ruta: [
      {
        fase: 'Fase 1: Optimización Continua',
        duracion: '4-6 meses',
        objetivo: 'Implementar ciclos de mejora continua en GRC',
        entregables: [
          'Auditorías de procesos GRC',
          'Plan de optimización identificado',
          'Implementación de mejoras prioritarias',
          'Medición de eficiencia de controles'
        ]
      },
      {
        fase: 'Fase 2: Certificaciones y Reconocimientos',
        duracion: '6-12 meses',
        objetivo: 'Obtener certificaciones internacionales en GRC',
        entregables: [
          'Preparación para ISO 31000 (Gestión de Riesgos)',
          'Preparación para ISO 37001 (Anti-soborno)',
          'Auditorías de certificación',
          'Certificados obtenidos'
        ]
      }
    ]
  },
  {
    nivel: 5,
    nombre: 'Optimizado - Integrado',
    rango: [136, 150],
    descripcion: 'La organización es referente en GRC con un sistema completamente integrado, anticipatorio y en mejora continua. GRC es parte del ADN organizacional y genera ventaja competitiva.',
    caracteristicas: [
      'Gobernanza de clase mundial con transparencia total',
      'Gestión predictiva de riesgos con inteligencia artificial',
      'Cumplimiento excede requisitos mínimos legales',
      'Sistema GRC certificado internacionalmente',
      'Cultura de integridad como diferenciador competitivo',
      'Referente en la industria por mejores prácticas GRC'
    ],
    recomendaciones: [
      'Compartir conocimiento como líder de pensamiento',
      'Expandir modelo GRC a ecosistema de valor',
      'Innovar en metodologías y herramientas GRC',
      'Participar en estándares y normativas internacionales',
      'Mentoría a otras organizaciones en su viaje GRC'
    ],
    ruta: [
      {
        fase: 'Mantenimiento de Excelencia',
        duracion: 'Continuo',
        objetivo: 'Mantener y expandir liderazgo en GRC',
        entregables: [
          'Auditorías de recertificación',
          'Publicaciones y casos de estudio',
          'Participación en foros internacionales',
          'Innovaciones en prácticas GRC',
          'Programa de mentoría a otras organizaciones'
        ]
      }
    ]
  }
]

export function calcularNivelGRC(respuestas: Record<number, number>): NivelMadurezGRC {
  let puntosTotales = 0
  
  Object.values(respuestas).forEach(valor => {
    puntosTotales += valor
  })

  const nivel = nivelesMadurezGRC.find(
    n => puntosTotales >= n.rango[0] && puntosTotales <= n.rango[1]
  )

  return nivel || nivelesMadurezGRC[0]
}

export function calcularPuntosPorDimension(respuestas: Record<number, number>): {
  gobernanza: number
  riesgos_estrategicos: number
  riesgos_operacionales: number
  cumplimiento: number
  cultura: number
} {
  const puntos = {
    gobernanza: 0,
    riesgos_estrategicos: 0,
    riesgos_operacionales: 0,
    cumplimiento: 0,
    cultura: 0
  }

  Object.entries(respuestas).forEach(([preguntaId, valor]) => {
    const pregunta = preguntasGRC.find(p => p.id === parseInt(preguntaId))
    if (pregunta) {
      puntos[pregunta.dimension] += valor
    }
  })

  return puntos
}