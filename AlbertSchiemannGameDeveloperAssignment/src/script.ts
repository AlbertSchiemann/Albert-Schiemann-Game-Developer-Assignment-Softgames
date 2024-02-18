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
  const deck = new Deck('deckContainer', 'newStack');
  deck.createSprites(144);
  deck.animateMovement();
};

  