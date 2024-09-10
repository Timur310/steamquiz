import confetti from "canvas-confetti"
import randomUnicodeEmoji from "random-unicode-emoji";

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