let screenWidth = undefined;
let screenHeight = undefined;
let fishScale = 0.25;
let numberOfFish = 50;
let game = undefined;
let fish = undefined;
let fishes = undefined;
let fishesArray = [
    'anchovy',
    'anchovy_red',
    'cartoon_green',
    'cartoon_yellow'
];

let preload = function(inputGame, inputScreenWidth, inputScreenHeight) {
    game = inputGame;
    screenWidth = inputScreenWidth;
    screenHeight = inputScreenHeight;
    game.load.spritesheet('anchovy', './assets/anchovy_idle.png', 253, 85, 20);
    game.load.spritesheet('anchovy_red', './assets/red_anchovy_idle.png', 251, 84, 20);
    game.load.spritesheet('cartoon_green', './assets/cartoon_fish_green_idle.png', 240, 183, 20);
    game.load.spritesheet('cartoon_yellow', './assets/cartoon_fish_yellow_idle.png', 304, 275, 20);
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
    fish.animations.play('idle', 15, true);
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
    return fishesArray[Math.floor(Math.random() * fishesArray.length)];;
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