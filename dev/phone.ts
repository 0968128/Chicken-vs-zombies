/// <reference path="gameobject.ts" />

class Phone extends GameObject {
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
        // Als het een kip is, zombies op hun telefoon laten kijken en instantie verwijderen
        if(gameObject instanceof Chicken) {
            Game.getInstance().removeGameObject(this)
            this.remove()
        }
    }
}

window.customElements.define("phone-component", Phone as any)