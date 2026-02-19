let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

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

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

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