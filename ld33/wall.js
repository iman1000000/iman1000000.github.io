function Wall(x, y, image) {
    this.x = x;
    this.y = y;
    this.sprite = document.getElementById(image);

    walls.push(this);
}

Wall.prototype = Object.create(GameObject.prototype);

Wall.prototype.offsetX = 0;
Wall.prototype.offsetY = 0;
Wall.prototype.width = 24;
Wall.prototype.height = 24;

function House(x, y) {
    this.x = x + this.offsetX;
    this.y = y + this.offsetY;

    walls.push(this);
}

House.prototype = Object.create(GameObject.prototype);

House.prototype.sprite = document.getElementById('house');
House.prototype.offsetX = 6;
House.prototype.offsetY = 6;
House.prototype.width = 12;
House.prototype.height = 12;
