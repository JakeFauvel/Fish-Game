const FISH_WIDTH = 253;
const FISH_HEIGHT = 85;

let screenWidth = undefined;
let screenHeight = undefined;
let fishScale = 0.25;
let numberOfFish = 25;
let game = undefined;
let fish = undefined;
let fishes = undefined;

let preload = function(inputGame, inputScreenWidth, inputScreenHeight) {
    game = inputGame;
    screenWidth = inputScreenWidth;
    screenHeight = inputScreenHeight;
    game.load.spritesheet('anchovy', './assets/anchovy_idle.png', FISH_WIDTH, FISH_HEIGHT, 20);
};

let create = function() {
    fishes = game.add.group();
    game.physics.enable(fishes, Phaser.Physics.ARCADE);
    createFishes();
};

function createFishes() {
    for (let i = 0; i < numberOfFish; i++) {
        fish = fishes.create(getRandomX(), getRandomY(), 'anchovy');
        fish.scale.setTo(fishScale, fishScale);
        fish.animations.add('idle');
        fish.animations.play('idle', 15, true);
    }
}

function getRandomX() {
    return Math.floor(Math.random() * Math.floor(screenWidth));
}

function getRandomY() {
    return Math.floor(Math.random() * Math.floor(screenHeight));
}

module.exports = {
    preload: preload,
    create: create,
};