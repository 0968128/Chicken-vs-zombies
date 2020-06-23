abstract class GameObject extends HTMLElement {
    // Fields
    protected _x: number = 0
    protected _y: number = 0  
    protected xspeed: number = 0
    protected yspeed: number = 0
    protected _direction: number = 1

    constructor() {
        super()
        this.draw()
    }

    public update() {
        this.draw()
    }

    private draw() : void {
        this.style.transform = "translate("+this._x+"px, "+this._y+"px) scale("+this._direction+",1)"
    }
}