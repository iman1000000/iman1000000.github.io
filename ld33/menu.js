btnRandom = document.getElementById('btn-random');
btnCustom = document.getElementById('btn-custom');
divMenu = document.getElementById('menu');
spanScore = document.getElementById('highscore');

divMap = document.getElementById('map');
textMap = document.getElementById('text-map');
btnMapStart = document.getElementById('btn-map-start');
btnMapBack = document.getElementById('btn-map-back');

// MENU
function hideMenu() {
    divMenu.style.display = 'none';
}

function showMenu() {
    divMenu.style.display = 'block';
    spanScore.innerHTML = getHighScore()/1000;
    btnRandom.focus();
}

btnRandom.onclick = function () {
    hideMenu();
    gameType = 'random';
    startRandom();
};

btnCustom.onclick = function () {
    hideMenu();
    showMap();
};

// MAP
function hideMap() {
    divMap.style.display = 'none';
}

function showMap() {
    divMap.style.display = 'block';
}

btnMapStart.onclick = function () {
    hideMap();
    gameType = 'custom';
    startGame(textMap.value);
};

btnMapBack.onclick = function () {
    hideMap();
    showMenu();
};



showMenu();
