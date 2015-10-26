"use strict";
var imageElem = document.getElementById('fileInput');
var runButton = document.getElementById('runButton');
var codeText = document.getElementById('codeText');
var widthInput = document.getElementById('widthInput');
var heightInput = document.getElementById('heightInput');
var blankButton = document.getElementById('blankButton');
var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');

var image;

class ImageEdit {
    // slightly hacky way of simulating an overloaded constructor
    // pass it either (<image>) or (null, <width>, <height>)
    constructor(img, width, height) {
        if (img) {
            this.canvas = document.createElement('canvas');
            this.width = this.canvas.width = img.width;
            this.height = this.canvas.height = img.height;
            this.ctx = this.canvas.getContext('2d');

            this.ctx.drawImage(img, 0, 0);
            this.data = this.ctx.getImageData(0, 0, this.width, this.height);
        } else {
            this.canvas = document.createElement('canvas');
            this.width = this.canvas.width = width;
            this.height = this.canvas.height = height;
            this.ctx = this.canvas.getContext('2d');

            this.ctx.fillRect(0, 0, this.width, this.height);
            this.data = this.ctx.getImageData(0, 0, this.width, this.height);
        }
    }

    // returns a Pixel representing the pixel data at (x, y)
    // not bounds checked
    get(x, y) {
        return new Pixel(this, x, y);
    }

    // calls callback once for each pixel in the image
    // the pixel object is recycled
    forEach(callback) {
        var pixel = new Pixel(this, 0, 0);
        for (var x = 0; x < this.width; ++x) {
            pixel.x = x;
            for (var y = 0; y < this.height; ++y) {
                pixel.y = y;
                callback(pixel);
            }
        }
        this.draw(ctx);
    }

    draw(ctx) {
        canvas.width = this.width;
        canvas.height = this.height;
        ctx.putImageData(this.data, 0, 0);
    }
}

class Pixel {
    constructor(imageEdit, x, y) {
        this.imageEdit = imageEdit;
        this._x = x;
        this._y = y;
        this.calcOffset();
    }

    calcOffset() {
        this.offset = 4 * (this._y * this.imageEdit.width + this._x);
    }

    get x() { return this._x; }
    get y() { return this._y; }

    set x(x) {
        this._x = x;
        this.calcOffset();
    }

    set y(y) {
        this._y = y;
        this.calcOffset();
    }

    get r() { return this.imageEdit.data.data[this.offset+0]; }
    get g() { return this.imageEdit.data.data[this.offset+1]; }
    get b() { return this.imageEdit.data.data[this.offset+2]; }
    get a() { return this.imageEdit.data.data[this.offset+3]; }

    set r(val) { this.imageEdit.data.data[this.offset+0] = val; }
    set g(val) { this.imageEdit.data.data[this.offset+1] = val; }
    set b(val) { this.imageEdit.data.data[this.offset+2] = val; }
    set a(val) { this.imageEdit.data.data[this.offset+3] = val; }

}

imageElem.addEventListener('change', function (ev) {
    var reader = new FileReader();
    reader.onload = function () {
        var img = document.createElement('img');
        img.src = reader.result;
        img.onload = function () {
            image = new ImageEdit(img);
            image.draw(ctx);
            runButton.disabled = false;
        };
    };
    reader.readAsDataURL(ev.target.files[0]);
});

blankButton.onclick = function () {
    if (widthInput.value && heightInput.value) {
        image = new ImageEdit(null, widthInput.value, heightInput.value);
        image.draw(ctx);
        runButton.disabled = false;
    }
};

runButton.onclick = function () {
    eval(codeText.value);
};
