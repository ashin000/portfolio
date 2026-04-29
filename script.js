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



const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_email: 'ashin637416@gmail.com'
        };

        // Show loading message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formMessage = document.getElementById('formMessage');

        // Send email using EmailJS REST API directly (no SDK needed)
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: 'service_3756enz',
                template_id: 'template_r2i5z6f',
                user_id: 'zQxYkII2Rq4YuHBYB',
                template_params: templateParams
            })
        })
        .then(function(response) {
            if (response.ok) {
                console.log('Email sent successfully!');

                // Show success message
                formMessage.className = 'alert alert-success mt-3';
                formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
                formMessage.classList.remove('d-none');

                // Reset form
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('d-none');
                }, 5000);
            } else {
                return response.text().then(function(errorText) {
                    throw new Error(errorText || 'Failed to send email');
                });
            }
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