/*
 * boxCollision.js
 *
 * Usage:
 * A box is any object that has x, y, width and height.
 *
 * boxCol(<box>, <box>) returns true when the boxes intersect.
 *
 * boxColList(<box>, <box list>) returns true when any boxes in the
 *     list intersect the given box.
 *
 * boxColFilter(<box>, <box list>) returns a list of boxes that
 *     intersect the given box.
 */

function boxCol(box1, box2) {
    var b1left = box1.x;
    var b1right = box1.x + box1.width;
    var b1top = box1.y;
    var b1bottom = box1.y + box1.height;

    var b2left = box2.x;
    var b2right = box2.x + box2.width;
    var b2top = box2.y;
    var b2bottom = box2.y + box2.height;

    if (b1left <= b2right && b1right >= b2left &&
            b1top <= b2bottom && b1bottom >= b2top) {
        return true;
    }
    return false;
}

function boxColList(box, lst) {
    for (var i = 0; i < lst.length; i++) {
        if (boxCol(box, lst[i])) return true;
    }
    return false;
}

function boxColFilter(box, lst) {
    var result = [];
    for (var i = 0; i < lst.length; i++) {
        if (boxCol(box, lst[i])) {
            result.push(lst[i]);
        }
    }
    return result;
}
