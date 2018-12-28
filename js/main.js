// Phaser imports
window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

// Game Config
const screenWidth = 1250;
const screenHeight = 600;

// Custom JS imports
let GameState = require("./gameState.js");
let Player = require("./player.js");
let Fish = require("./fish.js");
let EnemyFish = require("./enemyFish");
let EatingMechanic = require("./eatingMechanic");

// Player
let player = undefined;
let playerLayer = undefined;

// Game Objects
let backgroundMusic = undefined;
let chomp = undefined;
let startGameBtn = undefined;
let gameOverBtn = undefined;
let scoreText = undefined;
let score = 0;

let game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload()
{
    // Load Assets
    game.load.image('background', './assets/background.png');
    game.load.image('start_game', './assets/start_game.png');
    game.load.image('game_over', './assets/game_over.png');
    game.load.audio('background_music', './assets/background_music.mp3');
    game.load.audio('chomp', './assets/chomp.mp3');
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
    backgroundLayer.create(0, 0, 'background');
    // Music
    backgroundMusic = game.add.audio('background_music');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.1;
    // Chomp
    chomp = game.add.audio('chomp');
    chomp.volume = 2;
    // Fish
    let fishLayer = game.add.group();
    Fish.create(fishLayer);
    // Start Game Button
    startGameBtn = game.add.button(500, 225, 'start_game');
    startGameBtn.onInputUp.add(startGame);
    // Game Over
    gameOverBtn = game.add.button(500, 225, 'game_over');
    gameOverBtn.visible = false;
    gameOverBtn.onInputUp.add(restartGame);
    // Player
    playerLayer = game.add.group();
    player = createPlayer();
    // Enemy Fish
    let enemyFishLayer = game.add.group();
    EnemyFish.create(enemyFishLayer);
    // Score
    scoreText = game.add.text(20, 10, 'SCORE ' + score, { font: "32px Scratch", fill: "#2BF6F7"});
}

function update()
{
    if (GameState.hasGameStarted() && !GameState.isGameOver()) {
        showItem(scoreText);
        Player.show();
        Player.update(game);
        Fish.update(game);
        EnemyFish.update(game);
        let eatenFish = EatingMechanic.didPlayerEatFish(Player.getPlayerFish(), Fish.getFishes());
        let eatenPlayer = EatingMechanic.didFishEatPlayer(EnemyFish.getEnemies(), Player.getPlayerFish());
        if (eatenFish) {
            chomp.play();
            Fish.eatFish(eatenFish);
            score = score + 10;
            scoreText.setText('SCORE ' + score);
            Fish.spawnFish(true);
        }
        if (eatenPlayer) {
            chomp.play();
            EnemyFish.eatPlayer(eatenPlayer);
            GameState.endGame();
        }
    } else {
        Fish.update(game);
        EnemyFish.update(game);
    }

    // Game Over
    (GameState.isGameOver()) ? gameOverBtn.visible = true : gameOverBtn.visible = false;
}

function startGame() {
    GameState.startGame();
    hideItem(startGameBtn);
    createPlayer();
    backgroundMusic.fadeIn();
}

function createPlayer() {
    Player.create(playerLayer);
}

function restartGame() {
    score = 0;
    scoreText.setText('SCORE ' + score);
    backgroundMusic.fadeOut();
    GameState.restartGame();
    showItem(startGameBtn);
}

function showItem(item) {
    game.add.tween(item).to( { alpha: 1, visible: true }, 500, "Linear", true);
}

function hideItem(item) {
    game.add.tween(item).to( { alpha: 0, visible: false }, 500, "Linear", true);
}