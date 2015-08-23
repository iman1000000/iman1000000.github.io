/*
 * circleCollision.js
 *
 * Usage:
 * A circle is any object that has x, y and radius.
 *
 * cirCol(<circle>, <circle>) returns true when the circles intersect.
 *
 * cirColList(<circle>, <circle list>) returns true when any circles in the
 *     list intersect the given circle.
 *
 * cirColFilter(<circle>, <circle list>) returns a list of circles that
 *     intersect the given circle.
 */

function cirCol(cir1, cir2) {
    var dx = Math.abs(cir1.x - cir2.x);
    var dy = Math.abs(cir1.y - cir2.y);
    var radius = cir1.radius + cir2.radius;
    if (dx * dx + dy * dy <= radius * radius) {
        return true;
    }
    return false;
}

function cirColList(cir, lst) {
    for (var i = 0; i < lst.length; i++) {
        if (cirCol(cir, lst[i])) return true;
    }
    return false;
}

function cirColFilter(cir, lst) {
    var result = [];
    for (var i = 0; i < lst.length; i++) {
        if (cirCol(cir, lst[i])) {
            result.push(lst[i]);
        }
    }
    return result;
}
