/**
 * LX Next - Main JavaScript
 * Professional interactive components for company website
 */

class LXNextWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initScrollAnimations();
    this.initNavigation();
    this.initSmoothScroll();
    this.initLoadingAnimations();
    this.initContactForm();
    this.initPerformanceOptimizations();
  }

  setupEventListeners() {
    // DOM Content Loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }

    // Window Events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
    window.addEventListener('load', this.handleLoad.bind(this));
  }

  onDOMReady() {
    this.updateLoadingState('interactive');
    this.initializeComponents();
  }

  handleLoad() {
    this.updateLoadingState('complete');
    this.revealContent();
  }

  // ===== NAVIGATION =====
  initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        this.toggleMobileMenu(mobileToggle, mobileMenu);
      });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          this.toggleMobileMenu(mobileToggle, mobileMenu);
        }
      });
    });

    // Active nav link highlighting
    this.updateActiveNavLink();
  }

  toggleMobileMenu(toggle, menu) {
    const isActive = toggle.classList.contains('active');
    
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'auto' : 'hidden';
    
    // Accessibility
    toggle.setAttribute('aria-expanded', !isActive);
    menu.setAttribute('aria-hidden', isActive);
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -80% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // ===== SCROLL HANDLING =====
  handleScroll() {
    this.updateNavbarOnScroll();
    this.updateScrollProgress();
    this.checkAnimationTriggers();
  }

  updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;

    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - winHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = scrollTop / docHeight;

    scrollProgress.style.transform = `scaleX(${scrollPercent})`;
  }

  // ===== SMOOTH SCROLLING =====
  initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          this.smoothScrollTo(target);
        }
      });
    });
  }

  smoothScrollTo(target) {
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const targetPosition = target.offsetTop - navbarHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  // ===== SCROLL ANIMATIONS =====
  initScrollAnimations() {
    // Intersection Observer for animations
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          
          // Add staggered delays for grid items
          if (entry.target.closest('.grid')) {
            const siblings = Array.from(entry.target.parentNode.children);
            const index = siblings.indexOf(entry.target);
            entry.target.style.animationDelay = `${index * 100}ms`;
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements that should animate
    const animateElements = document.querySelectorAll(
      '.service-card, .feature-item, .approach-card, .industry-item, .leader-card, .card'
    );
    
    animateElements.forEach(el => {
      animationObserver.observe(el);
    });
  }

  checkAnimationTriggers() {
    const triggerElements = document.querySelectorAll('[data-animate]');
    
    triggerElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !element.classList.contains('animated')) {
        const animationType = element.dataset.animate;
        element.classList.add('animated', animationType);
      }
    });
  }

  // ===== LOADING ANIMATIONS =====
  initLoadingAnimations() {
    // Add loading states
    document.body.classList.add('loading');
  }

  revealContent() {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');

    // Stagger hero content animations
    const heroElements = document.querySelectorAll('.hero h1, .hero .lead, .hero-actions, .hero-stats');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in');
      }, index * 200);
    });
  }

  updateLoadingState(state) {
    document.documentElement.setAttribute('data-loading-state', state);
  }

  // ===== CONTACT FORM =====
  initContactForm() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission(form);
      });

      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    });
  }

  handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('[type="submit"]');
    
    // Show loading state
    this.setButtonLoading(submitButton, true);
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
      this.setButtonLoading(submitButton, false);
      this.showFormSuccess(form);
    }, 2000);
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';

    if (field.required && !value) {
      isValid = false;
      message = 'This field is required';
    } else if (type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      message = 'Please enter a valid email address';
    }

    this.setFieldValidation(field, isValid, message);
    return isValid;
  }

  setFieldValidation(field, isValid, message) {
    const wrapper = field.closest('.field-wrapper') || field.parentNode;
    const errorElement = wrapper.querySelector('.field-error') || this.createErrorElement();

    wrapper.classList.toggle('field-invalid', !isValid);
    wrapper.classList.toggle('field-valid', isValid && field.value.trim());

    if (!isValid) {
      errorElement.textContent = message;
      if (!wrapper.contains(errorElement)) {
        wrapper.appendChild(errorElement);
      }
    } else {
      errorElement.remove();
    }
  }

  clearFieldError(field) {
    const wrapper = field.closest('.field-wrapper') || field.parentNode;
    wrapper.classList.remove('field-invalid');
  }

  createErrorElement() {
    const error = document.createElement('div');
    error.className = 'field-error';
    error.style.cssText = 'color: var(--color-error); font-size: var(--text-sm); margin-top: var(--space-1);';
    return error;
  }

  setButtonLoading(button, isLoading) {
    if (isLoading) {
      button.classList.add('loading');
      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.textContent = 'Sending...';
    } else {
      button.classList.remove('loading');
      button.disabled = false;
      button.textContent = button.dataset.originalText || 'Send Message';
    }
  }

  showFormSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
      <div style="padding: var(--space-4); background: var(--color-success); color: white; border-radius: var(--radius-lg); text-align: center;">
        ✓ Thank you! Your message has been sent successfully.
      </div>
    `;
    
    form.style.display = 'none';
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Reset form after delay
    setTimeout(() => {
      form.reset();
      form.style.display = 'block';
      successMessage.remove();
    }, 5000);
  }

  // ===== PERFORMANCE OPTIMIZATIONS =====
  initPerformanceOptimizations() {
    // Lazy load images
    this.setupLazyLoading();
    
    // Preload critical resources
    this.preloadCriticalResources();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  preloadCriticalResources() {
    const criticalImages = [
      '../Logo.png',
      'assets/images/hero-background.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // ===== UTILITY FUNCTIONS =====
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  handleResize() {
    // Close mobile menu on resize to desktop
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
      this.toggleMobileMenu(mobileToggle, mobileMenu);
    }
  }

  initializeComponents() {
    // Initialize any additional components here
    console.log('LX Next website initialized successfully');
  }
}

// ===== ANALYTICS & TRACKING =====
class Analytics {
  static trackEvent(action, category = 'engagement', label = '') {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
    
    // Console log for development
    console.log(`Analytics: ${category} - ${action} - ${label}`);
  }

  static trackPageView(page = window.location.pathname) {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: page
      });
    }
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancer {
  static init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
  }

  static setupKeyboardNavigation() {
    // Escape key to close modals/menus
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu.active');
        const mobileToggle = document.querySelector('.mobile-menu-toggle.active');
        
        if (mobileMenu && mobileToggle) {
          website.toggleMobileMenu(mobileToggle, mobileMenu);
        }
      }
    });
  }

  static setupFocusManagement() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--color-primary);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  static setupScreenReaderSupport() {
    // Add proper ARIA labels where missing
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach(button => {
      if (!button.textContent.trim()) {
        const iconClass = button.querySelector('[class*="icon"]')?.className || 'button';
        button.setAttribute('aria-label', `${iconClass} button`);
      }
    });
  }
}

// ===== INITIALIZATION =====
let website;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    website = new LXNextWebsite();
    AccessibilityEnhancer.init();
  });
} else {
  website = new LXNextWebsite();
  AccessibilityEnhancer.init();
}

// Export for global access
window.LXNext = {
  website,
  Analytics,
  AccessibilityEnhancer
};