const canvas = document.getElementById('code-bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Realistic code lines to animate
const codeLines = [
  'function greet(name) {',
  '  return `Hello, ${name}!`;',
  '}',
  '',
  'const user = "Tomas";',
  'console.log(greet(user));',
  '',
  'for (let i = 0; i < 10; i++) {',
  '  setTimeout(() => {',
  '    console.log(i);',
  '  }, i * 100);',
  '}',
  '',
  'if (isAdmin) {',
  '  grantAccess();',
  '} else {',
  '  denyAccess();',
  '}',
  '',
  '// ...',
];

const fontSize = 18;
const lineHeight = fontSize * 1.4;
let visibleChars = Array(codeLines.length).fill(0);
let typingLine = 0;
let typingChar = 0;
let lastTime = 0;

function drawCodeBackground(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = fontSize + 'px Fira Mono, monospace';
  ctx.globalAlpha = 0.22;
  ctx.textBaseline = 'top';
  ctx.shadowColor = '#00ffb3';
  ctx.shadowBlur = 0;
  const startY = Math.max((canvas.height - codeLines.length * lineHeight) / 2, 20);
  for (let i = 0; i < codeLines.length; i++) {
    let line = codeLines[i].slice(0, visibleChars[i]);
    ctx.fillStyle = '#00e0ff';
    if (i === typingLine && Math.floor(time / 400) % 2 === 0) line += '_'; // blinking cursor
    ctx.fillText(line, 32, startY + i * lineHeight);
  }
  ctx.shadowBlur = 0;

  // Typing animation
  if (time - lastTime > 55) {
    if (visibleChars[typingLine] < codeLines[typingLine].length) {
      visibleChars[typingLine]++;
    } else {
      if (typingLine < codeLines.length - 1) {
        typingLine++;
      } else {
        // Reset after a pause
        setTimeout(() => {
          visibleChars = Array(codeLines.length).fill(0);
          typingLine = 0;
        }, 1200);
      }
    }
    lastTime = time;
  }
  requestAnimationFrame(drawCodeBackground);
}
requestAnimationFrame(drawCodeBackground); 