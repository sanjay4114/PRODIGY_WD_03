const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const checkWinner = () => {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let [a, b, c] of winningCombos) {
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return gameBoard.includes('') ? null : 'Tie';
};

const handleClick = (e) => {
    const cellIndex = e.target.id.replace('cell', '');

    if (gameBoard[cellIndex] || !isGameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
        isGameActive = false;
        if (winner === 'Tie') {
            status.textContent = "It's a Tie!";
        } else {
            status.textContent = `${winner} Wins!`;
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => cell.textContent = '');
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
