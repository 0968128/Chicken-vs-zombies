class Zombie extends GameObject implements Observer {
    private _behavior:Behavior

    constructor(randomX:number, randomY:number) {
        super()

        this._x = randomX * (window.innerWidth - 100) + 100
        this._y = randomY * (window.innerHeight - 100) + 100

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)
    }
}

window.customElements.define("zombie-component", Zombie as any)