function Blood(x, y) {
    this.x = x;
    this.y = y;
    this.type = Math.floor(Math.random() * 8);

    blood.push(this);
}

Blood.prototype = Object.create(GameObject.prototype);
Blood.prototype.sprite = document.getElementById('blood');

Blood.prototype.draw = function (ctx) {
    var dx = Math.floor(this.x);
    var dy = Math.floor(this.y);
    var sx = this.type * 8;
    var sy = 0;
    
    ctx.drawImage(this.sprite, sx, sy, 8, 8, dx, dy, 8, 8);
};
