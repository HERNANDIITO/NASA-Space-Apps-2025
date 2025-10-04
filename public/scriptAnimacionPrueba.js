import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';

// --- Animación del título ---
anime({
  targets: ".t1",
  translateY: [
    { value: '-2.75rem', easing: 'easeOutExpo', duration: 600 },
    { value: 0, easing: 'easeOutBounce', duration: 800, delay: 100 }
  ],
  delay: anime.stagger(50),
  easing: 'easeInOutCirc',
  loop: true,
  loopDelay: 1000
});

// --- Drag & Drop del proton ---
const proton = document.getElementById('proton');
const target = document.getElementById('target-zone');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Guardamos la posición inicial real del elemento
const originalLeft = proton.offsetLeft;
const originalTop = proton.offsetTop;

let placed = false; // bandera que indica si ya está colocado

// --- Drag con mouse ---
proton.addEventListener('mousedown', (e) => {
  if (placed) return;
  isDragging = true;
  
  // Calculamos el offset desde donde se hizo clic (respecto al documento)
  offsetX = e.clientX - proton.offsetLeft;
  offsetY = e.clientY - proton.offsetTop;
  
  proton.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  // Posicionamos el protón manteniendo el offset donde se hizo clic
  proton.style.left = (e.clientX - offsetX) + 'px';
  proton.style.top = (e.clientY - offsetY) + 'px';
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  proton.style.cursor = 'pointer';
  checkDrop();
});

// --- Drag con touch ---
proton.addEventListener('touchstart', (e) => {
  if (placed) return;
  isDragging = true;
  
  const touch = e.touches[0];
  offsetX = touch.clientX - proton.offsetLeft;
  offsetY = touch.clientY - proton.offsetTop;
  
  e.preventDefault();
});

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  
  const touch = e.touches[0];
  proton.style.left = (touch.clientX - offsetX) + 'px';
  proton.style.top = (touch.clientY - offsetY) + 'px';
  
  e.preventDefault();
});

document.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  checkDrop();
});

// --- Función para validar si el proton está dentro de la zona ---
function checkDrop() {
  const protonRect = proton.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  // Verificamos si el centro del protón está dentro del recuadro
  const protonCenterX = protonRect.left + protonRect.width / 2;
  const protonCenterY = protonRect.top + protonRect.height / 2;

  const inside =
    protonCenterX > targetRect.left &&
    protonCenterX < targetRect.right &&
    protonCenterY > targetRect.top &&
    protonCenterY < targetRect.bottom;

  if (inside) {
    // Si está dentro, lo centramos en el recuadro y bloqueamos el arrastre
    placed = true;
    proton.style.cursor = 'default';
    
    // Calculamos la posición para centrar el protón en la silueta usando offsetLeft/offsetTop
    const centerLeft = target.offsetLeft + (target.offsetWidth - proton.offsetWidth) / 2;
    const centerTop = target.offsetTop + (target.offsetHeight - proton.offsetHeight) / 2;

    anime({
      targets: proton,
      left: centerLeft + 'px',
      top: centerTop + 'px',
      duration: 300,
      easing: 'easeOutQuad'
    });
  } else {
    // Si no está dentro, vuelve a su posición original
    anime({
      targets: proton,
      left: originalLeft + 'px',
      top: originalTop + 'px',
      duration: 500,
      easing: 'easeOutElastic(1, .5)'
    });
  }
}