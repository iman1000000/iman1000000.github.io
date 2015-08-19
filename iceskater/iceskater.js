var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
var divScore = document.getElementById('score');

var score = 0;
var dead = false;
var deathFrames = 0;

function run() {
    requestAnimationFrame(run);
    canvas.width = canvas.width;
    if (!dead) {
        spikes.forEach(function (spike) {
            spike.run();
        });
        player.run();
        coin.run();
    } else {
        if (deathFrames == 256) {
            dead = false;
            score = 0;
            divScore.innerHTML = 'Score: ' + score;
            player.x = 400;
            player.y = 300;
            player.dx = 0;
            player.dy = 0;
            spikes = [];
            placeSpikes();
            coin.place();
            return;
        }
        ctx.fillStyle = 'rgb(' + (255 - deathFrames) + ', 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        deathFrames++;
    }
}

var spikes = [];

function Spike(x, y) {
    this.x = x;
    this.y = y;
    spikes.push(this);
}
Spike.prototype = {
    sprite: document.getElementById('spike'),
    radius: 20,
    run: function () {
        ctx.drawImage(this.sprite, this.x - this.sprite.width/2,
                this.y - this.sprite.height/2);
    },
};

function placeSpikes() {
    for (var i = 0; i < 16; i++) {
        new Spike(i * 48 + 24, 24);
        new Spike(i * 48 + 24, 552);
    }
    for (i = 0; i < 10; i++) {
        new Spike(24, i * 48 + 72);
        new Spike(744, i * 48 + 72);
    }
}

placeSpikes();

var coin = {
    sprite: document.getElementById('coin'),
    radius: 20,
    place: function () {
        this.x = Math.random() * 672 + 48;
        this.y = Math.random() * 480 + 48;
    },
    run: function () {
        ctx.drawImage(this.sprite, this.x - this.sprite.width/2,
                this.y - this.sprite.height/2);
    }
};

coin.place();

var player = {
    accel: 1/16, // needs to be a power of 2 to avoid rounding errors
    radius: 24,
    x: 400,
    y: 300,
    dx: 0,
    dy: 0,
    sprite: document.getElementById('player'),
    run: function() {
        // control
        if (keys[KEY_UP]) this.dy -= this.accel;
        if (keys[KEY_DOWN]) this.dy += this.accel;
        if (keys[KEY_LEFT]) this.dx -= this.accel;
        if (keys[KEY_RIGHT]) this.dx += this.accel;

        // EASY MODE
        /*if (keys[KEY_SPACE]) {
            if (this.dx > 0) {
                this.dx -= this.accel;
            }
            if (this.dx < 0) {
                this.dx += this.accel;
            }
            if (this.dy > 0) {
                this.dy -= this.accel;
            }
            if (this.dy < 0) {
                this.dy += this.accel;
            }
        }*/

        // movement
        this.x += this.dx;
        this.y += this.dy;
        // collision
        if (cirCol(this, coin)) {
            coin.place();
            score += 10;
            divScore.innerHTML = 'Score: ' + score;
            new Spike(Math.random() * 672 + 48, Math.random() * 480 + 48);
        }
        if (cirColList(this, spikes)) {
            dead = true;
            deathFrames = 0;
        }
        // draw
        ctx.drawImage(this.sprite, this.x - this.sprite.width/2,
                this.y - this.sprite.height/2);
    }
};

run();
