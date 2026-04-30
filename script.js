// =========================
// THEME TOGGLE
// =========================

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeToggleIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
});

function updateThemeToggleIcon(theme) {
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Update navbar colors on theme change
function updateNavbarTheme() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            navbar.classList.remove('navbar-dark');
            navbar.classList.add('navbar-light');
        } else {
            navbar.classList.remove('navbar-light');
            navbar.classList.add('navbar-dark');
        }
    }
}

// Call on page load and when theme changes
window.addEventListener('load', updateNavbarTheme);
const themeObserver = new MutationObserver(updateNavbarTheme);
themeObserver.observe(body, { attributes: true, attributeFilter: ['data-theme'] });



// =========================
// EMAILJS CONFIGURATION
// =========================
const EMAILJS_CONFIG = {
    serviceId: 'service_3756enz',
    notifyTemplateId: 'template_j8fax3l',             // Template that sends the contact message TO YOU
    autoReplyTemplateId: 'template_r2i5z6f',           // Template that sends confirmation TO THE SENDER
    userId: 'zQxYkII2Rq4YuHBYB'
};

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const senderName = document.getElementById('name').value;
        const senderEmail = document.getElementById('email').value;
        const messageSubject = document.getElementById('subject').value;
        const messageBody = document.getElementById('message').value;

        // Parameters for the notification email (sent TO YOU)
        const notifyParams = {
            to_email: 'ashin637416@gmail.com',
            name: senderName,
            email: senderEmail,
            title: messageSubject,
            message: messageBody
        };

        // Parameters for the auto-reply email (sent TO THE SENDER)
        const autoReplyParams = {
            to_email: senderEmail,
            name: senderName,
            from_name: senderName,
            email: senderEmail,
            title: messageSubject,
            subject: messageSubject,
            message: messageBody
        };

        // Show loading message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formMessage = document.getElementById('formMessage');

        // Helper function to send an email via EmailJS REST API
        function sendEmail(templateId, templateParams) {
            return fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service_id: EMAILJS_CONFIG.serviceId,
                    template_id: templateId,
                    user_id: EMAILJS_CONFIG.userId,
                    template_params: templateParams
                })
            }).then(function(response) {
                if (!response.ok) {
                    return response.text().then(function(errorText) {
                        throw new Error(errorText || 'Failed to send email');
                    });
                }
                return response;
            });
        }

        // Send BOTH emails: notification to you + auto-reply to the sender
        Promise.all([
            sendEmail(EMAILJS_CONFIG.notifyTemplateId, notifyParams),
            sendEmail(EMAILJS_CONFIG.autoReplyTemplateId, autoReplyParams)
        ])
        .then(function() {
            console.log('Both emails sent successfully!');

            // Show success message
            formMessage.className = 'alert alert-success mt-3';
            formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! A confirmation has been sent to your email. I\'ll get back to you soon.';
            formMessage.classList.remove('d-none');

            // Reset form
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('d-none');
            }, 5000);
        })
        .catch(function(error) {
            console.error('Email send failed:', error);

            // Show error message
            formMessage.className = 'alert alert-danger mt-3';
            formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Error: ' + (error.message || 'Unknown error');
            formMessage.classList.remove('d-none');
        })
        .finally(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}



// =========================
// SCROLL ANIMATION
// =========================

const elements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

elements.forEach(el => observer.observe(el));


// =========================
// SKILL BAR ANIMATION
// =========================

const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('style');
            bar.style.width = width;
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    bar.style.width = "0";
    skillObserver.observe(bar);
});