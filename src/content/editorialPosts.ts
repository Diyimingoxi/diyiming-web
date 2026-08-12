import type { Post, PortableTextBlock } from "../lib/sanity";

const span = (key: string, text: string, marks: string[] = []) => ({
  _type: "span" as const,
  _key: key,
  text,
  marks
});

const block = (key: string, text: string, style = "normal"): PortableTextBlock => ({
  _type: "block",
  _key: key,
  style,
  children: [span(`${key}-span`, text)]
});

const bullet = (key: string, text: string): PortableTextBlock => ({
  _type: "block",
  _key: key,
  style: "normal",
  listItem: "bullet",
  level: 1,
  children: [span(`${key}-span`, text)]
});

export const editorialPosts: Post[] = [
  {
    title: "Las cuatro fases de una Obra por Impuestos: de la priorización al cierre",
    slug: "cuatro-fases-obras-por-impuestos",
    excerpt: "Una guía clara para entender cómo una necesidad pública se convierte en una inversión priorizada, seleccionada, ejecutada y certificada.",
    publishedAt: "2026-08-12T14:00:00-05:00",
    imageUrl: "/assets/images/blog/fases-oxi-diyiming.webp",
    imageAlt: "Recorrido de las cuatro fases de una Obra por Impuestos",
    coverUrl: "/assets/images/blog/fases-oxi-diyiming.webp",
    coverAlt: "Recorrido de las cuatro fases de una Obra por Impuestos",
    author: { name: "Diyiming Consultores", role: "Especialistas en Obras por Impuestos" },
    body: [
      block("fases-intro-1", "Una Obra por Impuestos no comienza en la construcción. Antes de llegar a la ejecución existe un recorrido técnico, presupuestal, legal y competitivo que permite convertir una necesidad pública en una inversión viable. Entender ese recorrido ayuda a anticipar riesgos, ordenar responsabilidades y tomar mejores decisiones."),
      block("fases-intro-2", "Aunque cada proyecto tiene particularidades, el proceso puede comprenderse a través de cuatro grandes fases conectadas: priorización, actos previos, selección y ejecución."),

      block("fases-h2-1", "1. Priorización: elegir inversiones con impacto y viabilidad", "h2"),
      block("fases-p1", "La entidad pública identifica las brechas que necesita atender y evalúa qué inversiones responden mejor a sus objetivos de desarrollo. No se trata solo de escoger una obra visible: la decisión debe considerar impacto social, alineamiento con los planes institucionales, sostenibilidad y posibilidades reales de financiamiento y ejecución."),
      bullet("fases-b1", "Identificar necesidades y brechas de infraestructura o servicios públicos."),
      bullet("fases-b2", "Evaluar la pertinencia técnica, social y económica de las alternativas."),
      bullet("fases-b3", "Aprobar y publicar la lista de proyectos priorizados conforme al marco aplicable."),
      block("fases-p2", "Una priorización bien sustentada reduce cambios posteriores y crea una base común para la entidad pública, la empresa privada y los equipos técnicos."),

      block("fases-h2-2", "2. Actos previos: preparar un proceso sólido", "h2"),
      block("fases-p3", "Con el proyecto priorizado, la entidad pública organiza las condiciones necesarias para convocar el proceso. En esta etapa se conforma el comité especial, se asegura la disponibilidad presupuestal o el compromiso de priorización de recursos y se elaboran las bases."),
      block("fases-p4", "La calidad de los actos previos influye directamente en la transparencia, la competencia y la velocidad del proceso. Bases claras, responsabilidades definidas y documentación consistente evitan observaciones que podrían retrasar la selección."),

      block("fases-h2-3", "3. Selección: elegir al aliado adecuado", "h2"),
      block("fases-p5", "La convocatoria abre un proceso competitivo para seleccionar a la empresa privada que financiará y/o ejecutará la inversión y, cuando corresponda, a la entidad privada supervisora. Las propuestas se evalúan con criterios establecidos previamente y bajo principios de transparencia, libre competencia e igualdad de trato."),
      bullet("fases-b4", "Publicación de la convocatoria y presentación de propuestas."),
      bullet("fases-b5", "Evaluación técnica, económica y de requisitos de calificación."),
      bullet("fases-b6", "Otorgamiento y consentimiento de la buena pro."),
      bullet("fases-b7", "Suscripción del convenio de inversión y de los contratos vinculados."),
      block("fases-p6", "El mejor resultado no es únicamente adjudicar: es seleccionar una combinación de capacidades técnicas, financieras y de gestión que pueda sostener el proyecto hasta su cierre."),

      block("fases-h2-4", "4. Ejecución: convertir el expediente en resultados", "h2"),
      block("fases-p7", "La fase de ejecución comprende la elaboración o aprobación del expediente técnico, la ejecución física, la supervisión, la recepción, la liquidación y la emisión de los certificados de inversión que correspondan. Aquí convergen el control de alcance, calidad, costos, plazos y obligaciones documentales."),
      bullet("fases-b8", "Asegurar que el expediente técnico sea consistente con el alcance aprobado."),
      bullet("fases-b9", "Mantener trazabilidad de avances, decisiones y valorizaciones."),
      bullet("fases-b10", "Coordinar oportunamente a entidad pública, empresa privada, ejecutor y supervisor."),
      bullet("fases-b11", "Preparar la recepción, liquidación, certificación y cierre desde etapas tempranas."),

      block("fases-h2-5", "La gestión integral conecta las cuatro fases", "h2"),
      block("fases-p8", "Los principales problemas aparecen cuando cada fase se gestiona como un trámite aislado. Una mirada integral permite que las decisiones de priorización sean coherentes con la estrategia de selección y que la ejecución produzca la evidencia necesaria para una certificación y un cierre ordenados."),
      block("fases-p9", "Diyiming acompaña este recorrido articulando los componentes técnicos, financieros, legales y de gestión para que cada decisión prepare correctamente la siguiente etapa."),

      block("fases-h2-6", "Antes de avanzar, conviene validar", "h2"),
      bullet("fases-b12", "¿La necesidad pública y el resultado esperado están claramente definidos?"),
      bullet("fases-b13", "¿La inversión cuenta con sustento técnico y una ruta presupuestal viable?"),
      bullet("fases-b14", "¿Las bases y responsabilidades permiten una selección competitiva?"),
      bullet("fases-b15", "¿Existe un sistema de seguimiento que conecte avance físico, financiero y documental?"),
      block("fases-close", "Responder estas preguntas temprano ayuda a proteger el propósito de la inversión: cerrar brechas con infraestructura y servicios públicos que funcionen y generen valor para la ciudadanía.")
    ]
  },
  {
    title: "Cinco decisiones críticas para convertir una oportunidad OxI en una inversión ejecutable",
    slug: "decisiones-criticas-proyecto-oxi-ejecutable",
    excerpt: "Los factores que deben alinearse antes de movilizar recursos: proyecto, presupuesto, capacidad técnica, aliados y ruta de certificación.",
    publishedAt: "2026-08-12T13:00:00-05:00",
    imageUrl: "/assets/images/blog/decisiones-oxi-diyiming.webp",
    imageAlt: "Decisiones estratégicas para estructurar una inversión mediante Obras por Impuestos",
    coverUrl: "/assets/images/blog/decisiones-oxi-diyiming.webp",
    coverAlt: "Decisiones estratégicas para estructurar una inversión mediante Obras por Impuestos",
    author: { name: "Diyiming Consultores", role: "Estrategia y gestión OxI" },
    body: [
      block("dec-intro-1", "Una oportunidad de Obras por Impuestos puede resultar atractiva por su impacto, ubicación o respaldo institucional. Sin embargo, para transformarla en una inversión ejecutable es necesario alinear varias decisiones que suelen avanzar a ritmos distintos."),
      block("dec-intro-2", "El reto no es acumular documentos, sino construir una ruta coherente entre el proyecto, los recursos, los actores y el mecanismo de recuperación de la inversión."),

      block("dec-h2-1", "1. Confirmar que existe un proyecto viable, no solo una buena idea", "h2"),
      block("dec-p1", "La necesidad pública debe traducirse en una alternativa técnicamente consistente. El perfil, la ficha técnica o el expediente que corresponda deben definir con claridad el problema, la población beneficiaria, el alcance, los costos y los resultados esperados."),
      block("dec-p2", "Antes de promover una oportunidad conviene revisar su registro, nivel de madurez, consistencia con Invierte.pe y posibles restricciones prediales, ambientales, operativas o institucionales."),

      block("dec-h2-2", "2. Validar la disponibilidad y trazabilidad de los recursos", "h2"),
      block("dec-p3", "Una inversión necesita una ruta presupuestal verificable. La priorización, la certificación o el compromiso correspondiente deben estar articulados con el cronograma del proceso y con las obligaciones que asumirá cada actor."),
      block("dec-p4", "Esta revisión permite evitar que un proyecto técnicamente atractivo se detenga por falta de sincronización entre decisiones institucionales y disponibilidad financiera."),

      block("dec-h2-3", "3. Diseñar una estructura técnica y contractual ejecutable", "h2"),
      block("dec-p5", "Las bases, el convenio y los documentos técnicos deben contar la misma historia: qué se ejecutará, bajo qué estándares, quién asumirá cada responsabilidad, cómo se controlarán los cambios y qué evidencia se requerirá para reconocer los avances."),
      bullet("dec-b1", "Definir alcance, entregables y criterios de aceptación sin ambigüedades."),
      bullet("dec-b2", "Asignar riesgos al actor que tenga capacidad real para gestionarlos."),
      bullet("dec-b3", "Alinear cronograma técnico, hitos de supervisión y ruta de certificación."),

      block("dec-h2-4", "4. Alinear a los actores antes de la convocatoria", "h2"),
      block("dec-p6", "Entidad pública, empresa privada, ejecutor, supervisor y asesores cumplen funciones diferentes, pero el proyecto solo avanza cuando sus decisiones están coordinadas. La gobernanza debe establecer responsables, canales de escalamiento y tiempos de respuesta."),
      block("dec-p7", "Un aliado privado evalúa no solo el impacto de la inversión, sino también la calidad de la información disponible, la predictibilidad del proceso y la capacidad del equipo público para conducirlo."),

      block("dec-h2-5", "5. Preparar desde el inicio la certificación y el cierre", "h2"),
      block("dec-p8", "La emisión de los certificados de inversión no debe tratarse como un asunto posterior a la obra. El orden documental, la correspondencia entre avance físico y financiero, las aprobaciones y la recepción deben planificarse desde el diseño de la operación."),
      block("dec-p9", "Cuando esta ruta se prepara temprano, la ejecución conserva trazabilidad y el cierre deja de depender de reconstruir información al final."),

      block("dec-h2-6", "Una oportunidad sólida combina cinco señales", "h2"),
      bullet("dec-b4", "Resuelve una brecha relevante y cuenta con respaldo institucional."),
      bullet("dec-b5", "Tiene documentación técnica suficiente para decidir."),
      bullet("dec-b6", "Dispone de una ruta presupuestal y de certificación clara."),
      bullet("dec-b7", "Puede convocar capacidades privadas adecuadas para el reto."),
      bullet("dec-b8", "Cuenta con una gobernanza capaz de sostener la ejecución y el cierre."),
      block("dec-close", "Diyiming integra estas variables para ayudar a entidades públicas y empresas privadas a evaluar oportunidades con criterio, anticipar riesgos y estructurar inversiones que puedan avanzar con solidez.")
    ]
  }
];
