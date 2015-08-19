/*
 * keys.js
 *
 * Usage:
 * keys[<keycode>] is set to true when a key is being pressed, and set to
 *     undefined otherwise.
 */
var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
// disable default actions on keys that scroll the screen
var PREVENT_DEFAULT_KEYS = [KEY_SPACE, KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN];

var keys = [];

(function () {
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
    window.addEventListener('blur', blur);

    function keydown(ev) {
        keys[ev.keyCode] = true;
        if(PREVENT_DEFAULT_KEYS.indexOf(ev.keyCode) > -1) {
            ev.preventDefault();
        }
    }

    function keyup(ev) {
        keys[ev.keyCode] = undefined;
    }

    // clear key presses when the window loses focus, to prevent stuck keys
    function blur() {
        keys = [];
    }
})();
