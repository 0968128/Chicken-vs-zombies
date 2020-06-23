/// <reference path="gameobject.ts" />

class Grain extends GameObject {
    constructor() {
        super()

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)
    }
}

window.customElements.define("grain-component", Grain as any)