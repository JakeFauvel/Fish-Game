// Phaser imports
window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

// Custom JS imports
let GameState = require("./gameState.js");
let Player = require("./player.js");
let Fish = require("./fish.js");
let EnemyFish = require("./enemyFish");
let EatingMechanic = require("./eatingMechanic");

// Game Config
const screenWidth = 1250;
const screenHeight = 600;

// Game Objects
let startGameBtn = undefined;
let gameOverBtn = undefined;
let scoreText = undefined;
let score = 0;

let game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload()
{
    // Load Assets
    game.load.image('bg1_small', './assets/bg1_small.png');
    game.load.image('start_game', './assets/start_game.png');
    game.load.image('game_over', './assets/game_over.png');
    Player.preload(game);
    Fish.preload(game, screenWidth, screenHeight);
    EnemyFish.preload(game, screenWidth, screenHeight);
}

function create()
{
    // Start Physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    // Create Assets
    // Background / UI
    let backgroundLayer = game.add.group();
    backgroundLayer.create(0, 0, 'bg1_small');
    // Fish
    let fishLayer = game.add.group();
    Fish.create(fishLayer);
    // Start Game Button
    startGameBtn = game.add.button(500, 225, 'start_game');
    startGameBtn.onInputUp.add(startGame, startGameBtn, true);
    // Player
    let playerLayer = game.add.group();
    Player.create(playerLayer);
    // Enemy Fish
    let enemyFishLayer = game.add.group();
    EnemyFish.create(enemyFishLayer);
    // Score
    scoreText = game.add.text(20, 10, 'SCORE ' + score, { font: "32px Scratch", fill: "#2BF6F7"});
}

function update()
{
    if (!GameState.hasGameStarted() || GameState.isGameOver()) {
        Fish.update(game);
        EnemyFish.update(game);
        if (GameState.isGameOver()) {
            gameOverBtn = game.add.button(500, 225, 'game_over');
            gameOverBtn = gameOverBtn.onInputUp.add(restartGame, gameOverBtn, true);
        } else {
            scoreText.alpha = 0;
        }
    } else {
        score = 0;
        showItem(scoreText);
        Player.show();
        Player.update(game);
        Fish.update(game);
        EnemyFish.update(game);
        let eatenFish = EatingMechanic.didPlayerEatFish(Player.getPlayerFish(), Fish.getFishes());
        let eatenPlayer = EatingMechanic.didFishEatPlayer(EnemyFish.getEnemies(), Player.getPlayerFish());
        if (eatenFish) {
            Fish.eatFish(eatenFish);
            score = score + 10;
            scoreText.setText('SCORE ' + score);
        }
        if (eatenPlayer) {
            EnemyFish.eatPlayer(eatenPlayer);
            GameState.endGame();
        }
    }
}

function startGame(startGameBtn) {
    GameState.startGame();
    hideItem(startGameBtn);
}

function restartGame(gameOverBtn) {
    GameState.restartGame();
    destroyItem(gameOverBtn);
    create();
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

function destroyItem(item) {
    item.destroy();
}