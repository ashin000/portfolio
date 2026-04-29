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
// EMAILJS CONTACT FORM
// =========================

// Initialize EmailJS
emailjs.init('service_3756enz');  // Add your Service ID here

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

        // Send email
        emailjs.send('service_3756enz', 'template_r2i5z6f', templateParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);

                // Show success message
                const formMessage = document.getElementById('formMessage');
                formMessage.className = 'alert alert-success mt-3';
                formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
                formMessage.classList.remove('d-none');

                // Reset form
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('d-none');
                }, 5000);
            }, function(error) {
                console.log('Email send failed:', error);

                // Show error message
                const formMessage = document.getElementById('formMessage');
                formMessage.className = 'alert alert-danger mt-3';
                formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again or contact me directly.';
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