// Limitations page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Animate risk categories on scroll
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
                }, index * 200);
            }
        });
    }, observerOptions);
    
    // Observe risk categories
    document.querySelectorAll('.risk-category').forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(50px)';
        category.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(category);
    });
    
    // Add interactive functionality to checklist items
    const checkboxes = document.querySelectorAll('.action-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            const actionItem = this.closest('.action-item');
            
            if (this.checked) {
                actionItem.style.background = 'rgba(47, 122, 58, 0.15)';
                actionItem.style.borderColor = 'var(--primary-green)';
                
                // Add checkmark animation
                const checkmark = document.createElement('div');
                checkmark.className = 'checkmark';
                checkmark.innerHTML = '✓';
                checkmark.style.cssText = `
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: var(--primary-green);
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: bold;
                    animation: fadeInScale 0.3s ease;
                `;
                
                actionItem.style.position = 'relative';
                actionItem.appendChild(checkmark);
                
                // Show completion message
                setTimeout(() => {
                    showCompletionMessage(label.textContent);
                }, 500);
            } else {
                actionItem.style.background = '';
                actionItem.style.borderColor = '';
                const checkmark = actionItem.querySelector('.checkmark');
                if (checkmark) {
                    checkmark.remove();
                }
            }
        });
    });
    
    // Add hover effects to strategy items
    document.querySelectorAll('.strategy-item, .vector-item, .principle-card, .challenge-card').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Risk severity color coding interaction
    document.querySelectorAll('.risk-severity').forEach(severity => {
        severity.addEventListener('click', function() {
            const riskType = this.textContent.toLowerCase().replace(/\s+/g, '-');
            const riskCategory = this.closest('.risk-category');
            
            // Highlight the risk category
            riskCategory.style.borderColor = getRiskBorderColor(riskType);
            riskCategory.style.boxShadow = `0 4px 20px ${getRiskColor(riskType)}40`;
            
            // Show risk details overlay
            showRiskDetailsOverlay(riskType);
        });
    });
    
    // Add copy functionality to mitigation strategies
    document.querySelectorAll('.strategy-item p, .dependency-item p').forEach(textElement => {
        textElement.style.cursor = 'pointer';
        textElement.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showToast('Strategy copied to clipboard', 'success');
            });
        });
    });
    
    // Timeline phase interaction
    document.querySelectorAll('.timeline-item').forEach(timelineItem => {
        timelineItem.addEventListener('click', function() {
            // Toggle detailed view
            const content = this.querySelector('.timeline-content');
            const phase = this.querySelector('.timeline-phase');
            
            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                content.style.maxHeight = '0px';
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';
                phase.innerHTML = phase.innerHTML.replace(' ↖', '') + ' →';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.paddingTop = '1rem';
                content.style.paddingBottom = '1rem';
                phase.innerHTML = phase.innerHTML.replace(' →', '') + ' ↖';
            }
        });
    });
    
    // Risk level cards interactive effects
    document.querySelectorAll('.risk-level').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '';
        });
    });
});

// Helper functions
function getRiskColor(riskType) {
    switch(riskType) {
        case 'high-risk':
            return '#dc2626';
        case 'critical-risk':
            return '#b91c1c';
        case 'medium-risk':
            return '#f59e0b';
        default:
            return 'var(--accent-green)';
    }
}

function getRiskBorderColor(riskType) {
    switch(riskType) {
        case 'high-risk':
            return '#dc2626';
        case 'critical-risk':
            return '#b91c1c';
        case 'medium-risk':
            return '#f59e0b';
        default:
            return 'var(--accent-green)';
    }
}

function showRiskDetailsOverlay(riskType) {
    const overlay = document.createElement('div');
    overlay.className = 'risk-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
  }
}
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: var(--dark-slate);
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid rgba(47, 122, 58, 0.3);
        max-width: 600px;
        margin: 2rem;
        animation: slideInUp 0.3s ease;
    `;
    
    modal.innerHTML = `
        <h2 style="color: var(--accent-green); margin-bottom: 1rem;">${riskType.replace('-', ' ').toUpperCase()}</h2>
        <p style="line-height: 1.6; margin-bottom: 2rem;">Detailed risk assessment and mitigation strategies for this category.</p>
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button onclick="this.closest('.risk-overlay').remove()" style="background: var(--medium-slate); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer;">Close</button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Close on background click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            overlay.remove();
        }
    });
}

function showCompletionMessage(taskDescription) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--primary-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    toast.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 0.5rem;">✓ Task Completed</div>
        <div style="font-size: 0.9rem; opacity: 0.9;">${taskDescription.substring(0, 60)}...</div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'var(--primary-green)' : 
                   type === 'error' ? '#dc2626' : 
                   'var(--medium-slate)';
    
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 6px;
        font-weight: 500;
        z-index: 10000;
        animation: fadeInUp 0.3s ease;
    `;
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOutDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations to the document
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: translateY(-50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translateY(-50%) scale(1);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(30px);
        }
    }
`;
document.head.appendChild(style);

// Progress tracking for action items
function updateProgressPercentage() {
    const totalItems = document.querySelectorAll('.action-item input[type="checkbox"]').length;
    const completedItems = document.querySelectorAll('.action-item input[type="checkbox"]:checked').length;
    const percentage = Math.round((completedItems / totalItems) * 100);
    
    // Update progress indicator if it exists
    const progressIndicator = document.querySelector('.progress-indicator');
    if (progressIndicator) {
        progressIndicator.style.width = `${percentage}%`;
        progressIndicator.nextElementSibling.textContent = `${percentage}% Complete`;
    }
}

// Listen for checkbox changes to update progress
document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && e.target.closest('.action-item')) {
        updateProgressPercentage();
    }
});

// Initialize progress tracking
updateProgressPercentage();
