let gameStarted = false;

function startGame() {
    gameStarted = true;
}

function hasGameStarted() {
    return gameStarted;
}

module.exports = {
    startGame: startGame,
    hasGameStarted: hasGameStarted
};