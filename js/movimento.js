import audioTema from "../assets/sounds/magic.mp3";
import gameOver from "../assets/sounds/gameover.mp3";

const audio = new Audio(audioTema);
const audioGameOver = new Audio(gameOver);

const gobUp = document.getElementById("gobUp");
const gobLeft = document.getElementById("gobLeft");
const gobRight = document.getElementById("gobRight");

const goblinsContainer = document.getElementById("goblins");

const fire = document.getElementById("fire");
const container = document.getElementById("container");
const gobUpEixo = gobUp.getBoundingClientRect();
const gobRightEixo = gobRight.getBoundingClientRect();
const gobLeftEixo = gobLeft.getBoundingClientRect();

const placar = document.getElementById("placar");
const botaoIniciar = document.getElementById("btnIniciar");

console.log(gobUpEixo);

let count = 0;
let flagChange = true;
let placarValor = 0;
let fireCount = 0;
let anime;

const loop = () => {
  setTimeout(() => {
    if (fire.style.top === "350px") {
      placarValor += 1;
      fireCount = 0;
      placar.textContent = "Placar:" + placarValor;
    }
    const fireEixo = fire.getBoundingClientRect();
    const allGoblins = goblinsContainer.getBoundingClientRect();

    const fireHit = {
      raio: fireEixo.width,
      x: fireEixo.x + fireEixo.width / 2,
      y: fireEixo.y + fireEixo.width / 2,
    };

    const gobUpHit = {
      raio: allGoblins.width / 2,
      x: allGoblins.x + allGoblins.width / 2,
      y: allGoblins.y + allGoblins.width / 2,
    };

    console.log(gobUpHit);

    const distancia = Math.sqrt(
      (gobUpHit.x - fireHit.x) ** 2 + (gobUpHit.y - fireHit.y) ** 2
    );
    let raios = fireHit.raio + gobUpHit.raio;

    let randomValue = Math.ceil(Math.random() * 100 * 4);
    if (randomValue > 0 && randomValue < 600) {
      fire.style.left = `${randomValue}px`;
    }

    fireCount += 20;
    fire.style.top = `${fireCount}px`;

    if (distancia <= raios) {
      placarValor = 0;

      audio.pause();
      audioGameOver.play();

      loaderText.textContent = "Perdeu!";
      botaoIniciar.style.visibility = "visible";
      botaoIniciar.innerText = "Reiniciar";
      cancelAnimationFrame(anime);
      return;
    }
    anime = requestAnimationFrame(loop);
  }, 16);
};

botaoIniciar.addEventListener("click", () => {
  loop();
  audio.play();
  botaoIniciar.style.visibility = "hidden";
  loaderText.textContent = "Bom jogo!";
});

window.addEventListener("keypress", (event) => {
  if (event.key === "d") {
    flagChange = true;

    if (count < 385) {
      count += 35;
    }

    // gobRight.style.left = `${count}px`;
    goblinsContainer.style.left = `${count}px`;

    gobRight.style.animation = "walkRight 1s infinite step-end";

    gobLeft.style.animation = "none";
    gobLeft.style.visibility = "hidden";
    gobUp.style.visibility = "hidden";
  }

  if (event.key === "w") {
    if (flagChange) {
      gobUp.style.left = gobRight.style.left;
    } else {
      gobUp.style.left = gobLeft.style.left;
    }

    gobLeft.style.animation = "none";
    gobRight.style.animation = "none";

    gobUp.style.visibility = "visible";
  }

  if (event.key === "a") {
    flagChange = false;

    if (count <= 385 && count >= 35) {
      count -= 35;
    }

    //gobLeft.style.left = `${count}px`;

    goblinsContainer.style.left = `${count}px`;

    gobUp.style.visibility = "hidden";
    gobRight.style.animation = "none";
    gobRight.style.visibility = "hidden";

    gobLeft.style.animation = "walkLeft 1s infinite step-end";
  }
});
