"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var imageElem = document.getElementById('fileInput');
var runButton = document.getElementById('runButton');
var codeText = document.getElementById('codeText');
var widthInput = document.getElementById('widthInput');
var heightInput = document.getElementById('heightInput');
var blankButton = document.getElementById('blankButton');
var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');

var image;

var ImageEdit = (function () {
    // slightly hacky way of simulating an overloaded constructor
    // pass it either (<image>) or (null, <width>, <height>)

    function ImageEdit(img, width, height) {
        _classCallCheck(this, ImageEdit);

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

    _createClass(ImageEdit, [{
        key: 'get',
        value: function get(x, y) {
            return new Pixel(this, x, y);
        }

        // calls callback once for each pixel in the image
        // the pixel object is recycled
    }, {
        key: 'forEach',
        value: function forEach(callback) {
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
    }, {
        key: 'draw',
        value: function draw(ctx) {
            canvas.width = this.width;
            canvas.height = this.height;
            ctx.putImageData(this.data, 0, 0);
        }
    }]);

    return ImageEdit;
})();

var Pixel = (function () {
    function Pixel(imageEdit, x, y) {
        _classCallCheck(this, Pixel);

        this.imageEdit = imageEdit;
        this._x = x;
        this._y = y;
        this.calcOffset();
    }

    _createClass(Pixel, [{
        key: 'calcOffset',
        value: function calcOffset() {
            this.offset = 4 * (this._y * this.imageEdit.width + this._x);
        }
    }, {
        key: 'x',
        get: function get() {
            return this._x;
        },
        set: function set(x) {
            this._x = x;
            this.calcOffset();
        }
    }, {
        key: 'y',
        get: function get() {
            return this._y;
        },
        set: function set(y) {
            this._y = y;
            this.calcOffset();
        }
    }, {
        key: 'r',
        get: function get() {
            return this.imageEdit.data.data[this.offset + 0];
        },
        set: function set(val) {
            this.imageEdit.data.data[this.offset + 0] = val;
        }
    }, {
        key: 'g',
        get: function get() {
            return this.imageEdit.data.data[this.offset + 1];
        },
        set: function set(val) {
            this.imageEdit.data.data[this.offset + 1] = val;
        }
    }, {
        key: 'b',
        get: function get() {
            return this.imageEdit.data.data[this.offset + 2];
        },
        set: function set(val) {
            this.imageEdit.data.data[this.offset + 2] = val;
        }
    }, {
        key: 'a',
        get: function get() {
            return this.imageEdit.data.data[this.offset + 3];
        },
        set: function set(val) {
            this.imageEdit.data.data[this.offset + 3] = val;
        }
    }]);

    return Pixel;
})();

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
