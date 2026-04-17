// --- 1. Scroll-to-Top Logic ---
const scrollBtn = document.getElementById("scrollTop");

if (scrollBtn) {
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// --- 2. Dynamic Particle Background (Injected globally) ---
const canvas = document.createElement("canvas");
canvas.id = "particles-bg";
document.body.prepend(canvas);
const ctx = canvas.getContext("2d");

let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function initParticles() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 15000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 2) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random() * 1) - 0.5;
    let directionY = (Math.random() * 1) - 0.5;
    let color = 'rgba(249, 115, 22, 0.5)'; // vibrant orange
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connectParticles();
}

function connectParticles() {
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) 
      + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
      // Adjust connection distance and opacity
      if (distance < (canvas.width / 8) * (canvas.height / 8)) {
        opacityValue = 1 - (distance / 20000);
        ctx.strokeStyle = `rgba(234, 179, 8, ${opacityValue * 0.2})`; // deep gold for lines
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

initParticles();
animateParticles();

// --- 3. Typing Effect for Hero Subtitle ---
const heroSubtitle = document.querySelector(".hero-content h3");
if (heroSubtitle) {
  const roles = [
    "Computer Science Engineer",
    "Data Scientist",
    "Machine Learning Enthusiast",
    "Web Developer"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  // Clear the existing text
  heroSubtitle.innerHTML = '<span class="typed-text"></span><span class="typing-cursor"></span>';
  const typedTextSpan = heroSubtitle.querySelector(".typed-text");

  function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 1500; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Pause before typing new word
    }
    
    setTimeout(typeEffect, typeSpeed);
  }
  
  setTimeout(typeEffect, 1000);
}


