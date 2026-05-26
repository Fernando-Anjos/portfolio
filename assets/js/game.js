import { createCard } from "./card.js";

const VALUES = {
  ace: 11,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  jack: 10,
  queen: 10,
  king: 10,
};

export class Game {
  constructor(ui) {
    this.ui = ui; // 👈 ESSENCIAL

    this.croupierMoney = 100;
    this.currentBet = 1;
    this.bankChips = 12;
    this.dealerChips = 12;
    this.playerHand = [];
    this.croupierHand = [];
    this.hiddenDealerCard;
    this.hasDoubled = false;

    this.deck = this.buildDeck();
  }

  async sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  clearScreen() {
    console.clear();
  }

  formatCard(card) {
    return `${card.value} of ${card.suit}`;
  }

  hit() {
    if (this.phase !== "player") return;

    this.ui.setDoubleEnabled(false);

    const card = this.drawCard();

    this.playerHand.push(card);

    this.ui.renderPlayerCard(card);

    const total = this.handValue(this.playerHand);

    this.ui.updatePlayerValue(total);

    // BUST
  if (total > 21) {
      this.phase = "finished";
      this.resolveGame();
      return;
    }

    // AUTO STAND ON 21
    if (total === 21) {
      this.phase = "dealer";
      this.croupierTurn();
    }
  }

  stand() {
    if (this.phase !== "player") return;

    this.phase = "dealer";
    this.croupierTurn();
  }

  double() {

    if (this.phase !== "player") return;
    if (this.hasDoubled) return;
    if (this.playerHand.length !== 2) return;
    if (this.bankChips < this.currentBet) return;
    this.hasDoubled = true;
    this.currentBet *= 2;
    this.bankChips--;
    this.ui.setDoubleEnabled(false);
    this.ui.renderPlayerChips(this.bankChips);
    this.ui.renderBetChips(this.currentBet);
    this.hit();
    this.stand();
  }

  buildDeck() {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const values = [
      "ace",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "jack",
      "queen",
      "king",
    ];

    const deck = [];

    for (const suit of suits) {
      for (const value of values) {
        deck.push({ value, suit });
      }
    }

    return deck.sort(() => Math.random() - 0.5);
  }

  resetDeck() {
    this.deck = this.buildDeck();
  }

  drawCard() {
    return this.deck.pop();
  }

  handValue(hand) {
    let total = 0;
    let aces = 0;

    for (const card of hand) {
      if (card.value === "ace") {
        total += 11;
        aces++;
      } else {
        total += VALUES[card.value];
      }
    }

    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }

    return total;
  }  

  playerTurn() {    

      this.phase = "player";

      const card1 = this.drawCard();
      const card2 = this.drawCard();

      this.playerHand.push(card1, card2);

      this.ui.renderPlayerCard(card1);
      this.ui.renderPlayerCard(card2);

      const total = this.handValue(this.playerHand);

      this.ui.updatePlayerValue(total);

  }

  

  async revealDealerCard(card) {


    const realCard = createCard(card.value, suitConvert[card.suit]);

    realCard.classList.add("flip-card");

    const total = this.handValue(this.croupierHand);

    this.ui.updateDealerValue(total);

    // coloca atrás inicialmente
    realCard.style.transform = "rotateY(180deg)";

    this.dealer.appendChild(realCard);

    await new Promise(r => setTimeout(r, 50));

    this.hiddenDealerCard.style.transform = "rotateY(180deg)";
    realCard.style.transform = "rotateY(0deg)";
  }

  async croupierTurn() {

    this.phase = "dealer";

    await this.ui.revealDealerCard(this.croupierHand[0]);

    this.ui.updateDealerValue(
      this.handValue(this.croupierHand)
    );

    while (this.handValue(this.croupierHand) < 17) {

      await this.sleep(1200);

      const card = this.drawCard();

      this.croupierHand.push(card);

      this.ui.renderDealerCard(card);

      this.ui.updateDealerValue(
        this.handValue(this.croupierHand)
      );
    }

    await this.sleep(600);

    this.resolveGame();
  }

  resolveGame() {
    const player = this.handValue(this.playerHand);
    const dealer = this.handValue(this.croupierHand);

    const playerBlackjack =
      player === 21 &&
      this.playerHand.length === 2;


     // PLAYER BUST
    if (player > 21) {
      this.ui.showStamp("bust");
      this.dealerChips += this.currentBet;
    }

      // BLACKJACK
    else if (playerBlackjack) {
      this.ui.showStamp("blackjack");
      this.bankChips += this.currentBet * 2;
      this.dealerChips -= this.currentBet;
    }

    // PLAYER WIN
    else if (dealer > 21 || player > dealer) {
      this.ui.showStamp("win");
      this.bankChips += this.currentBet * 2;
      this.dealerChips -= this.currentBet;
    }

    // PLAYER LOSE
    else if (player < dealer) {
      this.ui.showStamp("lose");
      this.dealerChips += this.currentBet;
    }

    // DRAW
    else {
      this.bankChips += this.currentBet;
      this.ui.showStamp("draw");
    }

    // 🎯 finais definitivos

    if (this.bankChips <= 0) {
      this.ui.showEnding("lose-ending");
      return;
    }

    if (this.dealerChips <= 0) {
      this.ui.showEnding("win-ending");
      return;
    }

    this.currentBet = 0;

    this.waitRestart();
  }

    
    start() {

      this.ui.clearTable()
      this.hasDoubled = false;

      this.ui.setDoubleEnabled(true);

        console.log(this.bankChips)

        this.resetDeck();
        

        this.playerHand = [];
        this.croupierHand = [];

        // aposta automática
        this.bankChips -= 1;
        this.currentBet = 1;

        this.ui.renderBetChips(this.currentBet);

        this.ui.renderPlayerChips(this.bankChips);
        this.ui.renderDealerChips(this.dealerChips);

        const dealer1 = this.drawCard();
        const dealer2 = this.drawCard();

        this.croupierHand.push(dealer1, dealer2);

        this.ui.renderHiddenCard();
        this.ui.renderDealerCard(dealer2);

        const visibleValue = this.handValue([this.croupierHand[1]]);

        this.ui.updateDealerValue(visibleValue);

        const total = this.handValue(this.playerHand);        

        this.playerTurn();

        if (total === 21) {

          this.resolveGame();

          return;
        }

        console.log("CURRENT PHASE:", this.phase);
    }

  waitRestart() {

    const restart = () => {

      document.removeEventListener("click", restart);

      this.start();
    };

    setTimeout(() => {

      document.addEventListener("click", restart);

    }, 300);
  }
  
}

