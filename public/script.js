import { animate, onScroll } from 'https://esm.sh/animejs';

console.log("AA")

animate(
    ".sun",
    {
        scale: 1.2,
        autoplay: onScroll({ sync: true })
    }
)