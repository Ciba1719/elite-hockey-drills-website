// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Countdown Timer
const countdownElement = document.getElementById('countdown');

if (countdownElement) {
    const updateCountdown = () => {
        const now = new Date().getTime();
        // Set end time to 48 hours from now for demonstration
        // In a real scenario, this would be a fixed date/time
        const endTime = now + (48 * 60 * 60 * 1000); 

        const distance = endTime - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "EXPIRED";
        }
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // In a real application, you would send this data to a server
        console.log('Form submitted!');
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification styles
const notificationCSS = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #fff;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    border-left: 4px solid #f4c430;
}

.notification.success i {
    color: #f4c430;
}

.notification.error {
    border-left: 4px solid #e74c3c;
}

.notification.error i {
    color: #e74c3c;
}
`;

const notificationStyle = document.createElement('style');
notificationStyle.textContent = notificationCSS;
document.head.appendChild(notificationStyle);

// New Typewriter Effect for Hero Title
const heroTitleElement = document.getElementById('hero-title-element');
const textToType = 'WHERE <span class="highlight standout">CHAMPIONS</span><br>ARE MADE';
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        const char = textToType.charAt(charIndex);
        if (char === '<') {
            // Find the end of the tag
            const endIndex = textToType.indexOf('>', charIndex);
            if (endIndex !== -1) {
                const tag = textToType.substring(charIndex, endIndex + 1);
                heroTitleElement.innerHTML += tag;
                charIndex = endIndex + 1;
            } else {
                heroTitleElement.innerHTML += char;
                charIndex++;
            }
        } else {
            heroTitleElement.innerHTML += char;
            charIndex++;
        }
        setTimeout(typeWriter, 50); // Adjust typing speed here (milliseconds)
    } else {
        // Once typing is complete, make sure opacity is 1
        heroTitleElement.style.opacity = '1';
        heroTitleElement.classList.add('pulse-glow');
    }
}

// Trigger typewriter effect on page load
document.addEventListener('DOMContentLoaded', () => {
    heroTitleElement.style.opacity = '0'; // Ensure it's hidden before typing
    heroTitleElement.innerHTML = ''; // Clear any initial content
    setTimeout(typeWriter, 500); // Small delay before starting typing
});
