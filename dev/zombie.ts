class Zombie extends GameObject implements Observer {
    // Fields
    private chicken:Chicken

    // Parent fields
    _x = Math.random() * window.innerWidth
    _y = (Math.random() * window.innerHeight / 2) + (window.innerHeight / 2)
    _speedMultiplier = 3

    constructor(chicken:Chicken) {
        super()

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)

        this.behavior = new WalkToPoint(this)

        this.chicken = chicken
        this.chicken.signUp(this)
    }

    update() {
        super.update()
        this.behavior.update(this.chicken.x, this.chicken.y)
    }

    alert():void {
        this.behavior = new StandStill(this)
        this.style.backgroundImage = "url(images/calling.png)"

        setTimeout(() => {
            this.behavior = new WalkToPoint(this)
            this.style.backgroundImage = "url(images/zombie.png)"
        }, 2000)
    }

    onCollision(gameObject:GameObject):void {
        if(gameObject instanceof Chicken) {
            Game.getInstance().gameOver = true
        }
    }
}

window.customElements.define("zombie-component", Zombie as any)