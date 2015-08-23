function GameObject() {}

GameObject.prototype = {
    draw: function (ctx) {
        var imgx = Math.floor(this.x - (this.offsetX||0));
        var imgy = Math.floor(this.y - (this.offsetY||0));
        ctx.drawImage(this.sprite, imgx, imgy);
    },
    update: function () {}
};
