// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeIcon = document.getElementById('theme-icon');
const contactForm = document.getElementById('contactForm');

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Default to dark on first visit
    if (!savedTheme) {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
        return;
    }

    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    }
}

// Mobile Navigation Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    closeMobileMenu();
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                if (entry.target.classList.contains('hero')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Observe elements for slide animations
    const slideElements = document.querySelectorAll('.about-text, .about-image, .contact-info, .contact-form');
    slideElements.forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        observer.observe(el);
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
}

// Particle background effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -1;
    `;
    
    hero.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particleContainer.appendChild(particle);
    }
}

// Add particle animation CSS
function addParticleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    loadTheme();
    
    // Add particle styles
    addParticleStyles();
    
    // Create particles
    createParticles();
    
    // Setup animations
    setupAnimations();
    
    // Initialize typing effect
    setTimeout(initTypingEffect, 500);
    
    // Event listeners
    themeIcon.addEventListener('click', toggleTheme);
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Remove mailto handler for contact form
    
    // Scroll events
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    window.addEventListener('scroll', throttle(parallaxEffect, 16));
    
    // Add loading animation
    document.body.classList.add('loading');
    
    // Preload images for better performance
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Theme toggle with Ctrl+T
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Add service worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Add analytics tracking (example)
function trackEvent(eventName, eventData = {}) {
    // This is where you would integrate with Google Analytics or similar
    console.log('Event tracked:', eventName, eventData);
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track theme changes
    const originalToggleTheme = toggleTheme;
    toggleTheme = function() {
        originalToggleTheme();
        trackEvent('theme_changed', {
            theme: document.body.getAttribute('data-theme') || 'light'
        });
    };
    
    // Track project clicks
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function() {
            const projectName = this.closest('.project-card').querySelector('h3').textContent;
            trackEvent('project_clicked', { project: projectName });
        });
    });
});

// === Achievement Modal Logic (Fullscreen on click) ===
const achievementCards = document.querySelectorAll('.achievement-card');
const achievementModal = document.getElementById('achievement-modal');
const modalImage = document.querySelector('.modal-image');
const modalCaption = document.querySelector('.modal-caption');
const modalClose = document.querySelector('.modal-close');

achievementCards.forEach(card => {
  // Skip Professional Certifications card (handled separately)
  if (card.id === 'certifications-card') return;
  card.addEventListener('click', function (e) {
    const link = card.getAttribute('data-link');
    if (link) {
      window.open(link, '_blank', 'noopener');
      return;
    }
    const imgSrc = card.getAttribute('data-image');
    const caption = card.getAttribute('data-caption');
    if (imgSrc) {
      openFullscreenImage(imgSrc, caption || 'Achievement Image');
    }
  });
});

// === Certificates Modal Logic ===
const certificationsCard = document.getElementById('certifications-card');
const certificatesModal = document.getElementById('certificates-modal');
const certificatesList = document.getElementById('certificates-list');
const certificateViewer = document.getElementById('certificate-viewer');
const certificatesModalClose = document.getElementById('certificates-modal-close');

function showCertificates() {
  document.getElementById('cert-list').style.display = 'block';
}

function showCertificate(imgSrc) {
  document.getElementById('cert-img').src = imgSrc;
  document.getElementById('cert-image-modal').style.display = 'flex';
}

function closeCertImage() {
  document.getElementById('cert-image-modal').style.display = 'none';
  document.getElementById('cert-img').src = '';
} 

// Certificate data for Professional Certificates
const achievementCertificates = [
  {
    name: "Data Analytics and Visualization (Accenture)",
    file: "certificates/accenture.png"
  },
  {
    name: "Database Management System (CodeChef)",
    file: "certificates/dbms codechef.png"
  },
  {
    name: "Microsoft Excel Expert (Udemy)",
    file: "certificates/excel.png"
  },
  {
    name: "Power BI (Udemy)",
    file: "certificates/power bi.png"
  },
  {
    name:"Python Developer (Udemy)",
    file: "certificates/python.png"
  },
  {
    name:"Design and Analysis of Algorithms(CodeChef)",
    file:"certificates/DAA codechef.png"
  }
];

// Create and show a modal to select certificate type
function showCertificateTypeModal() {
  // Remove existing modal if present
  let oldModal = document.getElementById('cert-type-modal');
  if (oldModal) oldModal.remove();

  // Modal overlay
  const modal = document.createElement('div');
  modal.id = 'cert-type-modal';
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0,0,0,0.7)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = 10000;

  // Modal content
  const content = document.createElement('div');
  content.style.background = '#fff';
  content.style.padding = '30px 40px';
  content.style.borderRadius = '10px';
  content.style.boxShadow = '0 0 20px #000';
  content.style.textAlign = 'center';

  const title = document.createElement('h3');
  title.textContent = 'Select Certificate Type';
  content.appendChild(title);

  achievementCertificates.forEach(cert => {
    const btn = document.createElement('button');
    btn.textContent = cert.name;
    btn.className = 'btn btn-secondary';
    btn.style.margin = '10px 0';
    btn.style.display = 'block';
    btn.onclick = function() {
      document.body.removeChild(modal);
      openFullscreenImage(cert.file, cert.name);
    };
    content.appendChild(btn);
  });

  // Close button
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '30px';
  closeBtn.style.right = '40px';
  closeBtn.style.fontSize = '3rem';
  closeBtn.style.color = '#fff';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.fontWeight = 'bold';
  closeBtn.style.zIndex = 10001;
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.onclick = function() {
    document.body.removeChild(modal);
  };
  modal.appendChild(closeBtn);

  modal.appendChild(content);
  document.body.appendChild(modal);
}

// Fullscreen image viewer
function openFullscreenImage(src, alt) {
  let overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.95)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 9999;
  overlay.style.cursor = 'zoom-out';

  let closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '30px';
  closeBtn.style.right = '40px';
  closeBtn.style.fontSize = '3rem';
  closeBtn.style.color = '#fff';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.fontWeight = 'bold';
  closeBtn.style.zIndex = 10000;
  closeBtn.style.textShadow = '0 2px 8px #000';
  closeBtn.setAttribute('aria-label', 'Close fullscreen image');

  let img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.style.maxWidth = '95vw';
  img.style.maxHeight = '95vh';
  img.style.boxShadow = '0 0 20px #000';
  img.style.borderRadius = '8px';
  overlay.appendChild(img);
  overlay.appendChild(closeBtn);

  function closeOverlay() {
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  }
  overlay.onclick = closeOverlay;
  closeBtn.onclick = function(e) {
    e.stopPropagation();
    closeOverlay();
  };
  document.body.appendChild(overlay);
}

// Add click event to Professional Certificates achievement card
const certCard = document.getElementById('certifications-card');
if (certCard) {
  certCard.style.cursor = 'pointer';
  certCard.onclick = function(e) {
    showCertificateTypeModal();
  };

} 
