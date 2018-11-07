let Phaser = require("Phaser");
let GameState = require("./gameState.js");
let Lexicon = require("./lexicon.js");

let config = {
    type: Phaser.AUTO,
    width: 1250,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload()
{
    this.load.image('bg1_small', './assets/bg1_small.png');
}

function create()
{
    this.add.image(625, 300, 'bg1_small');
    this.add.text(16, 16, Lexicon.retrieve('startGameText'), { fontSize: '32px', fill: '#FFF' });
}

function update()
{

}