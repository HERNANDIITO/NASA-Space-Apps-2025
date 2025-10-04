// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleccionar el h2 con clase text-xl
    const title = document.querySelector('.text-xl');
    
    if (title) {
        // Obtener el texto
        const text = title.textContent;
        
        // Limpiar el contenido
        title.innerHTML = '';
        
        // Crear un span para cada letra
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Preservar espacios
            span.style.display = 'inline-block';
            title.appendChild(span);
        });
        
        // Seleccionar todos los spans (letras)
        const chars = title.querySelectorAll('span');
        
        // Aplicar la animación con anime.js
        anime({
            targets: chars,
            translateY: [
                { value: -44, duration: 600, easing: 'easeOutExpo' },
                { value: 0, duration: 800, delay: 100, easing: 'easeOutBounce' }
            ],
            rotate: {
                value: '-1turn',
                duration: 600,
                easing: 'easeInOutCirc'
            },
            delay: anime.stagger(50), // delay de 50ms entre cada letra
            loop: true,
            loopDelay: 1000
        });
    }
});