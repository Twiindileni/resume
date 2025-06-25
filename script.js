// Loader logic
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    var loader = document.getElementById('loader-overlay');
    if (loader) {
      loader.style.opacity = 0;
      setTimeout(function() {
        loader.style.display = 'none';
      }, 500);
    }
  }, 900); // Loader stays for at least 900ms
});

// Animated Headline Typing Effect (static 'I' in HTML, animate only the rest)
const phrases = [
  "develop systems",
  "manage systems",
  "manage servers"
];
const headlineElem = document.getElementById('headline-animated');
let phraseIndex = 0;
let charIndex = 0;
let typing = true;

function typeAnimatedHeadline() {
  const currentPhrase = phrases[phraseIndex];
  if (typing) {
    if (charIndex <= currentPhrase.length) {
      headlineElem.textContent = currentPhrase.slice(0, charIndex) + (charIndex % 2 === 0 ? '|' : '');
      charIndex++;
      setTimeout(typeAnimatedHeadline, 90);
    } else {
      typing = false;
      setTimeout(typeAnimatedHeadline, 1200); // Pause before deleting
    }
  } else {
    if (charIndex > 0) {
      headlineElem.textContent = currentPhrase.slice(0, charIndex - 1) + (charIndex % 2 === 0 ? '|' : '');
      charIndex--;
      setTimeout(typeAnimatedHeadline, 50);
    } else {
      typing = true;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeAnimatedHeadline, 400);
    }
  }
}
typeAnimatedHeadline();

// Section Reveal on Scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .timeline-item');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Animated IT-style Background (Canvas Dots/Particles)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles() {
  particles = [];
  const count = Math.floor(window.innerWidth / 18);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 1.2,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? 'rgba(0,255,179,0.7)' : 'rgba(0,224,255,0.7)'
    });
  }
}
createParticles();
window.addEventListener('resize', createParticles);

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
    // Move
    p.x += p.dx;
    p.y += p.dy;
    // Bounce
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  // Draw lines between close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(0,255,179,0.13)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();
