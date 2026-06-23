/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");

const resetBtnEl = document.querySelector(".reset");

const playerTurn = document.querySelector("#message");
/*-------------------------------- Constants --------------------------------*/
const board = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
/*---------------------------- Variables (state) ----------------------------*/
let turn = "X";
let winner = false;
let tie = false;
/*-------------------------------- Functions --------------------------------*/

function updateMessage() {
  if (winner === false && tie === false) {
    playerTurn.innerHTML = `It is ${turn}'s turn`;
  } else if (winner === false && tie === true) {
    playerTurn.innerHTML = "it is a tie!";
  } else if (winner === true && tie === false) {
    playerTurn.innerHTML = `${turn} player has won`;
  }
}
function switchPlayerTurn() {
  if (winner) {
    return;
  }
  if (turn === "X") {
    turn = "O";
  } else if (turn === "O") {
    turn = "X";
  }
  console.log(turn);
}

function checkForWinner() {
  winningCombos.forEach((combo) => {
    if (
      board[combo[0]] !== "" &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = true;
    }
  });
  console.log(winner);
}

function checkForTie() {
  if (winner) {
    return;
  } else if (!board.includes("")) {
    tie = true;
  }
  console.log(tie);
}

function placePiece(index) {
  board[index] = turn;
  console.log(board);
}

function handleClick(event) {
  const squareIndex = event.target.id;

  if (squareIndex === "") {
    return;
  } else if (
    board[squareIndex] === "X" ||
    board[squareIndex] === "O" ||
    winner
  ) {
    return;
  }
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  updateBoard();
  render();

  if (tie === true) {
    init();
  }
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  // loop through the board variable using forEach

  board.forEach((cell, index) => {
    squareEls[index].textContent = cell;
  });
}

function init() {
  console.log("init game");
  board[0] = "";
  board[1] = "";
  board[2] = "";
  board[3] = "";
  board[4] = "";
  board[5] = "";
  board[6] = "";
  board[7] = "";
  board[8] = "";
  turn = "X";
  winner = false;
  tie = false;
  updateMessage();
  updateBoard();
  render();
}

init();

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
  square.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);
console.log(winner);
