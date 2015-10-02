'use strict';
class Complex {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }

    get abs() {
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }

    add(that) {
        if (that instanceof Complex)
            return new Complex(this.re + that.re, this.im + that.im);
        return new Complex(this.re + that, this.im);
    }

    sub(that) {
        if (that instanceof Complex)
            return new Complex(this.re - that.re, this.im - that.im);
        return new Complex(this.re - that, this.im);
    }

    mult(that) {
        if (that instanceof Complex)
            return new Complex(this.re * that.re - this.im * that.im,
                    this.re * that.im + this.im * that.re);
        return new Complex(this.re * that, this.im * that);
    }
}
