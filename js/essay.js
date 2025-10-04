// Essay-specific JavaScript functionality

function toggleAppendix() {
    const appendix = document.getElementById('appendix-content');
    const button = document.querySelector('.toggle-appendix');
    
    if (appendix.classList.contains('show')) {
        appendix.classList.remove('show');
        button.textContent = 'Show Technical Appendix';
        button.style.marginBottom = '2rem';
    } else {
        appendix.classList.add('show');
        button.textContent = 'Hide Technical Appendix';
        button.style.marginBottom = '2rem';
    }
}

// Smooth scrolling for table of contents links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling behavior to ToC links
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Highlight the target section briefly
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Highlight current section in ToC while scrolling
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -60%',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all ToC links
                tocLinks.forEach(link => {
                    link.style.color = '';
                    link.style.fontWeight = '';
                });
                
                // Add active styling to current section link
                const correspondingLink = document.querySelector(`.table-of-contents a[href="#${entry.target.id}"]`);
                if (correspondingLink) {
                    correspondingLink.style.color = 'var(--accent-green)';
                    correspondingLink.style.fontWeight = '600';
                }
            }
        });
    }, observerOptions);
    
    // Observe all essay sections
    const essaySections = document.querySelectorAll('.essay-section');
    essaySections.forEach(section => {
        observer.observe(section);
    });
    
    // Add syntax highlighting for code blocks if any exist
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
    
    // Print functionality for essay
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Essay';
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
    
    // Copy citation functionality
    const citations = document.querySelectorAll('.citation-list li');
    citations.forEach(citation => {
        citation.style.cursor = 'pointer';
        citation.addEventListener('click', function() {
            const text = this.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                .style.backgroundColor = 'var(--accent-green)';
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 1000);
            });
        });
        
        citation.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(47, 122, 58, 0.1)';
        });
        
        citation.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});
