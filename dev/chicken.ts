/// <reference path="gameobject.ts" />

class Chicken extends GameObject implements Subject {
    private _behavior:Behavior
    private speedMultiplier: number = 5

    constructor() {
        super()

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)

        window.addEventListener("click", (e:MouseEvent) => this.onWindowClick(e))
    }

    private onWindowClick(e:MouseEvent) : void {
        // Berekening van de snelheid waar naartoe verplaatst moet worden (positie muisklik)
        this.calculateSpeedToPoint(e.clientX, e.clientY)

        // Nieuwe positie wordt berekend aan de hand van de snelheid
        this._x += this.xspeed
        this._y += this.yspeed
    }
    
    /**
     * Bepaalt de snelheid (en daarmee ook de richting) vanaf het huidige punt
     * naar het punt dat meegegeven wordt
     * @param xPoint x coordinaat van het punt waar naartoe verplaatst moet worden
     * @param yPoint y coordinaat van het punt waar naartoe verplaatst moet worden
     */
    private calculateSpeedToPoint(xPoint : number, yPoint : number) : void {
        let xdist = xPoint - this._x
        let ydist = yPoint - this._y
        let distance:number = Math.sqrt(xdist * xdist + ydist * ydist);

        this.xspeed = xdist / distance
        this.yspeed = ydist / distance

        this.xspeed *= this.speedMultiplier
        this.yspeed *= this.speedMultiplier

        // Is de snelheid op de x-as negatief, dan wordt direction -1
        // In de draw functie wordt dit gebruikt om de chicken naar links te laten kijken 
        // als deze naar links beweegt
        this._direction = (this.xspeed < 0) ? 1 : -1;
    }
}

window.customElements.define("chicken-component", Chicken as any)