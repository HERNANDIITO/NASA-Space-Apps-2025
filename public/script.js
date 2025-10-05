import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';
import { animate, onScroll } from 'https://esm.sh/animejs';


AOS.init();


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

// --- Sistema de verificación de elementos colocados ---
const placedElements = {
  paraguas: false,
  chubasquero: false
};

function checkAllProtectionPlaced() {
  if (placedElements.paraguas && placedElements.chubasquero) {
    // Ocultar paraguas, chubasquero, campo magnético, coches y sus targets
    anime({
      targets: ['#paraguas-target', '#chubasquero-target', '#campoVanessoide', '#protonCar', '#electronCar', '#neutronCar'],
      opacity: 0,
      scale: 0,
      duration: 800,
      easing: 'easeInBack',
      complete: () => {
        document.getElementById('paraguas-target').style.display = 'none';
        document.getElementById('chubasquero-target').style.display = 'none';
        document.getElementById('campoVanessoide').style.display = 'none';
        document.getElementById('protonCar').style.display = 'none';
        document.getElementById('electronCar').style.display = 'none';
        document.getElementById('neutronCar').style.display = 'none';
      }
    });

    let imgTierra = document.querySelector('#tierra');
    imgTierra.src = 'imgs/tierraFeliz.png';
    
    // Mostrar nubes, pingüinos y teléfono con animación
    setTimeout(() => {
      const elementos = ['#telefonoTexto', '#aurora', '#nube', '#nube1', '#pingus', '#telefono'];
      elementos.forEach(el => {
        document.querySelector(el).style.display = 'block';
      });
      
      anime({
        targets: elementos,
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .5)',
        delay: anime.stagger(200)
      });
    }, 400);
  }
}

// --- Sistema de Drag & Drop reutilizable ---
class DraggableElement {
  constructor(elementId, targetId) {
    this.element = document.getElementById(elementId);
    this.target = document.getElementById(targetId);
    this.isDragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.originalLeft = this.element.offsetLeft;
    this.originalTop = this.element.offsetTop;
    this.placed = false;
    
    this.init();
  }
  
  init() {
    // Mouse events
    this.element.addEventListener('mousedown', (e) => this.onDragStart(e.clientX, e.clientY));
    document.addEventListener('mousemove', (e) => {
      if (this.isDragging) this.onDragMove(e.clientX, e.clientY);
    });
    document.addEventListener('mouseup', () => this.onDragEnd());
    
    // Touch events
    this.element.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      this.onDragStart(touch.clientX, touch.clientY);
      e.preventDefault();
    });
    document.addEventListener('touchmove', (e) => {
      if (this.isDragging) {
        const touch = e.touches[0];
        this.onDragMove(touch.clientX, touch.clientY);
        e.preventDefault();
      }
    });
    document.addEventListener('touchend', () => this.onDragEnd());
  }
  
  onDragStart(clientX, clientY) {
    if (this.placed) return;
    this.isDragging = true;
    this.offsetX = clientX - this.element.offsetLeft;
    this.offsetY = clientY - this.element.offsetTop;
    this.element.style.cursor = 'grabbing';
  }
  
  onDragMove(clientX, clientY) {
    this.element.style.left = (clientX - this.offsetX) + 'px';
    this.element.style.top = (clientY - this.offsetY) + 'px';
  }
  
  onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.element.style.cursor = 'pointer';
    this.checkDrop();
  }
  
  checkDrop() {
    const elementRect = this.element.getBoundingClientRect();
    const targetRect = this.target.getBoundingClientRect();

    const elementCenterX = elementRect.left + elementRect.width / 2;
    const elementCenterY = elementRect.top + elementRect.height / 2;

    const inside =
      elementCenterX > targetRect.left &&
      elementCenterX < targetRect.right &&
      elementCenterY > targetRect.top &&
      elementCenterY < targetRect.bottom;

    if (inside) {
      this.placed = true;
      this.element.style.cursor = 'default';
      
      const centerLeft = this.target.offsetLeft + (this.target.offsetWidth - this.element.offsetWidth) / 2;
      const centerTop = this.target.offsetTop + (this.target.offsetHeight - this.element.offsetHeight) / 2;

      anime({
        targets: this.element,
        left: centerLeft + 'px',
        top: centerTop + 'px',
        duration: 300,
        easing: 'easeOutQuad'
      });
      
      createStars(centerLeft + this.element.offsetWidth / 2, centerTop + this.element.offsetHeight / 2);

      if (this.element.id == "paraguas") {
        let imgTierra = document.querySelector('#tierra');
        imgTierra.src = 'imgs/tierraParaguas.png';
        placedElements.paraguas = true;
        
        let imgCampo = document.querySelector('#campoVanessoide');
        if (imgCampo) {
          imgCampo.style.display = 'block'; 
          imgCampo.src = 'imgs/campo.png'; 
        }
      }

      if (this.element.id == "chubasquero") {
        placedElements.chubasquero = true;
      }

      // Verificar si ambos elementos están colocados
      checkAllProtectionPlaced();

    } else {
      anime({
        targets: this.element,
        left: this.originalLeft + 'px',
        top: this.originalTop + 'px',
        duration: 500,
        easing: 'easeOutElastic(1, .5)'
      });
    }
  }
}

