let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active');
}

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