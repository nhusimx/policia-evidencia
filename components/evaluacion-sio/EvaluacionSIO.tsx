'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────
type Screen = 'login' | 'intro' | 'quiz' | 'sending' | 'result'
type DimKey  = 'A' | 'B' | 'C' | 'D' | 'E'

interface Question {
  sec?:      string
  sec_tag?:  string
  sec_n?:    string
  id:        number
  type:      'mc'
  dim:       DimKey
  weight:    number
  scenario?: string
  text:      string
  options:   string[]
  answer:    number       // índice 0-3
}

interface Results {
  pct:           number
  totalScore:    number
  totalW:        number
  dimPct:        Record<DimKey, number>
  dimT:          Record<DimKey, number>
  dimC:          Record<DimKey, number>
  classification: 'no-apto' | 'apto-jr' | 'apto-esp'
  comMatch:      Array<{ name: string; matchPct: number }>
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN
// ─────────────────────────────────────────────────────────────────────────────
const SHEETS_URL  = process.env.NEXT_PUBLIC_SHEETS_URL ?? ''
const TIMER_SECS  = 60 * 60
const ACCESS_PASS = process.env.NEXT_PUBLIC_EVAL_PASSWORD ?? 'CONFIA2025'

const DIMS: Record<DimKey, string> = {
  A: 'Normativa Institucional',
  B: 'Análisis e Inteligencia',
  C: 'Investigación de Campo',
  D: 'Tecnología y Datos',
  E: 'Ética y Actitudinal',
}

const DIM_COLORS: Record<DimKey, string> = {
  A: '#0A3D5C',
  B: '#92620a',
  C: '#0a6e55',
  D: '#4e1d9e',
  E: '#b01a2e',
}

const COMISARIAS = [
  { name: 'Comisaría de Investigación de Gabinete',       dims: { A:3,B:3,C:1,D:1,E:1 } },
  { name: 'Comisaría de Investigación de Campo',          dims: { A:2,B:1,C:4,D:1,E:2 } },
  { name: 'Comisaría del CEIIC',                          dims: { A:2,B:3,C:2,D:2,E:1 } },
  { name: 'Comisaría de la Cibernética',                  dims: { A:1,B:2,C:1,D:5,E:1 } },
  { name: 'Comisaría del Escuadrón Antiextorsión',        dims: { A:2,B:2,C:3,D:1,E:2 } },
  { name: 'Comisaría del Grupo Especializado',            dims: { A:3,B:2,C:2,D:1,E:2 } },
]

const AREAS = [
  { group: 'a. Comisaría de Investigación de Gabinete', options: [
    { value: 'a',     label: 'Comisaría de Investigación de Gabinete' },
    { value: 'a.1',   label: '· Comisaría de Análisis Táctico' },
    { value: 'a.1.1', label: '· · División de Identificación de Organizaciones Delictivas' },
    { value: 'a.2',   label: '· Comisaría de Inteligencia Estratégica' },
    { value: 'a.2.1', label: '· · División de Recolección, Análisis y Procesamiento de Información' },
    { value: 'a.2.2', label: '· · División de Productos de Inteligencia' },
    { value: 'a.3',   label: '· Comisaría de Enlace con las Áreas de Inteligencia y Operación' },
    { value: 'a.3.1', label: '· · Divisiones de Atención a Regiones' },
  ]},
  { group: 'b. Comisaría de Investigación de Campo', options: [
    { value: 'b',     label: 'Comisaría de Investigación de Campo' },
    { value: 'b.1',   label: '· Comisaría de Reclutamiento y Manejo de Fuentes de Información' },
    { value: 'b.2',   label: '· Comisaría de Vigilancias y Seguimiento' },
    { value: 'b.3',   label: '· Comisaría de Investigación de Delitos Diversos' },
    { value: 'b.3.1', label: '· · División de Atención a Delitos de Narcomenudeo' },
    { value: 'b.3.2', label: '· · División de Atención a Delitos de Asociación Delictuosa' },
    { value: 'b.3.3', label: '· · División de Atención a Delitos Patrimoniales' },
    { value: 'b.3.4', label: '· · División de Atención a Delitos contra la Integridad de las Personas' },
    { value: 'b.3.5', label: '· · División de Atención a Delitos de Alto Impacto' },
  ]},
  { group: 'c. Comisaría del CEIIC', options: [
    { value: 'c',     label: 'Comisaría del CEIIC' },
    { value: 'c.1',   label: '· Comisaría de Planeación Estratégica' },
    { value: 'c.1.1', label: '· · División de Atención a Movimientos Sociales' },
    { value: 'c.1.2', label: '· · División de Enlace Intermunicipal' },
    { value: 'c.2',   label: '· Comisaría de Investigación Criminal' },
    { value: 'c.2.1', label: '· · División de Información para la Seguridad Estatal' },
    { value: 'c.2.2', label: '· · División de Contrainteligencia' },
    { value: 'c.3',   label: '· Comisaría de Identificación y Seguimiento a Blancos Prioritarios' },
    { value: 'c.3.1', label: '· · División de Fichas y Registros' },
  ]},
  { group: 'd. Comisaría de la Cibernética', options: [
    { value: 'd',   label: 'Comisaría de la Cibernética' },
    { value: 'd.1', label: '· División de Atención a Delitos Cibernéticos' },
    { value: 'd.2', label: '· División de Servicios Técnicos' },
    { value: 'd.3', label: '· División de Vigilancia e Inteligencia Aérea' },
  ]},
  { group: 'e. Comisaría del Escuadrón Antiextorsión', options: [
    { value: 'e',   label: 'Comisaría del Escuadrón Antiextorsión' },
    { value: 'e.1', label: '· División de Prevención' },
    { value: 'e.2', label: '· División de Inteligencia' },
    { value: 'e.3', label: '· División de Investigación' },
  ]},
  { group: 'f. Comisaría del Grupo Especializado', options: [
    { value: 'f', label: 'Comisaría del Grupo Especializado' },
  ]},
]

const LETTERS = ['A', 'B', 'C', 'D']

// ─────────────────────────────────────────────────────────────────────────────
// BANCO DE PREGUNTAS — 50 items · A=12 B=13 C=13 D=12
// ─────────────────────────────────────────────────────────────────────────────
const Q: Question[] = [
  // ── SECCIÓN I · MARCO INSTITUCIONAL (12) ─────────────────────────────────
  {sec:'I. Marco Institucional y Reglamento Interior SSyP',sec_tag:'Normativa Estatal · Estructura SIO',sec_n:'01',
   id:1,type:'mc',dim:'A',weight:1,
   text:'¿Cuántas comisarías están adscritas a la Subsecretaría de Inteligencia Operacional de las Fuerzas de Seguridad Pública del Estado, según el Artículo 95 del Reglamento Interior de la SSyP?',
   options:['Cuatro','Cinco','Seis','Ocho'],answer:2},

  {id:2,type:'mc',dim:'A',weight:1,
   scenario:'Una nueva coordinadora solicita al equipo de la SIO un documento que explique la cadena de mando y las facultades generales de la Subsecretaría.',
   text:'¿En qué artículo del Reglamento Interior de la SSyP se establecen las facultades específicas de la Subsecretaría de Inteligencia Operacional?',
   options:['Artículo 96','Artículo 48','Artículo 110','Artículo 3'],answer:0},

  {id:3,type:'mc',dim:'A',weight:1,
   text:'Según el Artículo 97, la Comisaría de Investigación de Gabinete supervisa tres unidades. ¿Cuáles son?',
   options:['Comisaría de Campo, Comisaría de Análisis y División Aérea','División Táctica, División Estratégica y División de Enlace','Comisaría de Análisis Táctico, Comisaría de Inteligencia Estratégica y Comisaría de Enlace con las Áreas de Inteligencia y Operación','Comisaría de Gabinete, Comisaría CEIIC y Comisaría de Productos'],answer:2},

  {id:4,type:'mc',dim:'A',weight:1,
   scenario:'Un analista junior necesita identificar cuál unidad dentro del CEIIC es responsable de monitorear el sistema 911 y generar tarjetas informativas sobre incidencias en tiempo real.',
   text:'¿A qué unidad administrativa corresponde esa función según el Reglamento?',
   options:['División de Contrainteligencia','Comisaría de Planeación Estratégica','Comisaría de Inteligencia Estratégica','División de Fichas y Registros'],answer:3},

  {id:5,type:'mc',dim:'A',weight:1,
   text:'De acuerdo con el Artículo 110, la Comisaría de Investigación de Campo ejecuta sus acciones bajo la dirección y supervisión de:',
   options:['El Subsecretario de Inteligencia Operacional','El Ministerio Público','El titular de la SSyP','El CEIIC'],answer:1},

  {id:6,type:'mc',dim:'A',weight:1,
   text:'Según el Artículo 129, ¿a qué Comisaría está adscrita la División de Vigilancia e Inteligencia Aérea?',
   options:['Comisaría de la Cibernética','Comisaría del Grupo Especializado','Comisaría de Investigación de Campo','Comisaría de Investigación de Gabinete'],answer:0},

  {id:7,type:'mc',dim:'A',weight:1,
   scenario:'El jefe de área recibe una solicitud de otra institución para intercambiar información sobre una organización criminal que opera en varios municipios. Necesita identificar qué facultad del Reglamento respalda este tipo de colaboración.',
   text:'¿Qué fracción del Artículo 96 faculta a la SIO a promover la articulación y colaboración interinstitucional con los tres órdenes de gobierno?',
   options:['Fracción I — Coordinación interna de actividades','Fracción VII — Implementación tecnológica y metodológica','Fracción II — Políticas y estrategias de inteligencia','Fracción IV — Colaboración interinstitucional para intercambio de información y desarticulación de redes'],answer:3},

  {id:8,type:'mc',dim:'A',weight:1,
   text:'La Comisaría de Vigilancias y Seguimiento (Art. 112) solo puede iniciar una vigilancia cuando existe:',
   options:['Reporte previo del sistema 911 sobre el objetivo','Autorización verbal del mando superior inmediato','Un mandamiento ministerial o judicial que la respalde formalmente','Información de fuente humana no verificada que justifique la acción'],answer:2},

  {id:9,type:'mc',dim:'A',weight:2,
   scenario:'Al revisar el expediente de un operativo reciente, el supervisor detecta que la información generada por la División de Contrainteligencia fue compartida con un elemento sin el nivel de acceso correspondiente.',
   text:'¿Qué función específica del Artículo 125 fue incumplida en este caso?',
   options:['Establecer protocolos de seguridad interna para proteger la confidencialidad de los datos y la integridad de las operaciones','Monitorear plataformas digitales abiertas en busca de amenazas','Coordinar operativos con los tres órdenes de gobierno','Generar fichas de blancos prioritarios actualizadas'],answer:0},

  {id:10,type:'mc',dim:'A',weight:1,
   text:'La estrategia CONFIA fue presentada el 4 de noviembre de 2024. ¿Cuál es su objetivo central en el marco de la SSyP?',
   options:['Crear una nueva corporación policial independiente de la SSyP','Sustituir al Ministerio Público en la conducción de investigaciones penales estatales','Centralizar toda la función policial en una sola unidad sin coordinación regional','Fortalecer la capacidad operativa y estratégica en la prevención, investigación y combate a los delitos y amenazas a la paz pública'],answer:3},

  {id:11,type:'mc',dim:'A',weight:1,
   text:'¿Cuál de las siguientes afirmaciones sobre el Escuadrón Antiextorsión es correcta según el Artículo 135 del Reglamento?',
   options:['Investiga delitos de extorsión bajo la dirección y supervisión del Ministerio Público, conforme a la normatividad aplicable','Puede investigar delitos de extorsión de manera autónoma sin necesitar la dirección del Ministerio Público','Solo atiende extorsiones telefónicas y no las cometidas por medios digitales','Sus investigaciones no requieren mandamiento ministerial para realizarse'],answer:0},

  {id:12,type:'mc',dim:'A',weight:2,
   scenario:'La Comisaría de Enlace recibe simultáneamente un producto de inteligencia táctica y un reporte de campo urgente. Debe decidir con qué área operativa compartir primero la información para detonar una intervención en campo.',
   text:'¿Cuál es la función esencial de la Comisaría de Enlace según el Artículo 107?',
   options:['Ejecutar operativos de campo en zonas de alta incidencia delictiva','Supervisar la cadena de custodia de indicios recolectados en campo','Elaborar productos de inteligencia estratégica para mandos superiores','Coordinar el flujo de información entre las áreas de inteligencia y las áreas operativas para que el análisis se comparta de forma eficiente y oportuna'],answer:3},

  // ── SECCIÓN II · CICLO DE INTELIGENCIA (12) ──────────────────────────────
  {sec:'II. Ciclo de Inteligencia y Análisis Criminal',sec_tag:'Análisis e Inteligencia · Metodología',sec_n:'02',
   id:13,type:'mc',dim:'B',weight:1,
   text:'¿Cuál es la secuencia correcta del ciclo de inteligencia aplicado en la Comisaría de Inteligencia Estratégica?',
   options:['Recolección → Procesamiento → Dirección → Diseminación','Dirección/Planeación → Recolección/Captación → Procesamiento/Análisis → Diseminación/Explotación','Análisis → Planeación → Recolección → Distribución','Captación → Clasificación → Interpretación → Archivo'],answer:1},

  {id:14,type:'mc',dim:'B',weight:2,
   scenario:'Un analista de la División de Recolección, Análisis y Procesamiento recibe datos de tres fuentes distintas sobre el mismo objetivo. Debe combinarlos para construir una imagen más completa del fenómeno.',
   text:'¿En qué fase del procesamiento del ciclo de inteligencia se encuentra al realizar esa tarea?',
   options:['Registro formal en el sistema institucional','Evaluación y clasificación de la confiabilidad','Integración — combinar e interrelacionar fragmentos analizados de distintas fuentes','Diseminación hacia los usuarios finales'],answer:2},

  {id:15,type:'mc',dim:'B',weight:1,
   text:'La diferencia principal entre un producto de inteligencia táctica y uno estratégico es:',
   options:['El producto táctico lo firma el Subsecretario y el estratégico un analista junior','El producto táctico apoya acciones policiales inmediatas; el estratégico orienta decisiones de mediano y largo plazo sobre el fenómeno delictivo','Ambos son equivalentes; solo difieren en el área que los produce','El táctico se produce en campo y el estratégico exclusivamente en gabinete'],answer:1},

  {id:16,type:'mc',dim:'B',weight:2,
   scenario:'La División de Productos de Inteligencia entrega un documento que solo enlista el número de delitos por municipio en el último mes, sin análisis de causas, patrones ni proyecciones.',
   text:'¿Cómo debe clasificarse ese documento?',
   options:['Reporte de incidencias — no constituye un producto de inteligencia porque carece de análisis, interpretación y orientación para la toma de decisiones','Producto de inteligencia estratégica completo','Informe de contrainteligencia sobre amenazas al Estado','Producto de inteligencia táctica suficiente para orientar operativos inmediatos'],answer:0},

  {id:17,type:'mc',dim:'B',weight:2,
   scenario:'El analista senior del CEIIC detecta que en el análisis de red de una organización criminal, un contador de aparente bajo perfil conecta a los líderes de tres células diferentes sin tener contacto directo entre sí.',
   text:'¿Qué concepto de análisis de redes explica la importancia estratégica de ese contador?',
   options:['Densidad de red — indica la cohesión general de la organización','Centralidad de intermediación (betweenness) — controla el flujo entre grupos y es clave para fragmentar la red','Centralidad de grado — es el nodo con más conexiones directas','Centralidad de cercanía — está más cerca del centro geográfico de operaciones'],answer:1},

  {id:18,type:'mc',dim:'B',weight:1,
   text:'¿Cuáles son los cinco atributos que debe cumplir la información para ser útil en el ciclo de inteligencia?',
   options:['Oportuna, confiable, continua, confidencial y útil','Verificada, completa, reciente, pública y digital','Secreta, exclusiva, técnica, validada y oportuna','Formal, firmada, archivada, clasificada y registrada'],answer:0},

  {id:19,type:'mc',dim:'B',weight:2,
   scenario:'La Comisaría de Análisis Táctico recibe datos de vigilancia sobre un mercado donde se sospecha que opera una red de narcomenudeo. Los reportes muestran transacciones principalmente los martes y jueves entre 14:00 y 17:00 h.',
   text:'¿Qué tipo de análisis permite identificar ese patrón espacio-temporal para apoyar la planeación de un operativo?',
   options:['Análisis financiero forense de las transacciones en el mercado','Análisis geoespacial y temporal de puntos calientes (hotspot analysis)','Análisis de sentimientos en redes sociales del área','Análisis de desempeño institucional del área de campo'],answer:1},

  {id:20,type:'mc',dim:'B',weight:1,
   text:'En el modelo de Policiamiento Basado en Inteligencia (ILP), ¿a quién está dirigido primariamente el producto de inteligencia generado por la Comisaría de Inteligencia Estratégica?',
   options:['Al INEGI para actualizar las estadísticas nacionales de incidencia','Al mando policial y tomadores de decisiones de la SSyP que transforman la inteligencia en acciones operativas','Exclusivamente al Ministerio Público para integración de carpetas','A los medios de comunicación para informar a la ciudadanía'],answer:1},

  {id:21,type:'mc',dim:'B',weight:2,
   scenario:'Un analista recibe información de una fuente con historial positivo, pero esta vez los datos no pueden ser corroborados por ninguna fuente independiente.',
   text:'Aplicando la metodología AVC (Asume nada, Verifica todo, Cuestiona todo), ¿cuál es la acción correcta?',
   options:['Esperar hasta que otra área confirme la información antes de registrarla','Ignorar la información por no poder verificarla de inmediato','Registrar con el nivel de confiabilidad correspondiente e iniciar verificación cruzada antes de actuar o diseminar','Registrar como verificada dado el historial positivo de la fuente'],answer:2},

  {id:22,type:'mc',dim:'B',weight:1,
   text:'¿Cuál es la diferencia entre el análisis descriptivo y el análisis predictivo en el contexto del trabajo de la SIO?',
   options:['No existe diferencia práctica; ambos producen los mismos resultados','El predictivo solo aplica a delitos de alto impacto y el descriptivo a faltas administrativas','El descriptivo documenta lo que ya ocurrió (qué, dónde, cuándo); el predictivo usa esos patrones para anticipar dónde y cuándo es probable que ocurran delitos futuros','El análisis descriptivo requiere inteligencia artificial y el predictivo solo estadística básica'],answer:2},

  {id:23,type:'mc',dim:'B',weight:2,
   scenario:'La División de Atención a Movimientos Sociales detecta un incremento inusual en la organización de protestas en tres municipios fronterizos. Debe generar un producto para la Comisaría de Planeación Estratégica antes de 48 horas.',
   text:'¿Qué tipo de producto de inteligencia es más adecuado para este caso?',
   options:['Una ficha de blanco prioritario individual sobre el organizador principal','Un reporte de alerta temprana con análisis de posibles impactos en la seguridad pública y recomendaciones preventivas','Una base de datos estadística de llamadas al 911 en esa zona','Un dictamen pericial digital sobre las redes sociales de los organizadores'],answer:1},

  {id:24,type:'mc',dim:'B',weight:2,
   scenario:'El CEIIC identifica que una organización delictiva cambió sus patrones de comunicación y rutas justo después de un operativo, sugiriendo una posible filtración de información interna.',
   text:'¿Qué unidad administrativa debe activarse inmediatamente ante este escenario?',
   options:['División de Fichas y Registros para actualizar perfiles del objetivo','División de Enlace Intermunicipal para coordinar con municipios afectados','Comisaría de Reclutamiento y Manejo de Fuentes para reclutar nuevos informantes','División de Contrainteligencia para detectar, neutralizar y prevenir posibles infiltraciones'],answer:3},

  // ── SECCIÓN III · INVESTIGACIÓN CRIMINAL (13) ────────────────────────────
  {sec:'III. Investigación Criminal y Protocolo de Actuación',sec_tag:'Procedimiento · Técnica Policial',sec_n:'03',
   id:25,type:'mc',dim:'C',weight:1,
   text:'Al llegar a la escena del crimen, ¿cuál es la prioridad absoluta del investigador antes de realizar cualquier acto de investigación?',
   options:['Recolectar inmediatamente los indicios más evidentes para evitar su pérdida','Asegurar y preservar la escena estableciendo cordón efectivo e iniciando el registro de entradas y salidas','Esperar la llegada del perito criminalístico antes de actuar','Entrevistar a los testigos presentes en la escena'],answer:1},

  {id:26,type:'mc',dim:'C',weight:2,
   scenario:'Un agente llega primero a la escena de un homicidio. Al entrar, toca involuntariamente la manija de la puerta con la mano descubierta y pisa el área perimetral sin equipo de protección.',
   text:'¿Qué principio fundamental de la investigación criminal fue comprometido y cuáles son las implicaciones?',
   options:['Principio de economía procesal; no tiene implicaciones forenses relevantes','Principio de cadena de mando; debe reportarlo solo a su superior jerárquico','Principio de inmediación; el agente debe retirarse de la escena sin documentar nada','Principio de intercambio de Locard; el agente pudo transferir material biológico a la escena (contaminación cruzada), afectando la integridad de la evidencia'],answer:3},

  {id:27,type:'mc',dim:'C',weight:1,
   text:'¿Cuál de las siguientes afirmaciones sobre el inicio de la investigación policial es correcta?',
   options:['Los primeros respondientes deben esperar la llegada del Ministerio Público antes de actuar','La investigación puede iniciarse solo si hay un testigo presencial que lo autorice','El inicio de la investigación policial no puede condicionarse a la llegada del Ministerio Público o de los oficiales de la Fiscalía','Solo el investigador principal puede dar inicio formal a la investigación en la escena'],answer:2},

  {id:28,type:'mc',dim:'C',weight:1,
   text:'La cadena de custodia debe documentar para cada indicio recuperado:',
   options:['Descripción precisa, ubicación exacta, hora/día/fecha de recuperación, persona que lo recuperó y método de almacenamiento','Solo el nombre del perito y el número de carpeta de investigación','Únicamente la fotografía del indicio en su estado original','El folio del expediente y la firma del Ministerio Público'],answer:0},

  {id:29,type:'mc',dim:'C',weight:2,
   scenario:'Un agente llega a un domicilio donde se reporta una privación ilegal de la libertad. Observa un teléfono celular encendido sobre la mesa, una laptop con sesión activa y fragmentos de cuerda. No hay personal pericial.',
   text:'¿Cuál es la actuación correcta respecto a los dispositivos digitales?',
   options:['Fotografiar los dispositivos in situ sin tocarlos, documentar su estado de encendido, aislarlos de redes si es posible sin manipularlos y esperar a la División de Servicios Técnicos','Apagar ambos dispositivos de inmediato para evitar el borrado remoto','Encender la laptop si está bloqueada para revisar su historial','Trasladar los dispositivos al cuartel para su análisis inmediato'],answer:0},

  {id:30,type:'mc',dim:'C',weight:2,
   scenario:'Un investigador está por entrevistar a una víctima de extorsión que muestra nerviosismo y ha señalado que "no quiere meterse en más problemas". Necesita obtener su relato con el mayor nivel de detalle posible.',
   text:'¿Qué técnica de entrevista es más adecuada como punto de partida?',
   options:['Mostrar fotografías de posibles sospechosos antes de escuchar su relato para orientar el testimonio','Comenzar con preguntas de sí/no para no presionarla con preguntas abiertas','Formular preguntas sugestivas para guiarla hacia los hechos relevantes','Pedir a la víctima que relate libremente los hechos con sus propias palabras, escuchando activamente sin interrupciones (recuerdo libre)'],answer:3},

  {id:31,type:'mc',dim:'C',weight:2,
   scenario:'Durante la investigación de un secuestro, el investigador recibe un testimonio de testigo ocular, imágenes de cámara de seguridad y un informe de inteligencia del CEIIC. Los tres apuntan al mismo sospechoso.',
   text:'¿Cómo se denomina el proceso de cruzar estas tres fuentes para validar la hipótesis investigativa?',
   options:['Integración de carpeta de investigación ante el MP','Triangulación de información — validar un dato cruzándolo con al menos dos fuentes independientes','Análisis de correlación estadística de incidencias','Diseminación de productos de inteligencia hacia campo'],answer:1},

  {id:32,type:'mc',dim:'C',weight:1,
   text:'¿Por qué las preguntas sugestivas en la entrevista de investigación deben considerarse un último recurso?',
   options:['Porque están prohibidas por el Reglamento Interior de la SSyP','Porque consumen más tiempo que las preguntas abiertas','Porque pueden distorsionar la memoria del testigo y hacer el testimonio más susceptible de ser impugnado en los tribunales','Porque solo pueden usarlas investigadores certificados con más de cinco años de experiencia'],answer:2},

  {id:33,type:'mc',dim:'C',weight:1,
   text:'¿Qué es la "hora dorada" en el contexto de la investigación criminal?',
   options:['El plazo máximo que tiene el MP para integrar la carpeta de investigación','El período inmediatamente posterior al delito cuando los indicios están intactos, los testigos recuerdan con mayor precisión y hay mayor probabilidad de localizar material relevante','Las primeras 24 horas después de abrir la carpeta de investigación','La primera hora del turno de guardia del investigador principal'],answer:1},

  {id:34,type:'mc',dim:'C',weight:2,
   scenario:'La Comisaría de Reclutamiento y Manejo de Fuentes detecta que otro elemento de la institución ha estado en contacto con familiares de integrantes de la organización que está siendo investigada.',
   text:'¿Cuál es la acción prioritaria que establece el Artículo 111 del Reglamento en este contexto?',
   options:['Activar los protocolos de confidencialidad y protección para garantizar la seguridad de la fuente y la integridad de la investigación','Compartir la alerta con todos los elementos de la comisaría para información general','Esperar hasta confirmar el compromiso antes de tomar cualquier medida','Cerrar la fuente de información por riesgo de compromiso y archivar el caso'],answer:0},

  {id:35,type:'mc',dim:'C',weight:2,
   scenario:'La División de Investigación del Escuadrón Antiextorsión recibe un producto de inteligencia del CEIIC que identifica a tres probables líderes de una red de extorsión. El supervisor evalúa si proceder a la detención con base en ese producto.',
   text:'¿Cuál es el paso metodológico correcto antes de ejecutar cualquier detención?',
   options:['Solicitar directamente a la Fiscalía que tome el control total del caso','Publicar la información para que las víctimas confirmen la identidad de los señalados','Proceder de inmediato; el producto de inteligencia del CEIIC es fundamento legal suficiente','Convertir la inteligencia en datos de prueba admisibles mediante actos de investigación formales bajo conducción del MP conforme al CNPP'],answer:3},

  {id:36,type:'mc',dim:'C',weight:2,
   scenario:'Un agente de vigilancia autorizado por mandamiento ministerial para seguir a un objetivo detecta, durante esa misma vigilancia, que dos personas ajenas al caso realizan una transacción de droga a media cuadra.',
   text:'¿Cuál es la actuación correcta en ese momento?',
   options:['Interrumpir la vigilancia autorizada para detener a los dos individuos en flagrancia','Registrar la observación y reportarla al superior y al MP para que determine la procedencia legal de actuar, sin abandonar la misión autorizada ni actuar fuera de su mandamiento','Ignorar el incidente completamente para no comprometer la operación principal','Compartir la información con los medios de comunicación locales'],answer:1},

  {id:37,type:'mc',dim:'C',weight:2,
   scenario:'Al revisar un expediente de investigación de asociación delictuosa, el supervisor detecta que varios indicios fueron recolectados sin llenar el formato de registro y algunos fueron trasladados sin documentar el movimiento.',
   text:'¿Cuál es el principal riesgo jurídico que genera esta situación?',
   options:['Que el supervisor sea trasladado de área por descuido administrativo','Que los peritos se nieguen a emitir dictamen sobre los indicios sin justificación formal','Que el expediente sea más difícil de digitalizar en el sistema institucional','Que los indicios sean declarados inadmisibles como datos de prueba por ruptura de la cadena de custodia, comprometiendo la judicialización del caso'],answer:3},

  // ── SECCIÓN IV · TECNOLOGÍA Y DATOS (8) ──────────────────────────────────
  {sec:'IV. Tecnología, Datos y Análisis Aplicado',sec_tag:'Forense Digital · Inteligencia Tecnológica',sec_n:'04',
   id:38,type:'mc',dim:'D',weight:2,
   scenario:'Un especialista de la División de Servicios Técnicos recibe un disco duro extraído de la escena de un secuestro. Debe garantizar que su contenido no sea alterado antes del análisis.',
   text:'¿Cuál es el procedimiento correcto para preservar la integridad de esa evidencia digital?',
   options:['Conectar el disco directamente al equipo de análisis y copiar los archivos al escritorio','Crear una imagen forense bit a bit usando herramientas certificadas, verificar la integridad con hash criptográfico (SHA-256/MD5) y trabajar siempre sobre la copia, nunca sobre el original','Encender el equipo al que pertenecía el disco para revisar el estado del sistema operativo','Formatear el disco para eliminar posible malware antes de analizarlo'],answer:1},

  {id:39,type:'mc',dim:'D',weight:1,
   text:'¿Qué es el OSINT y cuál es su utilidad para la División de Atención a Delitos Cibernéticos?',
   options:['Open Source Intelligence: recolección y análisis de información en fuentes públicas y abiertas para obtener inteligencia sin acceder a sistemas privados','Online Security Intelligence Tool: programa federal de monitoreo de comunicaciones privadas','Operative Social Investigation Network: red de informantes en plataformas digitales cerradas','Open System for Intelligence Tracking: plataforma de intercambio de datos entre fiscalías'],answer:0},

  {id:40,type:'mc',dim:'D',weight:2,
   scenario:'La División de Vigilancia Aérea registra imágenes de un área industrial con movimientos nocturnos recurrentes. El analista debe integrar esos datos con los registros de incidencia delictiva del municipio.',
   text:'¿Qué metodología de análisis debe aplicar para identificar los patrones espacio-temporales de esa actividad?',
   options:['Análisis financiero forense de las actividades de la zona industrial','Encuesta de victimización en los municipios colindantes','Análisis geoespacial con mapeo de rutas, tiempos de actividad y concentración de eventos en zonas de alta incidencia','Análisis de desempeño policial de los turnos nocturnos del área'],answer:2},

  {id:41,type:'mc',dim:'D',weight:1,
   text:'La Teoría de Actividad Rutinaria establece que el delito ocurre cuando convergen tres elementos. ¿Cuáles son?',
   options:['Motivación del delincuente, vulnerabilidad social y ausencia del Estado','Oportunidad, rentabilidad percibida y desorganización comunitaria','Agresor motivado, objetivo o víctima adecuada y ausencia de un guardián capaz en tiempo y espacio','Perfil de riesgo activo, red de apoyo y zona de confort del delincuente'],answer:2},

  {id:42,type:'mc',dim:'D',weight:1,
   text:'¿Por qué generalmente no se recomienda apagar un dispositivo encendido antes de que llegue el perito especializado en una escena del crimen?',
   options:['Porque la ley prohíbe apagar dispositivos en la escena del crimen','Porque el estado encendido no afecta en modo alguno la integridad de la evidencia digital','Porque apagarlo puede activar mecanismos de cifrado de disco o protocolos de borrado automático que impidan el acceso posterior a los datos','Porque el dispositivo podría explotar si se apaga de forma incorrecta'],answer:2},

  {id:43,type:'mc',dim:'D',weight:2,
   scenario:'La División de Servicios Técnicos analiza el teléfono de un investigado por extorsión. Encuentra mensajes cifrados, contactos con nombres en clave y registros de llamadas eliminadas que fueron recuperadas.',
   text:'¿Cuál debe ser el tratamiento de esa información para que sea útil como dato de prueba?',
   options:['Transcribir los mensajes a mano y adjuntarlos al expediente sin más formalidad','Compartir los mensajes en el grupo del equipo de investigación para análisis colectivo inmediato','Elaborar un dictamen pericial digital que documente el procedimiento de extracción, herramientas certificadas, hash de verificación y hallazgos, garantizando la trazabilidad de la cadena de custodia digital','Borrar los mensajes cifrados porque no pueden ser leídos sin autorización judicial especial'],answer:2},

  {id:44,type:'mc',dim:'D',weight:1,
   text:'Al manejar bases de datos con información personal de personas investigadas, ¿cuál es el marco normativo principal que regula su protección?',
   options:['Solo el Código Nacional de Procedimientos Penales','La Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados y la Ley General de Transparencia y Acceso a la Información Pública','Únicamente los lineamientos internos de la SSyP','La Ley Federal de Archivos exclusivamente'],answer:1},

  {id:45,type:'mc',dim:'D',weight:2,
   scenario:'La División de Delitos Cibernéticos detecta una cuenta en redes sociales que coordina extorsiones mediante publicaciones codificadas. El equipo necesita recolectar evidencia sin alertar al operador.',
   text:'¿Cuál es el método más adecuado para documentar esta evidencia digital de fuente abierta preservando su integridad?',
   options:['Imprimir las pantallas y agregarlas al expediente físico sin más documentación','Solicitar directamente a la plataforma que elimine la cuenta para detener las extorsiones','Tomar capturas de pantalla informales y guardarlas en una carpeta compartida del equipo','Utilizar herramientas de preservación de evidencia web certificadas que registren metadatos, fecha/hora y hash de verificación, asegurando la trazabilidad de la evidencia'],answer:3},

  // ── SECCIÓN V · ÉTICA Y DERECHOS HUMANOS (5) ─────────────────────────────
  {sec:'V. Ética, Derechos Humanos y Competencias Actitudinales',sec_tag:'Ética · Valores Institucionales',sec_n:'05',
   id:46,type:'mc',dim:'E',weight:2,
   scenario:'Un analista de la Comisaría de Inteligencia Estratégica recibe, a través de un familiar, información no oficial que señala a un funcionario público como probable colaborador de una organización criminal. No puede verificarse por ninguna fuente institucional.',
   text:'¿Cuál es la conducta ética correcta en este caso?',
   options:['Registrar con el nivel de confiabilidad correspondiente e iniciar proceso de verificación cruzada antes de actuar o diseminar','Registrar como inteligencia verificada dado su potencial relevancia para la investigación','Ignorar la información por provenir de un canal informal no institucional','Compartirla de inmediato con todos los integrantes del equipo como medida preventiva'],answer:0},

  {id:47,type:'mc',dim:'E',weight:1,
   text:'¿Cuál de las siguientes afirmaciones sobre los derechos humanos en las actividades de inteligencia operacional es correcta?',
   options:['Pueden ser ponderados frente a la efectividad cuando el objetivo representa alto riesgo para la seguridad pública','Solo aplican durante operativos de campo, no en el trabajo de gabinete','Son obligaciones no derogables que deben observarse en todas las actividades de la SIO, sin excepción','Aplican únicamente si el investigado no cuenta con antecedentes penales previos'],answer:2},

  {id:48,type:'mc',dim:'E',weight:2,
   scenario:'Un investigador del Escuadrón Antiextorsión atiende a una víctima que ha tenido que relatar por tercera vez los hechos ante diferentes funcionarios, sin que nadie le haya informado del avance del caso ni sus derechos. La víctima muestra signos crecientes de angustia.',
   text:'¿Qué problema institucional refleja esta situación y cómo debe atenderse?',
   options:['Es un proceso normal; la víctima debe repetir su testimonio tantas veces como sea necesario para la investigación','El problema es solo administrativo; debe mejorarse el sistema de turnos de atención','La víctima debe ser remitida a psicología sin más acciones inmediatas del área investigadora','Refleja revictimización — la institución debe aplicar protocolos de atención centrados en la persona, informarle sus derechos, evitar relatos repetitivos innecesarios y coordinar servicios de apoyo'],answer:3},

  {id:49,type:'mc',dim:'E',weight:1,
   text:'¿Cuál es el fundamento normativo de la obligación de reserva sobre información de investigaciones que tiene todo el personal de la SIO?',
   options:['El Reglamento Interior de la SSyP y la naturaleza de personal de confianza de quienes trabajan en funciones de inteligencia','Es solo una norma de cortesía institucional sin fundamento legal específico','Únicamente el Código Penal Federal en materia de revelación de secretos','La Ley Federal de Archivos, aplicable exclusivamente a documentos físicos'],answer:0},

  {id:50,type:'mc',dim:'E',weight:2,
   scenario:'Durante un operativo de vigilancia aérea autorizado, el operador de drones obtiene imágenes de un domicilio privado no incluido en el mandamiento, pero donde se observan actividades sospechosas.',
   text:'¿Cuál es la actuación ética y jurídicamente correcta?',
   options:['Eliminar las imágenes de inmediato para proteger la privacidad de los ocupantes del domicilio','Utilizar las imágenes inmediatamente para iniciar una nueva línea de investigación sobre ese domicilio','Compartir las imágenes con otras áreas de la institución para obtener más contexto antes de decidir','Registrar y reportar el hallazgo al superior jerárquico y al MP; abstenerse de usar esas imágenes hasta obtener una nueva autorización legal que las ampare'],answer:3},
]

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function calcResults(answered: Record<number, number>): Results {
  let totalW = 0, totalScore = 0
  const dimW  = { A:0,B:0,C:0,D:0,E:0 } as Record<DimKey,number>
  const dimS  = { A:0,B:0,C:0,D:0,E:0 } as Record<DimKey,number>
  const dimT  = { A:0,B:0,C:0,D:0,E:0 } as Record<DimKey,number>
  const dimC  = { A:0,B:0,C:0,D:0,E:0 } as Record<DimKey,number>

  Q.forEach(q => {
    const w = q.weight ?? 1
    totalW   += w
    dimW[q.dim] += w
    dimT[q.dim] += 1
    if (answered[q.id] === q.answer) {
      totalScore  += w
      dimS[q.dim] += w
      dimC[q.dim] += 1
    }
  })

  const pct    = Math.round(totalScore / totalW * 100)
  const dimPct = {} as Record<DimKey,number>
  ;(Object.keys(dimW) as DimKey[]).forEach(d => {
    dimPct[d] = dimW[d] > 0 ? Math.round(dimS[d] / dimW[d] * 100) : 0
  })

  const strong = Object.values(dimPct).filter(v => v >= 65).length
  const classification =
    pct < 40 || dimPct['E'] < 30 ? 'no-apto' :
    pct >= 65 && strong >= 2     ? 'apto-esp' : 'apto-jr'

  const comMatch = COMISARIAS.map(c => {
    let s = 0, mx = 0
    ;(Object.keys(c.dims) as DimKey[]).forEach(d => {
      s  += (dimPct[d] ?? 0) * (c.dims as Record<DimKey,number>)[d]
      mx += 100               * (c.dims as Record<DimKey,number>)[d]
    })
    return { name: c.name, matchPct: Math.round(s / mx * 100) }
  }).sort((a,b) => b.matchPct - a.matchPct)

  return { pct, totalScore, totalW, dimPct, dimT, dimC, classification, comMatch }
}

async function sendToSheets(payload: Record<string, unknown>) {
  if (!SHEETS_URL) return
  try {
    await fetch(SHEETS_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    })
  } catch { /* silencioso */ }
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function EvaluacionSIO() {
  const [screen,   setScreen]   = useState<Screen>('login')
  const [passInput, setPassInput] = useState('')
  const [passError, setPassError] = useState(false)
  const [nombre,   setNombre]   = useState('')
  const [area,     setArea]     = useState('')
  const [answered, setAnswered] = useState<Record<number,number>>({})
  const [seconds,  setSeconds]  = useState(TIMER_SECS)
  const [results,  setResults]  = useState<Results | null>(null)
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const submitted = useRef(false)
  const secPrinted = useRef<Set<string>>(new Set())

  const areaLabel = AREAS.flatMap(g => g.options).find(o => o.value === area)?.label ?? area

  // ── TIMER ──────────────────────────────────────────────────────────────────
  const doSubmit = useCallback(async (ans: Record<number,number>) => {
    if (submitted.current) return
    submitted.current = true
    if (timerRef.current) clearInterval(timerRef.current)
    setScreen('sending')

    const r    = calcResults(ans)
    const now  = new Date()
    const used = Math.floor((TIMER_SECS - seconds) / 60)

    const payload: Record<string, unknown> = {
      timestamp:        now.toISOString(),
      fecha:            now.toLocaleDateString('es-MX'),
      hora:             now.toLocaleTimeString('es-MX'),
      nombre,
      area:             areaLabel,
      area_codigo:      area,
      pct_global:       r.pct,
      pct_A:            r.dimPct['A'],
      pct_B:            r.dimPct['B'],
      pct_C:            r.dimPct['C'],
      pct_D:            r.dimPct['D'],
      pct_E:            r.dimPct['E'],
      clasificacion:    r.classification,
      comisaria_match:  r.comMatch[0]?.name ?? '',
      tiempo_usado_min: used,
      timeout:          seconds <= 0 ? 'Sí' : 'No',
    }
    Q.forEach(q => {
      const idx = ans[q.id]
      payload[`p${q.id}`] = idx >= 0 ? LETTERS[idx] : 'SR'
    })

    await sendToSheets(payload)
    setResults(r)
    setScreen('result')
  }, [nombre, area, areaLabel, seconds])

  useEffect(() => {
    if (screen !== 'quiz') return
    timerRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(timerRef.current!)
          // rellenar sin responder
          setAnswered(prev => {
            const full = { ...prev }
            Q.forEach(q => { if (full[q.id] === undefined) full[q.id] = -1 })
            doSubmit(full)
            return full
          })
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [screen, doSubmit])

  // ── ACCESO ─────────────────────────────────────────────────────────────────
  function handleLogin() {
    if (passInput.trim() === ACCESS_PASS) {
      setPassError(false)
      setScreen('intro')
    } else {
      setPassError(true)
    }
  }

  // ── SELECCIÓN ──────────────────────────────────────────────────────────────
  function selectOption(qid: number, idx: number) {
    if (submitted.current) return
    setAnswered(prev => ({ ...prev, [qid]: idx }))
  }

  const done     = Object.keys(answered).length
  const total    = Q.length
  const pct      = Math.round(done / total * 100)
  const allDone  = done >= total
  const mm       = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss       = String(seconds % 60).padStart(2, '0')
  const warning  = seconds <= 300

  // timer display color
  const timerCls = warning
    ? 'bg-red-700 animate-pulse'
    : 'bg-[#0A3D5C]'

  // ── RENDER ─────────────────────────────────────────────────────────────────

  // LOGIN
  if (screen === 'login') return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A3D5C] to-[#1E5A7A] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-xs font-mono tracking-widest text-[#1a5fb4] uppercase mb-3">
            CONFIA · SSyP Guanajuato · SIO
          </p>
          <h1 className="text-3xl font-bold text-[#0A3D5C] leading-tight">
            Evaluación de<br />Competencias
          </h1>
          <p className="text-sm text-neutral-gray mt-3">
            Acceso restringido — personal autorizado
          </p>
        </div>

        <label className="block text-xs font-semibold text-neutral-gray uppercase tracking-wide mb-2">
          Clave de acceso
        </label>
        <input
          type="password"
          value={passInput}
          onChange={e => { setPassInput(e.target.value); setPassError(false) }}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          className={`w-full border-2 rounded-lg px-4 py-3 text-sm font-mono outline-none transition
            ${passError ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#0A3D5C]'}`}
          placeholder="••••••••••"
          autoComplete="off"
        />
        {passError && (
          <p className="text-red-600 text-xs mt-2">Clave incorrecta. Intenta de nuevo.</p>
        )}

        <button
          onClick={handleLogin}
          className="mt-5 w-full bg-[#0A3D5C] text-white py-3 rounded-lg font-semibold
            hover:bg-[#0a2245] transition active:scale-95"
        >
          Acceder
        </button>
      </div>
    </div>
  )

  // INTRO
  if (screen === 'intro') return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A3D5C] to-[#1E5A7A] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
        <p className="text-xs font-mono tracking-widest text-[#1a5fb4] uppercase mb-4">
          CONFIA · SSyP Guanajuato · SIO
        </p>
        <h1 className="text-3xl font-bold text-[#0A3D5C] leading-tight mb-3">
          Evaluación de<br />Competencias
        </h1>
        <p className="text-sm text-neutral-gray mb-6">
          Instrumento de evaluación de conocimientos y habilidades para el personal
          de la Subsecretaría de Inteligencia Operacional. Tiempo límite:{' '}
          <strong>60 minutos</strong>.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[['50','Preguntas'],['60 min','Tiempo límite'],['5','Dimensiones'],['Una sola vez','Intentos']].map(([v,l]) => (
            <div key={l} className="bg-neutral-light rounded-lg p-3">
              <span className="block text-xl font-bold text-[#0A3D5C]">{v}</span>
              <span className="text-xs font-mono text-neutral-gray uppercase tracking-wide">{l}</span>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-neutral-gray uppercase tracking-wide mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm
              outline-none focus:border-[#0A3D5C] transition"
            placeholder="Escribe tu nombre completo"
            autoComplete="off"
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-semibold text-neutral-gray uppercase tracking-wide mb-1">
            Área de adscripción actual
          </label>
          <select
            value={area}
            onChange={e => setArea(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm
              outline-none focus:border-[#0A3D5C] transition appearance-none bg-white"
          >
            <option value="">— Selecciona tu área —</option>
            {AREAS.map(g => (
              <optgroup key={g.group} label={g.group}>
                {g.options.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-3 text-xs text-amber-800 mb-6">
          Una vez iniciada la evaluación, el cronómetro no puede pausarse.
          Asegúrate de contar con 60 minutos disponibles antes de comenzar.
        </div>

        <button
          disabled={nombre.trim().length < 3 || !area}
          onClick={() => { setScreen('quiz'); secPrinted.current = new Set() }}
          className="w-full bg-[#0A3D5C] text-white py-3 rounded-lg font-semibold
            hover:bg-[#0a2245] transition disabled:opacity-40 disabled:cursor-not-allowed
            active:scale-95"
        >
          Iniciar evaluación
        </button>
      </div>
    </div>
  )

  // SENDING
  if (screen === 'sending') return (
    <div className="min-h-screen bg-[#0A3D5C] flex flex-col items-center justify-center gap-5 text-white">
      <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      <p className="font-mono text-sm tracking-widest uppercase">Registrando respuestas…</p>
    </div>
  )

  // RESULT
  if (screen === 'result' && results) {
    const r = results
    return (
      <div className="min-h-screen bg-neutral-light py-16 px-4">
        <div className="max-w-lg mx-auto">

          {/* Score header */}
          <div className="relative bg-[#0A3D5C] text-white rounded-2xl p-10 text-center mb-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a5fb4]/40 to-[#0a6e55]/30 pointer-events-none" />
            <p className="relative font-mono text-xs tracking-widest uppercase text-white/50 mb-3">
              EVALUACIÓN COMPLETADA · SIO · CONFIA GTO
            </p>
            <p className="relative text-7xl font-bold leading-none mb-1">{r.pct}%</p>
            <p className="relative font-mono text-xs text-white/50 mb-5">
              {r.totalScore} / {r.totalW} puntos ponderados
            </p>
            <p className="relative text-xl font-semibold">Evaluación finalizada</p>
            <p className="relative text-sm text-white/60 mt-1">
              Tus respuestas han sido registradas correctamente.
            </p>
          </div>

          {/* Dim breakdown */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(Object.keys(DIMS) as DimKey[]).map(d => {
              const dp  = r.dimPct[d]
              const col = DIM_COLORS[d]
              const lbl = dp >= 70 ? 'Sólido' : dp >= 50 ? 'Aceptable' : 'Área de oportunidad'
              const lc  = dp >= 70 ? '#0a6e55' : dp >= 50 ? '#92620a' : '#b01a2e'
              return (
                <div key={d} className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="font-mono text-[9px] tracking-widest uppercase text-neutral-gray mb-1">
                    {DIMS[d]}
                  </p>
                  <p className="text-2xl font-bold mb-2" style={{ color: col }}>{dp}%</p>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-1">
                    <div className="h-full rounded-full" style={{ width:`${dp}%`, background: col }} />
                  </div>
                  <p className="text-[10px] text-neutral-gray">
                    {r.dimC[d]}/{r.dimT[d]} correctas ·{' '}
                    <span style={{ color: lc }}>{lbl}</span>
                  </p>
                </div>
              )
            })}
          </div>

          {/* Mensaje neutro */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-sm text-neutral-gray leading-relaxed mb-6">
            <strong className="text-[#0A3D5C] block mb-2">Gracias por completar la evaluación.</strong>
            Tus resultados han sido registrados y serán revisados por el área correspondiente.
            Puedes cerrar esta ventana.
          </div>

          <button
            onClick={() => window.location.reload()}
            className="block mx-auto border-2 border-[#0A3D5C] text-[#0A3D5C] px-8 py-3
              rounded-lg text-sm font-semibold hover:bg-[#0A3D5C]/5 transition"
          >
            Cerrar evaluación
          </button>
        </div>
      </div>
    )
  }

  // QUIZ
  secPrinted.current = new Set()
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Topbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-2.5 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between font-mono text-[10px] text-neutral-gray mb-1">
            <span>{done} / {total} respondidas</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0A3D5C] to-[#0a6e55] transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div className={`flex flex-col items-center rounded-lg px-3 py-1.5 min-w-[72px] ${timerCls} transition-colors`}>
          <span className="font-mono text-white text-lg font-medium leading-none tracking-widest">
            {mm}:{ss}
          </span>
          <span className="font-mono text-white/50 text-[8px] uppercase tracking-widest mt-0.5">restante</span>
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {Q.map((q, idx) => {
          const showSec = q.sec && !secPrinted.current.has(q.sec)
          if (q.sec) secPrinted.current.add(q.sec)
          const color   = DIM_COLORS[q.dim]
          const chosen  = answered[q.id]

          return (
            <div key={q.id}>
              {showSec && (
                <div className="flex items-center gap-3 my-10">
                  <span className="font-serif text-2xl font-bold text-[#0A3D5C] opacity-30 leading-none">
                    {q.sec_n}
                  </span>
                  <div>
                    <p className="font-mono text-[9px] tracking-widest uppercase text-amber-700 mb-0.5">
                      {q.sec_tag}
                    </p>
                    <p className="font-semibold text-[#0A3D5C] text-sm">{q.sec}</p>
                  </div>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-xl p-5 mb-3">
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[9px] tracking-wide text-neutral-gray">
                    PREGUNTA {String(idx+1).padStart(2,'0')} / 50
                  </span>
                  <span
                    className="font-mono text-[8px] font-semibold px-2.5 py-0.5 rounded-full border"
                    style={{ color, borderColor: `${color}40`, background: `${color}10` }}
                  >
                    {DIMS[q.dim]}
                  </span>
                </div>

                {/* Scenario */}
                {q.scenario && (
                  <div className="bg-amber-50 border-l-3 border-amber-500 rounded-r-lg px-4 py-3 mb-3">
                    <p className="font-mono text-[8px] tracking-widest uppercase text-amber-700 mb-1">
                      📋 Caso práctico
                    </p>
                    <p className="text-xs italic text-amber-900 leading-relaxed">{q.scenario}</p>
                  </div>
                )}

                {/* Question */}
                <p className="text-sm leading-relaxed text-[#2C3E50] mb-4">{q.text}</p>

                {/* Options */}
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, i) => {
                    const sel = chosen === i
                    return (
                      <label
                        key={i}
                        onClick={() => selectOption(q.id, i)}
                        className={`flex items-start gap-3 px-3.5 py-3 rounded-lg border cursor-pointer
                          transition-all text-sm leading-snug select-none
                          ${sel
                            ? 'border-[#0A3D5C] bg-blue-50 text-[#0A3D5C]'
                            : 'border-gray-200 bg-gray-50 hover:border-[#0A3D5C]/40 hover:bg-blue-50/30 text-[#2C3E50]'
                          }`}
                      >
                        <span className={`font-mono text-xs font-semibold mt-0.5 flex-shrink-0
                          ${sel ? 'text-[#0A3D5C]' : 'text-neutral-gray'}`}>
                          {LETTERS[i]}
                        </span>
                        <span>{opt}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}

        {/* Submit */}
        <div className="text-center mt-10">
          <button
            disabled={!allDone}
            onClick={() => doSubmit(answered)}
            className="bg-[#0A3D5C] text-white px-14 py-4 rounded-xl font-semibold text-base
              hover:bg-[#0a2245] transition disabled:opacity-30 disabled:cursor-not-allowed
              active:scale-95"
          >
            Finalizar y ver resultado
          </button>
          <p className="text-xs text-neutral-gray mt-3">
            {allDone
              ? 'Todas las preguntas respondidas. Puedes finalizar cuando estés listo.'
              : `Faltan ${total - done} pregunta${total - done !== 1 ? 's' : ''} por responder.`
            }
          </p>
        </div>
      </div>
    </div>
  )
}
