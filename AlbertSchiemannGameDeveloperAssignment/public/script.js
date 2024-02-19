"use strict";
class FPSCounter {
    constructor() {
        this.lastFrameTime = 0;
        this.frameRequest = 0;
        this.fpsCounterElement = document.getElementById('fpsCounter');
    }
    start() {
        this.frameRequest = requestAnimationFrame(this.update.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.frameRequest);
    }
    update() {
        const now = performance.now();
        const deltaTime = now - this.lastFrameTime;
        if (deltaTime > 0) {
            const fps = Math.round(1000 / deltaTime);
            this.fpsCounterElement.textContent = `FPS: ${fps}`;
        }
        this.lastFrameTime = now;
        this.frameRequest = requestAnimationFrame(this.update.bind(this));
    }
}
class Deck {
    constructor(containerId, newContainerId) {
        this.stack = [];
        this.newStack = []; // To store the reversed order
        this.container = document.getElementById(containerId);
        this.newStackContainer = document.getElementById(newContainerId);
    }
    createSprites(count) {
        for (let i = 0; i < count; i++) {
            const sprite = document.createElement('div');
            sprite.className = 'card'; // Assuming 'card' is your sprite class
            sprite.style.top = `${i * 2}px`; // Adjust for visibility
            sprite.style.zIndex = `${count - i}`;
            this.container.appendChild(sprite);
            this.stack.push({ element: sprite, position: i });
        }
    }
    animateMovement() {
        setInterval(() => {
            if (this.stack.length > 0) {
                const sprite = this.stack.shift();
                sprite.element.style.transition = 'all 2s';
                sprite.element.style.transform = `translateX(${this.newStackContainer.offsetLeft - this.container.offsetLeft}px)`;
                setTimeout(() => {
                    this.newStackContainer.appendChild(sprite.element); // Move to the new stack
                    sprite.element.style.transform = 'translateX(0)';
                    this.newStack.push(sprite);
                }, 2000); // Wait for the animation to complete
            }
        }, 1000);
    }
}
class DynamicContentDisplay {
    constructor(containerId) {
        this.contentContainer = document.getElementById(containerId);
    }
    updateContent() {
        // Example of random content generation
        const texts = ["Price 1", "Price 2", "Price 3", "Price 4", "Price 5"];
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        const randomFontSize = Math.floor(Math.random() * 20) + 14; // Random font size between 14px and 34px
        this.contentContainer.innerHTML = `<span style="font-size: ${randomFontSize}px;">${randomText}</span>`;
    }
    startUpdating() {
        this.updateContent(); // Initial update
        setInterval(() => this.updateContent(), 2000); // Update every 2 seconds
    }
}
class FireEffect {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.container.style.display = 'block';
    }
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'fireParticle';
        particle.style.left = `${Math.random() * 100}px`; // Randomize starting position
        this.container.appendChild(particle);
        // Remove particle after animation ends
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
    start() {
        setInterval(() => {
            if (this.container.childElementCount < 10) { // Keep the number of particles under 10
                this.createParticle();
            }
        }, 200);
    }
}
window.onload = () => {
    const startMenu = document.getElementById('startMenu');
    const deckContainer = document.getElementById('deckContainer');
    const newStackContainer = document.getElementById('newStack');
    const backBtn = document.getElementById('backBtn');
    const cardsBtn = document.getElementById('cardsBtn');
    const textBtn = document.getElementById('textBtn');
    const particlesBtn = document.getElementById('particlesBtn');
    const fpsCounter = new FPSCounter();
    fpsCounter.start();
    const deck = new Deck('deckContainer', 'newStack');
    // Hide card containers and show the start menu
    function showStartMenu() {
        startMenu.style.display = 'block';
        deckContainer.style.display = 'none';
        newStackContainer.style.display = 'none';
        backBtn.style.display = 'none';
        const dynamicContentContainer = document.getElementById('dynamicContent');
        if (dynamicContentContainer) {
            dynamicContentContainer.style.display = 'none';
        }
        // Hide the fire container
        const fireContainer = document.getElementById('fireContainer');
        fireContainer.style.display = 'none';
        // Clear any existing particles to reset the fire effect
        while (fireContainer.firstChild) {
            fireContainer.removeChild(fireContainer.firstChild);
        }
    }
    // Show card stacking feature and hide the start menu
    function showCards() {
        startMenu.style.display = 'none';
        deckContainer.style.display = 'block';
        newStackContainer.style.display = 'block';
        backBtn.style.display = 'block';
        deck.createSprites(144); // Consider preventing multiple initializations
        deck.animateMovement();
    }
    function showText() {
        startMenu.style.display = 'none'; // Hide the start menu
        deckContainer.style.display = 'none'; // Hide the deck container if visible
        newStackContainer.style.display = 'none'; // Hide the new stack container if visible
        backBtn.style.display = 'block'; // Show the back button
        // Initialize and start the dynamic content display
        const dynamicContent = new DynamicContentDisplay('dynamicContent');
        dynamicContent.startUpdating();
        // Make sure the dynamic content container is visible
        const dynamicContentContainer = document.getElementById('dynamicContent');
        dynamicContentContainer.style.display = 'block'; // Adjust as necessary based on your CSS  
    }
    function showFire() {
        startMenu.style.display = 'none'; // Hide the start menu
        deckContainer.style.display = 'none'; // Hide the deck container if visible
        newStackContainer.style.display = 'none'; // Hide the new stack container if visible
        backBtn.style.display = 'block'; // Show the back button
        const fireContainer = document.getElementById('fireContainer');
        const fireEffect = new FireEffect('fireContainer');
        fireEffect.start();
    }
    cardsBtn.addEventListener('click', showCards);
    textBtn.addEventListener('click', showText);
    backBtn.addEventListener('click', showStartMenu);
    particlesBtn.addEventListener('click', showFire);
    showStartMenu(); // Initially show the start menu
};
