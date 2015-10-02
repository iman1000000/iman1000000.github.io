'use strict';
/* globals Complex */
var RATIO = 0.01;
var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');

var WIDTH = canvas.width;
var HEIGHT = canvas.width;

function mand(constant, iterations, threshold) {
    var result = new Complex(0, 0);
    for (var i = 0; i < iterations; ++i) {
        result = result.mult(result).add(constant);
        if (result.abs > threshold)
            return i;
    }
    return threshold;
}

for (var x = 0; x < WIDTH; ++x) {
    for (var y = 0; y < HEIGHT; ++y) {
        var constant = new Complex((x-WIDTH/2) * RATIO, (y-HEIGHT/2) * RATIO);
        var result = mand(constant, 20, 2) * 5;
        var style = 'hsl(0, 0%, ' + (result > 100 ? 100 : result) + '%)';
        ctx.fillStyle = style;
        ctx.fillRect(x, y, 1, 1);
    }
}
