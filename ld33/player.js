function Player(x, y) {
    this.x = x + this.offsetX;
    this.y = y + this.offsetY;

    updaters.push(this);
}

Player.prototype = Object.create(GameObject.prototype);

Player.prototype.sprite = document.getElementById('player');
Player.prototype.width = 16;
Player.prototype.height = 16;
Player.prototype.offsetX = 4;
Player.prototype.offsetY = 4;
Player.prototype.centerOffsetX = 8;
Player.prototype.centerOffsetY = 8;

Player.prototype.dx = 0;
Player.prototype.dy = 0;
Player.prototype.accel = 5/8;
Player.prototype.friction = 3/16;
Player.prototype.maxSpeedNormal = 3.5;
Player.prototype.maxSpeedOuch = 1.5;
Player.prototype.maxSpeed = Player.prototype.maxSpeedNormal;

Player.prototype.radius1 = 16;
Player.prototype.radius2 = 64;
Player.prototype.radius3 = 128;
Player.prototype.radius4 = 256;

Player.prototype.yellCounter = 0;
Player.prototype.yellDuration = 100;
Player.prototype.yellCooldown = 300;
Player.prototype.yellColor = '#ac3232';
Player.prototype.yellRingDuration = 20;
Player.prototype.chargedColor = '#ac3232';

Player.prototype.circleKill = {x:0, y:0, radius: Player.prototype.radius1};
Player.prototype.circleRun = {x:0, y:0, radius: Player.prototype.radius2};
Player.prototype.circleWalk = {x:0, y:0, radius: Player.prototype.radius3};

Player.prototype.draw = function (ctx) {
    var dx = Math.floor(this.x - this.offsetX);
    var dy = Math.floor(this.y - this.offsetY);
    var sx, sy;

    // draw body
    sy = 24;
    if (this.yellCounter === 0 || this.yellCounter > this.yellCooldown) {
        sx = 0;
    } else if (this.yellCounter > this.yellCooldown/2) {
        sx = 48;
    } else {
        sx = 24;
    }
    ctx.drawImage(this.sprite, sx, sy, 24, 24, dx, dy, 24, 24);
    
    // draw head
    sy = 0;
    if (keys[KEY_SPACE] || this.yellCounter > this.yellCooldown || this.ouch) {
        sx = 24;
    } else {
        sx = 0;
    }
    ctx.drawImage(this.sprite, sx, sy, 24, 24, dx, dy, 24, 24);
    // this.drawCircles(ctx);
    this.drawYell(ctx);
};

// DEBUG
Player.prototype.drawCircles = function (ctx) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.arc(this.circleKill.x, this.circleKill.y, this.circleKill.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.circleRun.x, this.circleRun.y, this.circleRun.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.circleWalk.x, this.circleWalk.y, this.circleWalk.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
};

Player.prototype.drawYell = function (ctx) {
    if (this.yellCounter > this.yellCooldown) {
        var count = (this.yellCounter-1) % this.yellRingDuration;
        ctx.save();
        ctx.strokeStyle = this.yellColor;
        ctx.lineWidth = count * 10 / this.yellRingDuration;
        var radius = this.radius3 -
            (count * this.radius3 / this.yellRingDuration);
        ctx.beginPath();
        ctx.arc(this.circleKill.x, this.circleKill.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    } else if (this.yellCounter > 0 && this.yellCounter < 11) {
        ctx.save();
        ctx.strokeStyle = this.chargedColor;
        ctx.lineWidth = this.yellCounter;
        var radius = 40 - (this.yellCounter * 4);
        ctx.beginPath();
        ctx.arc(this.circleKill.x, this.circleKill.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
};


Player.prototype.update = function () {
    if (boxColList(this, spikes)) {
        this.ouch = true;
        this.maxSpeed = this.maxSpeedOuch;
    } else {
        this.ouch = false;
        this.maxSpeed = this.maxSpeedNormal;
    }
    this.accelerate();
    this.move();
    this.updateCircles();
    this.updateYell();
};

Player.prototype.accelerate = function () {
    // keyboard
    if (keys[KEY_UP]) this.dy -= this.accel;
    if (keys[KEY_DOWN]) this.dy += this.accel;
    if (keys[KEY_LEFT]) this.dx -= this.accel;
    if (keys[KEY_RIGHT]) this.dx += this.accel;

    // friction
    if (this.dx > this.friction) {
        this.dx -= this.friction;
    } else if (this.dx < -this.friction) {
        this.dx += this.friction;
    } else {
        this.dx = 0;
    }

    if (this.dy > this.friction) {
        this.dy -= this.friction;
    } else if (this.dy < -this.friction) {
        this.dy += this.friction;
    } else {
        this.dy = 0;
    }

    this.dx = clamp(this.dx, -this.maxSpeed, this.maxSpeed);
    this.dy = clamp(this.dy, -this.maxSpeed, this.maxSpeed);
};

Player.prototype.move = function () {
    this.x += this.dx;
    if (boxColList(this, walls)) {
        this.x -= this.dx;
        this.dx = 0;
    }
    this.y += this.dy;
    if (boxColList(this, walls)) {
        this.y -= this.dy;
        this.dy = 0;
    }
};

Player.prototype.updateCircles = function () {
    this.circleKill.x = this.x + this.centerOffsetX;
    this.circleKill.y = this.y + this.centerOffsetY;
    this.circleRun.x = this.x + this.centerOffsetX;
    this.circleRun.y = this.y + this.centerOffsetY;
    this.circleWalk.x = this.x + this.centerOffsetX;
    this.circleWalk.y = this.y + this.centerOffsetY;
};

Player.prototype.updateYell = function () {
    if (this.yellCounter === 0) {
        if (keys[KEY_SPACE] || this.ouch) {
            this.startYell();
        }
    } else {
        this.yellCounter--;
        if (this.yellCounter == this.yellCooldown) {
            this.endYell();
        }
    }
};

Player.prototype.startYell = function () {
    this.yellCounter = this.yellDuration + this.yellCooldown;
    this.circleKill.radius = this.radius2;
    this.circleRun.radius = this.radius3;
    this.circleWalk.radius = this.radius4;
    screenShake = this.yellDuration;
};

Player.prototype.endYell = function () {
    this.circleKill.radius = this.radius1;
    this.circleRun.radius = this.radius2;
    this.circleWalk.radius = this.radius3;
};
