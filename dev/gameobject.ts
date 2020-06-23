abstract class GameObject extends HTMLElement {
    // Fields
    protected _x: number = 0
    protected _y: number = 0  
    protected _xspeed: number = 0
    protected _yspeed: number = 0
    protected _speedMultiplier: number = 5
    protected _direction: number = 1

    public get x() { return this._x }
    public set x(value:number) { this._x = value }
    public get y() { return this._y}
    public set y(value:number) { this._y = value }
    public get xspeed() { return this._xspeed }
    public set xspeed(value:number) { this._xspeed = value }
    public get yspeed() { return this._yspeed}
    public set yspeed(value:number) { this._yspeed = value }
    public get speedMultiplier() { return this._speedMultiplier }
    public set speedMultiplier(value:number) { this._speedMultiplier = value }
    public get direction() { return this._direction }
    public set direction(value:number) { this._direction = value }

    constructor() {
        super()
        this.draw()
    }

    public update() {
        this._x += this.xspeed;
        this._y += this.yspeed;
        this.draw()
    }

    private draw() : void {
        this.style.transform = "translate("+this._x+"px, "+this._y+"px) scale("+this._direction+",1)"
    }
}