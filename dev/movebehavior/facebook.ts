class Facebook implements Behavior {
    // Fields
    private object:GameObject

    // Constructor
    constructor(object:GameObject) {
        this.object = object
        this.object.style.backgroundImage = "url(images/calling.png)"
        this.standStill()
    }

    private standStill() {
        this.object.xspeed = 0
        this.object.yspeed = 0

        setTimeout(() => {
            // Gedrag weer naar WalkToPoint zetten
        }, 2000)
    }
}