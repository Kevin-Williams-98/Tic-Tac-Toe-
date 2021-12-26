let playerTurn = true;
let computerMoveTimeout = 0;

const gameStatus = {
  MORE_MOVES_LEFT: 1,
  HUMAN_WINS: 2,
  COMPUTER_WINS: 3,
  DRAW_GAME: 4,
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
  // Setup the click event for the "New game" button
  const newBtn = document.getElementById("newGameButton");
  newBtn.addEventListener("click", newGame);

  // Create click-event handlers for each game board button
  const buttons = getGameBoardButtons();
  for (let button of buttons) {
    button.addEventListener("click", function () {
      boardButtonClicked(button);
    });
  }

  // Clear the board
  newGame();
}

// Returns an array of 9 <button> elements that make up the game board. The first 3
// elements are the top row, the next 3 the middle row, and the last 3 the
// bottom row.
function getGameBoardButtons() {
  return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
  const buttons = getGameBoardButtons();

  // Ways to win
  const possibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  // Check for a winner first
  for (let indices of possibilities) {
    if (
      buttons[indices[0]].innerHTML !== "" &&
      buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
      buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML
    ) {
      // Found a winner
      if (buttons[indices[0]].innerHTML === "X") {
        return gameStatus.HUMAN_WINS;
      } else {
        return gameStatus.COMPUTER_WINS;
      }
    }
  }

  // See if any more moves are left
  let foundEmpty = false;
  for (let button of buttons) {
    if (button.innerHTML !== "X" && button.innerHTML !== "O") {
      return gameStatus.MORE_MOVES_LEFT;
    }
  }

  // If no winner and no moves left, then it's a draw
  return gameStatus.DRAW_GAME;
}

function newGame() {
  // TODO: Complete the function
  computerMoveTimeout = 0;
  let boardDiv = document.getElementById("gameBoard");
  let btnsXO = boardDiv.children;
  for (let i = 0; i < btnsXO.length; i++) {
    btnsXO[i].innerHTML = "";
    btnsXO[i].removeAttribute("class");
    btnsXO[i].disabled = false;
  }
  playerTurn = true;
  document.getElementById("turnInfo").innerText = "Your turn";
}

function boardButtonClicked(button) {
  // TODO: Complete the function
  if (playerTurn === true) {
    button.innerHTML = "X";
    button.classList.add("x");
    button.disabled = true;
    playerTurn = false;
    switchTurn();
  }
}

function switchTurn() {
  // TODO: Complete the function
  if (checkForWinner() === 1) {
    if (playerTurn == false) {
      computerMoveTimeout = setTimeout(makeComputerMove, 1000);
      playerTurn = true;
      document.getElementById("turnInfo").innerText = "Your turn";
    }
  }
  if (checkForWinner() != 1) {
    playerTurn = false;
    if (checkForWinner() == 2) {
      document.getElementById("turnInfo").innerText = "You win!";
    }
    if (checkForWinner() == 3) {
      document.getElementById("turnInfo").innerText = "Computer wins!";
    }
    if (checkForWinner() == 4) {
      document.getElementById("turnInfo").innerText = "Draw game";
    }
  }
}

function makeComputerMove() {
  // TODO: Complete the function
  console.log("In the make computer move method");
  let btnsXO = getGameBoardButtons();
  let btnSelected = false;

  while (btnSelected == false) {
    console.log("In while loop");
    let btnToselect = getRandomInt(0, 8);
    if (btnsXO[btnToselect].disabled == false) {
      console.log("in If statement");
      btnsXO[btnToselect].innerHTML = "O";
      btnsXO[btnToselect].classList.add("o");
      btnsXO[btnToselect].disabled = true;
      btnSelected = true;
    }
  }
  switchTurn();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
