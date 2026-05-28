# AI AutomaticSocial Studio

¡Bienvenido a **AI AutomaticSocial Studio**! Un entorno de desarrollo personal automatizado e inteligente diseñado para ayudarte a crear, optimizar y planificar contenido de primer nivel para redes sociales. 

Esta plataforma unifica una potente interfaz web interactiva construida sobre **Next.js** y **React** junto a un motor de automatización ultra-flexible impulsado por **n8n** e Inteligencia Artificial (**Google Gemini**).

---

## Arquitectura del Monorepo

Para facilitar el desarrollo y el control de versiones, el proyecto está ordenado como un repositorio unificado:

*   **[`web/`](file:///h:/Proyecto%20Personales/Proyectos/Web_Generador%20de%20contenido/web)**: Aplicación Frontend/Backend en Next.js (App Router, TailwindCSS, TypeScript).
*   **[`n8n/`](file:///h:/Proyecto%20Personales/Proyectos/Web_Generador%20de%20contenido/n8n)**: Workflows y flujos de automatización listos para ser importados en tu servidor n8n.
*   **[`DOCUMENTATION.md`](file:///h:/Proyecto%20Personales/Proyectos/Web_Generador%20de%20contenido/DOCUMENTATION.md)**: Explicación a fondo del flujo de datos, seguridad y diseño técnico.

---

## Guía de Inicio Rápido

Sigue estos sencillos pasos para levantar el entorno completo localmente:

### 1. Requisitos Previos
*   **Node.js** v18 o superior.
*   Una instancia activa de **n8n** (ya sea en la nube, local o mediante Docker).
*   Una clave API gratuita de **Google Gemini** (puedes obtenerla en [Google AI Studio](https://aistudio.google.com/)).

### 2. Configuración de la Web (Next.js)
1. Entra al directorio `web/` e instala las dependencias:
   ```bash
   cd web
   npm install
   ```
2. Crea el archivo de variables de entorno `.env.local` en la raíz de la carpeta `web/`:
   ```env
   GEMINI_API_KEY=tu_api_key_de_gemini
   N8N_IMAGE_WEBHOOK_URL=http://tu-n8n-url/webhook/generar_imagen
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación web en funcionamiento.

### 3. Configuración de los flujos en n8n
1. Accede a tu panel de **n8n**.
2. Ve a la sección **Workflows** y haz clic en **Add Workflow**.
3. Importa el archivo [`n8n/Crear imagen o video.json`](file:///h:/Proyecto%20Personales/Proyectos/Web_Generador%20de%20contenido/n8n/Crear%20imagen%20o%20video.json) (puedes arrastrarlo o copiar su contenido).
4. Vincula tus credenciales de IA de Google y activa el flujo.
5. Copia la URL del Webhook generado por n8n en tu `.env.local` bajo `N8N_IMAGE_WEBHOOK_URL`.

---

## Características de Diseño
*   **Tema Oscuro Premium:** Con acentos vibrantes de color violeta y azul neón.
*   **Glassmorphism:** Paneles traslúcidos con efectos de desenfoque de fondo dinámicos (`backdrop-filter`).
*   **Copiloto de Creación:** Chat lateral con auto-redimensionamiento y previsualización de imágenes adjuntas en tiempo real.
*   **Canvas Interactivo:** Panel central que muestra las previsualizaciones de los posts generados con hashtags en cajas interactivas y botones de descarga directa.

---

## Seguridad
*   Las llamadas a la API de Gemini y las automatizaciones con n8n se realizan estrictamente del lado del servidor (`web/src/app/api/...`) para proteger tus API Keys. Nunca se exponen al cliente.

---

Diseñado con dedicación para automatizar de forma elegante la creación de contenido inteligente. 
