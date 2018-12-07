let game = undefined;
let layer = undefined;
let player = undefined;

let preload = function(inputGame) {
    game = inputGame;
    game.load.spritesheet('player_small', './assets/red_angler_idle_small.png', 261, 181, 19);
};

let create = function(inputLayer) {
    layer = game.add.group();
    player = layer.create(315, 175, 'player_small');
    player.animations.add('idle');
    player.animations.play('idle', 15, true);
    player.alpha = 0;
};

let update = function() {

};

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