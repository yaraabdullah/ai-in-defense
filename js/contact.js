// Contact page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
    
    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Real-time form validation
        const requiredFields = contactForm.querySelectorAll('input[required], textarea[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
        });
        
        // Enhanced email validation
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('input', function() {
                validateEmail(this);
            });
        }
    }
    
    // Animate cards on scroll
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
                }, index * 150);
            }
        });
    }, observerOptions);
    
    // Observe contact cards
    document.querySelectorAll('.contact-card, .engagement-card, .contact-form-card, .location-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Engagement category interaction
    document.querySelectorAll('.engagement-category').forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Contact method interaction
    document.querySelectorAll('.contact-method').forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(47, 122, 58, 0.05)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
    
    // Copy contact information functionality
    document.querySelectorAll('.contact-method a[href^="mailto:"], .contact-method a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a subtle highlight effect
            this.style.background = 'rgba(47, 122, 58, 0.1)';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
        });
    });
});

// FAQ toggle function
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('.faq-icon');
    
    // Close other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-icon');
            otherAnswer.classList.remove('show');
            otherIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ
    faqItem.classList.toggle('active');
    
    if (answer.classList.contains('show')) {
        answer.classList.remove('show');
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.classList.add('show');
        icon.style.transform = 'rotate(45deg)';
    }
}

// Form validation and submission
function handleFormSubmission(form) {
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.querySelector('.button-text').textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.querySelector('.button-text').textContent = 'Sending...';
    
    // Validate form
    const isValid = validateForm(form);
    
    if (!isValid) {
        // Reset button state
        submitButton.disabled = false;
        submitButton.querySelector('.button-text').textContent = originalText;
        return;
    }
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // Show success message
        showSubmissionSuccess();
        
        // Reset form
        form.reset();
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.querySelector('.button-text').textContent = originalText;
        
        // Clear validation states
        clearFormValidation(form);
        
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Checkboxes validation
    const privacyCheckbox = document.getElementById('privacy-agreement');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        showFieldError(privacyCheckbox, 'You must agree to the privacy policy');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Clear previous error states
    clearFieldError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${field.getAttribute('name') || fieldName} is required`);
        return false;
    }
    
    // Specific validations
    switch (fieldType) {
        case 'email':
            return validateEmail(field);
        case 'text':
            if (fieldName === 'name' && value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters long');
                return false;
            }
            if (fieldName === 'subject' && value.length < 5) {
                showFieldError(field, 'Subject must be at least 5 characters long');
                return false;
            }
            break;
    }
    
    // Textarea validation
    if (field.tagName === 'TEXTAREA' && value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters long');
        return false;
    }
    
    return true;
}

function validateEmail(emailField) {
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        showFieldError(emailField, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: slideInError 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorElement);
    field.style.borderColor = '#dc2626';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

function clearFormValidation(form) {
    const errorElements = form.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());
    
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        field.style.borderColor = '';
    });
}

function showSubmissionSuccess() {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="modal-content">
            <div class="success-icon">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="24" fill="#059669"/>
                    <path d="M20 32L28 40L44 24" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h2>Inquiry Sent Successfully</h2>
            <p>Thank you for your interest in AI Defense research collaboration. We will respond to your inquiry within 2-3 business days.</p>
            <div class="modal-actions">
                <button onclick="this.closest('.success-modal').remove()" class="close-button">
                    Close
                </button>
            </div>
        </div>
    `;
    
    successModal.style.cssText = `
        position: fixed;
        top: 0;
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
    
    const modalContent = successModal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: var(--dark-slate);
        padding: 3rem;
        border-radius: 12px;
        border: 1px solid rgba(47, 122, 58, 0.3);
        max-width: 500px;
        margin: 2rem;
        text-align: center;
        animation: slideInUp 0.3s ease;
    `;
    
    successModal.querySelector('h2').style.cssText = `
        color: var(--accent-green);
        margin-bottom: 1rem;
        font-size: 1.8rem;
    `;
    
    successModal.querySelector('p').style.cssText = `
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 2rem;
    `;
    
    successModal.querySelector('.success-icon').style.cssText = `
        width: 64px;
        height: 64px;
        margin: 0 auto 1.5rem;
    `;
    
    successModal.querySelector('.close-button').style.cssText = `
        background: var(--primary-green);
        color: white;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: background-color 0.3s ease;
    `;
    
    successModal.querySelector('.close-button').addEventListener('mouseenter', function() {
        this.style.background = 'var(--secondary-green)';
    });
    
    successModal.querySelector('.close-button').addEventListener('mouseleave', function() {
        this.style.background = 'var(--primary-green)';
    });
    
    document.body.appendChild(successModal);
    
    // Close on background click
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.remove();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.parentNode) {
            successModal.remove();
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInError {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
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
`;
document.head.appendChild(style);

// Auto-populate fields based on inquiry type
document.addEventListener('change', function(e) {
    if (e.target.id === 'inquiry-type') {
        const inquiryType = e.target.value;
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        if (subjectField && messageField) {
            switch (inquiryType) {
                case 'research':
                    subjectField.value = subjectField.value || 'Research Collaboration Inquiry';
                    break;
                case 'advisory':
                    subjectField.value = subjectField.value || 'Advisory Services Consultation';
                    break;
                case 'partnership':
                    subjectField.value = subjectField.value || 'Partnership Development Inquiry';
                    break;
                case 'industry':
                    subjectField.value = subjectField.value || 'Industry Outreach';
                    break;
                case 'general':
                    subjectField.value = subjectField.value || 'General Information Request';
                    break;
            }
        }
    }
});

// Add hover effects to contact methods
document.querySelectorAll('.contact-method').forEach(method => {
    move.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(4px)';
    });
    
    method.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});
