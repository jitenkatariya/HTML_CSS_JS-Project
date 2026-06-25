const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGame = document.querySelector(".start-game");
const gameOver = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");

const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const blockHeight = 50;
const blockWidth = 50;

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let time = `00:00`;

highScoreElement.innerText = highScore;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let timeIntervalId = null;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

const blocks = [];
let snake = [{ x: 1, y: 3 }];

let direction = "down";

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row}-${col}`;
    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    // alert("Game Over");
    clearInterval(intervalId);

    modal.style.display = "flex";
    startGame.style.display = "none";
    gameOver.style.display = "flex";

    return;
  }

  if (head.x === food.x && head.y === food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");

    snake.unshift(head);

    score += 10;
    scoreElement.innerText = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

// intervalId = setInterval(() => {
//   render();
// }, 400);

startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 300);
  timeIntervalId = setInterval(() => {
    let [minutes, seconds] = time.split(":").map(Number);
    seconds += 1;
    if (seconds === 59) {
      seconds = 0;
      minutes += 1;
    }
    time = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    timeElement.innerText = time;
  }, 1000);
});

restartButton.addEventListener("click", restartGame);

// function restartGame() {
//   blocks[`${food.x}-${food.y}`].classList.remove("food");
//   snake.forEach((segment) => {
//     blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
//   });

//   score = 0;
//   time = `00:00`;

//   scoreElement.innerText = score;
//   timeElement.innerText = time;
//   highScoreElement.innerText = highScore;

//   modal.style.display = "none";
//   snake = [{ x: 1, y: 3 }];
//   food = {
//     x: Math.floor(Math.random() * rows),
//     y: Math.floor(Math.random() * cols),
//   };
//   intervalId = setInterval(() => {
//     render();
//   }, 300);
// }

function restartGame() {
  // Stop old timers
  clearInterval(intervalId);
  clearInterval(timeIntervalId);

  // Remove old snake
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  // Remove old food

  blocks[`${food.x}-${food.y}`].classList.remove("food");

  // Reset values

  score = 0;

  time = "00:00";

  scoreElement.innerText = score;

  timeElement.innerText = time;

  snake = [ { x: 1, y: 3, }, ];

  direction = "down";

  food = {
    x: Math.floor(Math.random() * rows),

    y: Math.floor(Math.random() * cols),
  };

  blocks[`${food.x}-${food.y}`].classList.add("food");

  modal.style.display = "none";

  // Start again

  intervalId = setInterval(() => {
    render();
  }, 300);

  timeIntervalId = setInterval(() => {
    let [minutes, seconds] = time.split(":").map(Number);

    seconds++;

    if (seconds === 59) {
      seconds = 0;

      minutes++;
    }

    time = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    timeElement.innerText = time;
  }, 1000);
}

addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    direction = "left";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  } else if (event.key == "ArrowDown") {
    direction = "down";
  } else if (event.key == "ArrowUp") {
    direction = "up";
  }
});
