function didPlayerEatFish(playerFish, npcFishes) {
    let eatenFish = undefined;

    npcFishes.forEach((fish, index) => {
        let distanceToFish = Phaser.Math.distance(playerFish.x, playerFish.y, fish.x, fish.y);
        if (distanceToFish < 50) {
            eatenFish = fish;
        }
    });

    return eatenFish;
}

function didFishEatPlayer() {
    return false;
}

module.exports = {
    didPlayerEatFish: didPlayerEatFish,
    didFishEatPlayer: didFishEatPlayer
};