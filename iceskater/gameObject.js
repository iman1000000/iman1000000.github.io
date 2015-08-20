function GameObject() {}

GameObject.prototype = {
    draw: function (ctx) {
        var imgx = Math.floor(this.x - this.sprite.width/2);
        var imgy = Math.floor(this.y - this.sprite.height/2);
        ctx.drawImage(this.sprite, imgx, imgy);
    },
};
