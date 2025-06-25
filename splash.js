window.addEventListener('DOMContentLoaded', function() {
  const splash = document.querySelector('.splash-bg');
  const hello = document.getElementById('splash-hello');
  const img = document.querySelector('.glitch-img');
  const mask = document.querySelector('.glitch-mask');

  // Wait for image animation and hello text
  setTimeout(() => {
    hello.style.opacity = 1;
  }, 1700);

  // Fade out splash after hello is visible
  setTimeout(() => {
    splash.style.transition = 'opacity 0.8s cubic-bezier(.77,0,.18,1)';
    splash.style.opacity = 0;
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 800);
  }, 3200);
}); 