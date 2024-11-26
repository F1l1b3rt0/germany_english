const phrases = [
    { phrase: "The zombie was ___, in the lake.", word: "swimming", audio: "audio/swimming.mp3" },
    { phrase: "While the zombie was ___, it started to drown.", word: "swimming" },
    { phrase: "When the zombie was ___, it saw a drowned.", word: "fishing" },
    { phrase: "While the zombie was ___, it found a treasure.", word: "walking" },
    { phrase: "When the zombie was ___, it got attacked by a drowned.", word: "hunting" },
    { phrase: "While the zombie was ___, it heard a strange noise.", word: "running" },
    { phrase: "When the zombie was ___, it tripped over a skeleton.", word: "digging" },
    { phrase: "While the zombie was ___, it fell into a cave.", word: "exploring" },
    { phrase: "When the zombie was ___, it dropped its weapon.", word: "fighting" },
    { phrase: "While the zombie was ___, it spotted a villager.", word: "searching" },
    { phrase: "When the zombie was ___, it slipped on a wet stone.", word: "climbing" },
    { phrase: "Juan and his firends were ___.", word: "playing" },
    { phrase: "Pancho's mother was ___, the clothes.", word: "ironing"},
    { phrase: "Alberto was ___, at home.", word: "programming"},
    { phrase: "Homero was ___, donuts.", word:"eating"},
    { phrase: "Oziel and his friends were ___, at a party.", word:"dancing"},
    { phrase:"Edson was ___, about anime.", word:"talking"},
    { phrase:"he was ___, coffee and tea", word:"drinking"}
];

let currentPhrase, currentWord, currentAudio;
let guessedLetters = [];
let attempts = 6;

const canvas = document.getElementById("zombieCanvas");
const ctx = canvas.getContext("2d");
const zombieImg = new Image();
zombieImg.src = "zombie.png"; // Tu imagen del zombie
const drownedImg = new Image();
drownedImg.src = "drowned.png"; // Tu imagen del ahogado

function chooseRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const phrase = phrases[randomIndex];
    currentPhrase = phrase.phrase;
    currentWord = phrase.word;
    currentAudio = phrase.audio;

    guessedLetters = Array(currentWord.length).fill("_");
    document.getElementById("hint").textContent = currentPhrase.replace("___", guessedLetters.join(" "));
}

function playAudio() {
    const audio = new Audio(currentAudio);
    audio.play();
}

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibuja el agua según los intentos restantes
    const waterHeight = (6 - attempts) * (canvas.height / 6);
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    ctx.fillRect(0, canvas.height - waterHeight, canvas.width, waterHeight);

    // Dibuja al zombie si hay intentos restantes, al ahogado si se pierden todos
    const image = attempts > 0 ? zombieImg : drownedImg;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// Asegura que la imagen del zombie se cargue correctamente antes de dibujar
zombieImg.onload = function () {
    updateCanvas(); // Dibuja el zombie en cuanto se cargue la imagen
};

drownedImg.onload = function () {
    if (attempts === 0) updateCanvas(); // Solo para el ahogado, si es necesario
};

// Inicialización del juego
function initGame() {
    attempts = 6;
    chooseRandomPhrase();
    document.getElementById("status").textContent = "";
    document.getElementById("playAudioBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    
    // Dibuja inmediatamente después de inicializar el canvas
    updateCanvas();
}

function handleGuess() {
    const input = document.getElementById("letterInput").value.toLowerCase();
    if (!input || input.length !== 1) return;

    if (currentWord.includes(input)) {
        currentWord.split("").forEach((letter, index) => {
            if (letter === input) guessedLetters[index] = letter;
        });
    } else {
        attempts--;
    }

    document.getElementById("letterInput").value = "";
    checkGameStatus();
    updateGameView();
}

function checkGameStatus() {
    if (guessedLetters.join("") === currentWord) {
        document.getElementById("status").textContent = "¡Ganaste! 🎉";
        document.getElementById("playAudioBtn").style.display = "inline-block";
        document.getElementById("nextBtn").style.display = "block";
    } else if (attempts === 0) {
        document.getElementById("status").textContent = `¡Perdiste! La palabra era "${currentWord}".`;
        document.getElementById("nextBtn").style.display = "block";
    }
}

function updateGameView() {
    document.getElementById("hint").textContent = currentPhrase.replace("___", guessedLetters.join(" "));
    document.getElementById("guessedLetters").textContent = guessedLetters.join(" ");
    updateCanvas();
}

document.getElementById("guessBtn").addEventListener("click", handleGuess);
document.getElementById("letterInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleGuess();
});
document.getElementById("nextBtn").addEventListener("click", initGame);
document.getElementById("playAudioBtn").addEventListener("click", playAudio);

function initGame() {
    attempts = 6;
    chooseRandomPhrase();
    updateCanvas();
    document.getElementById("status").textContent = "";
    document.getElementById("playAudioBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    updateGameView();
}

initGame();
