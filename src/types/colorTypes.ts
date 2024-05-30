export class Color {
    public brightness: number = 100;
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;

    constructor(r: number, g: number, b: number) {
        this._r = r;
        this._g = g;
        this._b = b;
    }

    toString() {
        return `rgb(${this.adjustedR}, ${this.adjustedG}, ${this.adjustedB})`;
    }

    toHexStr() {
        const r = this.adjustedR.toString(16).padStart(2, '0');
        const g = this.adjustedG.toString(16).padStart(2, '0');
        const b = this.adjustedB.toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    }

    get adjustedR() {
        const factor = this.brightness / 100;
        return Math.round(this._r * factor);
    }

    get adjustedG() {
        const factor = this.brightness / 100;
        return Math.round(this._g * factor);
    }

    get adjustedB() {
        const factor = this.brightness / 100;
        return Math.round(this._b * factor);
    }
}