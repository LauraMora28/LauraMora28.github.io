/* ==========================================================================
   Datos de la hoja de vida (genéricos).
   Edita SOLO este archivo: ambos formatos (ATS y visual) se generan desde aquí.
   ========================================================================== */
window.CV_DATA = {
  nombre: "Laura Morales Valencia",
  titulo: "Ingeniera informatica y Enfermera",
  foto: "https://img.magnific.com/vector-premium/desarrollador-software-vector-ilustracion-tecnologia-comunicacion-seguridad-cibernetica_1249867-5467.jpg?semt=ais_hybrid&w=740&q=80", // Opcional: ruta a una imagen (ej. "img/foto.jpg"). Vacío = iniciales.

  contacto: {
    email: "Lau.morales0728@gmail.com",
    telefono: "+57 3232862224",
    ubicacion: "Manizales, Colombia",
    linkedin: "",
    github: "github.com/andresgomez",
    web: ""
  },

  resumen:
    "Ingeniera informatica con más de 5 años de experiencia diseñando, construyendo y desplegando aplicaciones web escalables. " +
    "Especializado en JavaScript/TypeScript, React y Node.js, con experiencia sólida en arquitectura de microservicios, " +
    "servicios en la nube (AWS) y automatización CI/CD. Orientado a resultados, con enfoque en código limpio, " +
    "pruebas automatizadas y trabajo colaborativo en equipos ágiles.",

  /* Formato ATS: listas por categoría (texto plano). */
  habilidades: [
    { grupo: "Lenguajes", items: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL"] },
    { grupo: "Frontend", items: ["React", "Next.js", "Vue.js", "HTML5", "CSS3", "Sass", "Tailwind CSS", "Accesibilidad web (WCAG)"] },
    { grupo: "Backend", items: ["Node.js", "Express", "NestJS", "Spring Boot", "API REST", "GraphQL", "Microservicios"] },
    { grupo: "Bases de datos", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
    { grupo: "DevOps y nube", items: ["Docker", "Kubernetes", "AWS (EC2, S3, Lambda, RDS)", "GitHub Actions", "CI/CD", "Terraform"] },
    { grupo: "Calidad y metodologías", items: ["Jest", "Cypress", "TDD", "Git", "Scrum", "Kanban", "Jira"] }
  ],

  /* Formato visual: habilidades principales con nivel (0-100). */
  habilidadesClave: [
    { nombre: "JavaScript / TypeScript", nivel: 95 },
    { nombre: "React / Next.js", nivel: 92 },
    { nombre: "Node.js / NestJS", nivel: 88 },
    { nombre: "PostgreSQL / MongoDB", nivel: 84 },
    { nombre: "AWS / Docker", nivel: 80 },
    { nombre: "Python", nivel: 76 }
  ],

  experiencia: [
    {
      cargo: "Ingeniera informatica Senior",
      empresa: "TechNova Solutions",
      lugar: "Manizales, Colombia (remoto)",
      periodo: "Ene 2024 – Actualidad",
      logros: [
        "Lideré el rediseño de la plataforma de pagos en microservicios con Node.js y NestJS, reduciendo la latencia promedio en un 38 %.",
        "Implementé pipelines CI/CD con GitHub Actions y Docker, disminuyendo el tiempo de despliegue de 45 a 8 minutos.",
        "Mentoricé a 4 desarrolladores junior y establecí guías de revisión de código que redujeron los defectos en producción en un 30 %.",
        "Migré la infraestructura a AWS con Terraform, optimizando costos mensuales en un 22 %."
      ],
      stack: ["TypeScript", "NestJS", "React", "PostgreSQL", "AWS", "Docker"]
    },
    {
      cargo: "Desarrollador Full Stack",
      empresa: "Pixel & Code Studio",
      lugar: "Medellín, Colombia",
      periodo: "Mar 2021 – Dic 2023",
      logros: [
        "Desarrollé más de 15 aplicaciones web responsivas con React y Next.js para clientes de comercio electrónico y fintech.",
        "Diseñé APIs REST y GraphQL con Node.js que atendían más de 500.000 solicitudes diarias.",
        "Aumenté la cobertura de pruebas del 35 % al 85 % con Jest y Cypress, mejorando la estabilidad de los lanzamientos.",
        "Mejoré el rendimiento web (Core Web Vitals), elevando el puntaje de Lighthouse de 62 a 95."
      ],
      stack: ["JavaScript", "React", "Next.js", "Node.js", "GraphQL", "MongoDB"]
    },
    {
      cargo: "Desarrollador Web Junior",
      empresa: "DataBridge Colombia",
      lugar: "Bogotá, Colombia",
      periodo: "Jun 2019 – Feb 2021",
      logros: [
        "Construí módulos de panel administrativo con Vue.js y Spring Boot utilizados por más de 2.000 usuarios.",
        "Automaticé reportes con Python y SQL, ahorrando 15 horas semanales de trabajo manual al equipo de operaciones.",
        "Participé en ceremonias Scrum y en la documentación técnica de las APIs internas."
      ],
      stack: ["Vue.js", "Java", "Spring Boot", "MySQL", "Python"]
    }
  ],

  proyectos: [
    {
      nombre: "TaskFlow – Gestor de proyectos",
      descripcion: "Aplicación colaborativa tipo Kanban con tiempo real, autenticación JWT y notificaciones. Más de 1.200 usuarios activos.",
      stack: ["Next.js", "NestJS", "PostgreSQL", "WebSockets"],
      enlace: "github.com/andresgomez/taskflow"
    },
    {
      nombre: "ShopLite – E-commerce modular",
      descripcion: "Tienda en línea con carrito, pasarela de pagos y panel administrativo. Arquitectura de microservicios con Docker.",
      stack: ["React", "Node.js", "MongoDB", "Docker"],
      enlace: "github.com/andresgomez/shoplite"
    },
    {
      nombre: "DevMetrics – Panel de analítica",
      descripcion: "Dashboard open source para visualizar métricas de repositorios y pipelines, con más de 300 estrellas en GitHub.",
      stack: ["TypeScript", "D3.js", "Python", "AWS Lambda"],
      enlace: "github.com/andresgomez/devmetrics"
    }
  ],

  educacion: [
    {
      titulo: "Ingeniería de Sistemas y Computación",
      institucion: "Universidad Ejemplo",
      lugar: "Bogotá, Colombia",
      periodo: "2014 – 2019"
    },
    {
      titulo: "Especialización en Arquitectura de Software",
      institucion: "Instituto Tecnológico Ejemplo",
      lugar: "Virtual",
      periodo: "2022 – 2023"
    }
  ],

  certificaciones: [
    { nombre: "AWS Certified Developer – Associate", emisor: "Amazon Web Services", anio: "2023" },
    { nombre: "Certified Kubernetes Application Developer (CKAD)", emisor: "CNCF", anio: "2022" },
    { nombre: "Professional Scrum Master I (PSM I)", emisor: "Scrum.org", anio: "2021" }
  ],

  idiomas: [
    { idioma: "Español", nivel: "Nativo", pct: 100 },
    { idioma: "Inglés", nivel: "Avanzado (B2/C1)", pct: 82 }
  ],

  blandas: ["Comunicación asertiva", "Liderazgo técnico", "Resolución de problemas", "Trabajo en equipo", "Aprendizaje continuo"]
};
