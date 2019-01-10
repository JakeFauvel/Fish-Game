// Phaser imports
window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

// Game Config
const screenWidth = 1250;
const screenHeight = 600;
const iconScale = 0.05;
const soundIconX = 1175;
const soundIconY = 5;
// Highscore
const highScore = localStorage.getItem('highScore');
let scoreText = undefined;
let score = 0;
if (!highScore) {
    localStorage.setItem('highScore', score)
}

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
let soundOnIconBtn = undefined;
let soundOffIconBtn = undefined;
let backgroundMusic = undefined;
let chomp = undefined;
let highScoreSound = undefined;
let startGameBtn = undefined;
let gameOverBtn = undefined;
let eatenImages = [
    'chomp',
    'nom',
    'yum'
];

let game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload()
{
    // Load Assets
    game.load.image('background', './assets/background.png');
    game.load.image('start_game', './assets/start_game.png');
    game.load.image('game_over', './assets/game_over.png');
    game.load.image('sound_on', './assets/sound_on.png');
    game.load.image('sound_off', './assets/sound_off.png');
    game.load.image('chomp', './assets/chomp.png');
    game.load.image('nom', './assets/nom.png');
    game.load.image('yum', './assets/yum.png');
    game.load.audio('background_music', './assets/background_music.mp3');
    game.load.audio('chomp', './assets/chomp.mp3');
    game.load.audio('highscore', './assets/highscore.wav');
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
    soundOnIconBtn = game.add.button(soundIconX, soundIconY,'sound_on');
    soundOffIconBtn = game.add.button(soundIconX, soundIconY,'sound_off');
    soundOnIconBtn.onInputUp.add(soundIconClick);
    soundOffIconBtn.onInputUp.add(soundIconClick);
    soundOnIconBtn.scale.setTo(iconScale, iconScale);
    soundOffIconBtn.scale.setTo(iconScale, iconScale);
    soundOffIconBtn.visible = false;
    backgroundMusic = game.add.audio('background_music');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.1;
    // Chomp
    chomp = game.add.audio('chomp');
    chomp.volume = 2;
    // Highscore Sound
    highScoreSound = game.add.audio('highscore');
    highScoreSound.volume = 4;
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
    scoreText = game.add.text(20, 10, 'SCORE: ' + score, { font: "45px Scratch", fill: "#2BF6F7"});
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
            let eatenImage = game.add.image(eatenFish.x, eatenFish.y, getRandomEatenImage());
            eatenImage.scale.setTo(0.25, 0.25);
            game.time.events.add(250, function() {
                hideItem(eatenImage, 100);
            });
            Fish.eatFish(eatenFish);
            score = score + 10;
            scoreText.setText('SCORE: ' + score);
            Fish.spawnFish(true);
        }
        if (eatenPlayer) {
            chomp.play();
            let eatenImage = game.add.image(eatenPlayer.x, eatenPlayer.y, getRandomEatenImage());
            eatenImage.scale.setTo(0.25, 0.25);
            game.time.events.add(250, function() {
                hideItem(eatenImage, 100);
            });
            EnemyFish.eatPlayer(eatenPlayer);
            GameState.endGame();
        }
    } else {
        Fish.update(game);
        EnemyFish.update(game);
    }

    // Game Over
    if (GameState.isGameOver()) {
        hideItem(scoreText);
        gameOverBtn.visible = true;
        checkForNewHighScore();
    } else {
        gameOverBtn.visible = false;
    }
}

function startGame() {
    GameState.startGame();
    hideItem(startGameBtn);
    createPlayer();
    backgroundMusic.fadeIn();
}

function soundIconClick() {
    if (backgroundMusic.isPlaying) {
        backgroundMusic.pause();
        soundOffIconBtn.visible = true;
        soundOnIconBtn.visible = false;
    } else {
        backgroundMusic.play();
        soundOnIconBtn.visible = true;
        soundOffIconBtn.visible = false;
    }
}

function createPlayer() {
    Player.create(playerLayer);
}

function restartGame() {
    score = 0;
    showItem(scoreText);
    scoreText.setText('SCORE ' + score);
    backgroundMusic.fadeOut();
    GameState.restartGame();
    showItem(startGameBtn);
}

function getRandomEatenImage() {
    return eatenImages[Math.floor(Math.random() * eatenImages.length)];
}

function showItem(item) {
    game.add.tween(item).to( { alpha: 1, visible: true }, 500, "Linear", true);
}

function hideItem(item, duration = 500) {
    game.add.tween(item).to({alpha: 0, visible: false}, duration, "Linear", true);
}

function checkForNewHighScore() {
    if (score > localStorage['highScore']) {
        localStorage['highScore'] = score;
        showNewHighScore();
    } else {
        showHighScore();
    }
}

function showNewHighScore() {
    highScoreSound.play();
    scoreText = game.add.text(20, 10, 'HIGHSCORE: ' + localStorage['highScore'], { font: "45px Scratch", fill: "#2BF6F7"});
}

function showHighScore() {
    scoreText = game.add.text(20, 10, 'HIGHSCORE: ' + localStorage['highScore'], { font: "45px Scratch", fill: "#2BF6F7"});
}