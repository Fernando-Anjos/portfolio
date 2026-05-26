import { createCard, createHiddenCard } from "./card.js";


export class UI {
  constructor() {
    this.player = document.querySelector("#player-hand");
    this.dealer = document.querySelector("#dealer-hand");

    this.playerStacks = [
      "#stack-1",
      "#stack-2",
      "#stack-3",
      "#stack-4",
      "#stack-5",
      "#stack-6",
    ];

    this.dealerStacks = [
      "#stack-7",
      "#stack-8",
      "#stack-9",
      "#stack-10",
      "#stack-11",
      "#stack-12",
    ];
  }

  renderPlayerCard(card) {
    this._render(card, this.player);
  }

  renderDealerCard(card) {
    this._render(card, this.dealer);
  }

  renderHiddenCard() {
    const hidden = createHiddenCard();

    this.hiddenDealerCard = hidden;

    this.dealer.appendChild(hidden);
  }
  
  setDoubleEnabled(enabled) {

    const btn = document.querySelector("#double");

    btn.classList.toggle("disabled", !enabled);
  }

  revealDealerCard(card) {

    if (this.hiddenDealerCard) {
      this.hiddenDealerCard.remove();
    }

    this.renderDealerCard(card);
  }
  
  updatePlayerValue(value) {
    const el = document.querySelector("#player-score-text");

    el.textContent = value;
  }

  updateDealerValue(value) {
    const el = document.querySelector("#dealer-score-text");

    el.textContent = value;
  }

  renderChips(total, stackIds) {

    const stacks = stackIds.map(id =>
      document.querySelector(id)
    );

    stacks.forEach(stack => stack.innerHTML = "");

    for (let i = 0; i < total; i++) {

      const chip = document.createElement("img");

      chip.src = "assets/images/cards/chips.png";

      chip.className = "chip";

      const stackIndex = Math.floor(i / 4);

      const positionInStack = i % 4;

      chip.style.bottom = `${positionInStack * 10}px`;

      chip.style.transform = `
        rotate(${Math.random() * 6 - 3}deg)
      `;

      stacks[stackIndex].appendChild(chip);
    }
  }

  renderPlayerChips(total) {
    this.renderChips(total, this.playerStacks);
  }

  renderDealerChips(total) {
    this.renderChips(total, this.dealerStacks);
  }

  showStamp(type) {

    const stamp = document.querySelector("#result-stamp");

    const map = {
      win: "assets/images/cards/win.png",
      lose: "assets/images/cards/lose.png",
      draw: "assets/images/cards/draw.png",
      bust: "assets/images/cards/bust.png",
      blackjack: "assets/images/cards/draw.png",
    };

    stamp.src = map[type];

    stamp.classList.remove("show");

    // força reflow
    void stamp.offsetWidth;

    stamp.classList.add("show");
  }

  renderBetChips(total) {

    const area = document.querySelector("#stack-bet");

    area.innerHTML = "";

    for (let i = 0; i < total; i++) {

      const chip = document.createElement("img");

      chip.src = "assets/images/cards/chips.png";

      chip.className = "chip bet-chip";

      // pequena aleatoriedade
      const randomX = Math.random() * 60 - 30;
      const randomY = Math.random() * 20 - 10;
      const randomRotate = Math.random() * 20 - 10;

      chip.style.left = `${randomX}px`;
      chip.style.top = `${randomY - i * 4}px`;

      chip.style.transform = `
        rotate(${randomRotate}deg)
      `;

      area.appendChild(chip);
    }
  }

  clearTable() {

      this.player.innerHTML = "";
      this.dealer.innerHTML = "";

      document
        .querySelector("#result-stamp")
        .classList.remove("show");
    }

  _render(card, container) {

    const el = createCard(card.value, card.suit);
      container.appendChild(el);
    }

    playRapidPages(callback) {

      const rapid =
        document.querySelector("#rapid-pages");

      rapid.style.display = "block";

      rapid.classList.add("play");

      const sound =
        document.querySelector("#page-shuffling");

      sound.currentTime = 0;

      sound.play();

      setTimeout(() => {

        rapid.style.display = "none";

        rapid.classList.remove("play");

        callback();

      }, 1200);
    }

    showEnding(type) {

      this.playRapidPages(() => {

        document.querySelector("#blackjack-screen")
          .classList.remove("active");

        document.querySelector("#ending-screen")
          .classList.add("active")

        const endingContent =
          document.querySelector("#ending-content");

        const endings = {

          lose: `
            <p>The mask hid his face.</p>
            <p>Was he smiling?</p>
            <p>I thought about my last breath.</p>
          `,

          win: `
            <p>Finally.</p>
            <p>The last obstacle.</p>
            <p>I can see the sun again.</p>
          `
        };

        endingContent.innerHTML = endings[type];
      });
    }
}