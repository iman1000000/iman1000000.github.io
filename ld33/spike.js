function Spike(x, y) {
    this.x = x;
    this.y = y;

    spikes.push(this);
}

Spike.prototype = Object.create(GameObject.prototype);
Spike.prototype.sprite = document.getElementById('spike');
Spike.prototype.width = 24;
Spike.prototype.height = 24;
