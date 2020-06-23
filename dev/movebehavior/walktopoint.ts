class WalkToPoint implements Behavior {
    // Fields
    private object:GameObject

    // Constructor
    constructor(object:GameObject) {
        this.object = object
    }

    // Methods
    private calculateSpeedToPoint(xPoint : number, yPoint : number) : void {
        let xdist = xPoint - this.object.x
        let ydist = yPoint - this.object.y
        let distance:number = Math.sqrt(xdist * xdist + ydist * ydist);

        this.object.xspeed = xdist / distance
        this.object.yspeed = ydist / distance

        this.object.xspeed *= this.object.speedMultiplier
        this.object.yspeed *= this.object.speedMultiplier

        // Is de snelheid op de x-as negatief, dan wordt direction -1
        // In de draw functie wordt dit gebruikt om de object naar links te laten kijken 
        // als deze naar links beweegt
        this.object.direction = (this.object.xspeed < 0) ? 1 : -1;
    }
}