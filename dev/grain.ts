/// <reference path="gameobject.ts" />

class Grain extends GameObject {
    // Parent fields
    _x = Math.random() * window.innerWidth
    _y = Math.random() * window.innerHeight

    constructor() {
        super()

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)
    }

    onCollision(gameObject:GameObject):void {
        // Check welk gameobject
        // Als het een kip is, score +1 en instantie verwijderen
        if(gameObject instanceof Chicken) {
            Game.getInstance().addScore()
            Game.getInstance().removeGameObject(this)
            this.remove()
        }
    }
}

window.customElements.define("grain-component", Grain as any)