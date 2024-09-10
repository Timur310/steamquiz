import confetti from "canvas-confetti"
import randomUnicodeEmoji from "random-unicode-emoji";

export const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const runConfetti = (time) => {
    const duration = 15 * time;
    let animationEnd = Date.now() + duration;
    const emojis = randomUnicodeEmoji.random({count: 3})
    const shapes = []
    for (let i = 0; i < emojis.length; i++) {
        shapes.push(confetti.shapeFromText({ text: emojis[i] }))
    }
    (function frame() {
        const timeLeft = animationEnd - Date.now();
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 1 },
            shapes: shapes
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 1 },
            shapes: shapes
        });

        if (timeLeft > 0) {
            requestAnimationFrame(frame);
        }
    }());
}

export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))