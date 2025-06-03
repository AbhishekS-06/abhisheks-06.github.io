// Futuristic Portfolio JavaScript
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    setTimeout(() => {
        initializePortfolio();
    }, 3200); // Wait for loading animation to complete
});

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading progress
    setTimeout(() => {
        const loadingText = document.querySelector('.loading-text span');
        if (loadingText) loadingText.textContent = 'LOADING PORTFOLIO';
    }, 1000);
    
    setTimeout(() => {
        const loadingText = document.querySelector('.loading-text span');
        if (loadingText) loadingText.textContent = 'SYSTEMS ONLINE';
    }, 2000);
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
}

function initializePortfolio() {
    createCircuitBackground();
    initNavigationIndicator();
    initTerminal();
    initAnimations();
    initCarousels();
    initIntersectionObserver();
    initParticleSystem();
    initSkillBars();
    initGlitchEffect();
    initTypingEffect();
    initScrollEffects();
}

// Create animated circuit background
function createCircuitBackground() {
    const circuitBg = document.createElement('div');
    circuitBg.className = 'circuit-bg';
    document.body.appendChild(circuitBg);
}

// Navigation indicator
function initNavigationIndicator() {
    const sections = document.querySelectorAll('section');
    const navIndicator = document.createElement('div');
    navIndicator.className = 'nav-indicator';
    
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        navIndicator.appendChild(dot);
    });
    
    document.body.appendChild(navIndicator);
    
    // Update active dot on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                document.querySelectorAll('.nav-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Interactive Terminal
function initTerminal() {
    const terminal = document.createElement('div');
    terminal.className = 'terminal';
    terminal.innerHTML = `
        <div class="terminal-header">
            <div class="terminal-dot"></div>
            <div class="terminal-dot"></div>
            <div class="terminal-dot"></div>
            <span style="color: var(--text-muted); font-size: 0.8rem; margin-left: 1rem;">abhishek@portfolio:~$</span>
        </div>
        <div class="terminal-content">
            <div class="terminal-line">
                <span class="terminal-prompt">abhishek@portfolio:~$</span>
                <input type="text" class="terminal-input" placeholder="Type 'help' to get started" autocomplete="off">
            </div>
            <div class="terminal-output"></div>
        </div>
    `;
    
    // Insert terminal after skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsSection.insertAdjacentElement('afterend', terminal);
    }
    
    const input = terminal.querySelector('.terminal-input');
    const output = terminal.querySelector('.terminal-output');
    
    const commands = {        help: () => `Available commands:
• about - Learn more about me
• projects - View my latest projects
• skills - Display technical skills
• contact - Get my contact information
• matrix - Enter the Matrix
• clear - Clear terminal
• portfolio - Open GitHub portfolio`,
        
        about: () => `Name: Abhishek Shrestha
Status: ECE Student @ UT Austin
Interests: Embedded Systems, AI/ML, Software Engineering
Current Focus: Building innovative tech solutions
Fun Fact: I speak fluent binary: 01001000 01101001!`,
        
        projects: () => `Recent Projects:
• Byte Stars - 2D game on MSPM0+ microcontroller
• ParodyAI - AI voice synthesis application  
• StageNextDoor - React Native event platform
• Trivia Solver Bot - Automated question solver`,
        
        skills: () => `Technical Arsenal:
Languages: Python, JavaScript, Java, C++, C, SQL, Assembly
Frameworks: React, React Native, Flask, Node.js
Hardware: Embedded Systems, PCB Design, LTSpice
Concepts: AI/ML, REST APIs, Data Structures, Agile`,
        
        contact: () => `📧 theshresthaabhishek@gmail.com
🔗 linkedin.com/in/the-shrestha-abhishek/
🐙 github.com/AbhishekS-06
📍 Austin, TX`,
          matrix: () => {
            startMatrixEffect();
            return 'Welcome to the Matrix...';
        },
        
        clear: () => {
            output.innerHTML = '';
            return '';
        },
        
        portfolio: () => {
            window.open('https://github.com/AbhishekS-06', '_blank');
            return 'Opening GitHub portfolio...';
        }
    };
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            const response = commands[command] || `Command not found: ${command}. Type 'help' for available commands.`;
            
            const commandLine = document.createElement('div');
            commandLine.innerHTML = `<span class="terminal-prompt">abhishek@portfolio:~$</span> ${input.value}`;
            commandLine.style.marginBottom = '0.5rem';
            
            const responseLine = document.createElement('div');
            responseLine.innerHTML = response;
            responseLine.style.color = 'var(--neon-green)';
            responseLine.style.marginBottom = '1rem';
            responseLine.style.whiteSpace = 'pre-line';
            
            output.appendChild(commandLine);
            if (response) output.appendChild(responseLine);
            
            input.value = '';
            output.scrollTop = output.scrollHeight;
        }
    });
}

