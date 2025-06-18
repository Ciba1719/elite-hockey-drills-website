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
    const phoneNumber = "+15551234567"; // Replace with actual phone number
    const message = encodeURIComponent("Hi! I\"m interested in your hockey training programs. Can you provide more information?");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
}

// Form submission handler
    
    // Show loading state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = "<span>Sending...</span>";
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        alert("Thank you for your message! We\"ll get back to you within 24 hours.");
        
        // Reset form
        form.reset();
    }, 2000);
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
    
    if (scrolled) {
        navbar.style.background = "rgba(15, 23, 42, 0.98)";
        navbar.style.backdropFilter = "blur(20px)";
    } else {
        navbar.style.background = "rgba(15, 23, 42, 0.95)";
        navbar.style.backdropFilter = "blur(12px)";
    }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Mobile navigation
    const hamburger = document.querySelector(".hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", toggleMobileNav);
    }
    
    // Close mobile nav when clicking on links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const navMenu = document.querySelector(".nav-menu");
            const hamburger = document.querySelector(".hamburger");
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });
    
    // Form submission

    
    // Add fade-in class to elements for animation
    const animatedElements = document.querySelectorAll(".section-header, .about-content, .program-card, .testimonial-card, .result-item, .contact-form, .contact-info");
    animatedElements.forEach(element => {
        element.classList.add("fade-in");
    });
    
    // Initial scroll animation check
    handleScrollAnimations();
    handleNavbarScroll();
});

// Scroll event listeners
window.addEventListener("scroll", function() {
    handleScrollAnimations();
    handleNavbarScroll();
});

// Resize event listener for responsive adjustments
window.addEventListener("resize", function() {
    const navMenu = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
    }
});

// Smooth scroll for anchor links
document.addEventListener("click", function(e) {
    if (e.target.matches("a[href^=\"#\"]")) {
        e.preventDefault();
        const targetId = e.target.getAttribute("href").substring(1);
        scrollToSection(targetId);
    }
});

// Add loading animation to page
window.addEventListener("load", function() {
    document.body.classList.add("loading");
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handlers
const throttledScrollHandler = throttle(function() {
    handleScrollAnimations();
    handleNavbarScroll();
}, 16); // ~60fps

window.removeEventListener("scroll", handleScrollAnimations);
window.removeEventListener("scroll", handleNavbarScroll);
window.addEventListener("scroll", throttledScrollHandler);

// Intersection Observer for better performance (modern browsers)
if ("IntersectionObserver" in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements when DOM is ready
    document.addEventListener("DOMContentLoaded", function() {
        const elementsToObserve = document.querySelectorAll(".fade-in");
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    });
    // COUNT-UP ANIMATION FOR STATS
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".count");

  const speed = 200; // smaller = faster

  const animate = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const update = () => {
      const increment = Math.ceil(target / speed);
      count += increment;

      if (count < target) {
        counter.innerText = count;
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };

    update();
  };

  // Trigger when visible
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 1.0 });

  counters.forEach((counter) => observer.observe(counter));
});

}
// COUNT-UP ANIMATION FOR STATS
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll('.count');
  const speed = 50;

  const animateCount = (counter) => {
    const update = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(update, 30);
      } else {
        counter.innerText = target;
      }
    };
    update();
  };

  const options = { threshold: 0.5 };
  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach(counter => {
    observer.observe(counter);
  });
});
