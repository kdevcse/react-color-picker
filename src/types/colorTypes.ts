export class Color {
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;

    /**
     * Create a new color
     * @param r The red value of the color
     * @param g The green value of the color
     * @param b The blue value of the color
     * @param brightness The brightness value of the color
     * @returns A new color object
     * @constructor
     * */
    constructor(r: number, g: number, b: number, brightness: number = 100) {
        const factor = brightness / 100;
        this._r = Math.round(r * factor);
        this._g = Math.round(g * factor);
        this._b = Math.round(b * factor);
    }

    /**
     * Print the color in rgb format
     */
    toString() {
        return `rgb(${this._r}, ${this._g}, ${this._b})`;
    }

    /**
     * Print the color in hex format
     */
    toHexStr() {
        const r = this._r.toString(16).padStart(2, '0');
        const g = this._g.toString(16).padStart(2, '0');
        const b = this._b.toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    }

    /**
     * Create a new color with a different brightness
     * @param brightness The brightness value to set the new color to
     */
    toNewColor(brightness: number) {
        return new Color(this._r, this._g, this._b, brightness);
    }
}