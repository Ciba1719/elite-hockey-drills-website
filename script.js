/* ===== Mobile-menu toggle (unchanged) ===== */
const hamburger = document.getElementById("hamburger");
const navMenu   = document.getElementById("nav-menu");
hamburger.addEventListener("click", () => {hamburger.classList.toggle("active");navMenu.classList.toggle("active");});
document.querySelectorAll(".nav-link").forEach(n=>n.addEventListener("click",()=>{hamburger.classList.remove("active");navMenu.classList.remove("active");}));

/* ===== Smooth anchor scrolling (unchanged) ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',function(e){e.preventDefault();document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});});
});

/* ===== Navbar shadow on scroll (unchanged) ===== */
window.addEventListener('scroll',()=>{const navbar=document.getElementById('navbar');window.scrollY>50?navbar.classList.add('scrolled'):navbar.classList.remove('scrolled');});

/* ======== HERO TYPEWRITER ANIMATION ======== */
const heroTitleElement = document.getElementById('hero-title-element');
const textToType = 'WHERE<br><span class="standout">CHAMPIONS</span><br>ARE MADE';
let charIndex = 0;

function typeWriter(){
    if(charIndex < textToType.length){
        const char = textToType.charAt(charIndex);
        if(char === '<'){                            // handle HTML tags
            const end = textToType.indexOf('>',charIndex);
            heroTitleElement.innerHTML += textToType.substring(charIndex,end+1);
            charIndex = end + 1;
        }else{
            heroTitleElement.innerHTML += char;
            charIndex++;
        }
        setTimeout(typeWriter,45);                   // typing speed (ms)
    }else{
        heroTitleElement.style.opacity = '1';         // ensure visible
        heroTitleElement.classList.add('pulse-glow'); // subtle glow
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    heroTitleElement.style.opacity = '0';            // start hidden
    heroTitleElement.innerHTML = '';
    setTimeout(typeWriter,400);                      // small delay
});

/* ===== (All your other JS: countdown, form, notifications etc.) ===== */
/* Countdown Timer (unchanged) */
const countdownElement = document.getElementById('countdown');
if(countdownElement){
    const updateCountdown = () => {
        const now = Date.now();
        const endTime = now + 48*3600*1000;          // demo: 48h from now
        const distance = endTime - now;
        const h = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
        const m = Math.floor((distance%(1000*60*60))/ (1000*60));
        const s = Math.floor((distance%(1000*60))   / 1000);
        document.getElementById('hours').textContent   = h.toString().padStart(2,'0');
        document.getElementById('minutes').textContent = m.toString().padStart(2,'0');
        document.getElementById('seconds').textContent = s.toString().padStart(2,'0');
        if(distance<0){clearInterval(timer);countdownElement.textContent="EXPIRED";}
    };
    updateCountdown();
    const timer = setInterval(updateCountdown,1000);
}

/* Simple contact-form handler (unchanged) */
const contactForm = document.getElementById('contactForm');
if(contactForm){
    contactForm.addEventListener('submit',e=>{
        e.preventDefault();
        showNotification('Message sent successfully!','success');
        contactForm.reset();
    });
}

/* ===== Notification helper ===== */
function showNotification(msg,type='success'){
    const n=document.createElement('div');
    n.className=`notification ${type}`;
    n.innerHTML=`<i class="fas fa-${type==='success'?'check-circle':'exclamation-circle'}"></i><span>${msg}</span>`;
    document.body.appendChild(n);
    setTimeout(()=>n.classList.add('show'),100);
    setTimeout(()=>{n.classList.remove('show');setTimeout(()=>n.remove(),300);},3000);
}

/* Inject notification base styles once */
const notifCSS=`
.notification{position:fixed;top:20px;right:20px;background:#fff;padding:15px 20px;border-radius:10px;box-shadow:0 5px 20px rgba(0,0,0,0.1);display:flex;align-items:center;gap:10px;z-index:10000;transform:translateX(100%);transition:transform .3s ease}
.notification.show{transform:translateX(0)}
.notification.success{border-left:4px solid #f4c430}.notification.success i{color:#f4c430}
.notification.error  {border-left:4px solid #e74c3c}.notification.error i  {color:#e74c3c}`;
if(!document.getElementById('notifStyle')){
    const s=document.createElement('style');s.id='notifStyle';s.textContent=notifCSS;document.head.appendChild(s);
}
