// Minimal Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initScrollEffects();
    initSkillBars();
    initStatCounters();
    initProjectModals();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Update active navigation link
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[data-section]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const theme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            updateThemeIcon(theme);
        }
    });

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
                
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .about-card, .contact-card, .about-stats');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill bar animations
function initSkillBars() {
    // This will be triggered by scroll observer
}

function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 300);
        }
    });
}

// Counter animations
function initStatCounters() {
    // This will be triggered by scroll observer
}

function animateCounters(container) {
    const counters = container.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 50);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 50);
    });
}

// Project modal functionality
function initProjectModals() {
    const projectBtns = document.querySelectorAll('.project-btn');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');    const projectData = {
        1: {
            title: 'Byte Stars',
            description: 'A 2D arcade-style game built on the MSPM0+ microcontroller using C++ with joystick-controlled sprite movement, custom rendering, and audio integration.',
            features: [
                'Joystick-controlled sprite movement',
                'Background-aware sprite rendering',
                'Custom pixel detection and erase functions',
                'DAC-driven sound effects',
                'Timer interrupt-based game loop'
            ],
            technologies: ['C++', 'MSPM0+ Microcontroller', 'DAC', 'Timer Interrupts', 'Embedded Systems'],
            challenges: 'Implementing smooth sprite movement and collision detection on a resource-constrained microcontroller while maintaining real-time performance.',
            outcome: 'Successfully created a fully functional arcade game with smooth gameplay and immersive sound effects on embedded hardware.',
            github: 'https://github.com/AbhishekS-06/byte-stars',
            demo: '#'
        },
        2: {
            title: 'ParodyAI',
            description: 'A full-stack application for generating parody songs using AI voice synthesis with advanced speaker encoders, TTS models, and neural vocoders.',
            features: [
                'AI voice cloning technology',
                'Real-time voice synthesis',
                'Speaker encoder integration',
                'Audio vocoder processing',
                'React-based user interface'
            ],
            technologies: ['Python', 'React', 'TTS Models', 'Neural Vocoders', 'Speaker Encoders', 'AI/ML'],
            challenges: 'Integrating complex AI models for voice synthesis while maintaining real-time performance and managing large audio datasets.',
            outcome: 'Created a functional AI-powered voice synthesis system with collaborative development using Agile methodologies.',
            github: 'https://github.com/AbhishekS-06/parodyai',
            demo: '#'
        },
        3: {
            title: 'StageNextDoor',
            description: 'A mobile-first React Native application featuring swipe navigation, dynamic event filters, and Firebase real-time data synchronization for local event discovery.',
            features: [
                'Mobile-first responsive design',
                'Swipe navigation interface',
                'Dynamic event filtering',
                'Real-time data synchronization',
                'Firebase Firestore integration'
            ],
            technologies: ['React Native', 'Firebase', 'Firestore', 'JavaScript', 'Mobile Development'],
            challenges: 'Implementing smooth swipe navigation while maintaining real-time data sync and scalable query performance across mobile devices.',
            outcome: 'Built a fully functional mobile app with seamless user experience and real-time event updates using Agile development practices.',
            github: 'https://github.com/AbhishekS-06/stagenextdoor',
            demo: '#'
        },        4: {
            title: 'Nepali National Parks StoryMap',
            description: 'An interactive GIS visualization using ArcGIS featuring multi-layered mapping, spatial narratives, and comprehensive data on Nepali National Parks.',
            features: [
                'Multi-layered ArcGIS mapping',
                'Interactive spatial narratives',
                'Comprehensive park data compilation',
                'Annotated visual presentations',
                'GIS analysis and mapping techniques'
            ],
            technologies: ['ArcGIS', 'GIS', 'Data Visualization', 'Spatial Analysis', 'Mapping'],
            challenges: 'Researching and compiling accurate data on multiple national parks while creating engaging spatial narratives and visualizations.',
            outcome: 'Successfully created an informative and interactive StoryMap that effectively communicates conservation data and park information.',
            github: 'https://github.com/AbhishekS-06/nepal-parks-storymap',
            demo: '#'
        },
        5: {
            title: 'Trivia Solver Bot',
            description: 'An automated Java bot using Selenium for web scraping and Python string-matching algorithms to intelligently solve trivia questions.',
            features: [
                'Selenium-based web scraping',
                'Automated question parsing',
                'Python string-matching algorithms',
                'Real-time answer processing',
                'Accuracy optimization'
            ],
            technologies: ['Java', 'Python', 'Selenium', 'Web Scraping', 'Algorithm Design'],
            challenges: 'Developing reliable string-matching algorithms and handling dynamic web content while maintaining high accuracy rates.',
            outcome: 'Built a functional trivia-solving bot with improved answer accuracy through advanced string-matching techniques.',
            github: 'https://github.com/AbhishekS-06/trivia-solver-bot',
            demo: '#'
        }
    };

    // Open modal
    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalTitle.textContent = project.title;
                modalBody.innerHTML = createProjectModalContent(project);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function createProjectModalContent(project) {
        return `
            <div class="project-modal-content">
                <p class="project-description">${project.description}</p>
                
                <div class="project-features">
                    <h4>Key Features</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-technologies">
                    <h4>Technologies Used</h4>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-challenge">
                    <h4>Challenges & Solutions</h4>
                    <p>${project.challenges}</p>
                </div>
                
                <div class="project-outcome">
                    <h4>Outcome</h4>
                    <p>${project.outcome}</p>
                </div>
                
                <div class="project-links">
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <i class="fab fa-github"></i> View Code
                    </a>
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                </div>
            </div>
        `;
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Simulate form submission
            submitContactForm(data);
        });
    }
}

function submitContactForm(data) {
    // Show loading state
    const submitBtn = document.querySelector('.contact-form .btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }, 2000);
}

// Back to top functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontWeight: '500',
        zIndex: '2000',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '300px'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .project-modal-content .project-features ul {
        list-style: none;
        padding-left: 0;
        margin-top: 1rem;
    }
    
    .project-modal-content .project-features li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-secondary);
    }
    
    .project-modal-content .project-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--accent-color);
        font-weight: bold;
    }
    
    .project-modal-content h4 {
        color: var(--text-primary);
        margin: 1.5rem 0 0.75rem 0;
        font-size: 1.125rem;
        font-weight: 600;
    }
    
    .project-modal-content h4:first-child {
        margin-top: 0;
    }
    
    .project-modal-content .project-links {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .project-modal-content .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.75rem;
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

preloadResources();
