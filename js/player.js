const PLAYER_WIDTH = 622;
const PLAYER_HEIGHT = 451;

let playerScale = 0.25;
let game = undefined;
let layer = undefined;
let player = undefined;

let preload = function(inputGame) {
    game = inputGame;
    game.load.spritesheet('player', './assets/red_angler_idle.png', PLAYER_WIDTH, PLAYER_HEIGHT, 19);
};

let create = function(inputLayer) {
    layer = game.add.group();
    player = layer.create(centerPlayerX(), centerPlayerY(), 'player');
    console.log(centerPlayerX(), centerPlayerY());
    player.alpha = 0;
    player.animations.add('idle');
    player.scale.setTo(playerScale, playerScale);
    player.animations.play('idle', 15, true);
};

let update = function() {

};

function centerPlayerX() {
    return game.world.centerX - (PLAYER_WIDTH * playerScale) / 2;
}

function centerPlayerY() {
    return game.world.centerY - (PLAYER_HEIGHT * playerScale) / 2;
}

function getPlayerX() {
    return player.body.x;
}

function getPlayerY() {
    return player.body.y;
}

function show() {
    game.add.tween(player).to( { alpha: 1 }, 1000, "Linear", true);
}

module.exports = {
    preload: preload,
    create: create,
    update: update,
    getPlayerX: getPlayerX,
    getPlayerY: getPlayerY,
    show: show
};