let screenWidth = undefined;
let screenHeight = undefined;
let enemyFishScale = 0.25;
let numberOfEnemyFish = 5;
let game = undefined;
let enemy = undefined;
let enemies = undefined;
let enemiesArray = [
    'dark_shark',
    'light_shark',
    'sword_fish'
];

let preload = function(inputGame, inputScreenWidth, inputScreenHeight) {
    game = inputGame;
    screenWidth = inputScreenWidth;
    screenHeight = inputScreenHeight;
    game.load.spritesheet('dark_shark', './assets/dark_blue_shark_idle.png', 608, 372, 20);
    game.load.spritesheet('light_shark', './assets/light_blue_shark_idle.png', 608, 372, 20);
    game.load.spritesheet('sword_fish', './assets/sword_fish_idle.png', 1033, 416, 16);
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
        enemy = enemies.create(getRandomX(), getRandomY(), getRandomEnemy());
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

function eatPlayer(player) {
    player.destroy();
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

function getRandomEnemy() {
    return enemiesArray[Math.floor(Math.random() * enemiesArray.length)];;
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
    update: update,
    getEnemies: getEnemies,
    eatPlayer: eatPlayer
};