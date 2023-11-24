import delay from "./delay";
import audioTema from "../assets/sounds/magic.mp3";
import gameOver from "../assets/sounds/gameover.mp3";

const loaderText = document.getElementById("loaderText");
const gameContainer = document.getElementById("container");

const botaoIniciar = document.getElementById("btnIniciar");

const botaoLigar = document.getElementById("btnLigar");

export const iniciar = false;

async function carregaAudio() {
  try {
    loaderText.textContent = "Carregando audio...";
    await delay(1000);

    const audio = new Audio(audioTema);
    const over = new Audio(gameOver);

    if (audio && over) {
      loaderText.textContent = "Audio carregado";
    }
  } catch (err) {
    loaderText.textContent = "Erro no carregamento";
    console.log(err);
  }
}

async function carregaImagem() {
  try {
    loaderText.textContent = "Carregando imagem...";

    const img = await fetch("./assets/cenario.jpg");
    await delay(500);

    gameContainer.style.backgroundImage = `url(${img.url})`;
    if (img.url) {
      loaderText.textContent = "Imagem carregada";
      await delay(500);
      loaderText.textContent = "Pronto para iniciar";
      botaoIniciar.style.visibility = "visible";
    }
  } catch (err) {
    loaderText.textContent = "Falha no carregamento da imagem";
    console.log(err);
  }
}

const loadVideo = async () =>
  new Promise((resolve) => {
    const video = document.createElement("video");

    videoDiv.appendChild(video);
    video.src = videoPath;
    video.play();

    console.log("loading video...");

    // verificando  o fim do video para retirar o container e seguir o jogo
    video.addEventListener("ended", () => {
      if (video.ended) {
        videoDiv.style.visibility = "hidden";
      }
      botaoLigar.style.visibility = "hidden";
      carregaAudioImagem();
    });

    resolve(true);
  });

const videoDiv = document.getElementById("videoDiv");
const videoPath = "./assets/video/play2.mp4";

botaoLigar.addEventListener("click", () => {
  loadVideo();
});

async function carregaAudioImagem() {
  await carregaAudio();
  await carregaImagem();
}
