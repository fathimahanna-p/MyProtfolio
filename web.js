const menuIcon = document.querySelector('#menu-icon');
const menuIconGraphic = menuIcon?.querySelector('i');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('active');
        menuIconGraphic.classList.toggle('bx-menu', !isOpen);
        menuIconGraphic.classList.toggle('bx-x', isOpen);
        menuIcon.setAttribute('aria-expanded', String(isOpen));
        menuIcon.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    navbar.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuIconGraphic.classList.add('bx-menu');
            menuIconGraphic.classList.remove('bx-x');
            menuIcon.setAttribute('aria-expanded', 'false');
            menuIcon.setAttribute('aria-label', 'Open menu');
        });
    });

    window.addEventListener('scroll', () => {
        navbar.classList.remove('active');
        menuIconGraphic.classList.add('bx-menu');
        menuIconGraphic.classList.remove('bx-x');
        menuIcon.setAttribute('aria-expanded', 'false');
        menuIcon.setAttribute('aria-label', 'Open menu');
    });
}

if (typeof ScrollReveal === 'function') {
    ScrollReveal({
        reset: true,
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .project-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .abt-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .abt-content', { origin: 'right' });
}

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const data = new FormData(event.target);

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.innerHTML = "Thanks for your submission!";
                formStatus.style.color = "#4caf50"; // Green for success
                form.reset();
            } else {
                const result = await response.json();
                if (Object.hasOwn(result, 'errors')) {
                    formStatus.innerHTML = result["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.innerHTML = "Oops! There was a problem submitting your form";
                }
                formStatus.style.color = "red";
            }
        } catch (error) {
            formStatus.innerHTML = "Oops! There was a problem submitting your form";
            formStatus.style.color = "red";
        }
    });
}
