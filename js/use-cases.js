// Use Cases page JavaScript functionality

function toggleCapability(capabilityId) {
    const details = document.getElementById(`${capabilityId}-details`);
    const button = details.previousElementSibling.querySelector('.expand-button');
    const card = details.closest('.capability-card');
    
    if (details.classList.contains('show')) {
        // Close the details
        details.classList.remove('show');
        button.textContent = 'Detailed Analysis →';
        button.style.transform = 'rotate(0deg)';
        card.style.height = '';
    } else {
        // Close any open details first
        document.querySelectorAll('.capability-details.show').forEach(openDetails => {
            if (openDetails !== details) {
                openDetails.classList.remove('show');
                const openButton = openDetails.previousElementSibling.querySelector('.expand-button');
                openButton.textContent = 'Detailed Analysis →';
                openButton.style.transform = 'rotate(0deg)';
            }
        });
        
        // Open this capability's details
        details.classList.add('show');
        button.textContent = 'Hide Analysis ↖';
        button.style.transform = 'rotate(180deg)';
        
        // Scroll to ensure the expanded content is visible
        setTimeout(() => {
            details.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
}

// Initialize capability cards animation
document.addEventListener('DOMContentLoaded', function() {
    // Animate capability cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150); // Stagger animation
            }
        });
    }, observerOptions);
    
    // Observe capability cards
    document.querySelectorAll('.capability-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add metric hover effects
    document.querySelectorAll('.metric').forEach(metric => {
        metric.addEventListener('mouseenter', function() {
            this.style.background = 'var(--accent-green)';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';
        });
        
        metric.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(47, 122, 58, 0.2)';
            this.style.color = 'var(--accent-green)';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add copy functionality to KPI values
    document.querySelectorAll('.kpi-metric').forEach(kpi => {
        kpi.style.cursor = 'pointer';
        kpi.addEventListener('click', function() {
            const value = this.textContent;
            navigator.clipboard.writeText(value).then(() => {
                const originalValue = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalValue;
                }, 1000);
            });
        });
    });
    
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
    
    // Add capability filtering/search functionality
    if (window.location.hash) {
        const targetCapability = window.location.hash.substring(1);
        const targetCard = document.querySelector(`[data-capability="${targetCapability}"]`);
        if (targetCard) {
            const targetDetails = targetCard.querySelector('.capability-details');
            if (targetDetails) {
                // Scroll to the card and expand it
                setTimeout(() => {
                    targetCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    toggleCapability(targetCapability);
                }, 500);
            }
        }
    }
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Capabilities';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-green);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    printButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--secondary-green)';
        this.style.transform = 'translateY(-2px)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--primary-green)';
        this.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(printButton);
});

// Add keyboard navigation for capability cards
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open capability details
        document.querySelectorAll('.capability-details.show').forEach(details => {
            details.classList.remove('show');
            const button = details.previousElementSibling.querySelector('.expand-button');
            button.textContent = 'Detailed Analysis →';
            button.style.transform = 'rotate(0deg)';
        });
    }
});
