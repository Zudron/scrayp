class Star {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'star';
        this.reset();
    }

    reset() {
        const size = Math.random() * 3 + 1;
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;
        this.element.style.left = `${Math.random() * 100}%`;
        this.element.style.top = `${Math.random() * 100}%`;
        this.element.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        this.element.style.opacity = Math.random();
    }
}

class StarField {
    constructor(container, count) {
        this.container = container;
        this.stars = Array.from({ length: count }, () => {
            const star = new Star();
            container.appendChild(star.element);
            return star;
        });
    }
}

// Initialize star field
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('stars-container');
    const starField = new StarField(container, 150);
});