const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.innerText = `Player ${board[a]} Wins!`;
            isGameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.innerText = "It's a Draw!";
        isGameActive = false;
    }
}

function handleClick(event) {
    const index = event.target.dataset.index;

    if (board[index] === "" && isGameActive) {
        board[index] = currentPlayer;
        event.target.innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (isGameActive) {
            statusText.innerText = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    statusText.innerText = "Player X's Turn";
    cells.forEach(cell => cell.innerText = "");
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
