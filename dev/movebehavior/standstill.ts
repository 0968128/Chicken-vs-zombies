class StandStill implements Behavior {
    // Fields
    private object:GameObject

    // Constructor
    constructor(object:GameObject) {
        this.object = object

        this.object.xspeed = 0
        this.object.yspeed = 0
    }
    
    update(xPoint: number, yPoint: number): void {
        throw new Error("Method not implemented.")
    }
}