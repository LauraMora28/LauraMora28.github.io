/* ==========================================================================
   Datos de la hoja de vida (genéricos).
   Edita SOLO este archivo: ambos formatos (ATS y visual) se generan desde aquí.
   ========================================================================== */
window.CV_DATA = {
  nombre: "Laura Morales Valencia",
  titulo: "Ingeniera informatica",
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
    "Soy desarrolladora web junior en formación con enfoque en el aprendizaje continuo y en la creación de soluciones digitales bien estructuradas. A continuación encontrará información adicional y mis datos de contacto si desea ampliar detalles sobre mi perfil profesional",

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
    { nombre: "JavaScript / TypeScript", nivel: 20 },
    { nombre: "React / Next.js", nivel: 5 },
    { nombre: "Node.js / NestJS", nivel: 5 },
    { nombre: "PostgreSQL / MongoDB", nivel: 5 },
    { nombre: "AWS / Docker", nivel: 5 },
    { nombre: "Python", nivel: 80 }
  ],

  experiencia: [],

  proyectos: [],

  certificaciones: [],

  educacion: [
    {
      titulo: "Pregrado Ingenieria Informatica",
      institucion: "Universidad de Caldas",
      lugar: "Manizales, Colombia",
      periodo: "2026"
    },
    {
      titulo: "Bachiller academico",
      institucion: "Institucion Educativa Maria Goreti",
      lugar: "Manizales, Caldas",
      periodo: "2020"
    }
  ],

  idiomas: [
    { idioma: "Español", nivel: "Nativo", pct: 100 },
    { idioma: "Inglés", nivel: "Avanzado (B1)", pct: 82 }
  ],

  blandas: ["Comunicación asertiva", "Liderazgo técnico", "Resolución de problemas", "Trabajo en equipo", "Aprendizaje continuo"]
};
