const layouts = {
  "ace": [
    { x: 50, y: 50 }
  ],

  "two": [
    { x: 50, y: 35 },
    { x: 50, y: 65 }
  ],

  "three": [
    { x: 50, y: 30 },
    { x: 50, y: 50 },
    { x: 50, y: 70 }
  ],

  "four": [
    { x: 35, y: 35 },
    { x: 65, y: 35 },
    { x: 35, y: 65 },
    { x: 65, y: 65 }
  ],

  "five": [
    { x: 35, y: 35 },
    { x: 65, y: 35 },
    { x: 50, y: 50 },
    { x: 35, y: 65 },
    { x: 65, y: 65 }
  ],

  "six": [
    { x: 35, y: 25 },
    { x: 65, y: 25 },

    { x: 35, y: 50 },
    { x: 65, y: 50 },

    { x: 35, y: 75 },
    { x: 65, y: 75 }
  ],

  "seven": [   

    { x: 30, y: 30 },
    { x: 70, y: 30 },

    { x: 50, y: 40 },

    { x: 30, y: 50 },
    { x: 70, y: 50 },

    { x: 30, y: 75 },
    { x: 70, y: 75 }
  ],

  "eight": [
    { x: 35, y: 25 },
    { x: 65, y: 25 },

    { x: 35, y: 41 },
    { x: 65, y: 41 },

    { x: 35, y: 60 },
    { x: 65, y: 60 },

    { x: 35, y: 77 },
    { x: 65, y: 77 }
  ],

  "nine": [
    { x: 35, y: 25 },
    { x: 65, y: 25 },

    { x: 35, y: 40 },
    { x: 65, y: 40 },

    { x: 50, y: 50 },

    { x: 35, y: 60 },
    { x: 65, y: 60 },

    { x: 35, y: 75 },
    { x: 65, y: 75 }
  ],

  "ten": [
    { x: 35, y: 25 },
    { x: 65, y: 25 },

    { x: 50, y: 34 },

    { x: 35, y: 42 },
    { x: 65, y: 42 },    

    { x: 35, y: 59 },
    { x: 65, y: 59 },

    { x: 50, y: 67 },

    { x: 35, y: 75 },
    { x: 65, y: 75 }
  ],

   "jack": [
    { x: 50, y: 50 }
  ],

   "queen": [
    { x: 50, y: 50 }
  ],

   "king": [
    { x: 50, y: 50 }
  ],

};


const scaleMap = {
  1: 3,
  2: 1.5,
  3: 1.25,
  4: 1.15,
  5: 1.05,
  6: 0.95,
  7: 0.9,
  8: 0.9,
  9: 0.8,
  10: 0.8
};

const suitMap = {
  "hearts": "assets/images/cards/heart1.svg",
  "diamonds": "assets/images/cards/diamonds1.svg",
  "spades": "assets/images/cards/spades1.svg",
  "clubs": "assets/images/cards/clubs1.svg"
};

const faceCardMap = {
  king: {
    hearts: "assets/images/cards/king-hearts.svg",
    diamonds: "assets/images/cards/king-diamonds.svg",
    spades: "assets/images/cards/king-spades.svg",
    clubs: "assets/images/cards/king-clubs.svg",
  },

  queen: {
    hearts: "assets/images/cards/queen-hearts.svg",
    diamonds: "assets/images/cards/queen-diamonds.svg",
    spades: "assets/images/cards/queen-spades.svg",
    clubs: "assets/images/cards/queen-clubs.svg",
  }

  //jack: {
    //hearts: "assets/images/cards/jack-heart.svg",
    //diamonds: "assets/images/cards/jack-diamond.svg",
    //spades: "assets/images/cards/jack-spade.svg",
    //clubs: "assets/images/cards/jack-club.svg",
  //}
};

