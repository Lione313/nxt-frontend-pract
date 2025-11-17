# NXT-ABOGADOS-CASOS

![Next.js](https://img.shields.io/badge/Next.js-13-blue?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-green)

**NXT-ABOGADOS-CASOS** es un **sistema legal-tech** desarrollado con **Next.js 13 (App Router)**, **TypeScript** y **TailwindCSS**.  
Permite la gestión de **casos legales o expedientes**, con autenticación, CRUD de casos y visualización de información.

---

## 🛠 Tecnologías y librerías

- **Next.js 16** (App Router)  
- **React 18** con Hooks y Context API  
- **TypeScript**  
- **TailwindCSS** para estilos  
- **Axios** para consumo de APIs  
- **Lucide-React** para iconos  
- **CRUD completo de casos**  
- **Autenticación y rutas protegidas**  
- **Notificaciones (Toast)**  
- **Validaciones de formularios**  
- **Middleware para proteger rutas del dashboard**  
- **Favicon personalizado**  

---

## 🚀 Instalación y desarrollo local

### 1. Clonar el repositorio
```bash
git clone https://github.com/Lione313/nxt-frontend-pract.git
cd frontend-casos
2. Instalar dependencias
bash
Copiar código
npm install
# o
yarn install
# o
pnpm install
3. Configurar variables de entorno
Crear un archivo .env.local en la raíz del proyecto:

env

NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_ANOTHER_KEY=valor
4. Ejecutar en modo desarrollo


npm run dev
# o
yarn dev
# o
pnpm dev
Abrir en el navegador: http://localhost:3000

📦 Scripts disponibles
Comando	Descripción
dev	Inicia el servidor en modo desarrollo
build	Construye la aplicación para producción
start	Inicia la app en modo producción
lint	Ejecuta ESLint para revisar errores de código

🌐 Despliegue
Se recomienda usar Vercel:

Crear cuenta en Vercel

Conectar tu repositorio de GitHub/GitLab/Bitbucket

Configurar las variables de entorno en Vercel

Deploy automático al hacer push a main o master

Documentación oficial: Deploy Next.js

📝 Funcionalidades principales
Autenticación
Rutas protegidas bajo /dashboard

Redirección automática a /auth/login si no hay sesión activa

Layout separado para rutas de autenticación sin navbar ni sidebar

CRUD de casos
Listar casos: /dashboard/casos

Crear caso: /dashboard/casos/nuevo

Visualizar caso: /dashboard/casos/[id]

Editar caso: /dashboard/casos/[id]/editar

Eliminar caso: Modal de confirmación

Extras
Animaciones suaves con TailwindCSS (animate-fadeIn)

Hooks reutilizables: useCasos, useAuth, useToast

📁 Estructura del proyecto (Visual)
bash

frontend-casos/
├── public/                      # Archivos estáticos (favicon, imágenes)
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── app/                     # App Router
│   │   ├── (auth)/              # Rutas de autenticación
│   │   │   ├── login/page.tsx   # 🔓 Login
│   │   │   └── layout.tsx       # Layout auth (sin navbar/sidebar)
│   │   ├── (dashboard)/         # Rutas protegidas
│   │   │   ├── layout.tsx       # Layout dashboard (navbar + sidebar)
│   │   │   ├── dashboard/page.tsx # Dashboard principal
│   │   │   └── casos/           # CRUD de casos
│   │   │       ├── page.tsx       # 📋 Listar casos
│   │   │       ├── nuevo/page.tsx # ➕ Crear caso
│   │   │       └── [id]/          # Caso individual
│   │   │           ├── page.tsx       # 👁️ Ver caso
│   │   │           └── editar/page.tsx # ✏️ Editar caso
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page / Home
│   │   └── globals.css          # Estilos globales
│   ├── components/              # Componentes reutilizables
│   │   ├── ui/                  # Botones, Inputs, Modals
│   │   ├── auth/                # LoginForm, ProtectedRoute
│   │   ├── casos/               # CasoCard, CasosTable, CasoForm
│   │   └── layout/              # Navbar, Sidebar, Footer
│   ├── lib/                     # Lógica de negocio y helpers
│   │   ├── api/                 # Configuración Axios y endpoints
│   │   ├── auth/                # Context y utils de autenticación
│   │   └── utils/               # Helpers generales
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useAuth.ts           # Hook autenticación
│   │   ├── useCasos.ts          # Hook gestión de casos
│   │   └── useToast.ts          # Hook notificaciones
│   ├── types/                   # Definiciones TypeScript
│   │   ├── auth.types.ts
│   │   └── caso.types.ts
│   └── middleware.ts            # Middleware Next.js
├── .env.local                   # Variables de entorno
├── .eslintrc.json               # Configuración ESLint
├── next.config.js               # Configuración Next.js
├── package.json                 # Dependencias y scripts
├── tailwind.config.ts           # Config TailwindCSS
├── tsconfig.json                # Config TypeScript
└── README.md                    # Documentación
🔄 Flujo de la aplicación
mermaid
Copiar código
flowchart TD
    A[Landing Page / Home] -->|No sesión| B(Login)
    A -->|Sesión activa| C(Dashboard)
    C --> D[Listar Casos]
    D --> E[Ver Caso]
    D --> F[Editar Caso]
    D --> G[Crear Caso]
    D --> H[Eliminar Caso]
Este diagrama muestra cómo un usuario navega:

Si no está autenticado, va a login

Si inicia sesión, puede acceder al dashboard y al CRUD de casos

👨 Autor
Dilan Gutierrez