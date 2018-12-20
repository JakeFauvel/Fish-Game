// Phaser imports
window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

// Custom JS imports
let GameState = require("./gameState.js");
let Player = require("./player.js");
let Fish = require("./fish.js");

// Game Config
const screenWidth = 1250;
const screenHeight = 600;

// Game Objects
let startGameBtn = undefined;
let scoreText = undefined;
let score = '0';

let game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload()
{
    // Load Assets
    game.load.image('bg1_small', './assets/bg1_small.png');
    game.load.image('start_game', './assets/start_game.png');
    Player.preload(game);
    Fish.preload(game);
}

function create()
{
    // Create Assets
    // Background / UI
    let backgroundLayer = game.add.group();
    backgroundLayer.create(0, 0, 'bg1_small');
    startGameBtn = game.add.button(500, 225, 'start_game');
    scoreText = game.add.text(20, 10, 'SCORE ' + score, { font: "32px Scratch", fill: "#2BF6F7"});
    startGameBtn.onInputUp.add(startGame, startGameBtn, true);

    // Player
    let playerLayer = game.add.group();
    let fishLayer = game.add.group();
    Player.create(playerLayer);
    Fish.create(fishLayer);
}

function update()
{
    if (!GameState.hasGameStarted()) {
        scoreText.alpha = 0;
    } else {
        showItem(scoreText);
        Player.show();
        Fish.show();
        Player.update(game);
    }
}

function startGame(startGameBtn) {
    GameState.startGame();
    hideItem(startGameBtn);
}

function showItem(item) {
    game.add.tween(item).to( { alpha: 1 }, 1000, "Linear", true);
}

function hideItem(item) {
    let tween = game.add.tween(item).to( { alpha: 0 }, 1000, "Linear", true);
    tween.onComplete.add(function() {
        item.visible = false;
    });
}