window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

let GameState = require("./gameState.js");
let Lexicon = require("./lexicon.js");

const screenWidth = 1250;
const screenHeight = 600;

let game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload()
{
    game.load.image('bg1_small', './assets/bg1_small.png');
    game.load.image('start_game', './assets/start_game.png');
}

function create()
{
    let backgroundLayer = game.add.group();
    backgroundLayer.create(0, 0, 'bg1_small');
    game.add.button(500, 225, 'start_game');
}

function update()
{

}

function onStartClick() {
    console.log('Clicked!');
}