function Person(x, y) {
    this.x = x;
    this.y = y;
    this.wander();

    updaters.push(this);
    people.push(this);
}

Person.prototype = Object.create(GameObject.prototype);

Person.prototype.sprite = document.getElementById('person-green');
Person.prototype.width = 4;
Person.prototype.height = 4;
Person.prototype.offsetX = 2;
Person.prototype.offsetY = 2;
Person.prototype.centerOffsetX = 2;
Person.prototype.centerOffsetY = 2;

Person.prototype.dx = 0;
Person.prototype.dy = 0;
Person.prototype.dxWander = 0;
Person.prototype.dyWander = 0;
Person.prototype.wanderSpeed = 0.5;
Person.prototype.walkSpeed = 1;
Person.prototype.runSpeed = 2;


Person.prototype.circle = {x:0, y:0, radius:1};

Person.prototype.update = function () {
    this.updateCircle();

    if (cirCol(this.circle, player.circleWalk)) {
        if (!cirCol(this.circle, player.circleRun)) {
            this.walk();
        } else if (!cirCol(this.circle, player.circleKill)) {
            this.run();
        } else {
            this.die();
        }
    }

    if (Math.random() < 1/128)
        this.wander();
    this.move();

    if (boxColList(this, spikes)) {
        this.die();
    }
};

Person.prototype.updateCircle = function () {
    this.circle.x = this.x + this.centerOffsetX;
    this.circle.y = this.y + this.centerOffsetY;
};

Person.prototype.walk = function () {
    var playerX = player.x + player.centerOffsetX;
    var playerY = player.y + player.centerOffsetY;
    var x = this.x + this.centerOffsetX;
    var y = this.y + this.centerOffsetY;

    if (playerX > x && playerY > y) {
        this.dx = -this.walkSpeed;
        this.dy = -this.walkSpeed;
    } else if (playerX < x && playerY > y) {
        this.dx = this.walkSpeed;
        this.dy = -this.walkSpeed;
    } else if (playerX > x && playerY < y) {
        this.dx = -this.walkSpeed;
        this.dy = this.walkSpeed;
    } else {
        this.dx = this.walkSpeed;
        this.dy = this.walkSpeed;
    }
};

Person.prototype.run = function () {
    var playerX = player.x + player.centerOffsetX;
    var playerY = player.y + player.centerOffsetY;
    var x = this.x + this.centerOffsetX;
    var y = this.y + this.centerOffsetY;

    if (playerX > x && playerY > y) {
        this.dx = -this.runSpeed;
        this.dy = -this.runSpeed;
    } else if (playerX < x && playerY > y) {
        this.dx = this.runSpeed;
        this.dy = -this.runSpeed;
    } else if (playerX > x && playerY < y) {
        this.dx = -this.runSpeed;
        this.dy = this.runSpeed;
    } else {
        this.dx = this.runSpeed;
        this.dy = this.runSpeed;
    }
};

Person.prototype.die = function () {
    new Blood(this.x, this.y);
    people.splice(people.indexOf(this), 1);
    updaters.splice(updaters.indexOf(this), 1);
};

Person.prototype.wander = function () {
    this.dxWander = Math.random() * this.wanderSpeed * 2 - this.wanderSpeed;
    this.dyWander = Math.random() * this.wanderSpeed * 2 - this.wanderSpeed;
};

Person.prototype.move = function () {
    this.x += this.dx + this.dxWander;
    if (boxColList(this, walls)) {
        this.x -= this.dx + this.dxWander;
        this.dx = 0;
        this.wander();
    }
    this.y += this.dy + this.dyWander;
    if (boxColList(this, walls)) {
        this.y -= this.dy + this.dyWander;
        this.dy = 0;
        this.wander();
    }
};