const rankMap = {

  "ace":"assets/images/cards/1.svg",
  "two":"assets/images/cards/2.svg",
  "three":"assets/images/cards/3.svg",
  "four":"assets/images/cards/4.svg",
  "five":"assets/images/cards/5.svg",
  "six":"assets/images/cards/6.svg",
  "seven":"assets/images/cards/7.svg",
  "eight":"assets/images/cards/8.svg",
  "nine":"assets/images/cards/9.svg",
  "ten":"assets/images/cards/10.svg",
  "jack":"assets/images/cards/j.svg",
  "queen":"assets/images/cards/q.svg",
  "king":"assets/images/cards/k.svg",
}


function renderCenter(container, value, suit) {
  container.innerHTML = "";

    layouts[value].forEach(pos => {

      const jitter = () => Math.random() * 3 - 1.5;

      const el = document.createElement("div");
      el.className = "suit";

      el.style.left = `calc(${pos.x}% + ${jitter()}px)`;
      el.style.top = `calc(${pos.y}% + ${jitter()}px)`;

      const img = document.createElement("img");
      img.src = suitMap[suit];
      img.className = "suit-svg";

      if (pos.y > 55) {
        img.style.transform = "rotate(180deg)";
      }

      const baseScale = scaleMap[value];
      const variation = Math.random() * 0.1 - 0.05;

      el.style.transform = `
        translate(-50%, -50%)
        scale(${baseScale + variation})
      `;

      el.appendChild(img);

      container.appendChild(el);
    });
}
export function createHiddenCard() {
  const card = document.createElement("div");

  card.className = "card-deck hidden-card";

  const bg = document.createElement("img");
  bg.src = "assets/images/cards/backcard.png";
  bg.className = "card-deck-bg";

  card.appendChild(bg);

  return card;
}

export function createCard(value, suit, inspectable = true) {
  const card = document.createElement("div");
  card.className = "card-deck";
  card.style.rotate = `${Math.random() * 2 - 1}deg`;

  const bg = document.createElement("img");
  bg.src = "assets/images/cards/cards2.png";
  bg.className = "card-deck-bg";

  card.appendChild(bg);

  const topRank = document.createElement("img");
  topRank.src = rankMap[value];
  topRank.className = "rank-svg";

  const topSuit = document.createElement("img");
  topSuit.src = suitMap[suit];
  topSuit.className = "corner-suit-svg";

  const bottomRank = document.createElement("img");
  bottomRank.src = rankMap[value];
  bottomRank.className = "rank-svg";

  const bottomSuit = document.createElement("img");
  bottomSuit.src = suitMap[suit];
  bottomSuit.className = "corner-suit-svg";

  // topo
  const top = document.createElement("div");
  top.className = "corner top";
  
  top.appendChild(topRank);
  top.appendChild(topSuit);

  // base (invertido)
  const bottom = document.createElement("div");
  bottom.className = "corner bottom";
  bottom.appendChild(bottomRank);
  bottom.appendChild(bottomSuit);

  // centro
  const center = document.createElement("div");
  center.className = "center-area";

  const isFaceCard =
  //value === "jack" ||
  value === "queen" ||
  value === "king";

  if (isFaceCard) {

    const art = document.createElement("img");

    art.src = faceCardMap[value][suit];    

    art.className = "face-art";

    center.appendChild(art);

  } else {

    renderCenter(center, value, suit);
  }

  card.appendChild(top);
  card.appendChild(center);
  card.appendChild(bottom);

  if (inspectable) {

    card.addEventListener("click", () => {
      openCardViewer(value, suit);
    });

  } 

  return card;
}

function openCardViewer(value, suit) {

  const viewer = document.querySelector("#card-viewer");

  viewer.innerHTML = "";

  const bigCard = createCard(value, suit, false);

  bigCard.classList.add("viewer-card");

  viewer.appendChild(bigCard);

  viewer.style.display = "flex";

  viewer.addEventListener("click", (e) => {

    if (e.target === viewer) {
      viewer.style.display = "none";
    }
  });
}



