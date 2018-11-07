let list = {
    startGameText: 'Start Game'
};

function retrieve(keyName) {
    return list[keyName];
}

module.exports = {
    retrieve: retrieve
};