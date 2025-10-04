// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navSection = document.querySelector('.nav-section');
    const navCta = document.querySelector('.nav-cta');
    
    if (navToggle && navSection) {
        navToggle.addEventListener('click', function() {
            navSection.classList.toggle('active');
            navCta.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
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
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
    
    // Animate feature tiles on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature tiles for animation
    document.querySelectorAll('.feature-tile').forEach(tile => {
        tile.style.opacity = '0';
        tile.style.transform = 'translateY(20px)';
        tile.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(tile);
    });
    
    // Defense animations interaction
    const defenseAnimations = document.querySelector('.defense-animations');
    if (defenseAnimations) {
        // Add click interaction to neural network
        const neuralNodes = document.querySelectorAll('.neural-node');
        neuralNodes.forEach(node => {
            node.addEventListener('click', function() {
                this.style.animation = 'nodePulse 0.5s ease-in-out';
                setTimeout(() => {
                    this.style.animation = 'nodePulse 2s ease-in-out infinite';
                }, 500);
            });
        });
        
        // Add hover effect to drone
        const drone = document.querySelector('.drone');
        if (drone) {
            drone.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            drone.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    }
    
    // Add performance optimization for animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        const defenseAnimations = document.querySelector('.defense-animations');
        if (defenseAnimations) {
            defenseAnimations.style.display = 'none';
        }
    }
    
    // Add parallax effect to hero content on scroll
    window.addEventListener('scroll', function() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && window.scrollY < window.innerHeight) {
            const scrolled = window.scrollY;
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
    });
});