// --- Función para crear estrellitas ---
function createStars(x, y) {
  const numStars = 15;

  console.log("creating stars!!")
  
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.innerHTML = '⭐';
    star.style.position = 'absolute';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.zIndex = 3;
    star.style.fontSize = Math.random() * 20 + 15 + 'px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '1000';
    
    document.body.appendChild(star);
    
    const angle = (Math.PI * 2 * i) / numStars;
    const distance = Math.random() * 100 + 50;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;
    
    anime({
      targets: star,
      left: endX + 'px',
      top: endY + 'px',
      opacity: [1, 0],
      scale: [0, 1.5],
      rotate: Math.random() * 720 - 360,
      duration: 1000 + Math.random() * 500,
      easing: 'easeOutExpo',
      complete: () => {
        star.remove();
      }
    });
  }
}

// --- Inicializar elementos arrastrables ---
new DraggableElement('proton', 'proton-target');
new DraggableElement('electron', 'electron-target');
new DraggableElement('neutron', 'neutron-target');
new DraggableElement('paraguas', 'paraguas-target');
new DraggableElement('chubasquero', 'chubasquero-target');

// --- Animación de coches con scroll ---
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  
  // Obtener los coches
  const protonCar = document.getElementById('protonCar');
  const electronCar = document.getElementById('electronCar');
  const neutronCar = document.getElementById('neutronCar');
  
  // Configuración - Ajusta estos valores según necesites
  const startScroll = windowHeight * 2; // Empieza después de 2 pantallas
  const stopScroll = windowHeight * 5; // Se detiene después de 4 pantallas
  const maxMovement = window.innerWidth * 0.8; // Se mueven el 80% del ancho de la pantalla
  
  // Calcular el progreso del scroll (0 a 1)
  let progress = 0;
  if (scrollPosition > startScroll && scrollPosition < stopScroll) {
    progress = (scrollPosition - startScroll) / (stopScroll - startScroll);
  } else if (scrollPosition >= stopScroll) {
    progress = 1;
  }
  
  // Calcular el movimiento de cada coche
  const movement = progress * maxMovement;
  
  // Aplicar el movimiento VERTICAL (cada coche a diferente velocidad)
  if (protonCar) {
    protonCar.style.transform = `translateY(${movement * 1.30}px)`; // Más rápido
  }
  
  if (electronCar) {
    electronCar.style.transform = `translateY(${movement * 1.2}px)`; // El más rápido
  }
  
  if (neutronCar) {
    neutronCar.style.transform = `translateY(${movement * 1.1}px)`; // Más lento
  }
});

// Añadir transición suave
const cars = document.querySelectorAll('.cars img');
cars.forEach(car => {
  car.style.transition = 'transform 0.15s ease-out';
});