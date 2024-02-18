class FPSCounter {
  private lastFrameTime: number = 0;
  private frameRequest: number = 0;
  private fpsCounterElement: HTMLElement;

  constructor() {
      this.fpsCounterElement = document.getElementById('fpsCounter')!;
  }

  start(): void {
      this.frameRequest = requestAnimationFrame(this.update.bind(this));
  }

  stop(): void {
      cancelAnimationFrame(this.frameRequest);
  }

  private update(): void {
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

class FPSCounter1 {
  private lastFrameTime: number = 0;
  private frameRequest: number = 0;
  private fpsCounterElement: HTMLElement;

  constructor() {
      this.fpsCounterElement = document.getElementById('fpsCounter')!;
  }

  start(): void {
      this.frameRequest = requestAnimationFrame(this.update.bind(this));
  }

  stop(): void {
      cancelAnimationFrame(this.frameRequest);
  }

  private update(): void {
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


type Sprite = {
  element: HTMLDivElement;
  position: number;
};

class Deck {
  stack: Sprite[] = [];
  newStack: Sprite[] = []; // To store the reversed order
  container: HTMLElement;
  newStackContainer: HTMLElement;

  constructor(containerId: string, newContainerId: string) {
    this.container = document.getElementById(containerId)!;
    this.newStackContainer = document.getElementById(newContainerId)!;
  }

  createSprites(count: number): void {
    for (let i = 0; i < count; i++) {
      const sprite = document.createElement('div');
      sprite.className = 'card'; // Assuming 'card' is your sprite class
      sprite.style.top = `${i * 2}px`; // Adjust for visibility
      sprite.style.zIndex = `${count - i}`;
      this.container.appendChild(sprite);
      this.stack.push({ element: sprite, position: i });
    }
  }

  animateMovement(): void {
    setInterval(() => {
      if (this.stack.length > 0) {
        const sprite = this.stack.shift()!;
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

window.onload = () => {
  const startMenu = document.getElementById('startMenu')!;
  const deckContainer = document.getElementById('deckContainer')!;
  const newStackContainer = document.getElementById('newStack')!;
  const backBtn = document.getElementById('backBtn')!;
  const cardsBtn = document.getElementById('cardsBtn')!;
  const textBtn = document.getElementById('textBtn')!;
  const particlesBtn = document.getElementById('particlesBtn')!;

  const fpsCounter = new FPSCounter();
  fpsCounter.start();

  const deck = new Deck('deckContainer', 'newStack');

  // Hide card containers and show the start menu
  function showStartMenu() {
      startMenu.style.display = 'block';
      deckContainer.style.display = 'none';
      newStackContainer.style.display = 'none';
      backBtn.style.display = 'none';
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

  // Placeholder functions for "Text" and "Particles" buttons
  function showText() {
      console.log("Text feature coming soon.");
  }

  function showParticles() {
      console.log("Particles feature coming soon.");
  }

  cardsBtn.addEventListener('click', showCards);
  textBtn.addEventListener('click', showText);
  particlesBtn.addEventListener('click', showParticles);
  backBtn.addEventListener('click', showStartMenu);

  showStartMenu(); // Initially show the start menu
};


  