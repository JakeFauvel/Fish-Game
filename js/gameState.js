let gameStarted = false;
let gameOver = false;

function startGame() {
    gameStarted = true;
}

function endGame() {
    gameOver = true;
}

function restartGame() {
    gameStarted = false;
    gameOver = false;
}

function hasGameStarted() {
    return gameStarted;
}

function isGameOver() {
    return gameOver;
}

module.exports = {
    startGame: startGame,
    hasGameStarted: hasGameStarted,
    endGame: endGame,
    isGameOver: isGameOver,
    restartGame: restartGame
};