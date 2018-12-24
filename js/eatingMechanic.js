function didPlayerEatFish(playerFish, npcFishes) {
    let eatenFish = undefined;

    npcFishes.forEach((fish) => {
        let distanceToFish = Phaser.Math.distance(playerFish.x, playerFish.y, fish.x, fish.y);
        if (distanceToFish < 50) {
            eatenFish = fish;
        }
    });

    return eatenFish;
}

function didFishEatPlayer(enemyFishes, playerFish) {
    let eatenPlayer = undefined;

    enemyFishes.forEach((enemy) => {
        let distanceToPlayer = Phaser.Math.distance(playerFish.x, playerFish.y, enemy.x, enemy.y);
        if (distanceToPlayer < 50) {
            eatenPlayer = playerFish;
        }
    });

    return eatenPlayer;
}

module.exports = {
    didPlayerEatFish: didPlayerEatFish,
    didFishEatPlayer: didFishEatPlayer
};