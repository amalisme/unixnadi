/* ============================================
   UnixPulse - Main JavaScript
   ============================================ */

(function() {
  'use strict';

  // ---------- Theme Toggle ----------
  const THEME_KEY = 'unixpulse-theme';
  
  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }
  
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }
  
  // Initialize theme on page load
  setTheme(getPreferredTheme());
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ---------- Mobile Menu ----------
  function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (!menuBtn || !navList) return;
    
    menuBtn.addEventListener('click', () => {
      const isActive = navList.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', isActive);
      
      // Toggle icon
      const iconMenu = menuBtn.querySelector('.icon-menu');
      const iconClose = menuBtn.querySelector('.icon-close');
      if (iconMenu && iconClose) {
        iconMenu.style.display = isActive ? 'none' : 'block';
        iconClose.style.display = isActive ? 'block' : 'none';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navList.classList.contains('active')) {
        navList.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  // ---------- Smooth Scroll for Anchor Links ----------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ---------- Active Navigation Link ----------
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || 
          (href !== '/' && currentPath.startsWith(href)) ||
          (href === '/' && currentPath === '/') ||
          (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html')))) {
        link.classList.add('active');
      }
    });
  }

  // ---------- Reading Time Calculator ----------
  function calculateReadingTime() {
    const content = document.querySelector('.post-content');
    const readingTimeEl = document.querySelector('.reading-time');
    
    if (!content || !readingTimeEl) return;
    
    const text = content.textContent || '';
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // Average reading speed
    
    readingTimeEl.textContent = `${minutes} min read`;
  }

  // ---------- Form Validation Feedback ----------
  function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }
      });
    });
  }

  // ---------- Copy Code Button ----------
  function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
      const pre = block.parentElement;
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-code-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
      
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(block.textContent);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          copyBtn.textContent = 'Failed';
        }
      });
      
      pre.style.position = 'relative';
      pre.appendChild(copyBtn);
    });
  }

  // ---------- Lazy Load Images ----------
  function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    } else {
      // Fallback for older browsers
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
      script.onload = function() {
        const observer = lozad('.lazy');
        observer.observe();
      };
      document.body.appendChild(script);
    }
  }

  // ---------- Initialize Everything ----------
  function init() {
    // Theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
    
    initMobileMenu();
    initSmoothScroll();
    setActiveNavLink();
    calculateReadingTime();
    initFormValidation();
    initCodeCopy();
    initLazyLoad();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose theme toggle for external use
  window.UnixPulse = {
    toggleTheme: toggleTheme,
    setTheme: setTheme
  };
})();
