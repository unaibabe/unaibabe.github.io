/* ==========================================================================
   UNAI IBABE - PORTFOLIO INTERACTORS (app.js)
   Global UI Logic, Smooth Navigation & Bilingual Toggle Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- BILINGUAL SYSTEM ENGINE ---
  const langToggleBtn = document.getElementById('lang-btn');
  
  // Define default language (default to 'en' as requested)
  let currentLang = localStorage.getItem('portfolio-lang') || 'en';
  
  // Set initial language state
  setLanguage(currentLang);
  
  langToggleBtn.addEventListener('click', () => {
    // Toggle language
    currentLang = currentLang === 'en' ? 'es' : 'en';
    setLanguage(currentLang);
  });
  
  function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('portfolio-lang', lang);
    
    // Update button text to display the OPTION to switch
    // If current language is English, button shows "ES" to switch to Spanish
    // If current language is Spanish, button shows "EN" to switch to English
    langToggleBtn.textContent = lang === 'en' ? 'ES' : 'EN';
    
    // Dispatch a custom event so other components (like terminal) can respond to language changes
    const event = new CustomEvent('langChanged', { detail: { lang: lang } });
    document.dispatchEvent(event);
  }

  // --- FLOATING NAVBAR SCROLL EFFECTS ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- NAVIGATION HIGHLIGHT ON SCROLL ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavigation() {
    let scrollPosition = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation(); // Run on load

  // --- MOBILE NAV MENU TOGGLER ---
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Transform hamburger into an 'X'
      const spans = menuBtn.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
});
