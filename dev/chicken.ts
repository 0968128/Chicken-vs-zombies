/// <reference path="gameobject.ts" />

class Chicken extends GameObject implements Subject {
    // Fields
    private observers:Observer[] = []

    constructor() {
        super()

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)

        window.addEventListener("click", (e:MouseEvent) => this.onWindowClick(e))

        this.behavior = new WalkToPoint(this)
    }

    private onWindowClick(e:MouseEvent):void {
        // Berekening van de snelheid waar naartoe verplaatst moet worden (positie muisklik)
        this.behavior.update(e.clientX, e.clientY)
    }

    signUp(observer: Observer):void {
        this.observers.push(observer)
    }

    signOff(observer: Observer):void {
        let index = this.observers.indexOf(observer)
        this.observers.splice(index, 1)
    }

    alertObservers():void {
        for(const observer of this.observers) {
            observer.alert()
        }
    }

    onCollision(gameObject:GameObject):void {
        if(gameObject instanceof Phone) {
            this.alertObservers()
        }
    }
}

window.customElements.define("chicken-component", Chicken as any)