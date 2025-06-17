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

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    }
}

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const endTime = now + (2 * 24 * 60 * 60 * 1000); // 2 days from now
    
    const distance = endTime - now;
    
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
    const animateElements = document.querySelectorAll(".plan-card, .testimonial-card, .trust-item");
    animateElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
});

// Contact Form Handling
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const interest = formData.get("interest");
    const message = formData.get("message");
    
    // Simple form validation
    if (!name || !email || !interest || !message) {
        alert("Please fill in all fields");
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector("button[type=\"submit\"]");
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = "<i class=\"fas fa-spinner fa-spin\"></i> Sending...";
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert("Thank you for your message! We\"ll get back to you within 24 hours.");
        this.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Play video function (placeholder)
function playVideo() {
    alert("Video player would open here. This is a demo version.");
}

// Add click handlers for plan buttons
document.querySelectorAll(".plan-btn").forEach(button => {
    button.addEventListener("click", function() {
        const planTitle = this.closest(".plan-card").querySelector(".plan-title").textContent;
        alert(`You selected: ${planTitle}\n\nThis would redirect to the checkout page in a real implementation.`);
    });
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Add scroll to top button
const scrollTopButton = document.createElement("button");
scrollTopButton.innerHTML = "<i class=\"fas fa-arrow-up\"></i>";
scrollTopButton.className = "scroll-top-btn";
scrollTopButton.onclick = scrollToTop;
document.body.appendChild(scrollTopButton);

// Add CSS for scroll to top button
const scrollTopCSS = `
.scroll-top-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #f4c430, #e6b800);
    color: #1a2332;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(244, 196, 48, 0.3);
}

.scroll-top-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(244, 196, 48, 0.4);
}

.scroll-top-btn.visible {
    opacity: 1;
    visibility: visible;
}

@media (max-width: 768px) {
    .scroll-top-btn {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
    }
}
`;

const style = document.createElement("style");
style.textContent = scrollTopCSS;
document.head.appendChild(style);

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add("visible");
    } else {
        scrollTopButton.classList.remove("visible");
    }
});

// Add loading animation
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

// Initial page load animation
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector(".hero-background");
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add dynamic stats counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector(".stat-number");
            const target = parseInt(statNumber.textContent.replace(/\D/g, ""));
            animateCounter(statNumber, target);
            counterObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll(".stat").forEach(stat => {
    counterObserver.observe(stat);
});

// Add dynamic testimonial rotation
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-card");

function rotateTestimonials() {
    if (testimonials.length > 0) {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.opacity = index === currentTestimonial ? "1" : "0.7";
            testimonial.style.transform = index === currentTestimonial ? "scale(1.05)" : "scale(1)";
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
}

// Start testimonial rotation
setInterval(rotateTestimonials, 5000);

// Add form field animations
document.querySelectorAll("input, select, textarea").forEach(field => {
    field.addEventListener("focus", function() {
        this.style.transform = "scale(1.02)";
        this.style.boxShadow = "0 5px 15px rgba(244, 196, 48, 0.2)";
    });
    
    field.addEventListener("blur", function() {
        this.style.transform = "scale(1)";
        this.style.boxShadow = "none";
    });
});

// Add success notification system
function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add("show");
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove("show");
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

const notificationStyle = document.createElement("style");
notificationStyle.textContent = notificationCSS;
document.head.appendChild(notificationStyle);
