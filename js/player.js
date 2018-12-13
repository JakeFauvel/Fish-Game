const PLAYER_WIDTH = 622;
const PLAYER_HEIGHT = 451;

let playerScale = 0.25;
let game = undefined;
let layer = undefined;
let player = undefined;

let directions = ["W", "NW", "N", "NE", "E", "SE", "S", "SW"];

let preload = function(inputGame) {
    game = inputGame;
    game.load.spritesheet('player', './assets/red_angler_idle.png', PLAYER_WIDTH, PLAYER_HEIGHT, 19);
};

let create = function() {
    layer = game.add.group();
    player = layer.create(centerPlayerX(), centerPlayerY(), 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.alpha = 0;
    player.animations.add('idle');
    player.scale.setTo(playerScale, playerScale);
    player.anchor.setTo(0.5);
    player.animations.play('idle', 15, true);
};

let update = function() {
    playerMovement();
};

function playerMovement() {
    let movement = game.physics.arcade.moveToPointer(player, 400);
    if (getDirection(movement) === 'W') {
        player.scale.setTo(playerScale, playerScale);
    } else {
        player.scale.setTo(-playerScale, playerScale);
    }
    checkForMouseContact();
}

function getDirection(angle, allowDiagonal) {
    if (allowDiagonal) {
        angle = Math.round((angle + Math.PI) / (Math.PI * 2) * 8) % 8;
        return (directions[angle]);
    } else {
        angle = Math.round((angle + Math.PI) / (Math.PI * 2) * 4) % 4;
        return (directions[angle * 2]);
    }
}

function checkForMouseContact() {
    if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
        player.body.velocity.setTo(0, 0);
    }
}

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