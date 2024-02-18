type Sprite = {
    element: HTMLDivElement;
    position: number;
  };
  
  class Deck {
    stack: Sprite[] = [];
    container: HTMLElement;
  
    constructor(containerId: string) {
      this.container = document.getElementById(containerId)!;
    }
  
    createSprites(count: number): void {
      for (let i = 0; i < count; i++) {
        const sprite = document.createElement('div');
        sprite.className = 'sprite';
        sprite.style.top = `${i}px`; // Stacking sprites
        sprite.style.zIndex = `${count - i}`; // Ensure proper stack order
        this.container.appendChild(sprite);
        this.stack.push({ element: sprite, position: i });
      }
    }
  
    animateMovement(): void {
      setInterval(() => {
        if (this.stack.length > 0) {
          const sprite = this.stack.shift()!;
          sprite.element.style.transition = 'top 2s';
          sprite.element.style.top = `${this.container.offsetHeight - sprite.position}px`;
          this.stack.push(sprite); // Move to the bottom of the stack
        }
      }, 1000);
    }
  }
  
  window.onload = () => {
    const deck = new Deck('deckContainer');
    deck.createSprites(144);
    deck.animateMovement();
  };
  