class Zombie extends GameObject implements Observer {
    // Fields
    private _behavior:Behavior
    private chicken:Chicken

    // Parent fields
    _x = Math.random() * window.innerWidth
    _y = (Math.random() * window.innerHeight / 2) + (window.innerHeight / 2)
    _speedMultiplier = 3

    constructor(chicken:Chicken) {
        super()

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)

        this._behavior = new WalkToPoint(this)

        this.chicken = chicken
        this.chicken.signUp(this)
    }

    private calculateSpeedToPoint(xPoint:number, yPoint:number):void {
        let xdist = xPoint - this._x
        let ydist = yPoint - this._y
        let distance:number = Math.sqrt(xdist * xdist + ydist * ydist);

        this.xspeed = xdist / distance
        this.yspeed = ydist / distance

        this.xspeed *= this.speedMultiplier
        this.yspeed *= this.speedMultiplier

        // Is de snelheid op de x-as negatief, dan wordt direction -1
        // In de draw functie wordt dit gebruikt om de zombie naar links te laten kijken als deze naar links beweegt
        this.direction = (this.xspeed < 0) ? 1 : -1;
    }

    update() {
        super.update()
        this.calculateSpeedToPoint(this.chicken.x, this.chicken.y)
    }

    alert():void {
        return
    }
}

window.customElements.define("zombie-component", Zombie as any)