/**
 * 🎯 PYTHON ACADEMY - Interactive Effects JavaScript
 * Efectos interactivos, animaciones y funcionalidades modernas
 */

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todos los efectos
    initPageLoader();
    initScrollAnimations();
    initNavbarEffects();
    initParticles();
    initTypingEffect();
    initCounterAnimations();
    initSmoothScroll();
    initCardEffects();
    initTooltips();
});

/**
 * 🔄 Page Loader
 */
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                loader.classList.add('hidden');
            }, 500);
        });
    }
}

/**
 * 📜 Scroll Animations - Anima elementos cuando aparecen en viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Opcional: dejar de observar después de animar
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * 🧭 Navbar Effects - Efectos al hacer scroll
 */
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar-modern, .navbar, header');

    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Añadir clase cuando hay scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = '';
            navbar.style.boxShadow = '';
        }

        lastScroll = currentScroll;
    });
}

/**
 * ✨ Particles Background - Efecto de partículas
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles-js');

    if (!particlesContainer) return;

    // Crear partículas simples sin librería externa
    createSimpleParticles(particlesContainer);
}

function createSimpleParticles(container) {
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }

    // Añadir keyframe animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * ⌨️ Typing Effect - Efecto de escritura
 */
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');

    typingElements.forEach(element => {
        const text = element.getAttribute('data-typing');
        const speed = parseInt(element.getAttribute('data-typing-speed')) || 100;

        element.textContent = '';
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }

        // Iniciar cuando el elemento sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(element);
    });
}

/**
 * 🔢 Counter Animations - Contadores animados
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
        const suffix = counter.getAttribute('data-suffix') || '';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counter, target, duration, suffix);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

function animateCounter(element, target, duration, suffix) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * 🔗 Smooth Scroll - Scroll suave
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 🃏 Card Effects - Efectos en cards
 */
function initCardEffects() {
    // Efecto de inclinación 3D en hover
    const cards = document.querySelectorAll('.modern-card, .glass-card, .ejercicio-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // Efecto ripple en botones
    const buttons = document.querySelectorAll('.btn-glow, .btn-ver, .btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.cssText = `
                position: absolute;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: translate(-50%, -50%);
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Añadir keyframe para ripple
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * 💬 Tooltips - Inicializar tooltips de Bootstrap
 */
function initTooltips() {
    // Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            new bootstrap.Tooltip(tooltipTriggerEl);
        }
    });
}

/**
 * 🎨 Theme Switcher - Cambiar entre temas claro/oscuro
 */
function initThemeSwitcher() {
    const themeToggle = document.querySelector('[data-theme-toggle]');

    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', function () {
        const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

/**
 * 🔍 Search Highlight - Resaltar términos de búsqueda
 */
function highlightSearch(searchTerm) {
    const content = document.querySelector('main');
    if (!content || !searchTerm) return;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (regex.test(node.textContent)) {
            const span = document.createElement('span');
            span.innerHTML = node.textContent.replace(regex, '<mark class="search-highlight">$1</mark>');
            node.parentNode.replaceChild(span, node);
        }
    }
}

/**
 * 📊 Progress Bar Animation
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar-animated');

    progressBars.forEach(bar => {
        const target = bar.getAttribute('data-progress');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = target + '%';
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(bar);
    });
}

/**
 * 🎭 Reveal on Scroll - Revelar elementos con diferentes direcciones
 */
function revealOnScroll(selector, direction = 'up') {
    const elements = document.querySelectorAll(selector);

    const animations = {
        up: 'translateY(50px)',
        down: 'translateY(-50px)',
        left: 'translateX(-50px)',
        right: 'translateX(50px)',
        scale: 'scale(0.8)'
    };

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = animations[direction];
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

/**
 * 🖱️ Custom Cursor - Cursor personalizado
 */
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');

    document.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';

        setTimeout(() => {
            ring.style.left = e.clientX + 'px';
            ring.style.top = e.clientY + 'px';
        }, 100);
    });

    // Añadir estilos
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            pointer-events: none;
            position: fixed;
            z-index: 9999;
        }
        .cursor-dot {
            position: fixed;
            width: 8px;
            height: 8px;
            background: #667eea;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        .cursor-ring {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(102, 126, 234, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s;
        }
    `;
    document.head.appendChild(style);
}

/**
 * 📱 Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.navmenu');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            this.classList.toggle('bi-list');
            this.classList.toggle('bi-x');
        });
    }
}

// Inicializar menú móvil
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Export functions for external use
window.PythonAcademy = {
    revealOnScroll,
    highlightSearch,
    animateCounter
};

console.log('✨ Python Academy Effects loaded successfully!');
