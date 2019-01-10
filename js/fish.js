let screenWidth = undefined;
let screenHeight = undefined;
let fishScale = 0.3;
let numberOfFish = 50;
let game = undefined;
let fish = undefined;
let fishes = undefined;
let fishesArray = [
    'anchovy_silver',
    'anchovy_red',
    'anchovy_pink',
    'cartoon_green',
    'cartoon_orange',
    'cartoon_yellow',
    'cartoon_purple',
    'squid',
];

let preload = function(inputGame, inputScreenWidth, inputScreenHeight) {
    game = inputGame;
    screenWidth = inputScreenWidth;
    screenHeight = inputScreenHeight;
    game.load.spritesheet('anchovy_silver', './assets/silver_anchovy.png', 251, 84, 20);
    game.load.spritesheet('anchovy_red', './assets/red_anchovy.png', 251, 84, 20);
    game.load.spritesheet('anchovy_pink', './assets/pink_anchovy.png', 251, 84, 20);
    game.load.spritesheet('cartoon_green', './assets/cartoon_green.png', 240, 183, 12);
    game.load.spritesheet('cartoon_orange', './assets/cartoon_orange.png', 180, 80, 12);
    game.load.spritesheet('cartoon_yellow', './assets/cartoon_yellow.png', 304, 275, 12);
    game.load.spritesheet('cartoon_purple', './assets/cartoon_purple.png', 249, 163, 12);
    game.load.spritesheet('squid', './assets/squid.png', 253, 62, 6);
};

let create = function() {
    fishes = game.add.group();
    createFishes();
};

let update = function() {
    fishMovement();
};

function createFishes() {
    for (let i = 0; i < numberOfFish; i++) {
        spawnFish(false);
    }
}

function spawnFish(spawnOffscreen) {
    if (spawnOffscreen) {
        fish = fishes.create(getOffScreenX(), getOffScreenY(), getRandomFish());
    } else {
        fish = fishes.create(getRandomX(), getRandomY(), getRandomFish());
    }
    fish.scale.setTo(fishScale, fishScale);
    fish.animations.add('idle');
    fish.animations.play('idle', 6, true);
    game.physics.p2.enable(fish);
    fish.body.fixedRotation = true;
    fish.body.velocity.x = getRandomDirection() * 100;
    fish.body.velocity.y = getRandomDirection() * 10;
    if (isMovingRight(fish)) {
        flipFishGraphic(fish);
    }
    fish.body.data.shapes[0].sensor = true;
    fish.body.setZeroDamping();
}

function fishMovement() {
    let leftEdge = -35;
    let rightEdge = 1285;
    let topEdge = -35;
    let bottomEdge = 635;
    fishes.children.forEach((fish) => {
        let travellingLeft = fish.body.velocity.x < 0;
        let travellingRight = !travellingLeft;
        let travellingUp = fish.body.velocity.y < 0;
        let travellingDown = !travellingUp;
        if (fish.body.x < leftEdge && travellingLeft) {
            fish.body.velocity.x = -fish.body.velocity.x;
            fish.body.velocity.y = -getRandomDirection() * 10;
            flipFishGraphic(fish);
        }
        if (fish.body.x > rightEdge && travellingRight) {
            fish.body.velocity.x = -fish.body.velocity.x;
            fish.body.velocity.y = -getRandomDirection() * 10;
            flipFishGraphic(fish);
        }
        if (fish.body.y < topEdge && travellingUp) {
            fish.body.velocity.y = -fish.body.velocity.y;
        }
        if (fish.body.y > bottomEdge && travellingDown) {
            fish.body.velocity.y = -fish.body.velocity.y;
        }
    });
}

function eatFish(fish) {
    fish.destroy();
}

function getRandomDirection() {
    if (Math.random() > 0.5) {
        return 1;
    } else {
        return -1;
    }
}

function getFishes() {
    return fishes.children;
}

function flipFishGraphic(fish) {
    fish.scale.x = -fish.scale.x;
}

function isMovingLeft(fish) {
    return fish.body.velocity.x < 0;
}

function isMovingRight(fish) {
    return !isMovingLeft(fish);
}

function getRandomFish() {
    return fishesArray[Math.floor(Math.random() * fishesArray.length)];
}

function getOffScreenX() {
    if (Math.random() > 0.5) {
        return Math.floor(Math.random() * 1285) + 1250;
    } else {
        return Math.floor(Math.random() * -600);
    }
}

function getOffScreenY() {
    return Math.floor(Math.random() * 600);
}

function getRandomX() {
    return Math.floor(Math.random() * Math.floor(screenWidth));
}

function getRandomY() {
    return Math.floor(Math.random() * Math.floor(screenHeight));
}

module.exports = {
    preload: preload,
    create: create,
    update: update,
    getFishes: getFishes,
    eatFish: eatFish,
    spawnFish: spawnFish
};