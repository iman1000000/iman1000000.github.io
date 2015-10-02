'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Complex = (function () {
    function Complex(re, im) {
        _classCallCheck(this, Complex);

        this.re = re;
        this.im = im;
    }

    _createClass(Complex, [{
        key: 'add',
        value: function add(that) {
            if (that instanceof Complex) return new Complex(this.re + that.re, this.im + that.im);
            return new Complex(this.re + that, this.im);
        }
    }, {
        key: 'sub',
        value: function sub(that) {
            if (that instanceof Complex) return new Complex(this.re - that.re, this.im - that.im);
            return new Complex(this.re - that, this.im);
        }
    }, {
        key: 'mult',
        value: function mult(that) {
            if (that instanceof Complex) return new Complex(this.re * that.re - this.im * that.im, this.re * that.im + this.im * that.re);
            return new Complex(this.re * that, this.im * that);
        }
    }, {
        key: 'abs',
        get: function get() {
            return Math.sqrt(this.re * this.re + this.im * this.im);
        }
    }]);

    return Complex;
})();
