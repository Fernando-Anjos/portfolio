import { Game } from "./game.js";
import { UI } from "./ui.js";

const homeScreen = document.getElementById("home-screen");
const blackjackScreen = document.getElementById("blackjack-screen");

const openBlackjack = document.getElementById("open-blackjack");

const sound = document.getElementById("page-sound");

function scaleGame() {
  const gameContainer = document.getElementById("game-container");

  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;

  const scale = Math.min(scaleX, scaleY);

  gameContainer.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", scaleGame);

scaleGame();

openBlackjack.addEventListener("click", (e) => {

  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  sound.currentTime = 0;
  sound.play();

  homeScreen.classList.add("turn-page");

  blackjackScreen.classList.add("active");

  document.body.style.overflow = "hidden";

});;

const ui = new UI();
const game = new Game(ui);

window.game = game;

document.querySelector("#hit").onclick = () => {
  console.log("CLICK HIT");
  game.hit();
} 
document.querySelector("#stand").onclick = () => game.stand();
document.querySelector("#double").onclick = () => game.double();

game.start();