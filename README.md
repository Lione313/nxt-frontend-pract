# NXT-ABOGADOS-CASOS

Este proyecto es un **sistema legal-tech** desarrollado con **Next.js 13 (App Router)**, **TypeScript** y **TailwindCSS**. Permite la gestión de **casos legales o expedientes**, con autenticación, CRUD de casos y visualización de información.

---

📂 Estructura del proyecto
frontend-casos/
├── public/                  # Archivos estáticos (imágenes, favicons)
│
├── src/
│   ├── app/                 # Rutas de la aplicación (App Router)
│   │   ├── (auth)/          # Rutas de autenticación
│   │   │   ├── login/
│   │   │   │   └── page.tsx     # Página de login
│   │   │   └── layout.tsx       # Layout sin navbar
│   │   │
│   │   ├── (dashboard)/     # Rutas protegidas del dashboard
│   │   │   ├── layout.tsx       # Layout con navbar y sidebar
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx     # Página principal del dashboard
│   │   │   └── casos/
│   │   │       ├── page.tsx       # Lista de casos
│   │   │       ├── nuevo/
│   │   │       │   └── page.tsx   # Crear un caso
│   │   │       └── [id]/
│   │   │           ├── page.tsx        # Vista de un caso (preview)
│   │   │           └── editar/
│   │   │               └── page.tsx   # Editar un caso
│   │   │
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Landing page
│   │   └── globals.css      # Estilos globales
│   │
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/              # Componentes genéricos (Botones, Inputs, Modals)
│   │   ├── auth/            # Componentes de autenticación (LoginForm, ProtectedRoute)
│   │   ├── casos/           # Componentes específicos de casos (CasosTable, CasoForm)
│   │   └── layout/          # Navbar, Sidebar, Footer
│   │
│   ├── lib/                 # Lógica de negocio y utilidades
│   │   ├── api/             # Conexión con la API (axios, endpoints auth/casos)
│   │   ├── auth/            # Contexto de autenticación y helpers
│   │   └── utils/           # Validadores, formateadores, helpers generales
│   │
│   ├── hooks/               # Custom hooks (useAuth, useCasos, useToast)
│   ├── types/               # Tipos TypeScript
│   └── middleware.ts        # Middleware para proteger rutas
│
├── .env.local               # Variables de entorno
├── .eslintrc.json           # Configuración de ESLint
├── next.config.js           # Configuración de Next.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md



---

## 🛠 Tecnologías y librerías

- **Next.js 16** (App Router)
- **React 18** con hooks y context API
- **TypeScript**
- **TailwindCSS** para estilos
- **Axios** para consumo de API
- **Lucide-React** para iconos
- **CRUD completo de casos**
- **Autenticación y rutas protegidas**
- **Notificaciones (Toast)**
- **Validaciones de formularios**
- **Middleware para proteger rutas del dashboard**
- **Favicon personalizado** en la pestaña del navegador

---

## 🚀 Instalación y desarrollo local

1. Clonar el repositorio:

```bash
git clone <https://github.com/Lione313/nxt-frontend-pract.git>
cd frontend-casos
Instalar dependencias:


npm install
# o
yarn install
# o
pnpm install
Configurar variables de entorno (.env.local):

ini

NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_ANOTHER_KEY=valor
Ejecutar en modo desarrollo:

bash
Copiar código
npm run dev
# o
yarn dev
# o
pnpm dev
Luego abrir en el navegador: http://localhost:3000

📦 Scripts disponibles
dev → Inicia el servidor en modo desarrollo

build → Construye la aplicación para producción

start → Inicia la app en modo producción

lint → Ejecuta ESLint para revisar errores de código

🌐 Despliegue
La forma recomendada de desplegar es mediante Vercel:

Crear cuenta en Vercel

Conectar tu repositorio de GitHub/GitLab/Bitbucket

Configurar variables de entorno en Vercel

Hacer deploy automático al hacer push a main o master

Documentación oficial: Deploy Next.js

📝 Notas adicionales
La ruta raíz / redirige automáticamente a /auth/login si no hay sesión activa.

Todas las rutas bajo (dashboard) están protegidas mediante middleware y context de autenticación.

Las rutas (auth) tienen un layout separado sin navbar ni sidebar.

CRUD de casos incluye:

Listar casos (/dashboard/casos)

Crear casos (/dashboard/casos/nuevo)

Visualizar caso (/dashboard/casos/[id])

Editar caso (/dashboard/casos/[id]/editar)

Eliminar casos (modal de confirmación)

Se utiliza TailwindCSS con animaciones suaves (animate-fadeIn) en componentes principales.

Todos los hooks (useCasos, useAuth, useToast) están diseñados para ser reutilizables en distintos componentes.



# Autor 
Dilan Gutierrez