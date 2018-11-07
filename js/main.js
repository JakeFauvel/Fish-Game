let Phaser = require("Phaser");


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

function preload ()
{
    this.load.image('bg1_small', './assets/bg1_small.png');
}

function create ()
{
    this.add.image(625, 300, 'bg1_small');
}

function update ()
{

}