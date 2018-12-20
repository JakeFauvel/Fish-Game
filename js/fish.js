const FISH_WIDTH = 253;
const FISH_HEIGHT = 85;

let fishScale = 0.25;
let game = undefined;
let layer = undefined;
let fish = undefined;

let preload = function(inputGame) {
    game = inputGame;
    game.load.spritesheet('anchovy', './assets/anchovy_idle.png', FISH_WIDTH, FISH_HEIGHT, 20);
};

let create = function() {
    layer = game.add.group();
    fish = layer.create(centerFishX(), centerFishY(), 'anchovy');
    game.physics.enable(fish, Phaser.Physics.ARCADE);
    fish.alpha = 0;
    fish.animations.add('idle');
    fish.scale.setTo(fishScale, fishScale);
    fish.anchor.setTo(0.5);
    fish.animations.play('idle', 15, true);
};

function centerFishX() {
    return game.world.centerX - (FISH_WIDTH * fishScale) / 2;
}

function centerFishY() {
    return game.world.centerY - (FISH_HEIGHT * fishScale) / 2;
}

function show() {
    game.add.tween(fish).to( { alpha: 1 }, 1000, "Linear", true);
}

module.exports = {
    preload: preload,
    create: create,
    show: show
};