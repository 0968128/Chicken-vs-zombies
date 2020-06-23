class Zombie extends GameObject implements Observer {
    // private _behavior:Behavior
    _x = Math.random() * window.innerWidth
    _y = (Math.random() * window.innerHeight / 2) + (window.innerHeight / 2)

    constructor(chicken:Chicken) {
        super()

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)

        chicken.signUp(this)
    }

    alert(): void {
        return
    }
}

window.customElements.define("zombie-component", Zombie as any)