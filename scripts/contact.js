// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            
            // Convert FormData to regular object
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    // Handle multiple checkboxes with same name
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }
            
            // Get checked technologies
            const technologies = [];
            const techCheckboxes = document.querySelectorAll('input[name="technologies"]:checked');
            techCheckboxes.forEach(checkbox => {
                technologies.push(checkbox.value);
            });
            data.technologies = technologies;
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'projectType', 'message'];
            const missingFields = [];
            
            requiredFields.forEach(field => {
                if (!data[field] || data[field].trim() === '') {
                    missingFields.push(field);
                }
            });
            
            if (missingFields.length > 0) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email
            if (!validateEmail(data.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Create email content
            const emailSubject = `Code 8 Contact: ${data.projectType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} - ${data.name}`;
            const emailBody = createEmailBody(data);
            
            // Create mailto link
            const mailtoLink = `mailto:boy.maas@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form and show success message
            setTimeout(() => {
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showFormMessage('Your message has been prepared! Please send the email that just opened in your email client.', 'success');
            }, 1000);
        });
    }
    
    // Smooth scroll to form when clicking "Use Form Above" button
    const formButton = document.querySelector('a[href="#contactForm"]');
    if (formButton) {
        formButton.addEventListener('click', function(e) {
            e.preventDefault();
            const form = document.getElementById('contactForm');
            if (form) {
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Focus on first input after scroll
                setTimeout(() => {
                    const firstInput = form.querySelector('input[type="text"]');
                    if (firstInput) firstInput.focus();
                }, 500);
            }
        });
    }
});

function createEmailBody(data) {
    let body = `Hello Boy,\n\nI'm interested in working with Code 8 on a blockchain project. Here are the details:\n\n`;
    
    body += `Name: ${data.name}\n`;
    body += `Email: ${data.email}\n`;
    if (data.company) body += `Company: ${data.company}\n`;
    body += `\nProject Type: ${data.projectType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
    
    if (data.timeline) {
        body += `Timeline: ${data.timeline.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
    }
    
    if (data.budget) {
        body += `Budget: ${data.budget.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
    }
    
    if (data.technologies && data.technologies.length > 0) {
        body += `Technologies: ${data.technologies.map(tech => tech.charAt(0).toUpperCase() + tech.slice(1)).join(', ')}\n`;
    }
    
    body += `\nProject Description:\n${data.message}\n\n`;
    body += `Best regards,\n${data.name}`;
    
    return body;
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert before submit button
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    submitButton.parentNode.insertBefore(messageDiv, submitButton);
    
    // Auto-remove after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Form validation styles
const style = document.createElement('style');
style.textContent = `
    .form-message {
        padding: var(--space-md);
        border-radius: var(--border-radius);
        margin-bottom: var(--space-md);
        font-weight: 500;
    }
    
    .form-message.success {
        background: rgba(0, 255, 136, 0.1);
        border: 1px solid var(--accent-primary);
        color: var(--accent-primary);
    }
    
    .form-message.error {
        background: rgba(255, 68, 68, 0.1);
        border: 1px solid var(--accent-error);
        color: var(--accent-error);
    }
    
    .form-group input:invalid,
    .form-group textarea:invalid,
    .form-group select:invalid {
        border-color: var(--accent-error);
    }
    
    .form-group input:valid,
    .form-group textarea:valid,
    .form-group select:valid {
        border-color: var(--accent-primary);
    }
`;
document.head.appendChild(style);