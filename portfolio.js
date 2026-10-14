const root = document.documentElement;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);   
        }
    });
}, { threshold: 0.4 });                         

document.querySelectorAll('.slide-down').forEach((el) => observer.observe(el));

const toggle = document.querySelector('#theme-toggle');

function applyTheme(theme) {
    root.dataset.theme = theme;                          
    toggle.setAttribute('aria-checked', theme === 'dark');
    localStorage.setItem('theme', theme);
}

const initial = localStorage.getItem('theme') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(initial);

function flip() {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
}

toggle.addEventListener('click', flip);
toggle.addEventListener('keydown', (e) => {              
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
    }
});

document.getElementById('name').addEventListener('input', function () {
    let name = this.value;

    if(/^[A-Za-z ]+$/.test(name)) {
        document.getElementById('nameError').innerHTML = "";
    } else {
        document.getElementById('nameError').innerHTML = "Only letters allowed.";
    }
});

document.getElementById('email').addEventListener('input', function () {
    let email = this.value;
    let pattern = /[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(pattern.test(email)) {
        document.getElementById('emailError').innerHTML = "";
    } else {
        document.getElementById('emailError').innerHTML="Invalid email.";
    }
});

document.getElementById('subject').addEventListener('input', function () {
    let subject = this.value;

    if(/^[A-Za-z ]+$/.test(subject)) {
        document.getElementById('subjectError').innerHTML = "";
    } else {
        document.getElementById('subjectError').innerHTML = "Subject is required.";
    }
});

document.getElementById('message').addEventListener('input', function () {
    let message = this.value;

    if(/^[A-Za-z ]+$/.test(message)) {
        document.getElementById('messageError').innerHTML = "";
    } else {
        document.getElementById('messageError').innerHTML = "Message is required";
    }
});

document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;

    if((
        document.getElementById('nameError').innerHTML === "" &&
        document.getElementById('emailError').innerHTML === "" && 
        document.getElementById('subjectError').innerHTML === "" &&
        document.getElementById('messageError').innerHTML === ""
    ) && (name !== '' && email !== '' & subject !== '' && message !== '')) {
        document.getElementById('result').innerHTML = "Success!";
    }
    else {
        document.getElementById('result').innerHTML = "Please fill the required fields";
    }
    
});