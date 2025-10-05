// Enhanced Interactions - Custom Cursor, Loading, and Mobile Optimizations
class EnhancedInteractions {
    constructor() {
        this.cursor = null;
        this.isLoading = true;
        this.isMobile = this.detectMobile();
        this.init();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    }

    init() {
        this.setupLoading();
        if (!this.isMobile) {
            this.setupCustomCursor();
        }
        this.setupEnhancedInteractions();
        this.setupResponsiveOptimizations();
    }

    setupLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        
        // Simulate loading time
        setTimeout(() => {
            this.hideLoading();
        }, 2000);

        // Hide loading on page fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoading();
            }, 500);
        });
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                this.isLoading = false;
            }, 500);
        }
    }

    setupCustomCursor() {
        this.cursor = document.getElementById('customCursor');
        if (!this.cursor) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor animation
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            this.cursor.style.left = cursorX + 'px';
            this.cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .nav-item, .skill-item, .project-card');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });

        // Click effects
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
        });
    }

    setupEnhancedInteractions() {
        // Enhanced button interactions
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });

        // Parallax scrolling effect
        this.setupParallaxScrolling();

        // Smooth scroll for navigation
        this.setupSmoothScroll();

        // Enhanced form interactions
        this.setupFormEnhancements();
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupParallaxScrolling() {
        if (this.isMobile) return; // Disable parallax on mobile for performance

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-content, .about-content, .skills-grid');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupFormEnhancements() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Floating label effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Real-time validation
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
        });
    }

    validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        
        if (type === 'email') {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            input.classList.toggle('invalid', !isValid && value.length > 0);
        }
        
        if (input.hasAttribute('required')) {
            input.classList.toggle('invalid', !value);
        }
    }

    setupResponsiveOptimizations() {
        // Touch-friendly interactions
        if (this.isMobile) {
            this.setupTouchOptimizations();
        }

        // Performance optimizations
        this.setupPerformanceOptimizations();
    }

    setupTouchOptimizations() {
        // Add touch feedback
        const touchElements = document.querySelectorAll('.btn, .skill-item, .project-card');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 150);
            });
        });
    }

    setupPerformanceOptimizations() {
        // Lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Debounced scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 10);
        });
    }

    handleScroll() {
        // Add scroll-based animations
        const elements = document.querySelectorAll('.stat, .skill-category, .project-card');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                element.classList.add('animate-in');
            }
        });
    }
}

// Initialize enhanced interactions
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedInteractions();
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(6, 182, 212, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .touch-active {
        transform: scale(0.95);
        transition: transform 0.1s ease;
    }

    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .focused input,
    .focused textarea {
        border-color: #06b6d4;
        box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
    }

    .invalid {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }

    .loading-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
document.head.appendChild(style);
