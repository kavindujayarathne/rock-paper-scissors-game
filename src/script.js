let score = JSON.parse(localStorage.getItem("score"));

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    draws: 0,
  };
}

updateScore();

// Reset Score

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.draws = 0;

  localStorage.removeItem("score");

  updateScore();
}

// Event Listeners
const rockDiv = document.querySelector(".js-rock");
const paperDiv = document.querySelector(".js-paper");
const scissorsDiv = document.querySelector(".js-scissors");

const resetScoreDiv = document.querySelector(".reset-btn");
const autoPlayDiv = document.querySelector(".autoplay-btn");

rockDiv.addEventListener("click", () => {
  pickPlayerMove("rock");
});
paperDiv.addEventListener("click", () => {
  pickPlayerMove("paper");
});
scissorsDiv.addEventListener("click", () => {
  pickPlayerMove("scissors");
});

resetScoreDiv.addEventListener("click", () => {
  resetScore();
});

autoPlayDiv.addEventListener("click", () => {
  autoPlay();
});

// keydown
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    pickPlayerMove("rock");
  } else if (event.key === "p") {
    pickPlayerMove("paper");
  } else if (event.key === "s") {
    pickPlayerMove("scissors");
  }
});

// Auto Play
let isAutoPlayOn = false;
let autoplayId;
const autoPlayElement = document.querySelector(".autoplay-btn");

function autoPlay() {
  if (!isAutoPlayOn) {
    autoPlayElement.innerHTML = "Stop";
    autoplayId = setInterval(function () {
      const move = pickComputerMove();
      pickPlayerMove(move);
    }, 1000);
    isAutoPlayOn = true;
  } else {
    clearInterval(autoplayId);
    isAutoPlayOn = false;
    autoPlayElement.innerHTML = "Auto Play";
  }
}

// Computer Move

function pickComputerMove() {
  let computerValue = "";
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerValue = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerValue = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerValue = "scissors";
  }
  return computerValue;
}

// Player Move

function pickPlayerMove(move) {
  const computerValue = pickComputerMove();

  let result = "";

  if (move === "rock") {
    if (computerValue === "rock") {
      result = "Game Draw!";
    } else if (computerValue === "paper") {
      result = "You lose!";
    } else if (computerValue === "scissors") {
      result = "You win!";
    }
  } else if (move === "paper") {
    if (computerValue === "rock") {
      result = "You win!";
    } else if (computerValue === "paper") {
      result = "Game Draw!";
    } else if (computerValue === "scissors") {
      result = "You lose!";
    }
  } else if (move === "scissors") {
    if (computerValue === "rock") {
      result = "You lose!";
    } else if (computerValue === "paper") {
      result = "You win!";
    } else if (computerValue === "scissors") {
      result = "Game Draw!";
    }
  }

  // Score

  if (result === "You win!") {
    score.wins += 1;
  } else if (result === "You lose!") {
    score.losses += 1;
  } else if (result === "Game Draw!") {
    score.draws += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  displayResult(move, computerValue, result);

  updateScore();
}

function displayResult(move, computerValue, result) {
  resultElement = document.querySelector(".show-result");
  resultElement.style.display = "block";
  resultElement.innerHTML = `You picked ${move}. Computer picked ${computerValue}. ${result}`;
}

function updateScore() {
  document.querySelector(
    ".show-score"
  ).innerHTML = `Score: Wins ${score.wins} . Losses ${score.losses} . Draws ${score.draws}`;
}