// Matrix effect
function startMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1000';
    canvas.style.pointerEvents = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const drops = [];
    
    for (let x = 0; x < canvas.width / 10; x++) {
        drops[x] = 1;
    }
    
    let frameCount = 0;
    const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * 10, drops[i] * 10);
            
            if (drops[i] * 10 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        frameCount++;
        if (frameCount < 200) {
            requestAnimationFrame(animate);
        } else {
            document.body.removeChild(canvas);
        }
    };
    
    animate();
}

// Enhanced animations
function initAnimations() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enhanced carousel with touch support
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;
        let startTouch;

        // Mouse events
        carousel.addEventListener('mousedown', handleStart);
        carousel.addEventListener('mouseleave', handleEnd);
        carousel.addEventListener('mouseup', handleEnd);
        carousel.addEventListener('mousemove', handleMove);

        // Touch events
        carousel.addEventListener('touchstart', handleStart);
        carousel.addEventListener('touchend', handleEnd);
        carousel.addEventListener('touchmove', handleMove);

        function handleStart(e) {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            startX = clientX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        }

        function handleEnd() {
            isDown = false;
            carousel.style.cursor = 'grab';
        }

        function handleMove(e) {
            if (!isDown) return;
            e.preventDefault();
            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const x = clientX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        }

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
                carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
            }
        });

        carousel.style.cursor = 'grab';
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    document.querySelectorAll('section, .skill-category, .card').forEach(el => {
        observer.observe(el);
    });
}

// Particle system
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#00ffff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.save();
                    ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    document.body.appendChild(canvas);
    animate();
}

// Skill bars animation
function initSkillBars() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const skills = {
            'Languages': ['Python (90%)', 'JavaScript (85%)', 'Java (80%)', 'C++ (75%)', 'C (70%)', 'SQL (75%)', 'Assembly (65%)'],
            'Frameworks/Tools': ['React (85%)', 'React Native (80%)', 'Flask (75%)', 'Node.js (70%)', 'Firebase (80%)', 'Git (90%)', 'Selenium (70%)', 'ArcGIS (65%)'],
            'Hardware': ['Embedded Systems (85%)', 'LTSpice (75%)', 'KiCad (70%)', 'PCB Design (65%)', 'Soldering (80%)'],
            'Concepts': ['Agile/Scrum (85%)', 'REST APIs (80%)', 'Data Structures (90%)', 'Algorithms (85%)', 'TDD (75%)']
        };
        
        const title = category.querySelector('h3').textContent.trim();
        const skillList = skills[title];
        
        if (skillList) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'skill-progress';
            
            skillList.forEach(skill => {
                const [name, percentage] = skill.split(' (');
                const percent = parseInt(percentage);
                
                const skillItem = document.createElement('div');
                skillItem.innerHTML = `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.2rem;">
                        <span style="font-size: 0.8rem; color: var(--text-secondary);">${name}</span>
                        <span style="font-size: 0.8rem; color: var(--neon-cyan);">${percent}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-fill" style="animation-delay: ${Math.random() * 2}s; --fill-width: ${percent}%;"></div>
                    </div>
                `;
                progressContainer.appendChild(skillItem);
            });
            
            category.appendChild(progressContainer);
        }
    });
}

