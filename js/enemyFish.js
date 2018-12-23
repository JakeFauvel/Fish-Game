const ENEMY_WIDTH = 608;
const ENEMY_HEIGHT = 372;

let screenWidth = undefined;
let screenHeight = undefined;
let enemyFishScale = 0.25;
let numberOfEnemyFish = 3;
let game = undefined;
let enemy = undefined;
let enemies = undefined;

let preload = function(inputGame, inputScreenWidth, inputScreenHeight) {
    game = inputGame;
    screenWidth = inputScreenWidth;
    screenHeight = inputScreenHeight;
    game.load.spritesheet('shark', './assets/dark_blue_shark_idle.png', ENEMY_WIDTH, ENEMY_HEIGHT, 20);
};

let create = function() {
    enemies = game.add.group();
    createEnemies();
};

let update = function() {
    enemyMovement();
};

function createEnemies() {
    for (let i = 0; i < numberOfEnemyFish; i++) {
        enemy = enemies.create(getRandomX(), getRandomY(), 'shark');
        enemy.scale.setTo(enemyFishScale, enemyFishScale);
        enemy.animations.add('idle');
        enemy.animations.play('idle', 15, true);
        game.physics.p2.enable(enemy);
        enemy.body.fixedRotation = true;
        enemy.body.velocity.x = getRandomDirection() * 150;
        enemy.body.velocity.y = getRandomDirection() * 10;
        if (isMovingRight(enemy)) {
            flipEnemyFishGraphic(enemy);
        }
        enemy.body.data.shapes[0].sensor = true;
        enemy.body.setZeroDamping();
    }
}

function enemyMovement() {
    let leftEdge = -100;
    let rightEdge = 1350;
    let topEdge = -100;
    let bottomEdge = 700;
    enemies.children.forEach((enemy) => {
        let travellingLeft = enemy.body.velocity.x < 0;
        let travellingRight = !travellingLeft;
        let travellingUp = enemy.body.velocity.y < 0;
        let travellingDown = !travellingUp;
        if (enemy.body.x < leftEdge && travellingLeft) {
            enemy.body.velocity.x = -enemy.body.velocity.x;
            enemy.body.velocity.y = -getRandomDirection() * 10;
            flipEnemyFishGraphic(enemy);
        }
        if (enemy.body.x > rightEdge && travellingRight) {
            enemy.body.velocity.x = -enemy.body.velocity.x;
            enemy.body.velocity.y = -getRandomDirection() * 10;
            flipEnemyFishGraphic(enemy);
        }
        if (enemy.body.y < topEdge && travellingUp) {
            enemy.body.velocity.y = -enemy.body.velocity.y;
        }
        if (enemy.body.y > bottomEdge && travellingDown) {
            enemy.body.velocity.y = -enemy.body.velocity.y;
        }
    });
}

function getRandomDirection() {
    if (Math.random() > 0.5) {
        return 1;
    } else {
        return -1;
    }
}

function getEnemies() {
    return enemies.children;
}

function flipEnemyFishGraphic(enemy) {
    enemy.scale.x = -enemy.scale.x;
}

function isMovingLeft(enemy) {
    return enemy.body.velocity.x < 0;
}

function isMovingRight(enemy) {
    return !isMovingLeft(enemy);
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
    update: update
};