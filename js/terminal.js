/* ==========================================================================
   UNAI IBABE - PORTFOLIO INTERACTIVE TERMINAL (terminal.js)
   Python-styled Terminal Emulator supporting Dynamic Translations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const inputRow = document.getElementById('terminal-input-row');
  
  if (!terminalInput || !terminalBody) return;

  // Retrieve current active language from DOM
  let activeLang = document.documentElement.getAttribute('lang') || 'en';

  // Listen to the custom language switch event from app.js
  document.addEventListener('langChanged', (e) => {
    activeLang = e.detail.lang;
    printLanguageSwitchNotice();
  });

  // Dictionary of translation responses for the terminal
  const responses = {
    en: {
      welcome: "# Welcome! Type 'help' to see all available commands.",
      unknown: "NameError: name '{cmd}' is not defined. Type 'help' to view available operations.",
      help: `Available commands:
  - <b>help</b>        : Show this list
  - <b>about</b>       : Learn about Unai's backend & VFX journey
  - <b>skills</b>      : Query technical skills and tech stack
  - <b>projects</b>    : Detail highlight projects
  - <b>experience</b>  : List blockbuster Hollywood VFX filmography
  - <b>contact</b>     : Fetch professional links (LinkedIn, GitHub)
  - <b>clear</b>       : Empty the console output`,
      about: `<b>Unai Ibabe - Junior Python & Full-Stack Developer</b>
-------------------------------------------------------------------
A highly analytical professional with 5+ years of experience 
scripting automation pipelines for Oscar-nominated movies 
at El Ranchito.

Focused on Python software systems and React full-stack applications.
- Specialized in workflow scripts, front-end visual elements & clean logic.
- Core knowledge in FastAPI, Java (OOP) and Relational SQL Databases.`,
      skills: `<b>Technical Stack Query Output:</b>
------------------------------------
- <b>Core Stack</b>      : Python, React, JavaScript, HTML5 / CSS3
- <b>Backend & APIs</b>  : FastAPI, REST APIs, WebSockets
- <b>Secondary Tech</b>  : Relational DBs (SQL), Java (OOP)
- <b>Tools & Libraries</b>: Git/GitHub, OpenCV, PySide / PyQt
- <b>AI Dev Systems</b>  : Antigravity, Claude, Codex, Prompt Engineering`,
      projects: `<b>Featured Software Engineering Projects:</b>
--------------------------------------------
1. <b>AI AutomaticSocial Studio</b>
   - <i>Stack:</i> Next.js + React + TailwindCSS + n8n + Google Gemini (AI)
   - <i>Summary:</i> Intelligent social content automation workspace with
     a glassmorphic canvas, generation previews and n8n pipelines.
     
2. <b>Pocket Battle Online</b>
   - <i>Stack:</i> React + FastAPI + WebRTC + Socket.IO + OpenCV + Gemini 1.5
   - <i>Summary:</i> Webcam-based Pokémon TCG digitalizer syncing state via 
     WebSockets and tracking physical cards via computer vision & AI.
     
3. <b>Desktop Management App</b>
   - <i>Stack:</i> Java (OOP) + SQL Relational Database
   - <i>Summary:</i> Enterprise desktop manager backed by highly-optimized
     relational SQL schemas and clean OOP modular structures.`,
      experience: `<b>AAA Film Production Automation Credits:</b>
--------------------------------------------
- <b>Society of the Snow</b> [Oscar Nominated VFX] (2023-2024)
  <i>Tooling:</i> Scaled complex crowd pipelines under tight deadlines.
- <b>A Knight of the Seven Kingdoms</b> [HBO Max] (2024-2025)
  <i>Tooling:</i> Speed optimized layout rendering placement tools.
- <b>3 Body Problem</b> [Netflix] (2023-2024)
  <i>Tooling:</i> Automated population placement scripts inside pipelines.
- <b>Halo Season 2</b> [Paramount+] (2022-2023)
  <i>Tooling:</i> Engineered Python automation scripts.`,
      contact: `<b>Professional Contact Anchors:</b>
-----------------------------------
- <b>LinkedIn</b> : https://www.linkedin.com/in/unai-ibabe/
- <b>GitHub</b>   : http://github.com/unaibabe
- <b>Resume</b>   : https://docs.google.com/document/d/... (Link above)
- <b>Email</b>    : ibabe92@gmail.com`,
      langSwitch: `\n[System info: Terminal environment language set to English]`
    },
    es: {
      welcome: "# ¡Bienvenido! Escribe 'help' para ver los comandos.",
      unknown: "NameError: name '{cmd}' is not defined. Escribe 'help' para ver las opciones disponibles.",
      help: `Comandos disponibles:
  - <b>help</b>        : Mostrar esta lista de comandos
  - <b>about</b>       : Conoce más sobre Unai y su trayectoria
  - <b>skills</b>      : Ver mi stack tecnológico y habilidades
  - <b>projects</b>    : Conoce mis proyectos destacados de software
  - <b>experience</b>  : Ver mi filmografía en superproducciones VFX AAA
  - <b>contact</b>     : Obtener enlaces (LinkedIn, GitHub, Email, CV)
  - <b>clear</b>       : Limpiar la pantalla de la consola`,
      about: `<b>Unai Ibabe - Desarrollador Junior Python & Full-Stack</b>
-------------------------------------------------------------------
Profesional de perfil altamente analítico con más de 5 años 
de experiencia desarrollando scripts de automatización para 
películas nominadas al Oscar en El Ranchito.

Enfoque en desarrollo de software con Python y aplicaciones full-stack con React.
- Especializado en scripts de flujos de trabajo, front-end interactivo y código limpio.
- Conocimientos sólidos de bases de datos relacionales (SQL) y Java (POO).`,
      skills: `<b>Consulta de Habilidades Técnicas:</b>
------------------------------------
- <b>Stack Principal</b> : Python, React, JavaScript, HTML5 / CSS3
- <b>Backend & APIs</b>   : FastAPI, REST APIs, WebSockets
- <b>Secundarios</b>      : Bases de Datos SQL, Java (POO)
- <b>Herramientas</b>     : Git/GitHub, OpenCV, PySide / PyQt
- <b>Sistemas de IA</b>   : Antigravity, Claude, Codex, Prompt Engineering`,
      projects: `<b>Proyectos de Software Destacados:</b>
--------------------------------------------
1. <b>AI AutomaticSocial Studio</b>
   - <i>Stack:</i> Next.js + React + TailwindCSS + n8n + Google Gemini (IA)
   - <i>Resumen:</i> Plataforma inteligente de automatización de contenidos
     con lienzo glassmorphic, previsualización de posts y flujos n8n.
     
2. <b>Pocket Battle Online</b>
   - <i>Stack:</i> React + FastAPI + WebRTC + Socket.IO + OpenCV + Gemini 1.5
   - <i>Resumen:</i> Digitalizador de Pokémon TCG por webcam en tiempo real
     que rastrea cartas con visión artificial e IA con base PostgreSQL JSONB.
     
3. <b>Desktop Management App</b>
   - <i>Stack:</i> Java (POO) + Base de Datos SQL Relacional
   - <i>Resumen:</i> Gestor empresarial robusto con esquemas SQL de alto
     rendimiento, optimización de índices y arquitectura modular POO.`,
      experience: `<b>Créditos de Automatización en Cine AAA:</b>
--------------------------------------------
- <b>La Sociedad de la Nieve</b> [Nominada al Oscar] (2023-2024)
  <i>Herramientas:</i> Optimizaciones de pipeline lógicos a gran escala.
- <b>A Knight of the Seven Kingdoms</b> [HBO Max] (2024-2025)
  <i>Herramientas:</i> Automatizaciones para renderizados de multitudes.
- <b>El Problema de los 3 Cuerpos</b> [Netflix] (2023-2024)
  <i>Herramientas:</i> Scripts procedurales de población virtual.
- <b>Halo Temporada 2</b> [Paramount+] (2022-2023)
  <i>Herramientas:</i> Herramientas de script en Python para simulaciones.`,
      contact: `<b>Enlaces de Contacto Profesional:</b>
-----------------------------------
- <b>LinkedIn</b> : https://www.linkedin.com/in/unai-ibabe/
- <b>GitHub</b>   : http://github.com/unaibabe
- <b>CV</b>       : https://docs.google.com/document/d/... (Enlace superior)
- <b>Email</b>    : ibabe92@gmail.com`,
      langSwitch: `\n[Info del sistema: Entorno de terminal configurado en Español]`
    }
  };

  // Handle command execution
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const commandText = terminalInput.value.trim();
      if (commandText === '') return;

      executeCommand(commandText);
      terminalInput.value = '';
    }
  });

  // Make terminal window clickable to focus input
  const terminalWindow = document.getElementById('terminal');
  if (terminalWindow) {
    terminalWindow.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

  function executeCommand(cmd) {
    const cleanCmd = cmd.toLowerCase();
    
    // Add user command to history output
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="terminal-prompt">>>></span> ${escapeHTML(cmd)}`;
    terminalBody.insertBefore(userLine, inputRow);

    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line terminal-output';

    // Command handling router
    if (cleanCmd === 'clear') {
      // Clear lines except the prompt
      const lines = terminalBody.querySelectorAll('.terminal-line');
      lines.forEach(line => line.remove());
      
      const welcomeLine = document.createElement('div');
      welcomeLine.className = 'terminal-line';
      welcomeLine.textContent = responses[activeLang].welcome;
      terminalBody.insertBefore(welcomeLine, inputRow);
      
      scrollTerminal();
      return;
    }

    if (cleanCmd === 'help') {
      outputLine.innerHTML = responses[activeLang].help;
    } 
    else if (cleanCmd === 'about' || cleanCmd === 'unai_ibabe.about()') {
      outputLine.innerHTML = responses[activeLang].about;
    } 
    else if (cleanCmd === 'skills' || cleanCmd === 'unai_ibabe.skills()') {
      outputLine.innerHTML = responses[activeLang].skills;
      outputLine.classList.add('terminal-output-success');
    } 
    else if (cleanCmd === 'projects' || cleanCmd === 'unai_ibabe.projects()') {
      outputLine.innerHTML = responses[activeLang].projects;
    } 
    else if (cleanCmd === 'experience' || cleanCmd === 'unai_ibabe.experience()') {
      outputLine.innerHTML = responses[activeLang].experience;
      outputLine.classList.add('terminal-output-accent');
    } 
    else if (cleanCmd === 'contact' || cleanCmd === 'unai_ibabe.contact()') {
      outputLine.innerHTML = responses[activeLang].contact;
    } 
    else {
      // Parse custom commands or print error
      const unknownMsg = responses[activeLang].unknown.replace('{cmd}', escapeHTML(cmd));
      outputLine.innerHTML = `<span style="color: #ff5f56;">${unknownMsg}</span>`;
    }

    terminalBody.insertBefore(outputLine, inputRow);
    scrollTerminal();
  }

  function scrollTerminal() {
    // Smooth auto scroll to bottom
    setTimeout(() => {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 10);
  }

  function printLanguageSwitchNotice() {
    const noticeLine = document.createElement('div');
    noticeLine.className = 'terminal-line terminal-output';
    noticeLine.style.color = 'rgba(255, 255, 255, 0.4)';
    noticeLine.style.fontStyle = 'italic';
    noticeLine.textContent = responses[activeLang].langSwitch;
    terminalBody.insertBefore(noticeLine, inputRow);
    scrollTerminal();
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
});