function animateSkillBars(category) {
    const skillFills = category.querySelectorAll('.skill-fill');
    skillFills.forEach((fill, index) => {
        setTimeout(() => {
            const width = fill.style.getPropertyValue('--fill-width');
            fill.style.transform = `scaleX(${parseInt(width) / 100})`;
        }, index * 200);
    });
}

// Glitch effect for special elements
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.setAttribute('data-text', element.textContent);
        
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 0.3s infinite';
            setTimeout(() => {
                element.style.animation = '';
            }, 1000);
        });
    });
}

// Enhanced typing effect
function initTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const phrases = [
            'Crafting digital experiences through code and creativity',
            'Building the future with embedded systems',
            'Transforming ideas into innovative solutions',
            'Engineering tomorrow\'s technology today'
        ];
        
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const current = phrases[currentPhrase];
            
            if (isDeleting) {
                tagline.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                tagline.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }
            
            if (!isDeleting && currentChar === current.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, speed);
        }
        
        // Start typing effect after initial animation
        setTimeout(typeWriter, 3000);
    }
}

// Scroll effects
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Add CSS for skill bars
const skillBarCSS = `
.skill-fill {
    transform: scaleX(0);
    transition: transform 1s ease-out;
}
`;

const style = document.createElement('style');
style.textContent = skillBarCSS;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Activate special effects
        document.body.style.animation = 'rainbow 2s infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            document.head.removeChild(style);
        }, 5000);
        
        konamiCode = [];
    }
});

// Floating Action Button functionality
function scrollToTerminal() {
    const terminal = document.querySelector('.terminal');
    if (terminal) {
        terminal.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Focus on terminal input
        setTimeout(() => {
            const input = terminal.querySelector('.terminal-input');
            if (input) input.focus();
        }, 500);
    }
}

// Advanced animations and effects
function initAdvancedEffects() {
    // Cursor trail effect
    let mouseTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        if (mouseTrail.length >= maxTrailLength) {
            const oldTrail = mouseTrail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = 'var(--neon-cyan)';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.opacity = '0.7';
        trail.style.transition = 'all 0.5s ease-out';
        
        document.body.appendChild(trail);
        mouseTrail.push(trail);
        
        // Fade out trail
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        }, 50);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 600);
    });
    
    // Dynamic favicon
    updateFavicon();
    
    // Performance monitoring
    monitorPerformance();
}

function updateFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Draw a simple circuit-like favicon
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, 32, 32);
    
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(4, 16);
    ctx.lineTo(12, 16);
    ctx.lineTo(16, 8);
    ctx.lineTo(24, 8);
    ctx.lineTo(28, 16);
    ctx.stroke();
    
    // Add a small dot
    ctx.fillStyle = '#39ff14';
    ctx.beginPath();
    ctx.arc(16, 16, 3, 0, Math.PI * 2);
    ctx.fill();
    
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = canvas.toDataURL();
    
    const existingFavicon = document.querySelector("link[rel*='icon']");
    if (existingFavicon) {
        document.head.removeChild(existingFavicon);
    }
    document.head.appendChild(link);
}

function monitorPerformance() {
    const performanceData = {
        loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
        domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
    };
    
    console.log('🚀 Portfolio Performance Metrics:', performanceData);
    
    // Add performance indicator to terminal
    setTimeout(() => {
        const terminal = document.querySelector('.terminal-output');
        if (terminal) {
            const perfLine = document.createElement('div');
            perfLine.innerHTML = `
                <div style="color: var(--neon-blue); margin: 0.5rem 0;">
                    [SYSTEM] Performance: Load ${performanceData.loadTime}ms | DOM ${performanceData.domReady}ms
                </div>
            `;
            terminal.appendChild(perfLine);
        }
    }, 2000);
}

// Initialize advanced effects
document.addEventListener('DOMContentLoaded', () => {
    initAdvancedEffects();
});

// Add some interactive sound effects (optional)
function playBeep(frequency = 440, duration = 100) {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

// Add sound to terminal commands
const originalTerminalCommand = document.addEventListener;
document.addEventListener('keypress', (e) => {
    if (e.target.classList.contains('terminal-input') && e.key === 'Enter') {
        playBeep(800, 50);
    }
});
