class Phone extends GameObject {
    constructor() {
        super()

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)
    }
}

window.customElements.define("phone-component", Phone as any)