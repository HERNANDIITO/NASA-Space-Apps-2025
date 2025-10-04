import { animate, stagger } from 'https://esm.sh/animejs';

console.log("AA")

// animate(
//     ".sun",
//     {
//         scale: 1.05,
//         loop: true,
//         alternate: true,
//         eases: 'inOut(3)'
        
//     }
// )


animate (
    ".t1", {
  // Property keyframes
  y: [
    { to: '-2.75rem', ease: 'outExpo', duration: 600 },
    { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
  ],
  // Property specific parameters
  delay: stagger(50),
  ease: 'inOutCirc',
  loopDelay: 1000,
});