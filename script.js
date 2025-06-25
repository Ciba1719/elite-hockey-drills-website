// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector(".navbar").offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        window.scrollTo({
            top: elementPosition,
            behavior: "smooth"
        });
    }
}

// Mobile navigation toggle
function toggleMobileNav() {
    const navMenu = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
}

// WhatsApp contact function
function openWhatsApp() {
    const phoneNumber = "+15551234567"; // Replace with your real number
    const message = encodeURIComponent("Hi! I'm interested in your hockey training programs. Can you provide more information?");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll(".fade-in");
    const windowHeight = window.innerHeight;
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("visible");
        }
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    const scrolled = window.scrollY > 50;
    navbar.style.background = scrolled ? "rgba(15, 23, 42, 0.98)" : "rgba(15, 23, 42, 0.95)";
    navbar.style.backdropFilter = scrolled ? "blur(20px)" : "blur(12px)";
}

// Throttle utility for scroll events
function throttle(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// DOM ready setup
document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu toggle
    const hamburger = document.querySelector(".hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", toggleMobileNav);
    }

    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            document.querySelector(".nav-menu").classList.remove("active");
            document.querySelector(".hamburger").classList.remove("active");
        });
    });

    // Add fade-in class to selected elements
    const animatedElements = document.querySelectorAll(".section-header, .about-content, .program-card, .testimonial-card, .result-item, .contact-form, .contact-info");
    animatedElements.forEach(el => el.classList.add("fade-in"));

    // Initial scroll effects
    handleScrollAnimations();
    handleNavbarScroll();

    // Fade-in intersection observer
    if ("IntersectionObserver" in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        const elementsToFade = document.querySelectorAll(".fade-in");
        elementsToFade.forEach(el => fadeObserver.observe(el));
    }

    // Count-up animation for stats
    const counters = document.querySelectorAll(".count");
    const countSpeed = 50;

    // ========= UPDATED FUNCTION ONLY BELOW =========
    const animateCount = (counter) => {
        const target = +counter.getAttribute("data-target");
        const update = () => {
            const current = +counter.innerText;
            const increment = Math.ceil(target / countSpeed);
            if (current < target) {
                counter.innerText = current + increment;
                setTimeout(update, 30);
            } else {
                // Decide which symbol to append
                let display = `${target}`;
                if (target === 1000 || target === 10) {
                    display = `${target}+`;
                } else if (target === 100) {
                    display = `${target}%`;
                }
                counter.innerText = display;
            }
        };
        update();
    };
    // ========= END OF UPDATED FUNCTION =============

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }
});

// Scroll + resize events
const throttledScrollHandler = throttle(() => {
    handleScrollAnimations();
    handleNavbarScroll();
}, 16);

window.removeEventListener("scroll", handleScrollAnimations);
window.removeEventListener("scroll", handleNavbarScroll);
window.addEventListener("scroll", throttledScrollHandler);

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        document.querySelector(".nav-menu").classList.remove("active");
        document.querySelector(".hamburger").classList.remove("active");
    }
});

// Smooth scroll for anchor links
document.addEventListener("click", function (e) {
    if (e.target.matches("a[href^=\"#\"]")) {
        e.preventDefault();
        const targetId = e.target.getAttribute("href").substring(1);
        scrollToSection(targetId);
    }
});



// FAQ Accordion
document.querySelectorAll(".faq-question").forEach(item => {
    item.addEventListener("click", () => {
        const parent = item.closest(".faq-item");
        parent.classList.toggle("active");
    });
});


