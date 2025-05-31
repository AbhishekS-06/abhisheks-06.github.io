// Add smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initCarousels();
    initIntersectionObserver();
    initTypedEffect();
});

function initAnimations() {
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

function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Mouse events for drag scrolling
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
                carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
            }
        });

        // Make carousel focusable
        carousel.setAttribute('tabindex', '0');
        carousel.style.cursor = 'grab';
    });
}

function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    document.querySelectorAll('section, .skill-category, .project-card, .carousel-item').forEach(el => {
        el.classList.remove('animate-in');
        observer.observe(el);
    });
}

function initTypedEffect() {
    if (document.querySelector('.tagline')) {
        const tagline = document.querySelector('.tagline');
        const words = [
            'Crafting digital experiences through code and creativity',
            'Building innovative solutions with passion',
            'Transforming ideas into reality'
        ];
        let currentIndex = 0;
        
        function typeWord(word) {
            let i = 0;
            tagline.textContent = '';
            const interval = setInterval(() => {
                if (i < word.length) {
                    tagline.textContent += word[i];
                    i++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        deleteWord(word);
                    }, 2000);
                }
            }, 50);
        }
        
        function deleteWord(word) {
            let i = word.length;
            const interval = setInterval(() => {
                if (i > 0) {
                    tagline.textContent = word.substring(0, i - 1);
                    i--;
                } else {
                    clearInterval(interval);
                    currentIndex = (currentIndex + 1) % words.length;
                    setTimeout(() => {
                        typeWord(words[currentIndex]);
                    }, 500);
                }
            }, 30);
        }
        
        typeWord(words[currentIndex]);
    }
}

// Add hover effects for skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'translateY(-5px)';
    });

    category.addEventListener('mouseleave', () => {
        category.style.transform = 'translateY(0)';
    });
});
