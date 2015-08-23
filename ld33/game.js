var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
var arrowSprite = document.getElementById('arrow');

var state = 'menu';
var screenShake = 0;
var gameOver = false;
var fadeOut = 0;
var timerStart = 0;
var gameType = '';
var arrowTimer = 0;

// Remember to add these to startGame too!
var updaters = [];
var walls = [];
var people = [];
var blood = [];
var spikes = [];
var player;

function run() {
    requestAnimationFrame(run);

    if (state == 'ingame') {
        if (people.length === 0) {
            gameOver = true;
            if (gameType == 'random') {
                updateHighScore();
            }
        }
        if (gameOver) {
            fadeOut += 0.01;
            if (fadeOut > 1) {
                endGame();
            }
        }
        updateObjects();
        drawObjects();
    } else if (state == 'ready') {
        if (keys[KEY_UP] || keys[KEY_DOWN] || keys[KEY_LEFT] || 
                keys[KEY_RIGHT]) {
            timerStart = Date.now();
            state = 'ingame';
        }
        drawObjects();
        drawArrows();
    }

}

function startRandom() {
    startGame(makeRandomLevel());
}

function startGame(map) {
    state = 'ready';
    gameOver = false;
    fadeOut = 0;
    updaters = [];
    walls = [];
    people = [];
    blood = [];
    spikes = [];


    var x = 0;
    var y = 0;
    var peopleSquares = [];

    for (var i = 0; i < map.length; i++) {
        var chr = map.charAt(i);
        switch (chr) {
            case '\n':
                y += 24;
                x = -24;
                break;
            case '1':
                new Wall(x, y, 'tower');
                break;
            case '2':
                new House(x, y);
                break;
            case 'p':
                player = new Player(x, y);
                break;
            case '^':
                new Spike(x, y);
                break;
            case '.':
                peopleSquares.push([x, y]);
                break;
            default:
                break;
        }

        x += 24;
    }

    if (peopleSquares.length === 0) {
        peopleSquares.push([240, 240]);
    }
    for (i = 0; i < 50; i++) {
        var index = Math.floor(Math.random() * peopleSquares.length);
        var place = peopleSquares[index];
        new Person(place[0]+4, place[1]+4);
    }

    walls.push({x:-2, y:-2, width: 484, height:2, draw: function(){}});
    walls.push({x:-2, y:-2, width: 2, height:484, draw: function(){}});
    walls.push({x:480, y:-2, width: 2, height:484, draw: function(){}});
    walls.push({x:-2, y:480, width: 484, height:2, draw: function(){}});
}

function endGame() {
    state = 'menu';
    showMenu();
}

function makeRandomLevel() {
    var playerPlaced = false;
    var str = '11111111111111111111\n';
    for (var i = 0; i < 18; i++) {
        str += '1';
        for (var j = 0; j < 18; j++) {
            var rng = Math.floor(Math.random() * 40);
            switch (rng) {
                case 1:
                    if (!playerPlaced) {
                        str += 'p';
                        playerPlaced = true;
                        break;
                    }
                    // fallthrough
                case 2:
                case 3:
                case 4:
                    str += '1';
                    break;
                case 5:
                case 6:
                    str += '2';
                    break;
                case 7:
                    str += '^';
                    break;
                default:
                    str += '.';
            }
        }

        str += '1\n';
    }
    str += '11111111111111111111';
    return str;
}

function updateObjects() {
    updaters.forEach(function (o) {
        o.update();
    });
}

function drawObjects() {
    ctx.save();
    if (screenShake > 0) {
        if (screenShake-- % 4 < 2) {
            ctx.translate(2, 0);
        } else {
            ctx.translate(-2, 0);
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    walls.forEach(function (o) {
        o.draw(ctx);
    });
    spikes.forEach(function (o) {
        o.draw(ctx);
    });
    blood.forEach(function (o) {
        o.draw(ctx);
    });
    people.forEach(function (o) {
        o.draw(ctx);
    });
    ctx.restore();
    player.draw(ctx);

    if (fadeOut > 0) {
        ctx.save();
        ctx.fillStyle = 'rgba(50, 60, 57, ' + fadeOut + ')';
        // wider because of screen shake
        ctx.fillRect(-10, 0, canvas.width + 10, canvas.height);
    }
}

function drawArrows() {
    var dx = player.x - player.offsetX - 24;
    var dy = player.y - player.offsetY - 24;
    if (arrowTimer++ % 40 < 20) {
        ctx.drawImage(arrowSprite, 0, 0, 72, 72, dx, dy, 72, 72);
    } else {
        ctx.drawImage(arrowSprite, 72, 0, 72, 72, dx, dy, 72, 72);
    }
}

function updateHighScore() {
    var time = Date.now() - timerStart;
    if (time < getHighScore()) {
        setHighScore(time);
    }
}

function getHighScore() {
    if (document.cookie.length === 0) {
        setHighScore(9999000);
        return 9999000;
    }
    return +document.cookie.slice(10);
}

function setHighScore(score) {
    document.cookie = 'highscore=' + score +
        '; expires=Fri, 31 Dec 9999 23:59:59 GMT;';
}

run();
