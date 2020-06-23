"use strict";
class GameObject extends HTMLElement {
    constructor() {
        super();
        this._x = 0;
        this._y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this._direction = 1;
        this.draw();
    }
    update() {
        this.draw();
    }
    draw() {
        this.style.transform = "translate(" + this._x + "px, " + this._y + "px) scale(" + this._direction + ",1)";
    }
}
class Chicken extends GameObject {
    constructor() {
        super();
        this.speedMultiplier = 5;
        this.observers = [];
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        window.addEventListener("click", (e) => this.onWindowClick(e));
    }
    onWindowClick(e) {
        this.calculateSpeedToPoint(e.clientX, e.clientY);
    }
    calculateSpeedToPoint(xPoint, yPoint) {
        let xdist = xPoint - this._x;
        let ydist = yPoint - this._y;
        let distance = Math.sqrt(xdist * xdist + ydist * ydist);
        this.xspeed = xdist / distance;
        this.yspeed = ydist / distance;
        this.xspeed *= this.speedMultiplier;
        this.yspeed *= this.speedMultiplier;
        this._direction = (this.xspeed < 0) ? 1 : -1;
    }
    update() {
        super.update();
        this._x += this.xspeed;
        this._y += this.yspeed;
    }
    signUp(observer) {
        this.observers.push(observer);
    }
    signOff(observer) {
        let index = this.observers.indexOf(observer);
        this.observers.splice(index, 1);
    }
    alertObservers() {
        for (const observer of this.observers) {
            observer.alert();
        }
    }
}
window.customElements.define("chicken-component", Chicken);
class Game {
    constructor() {
        this.gameObjects = [];
        this.grainCounter = 0;
        this.phoneCounter = 0;
        let chicken = new Chicken();
        this.gameObjects.push(chicken);
        for (let i = 0; i < 5; i++) {
            this.gameObjects.push(new Zombie(chicken));
        }
        this.gameLoop();
    }
    gameLoop() {
        this.phoneCounter++;
        this.grainCounter++;
        if (this.grainCounter >= 180) {
            this.gameObjects.push(new Grain());
            this.grainCounter = 0;
        }
        if (this.phoneCounter >= 300) {
            this.gameObjects.push(new Phone());
            this.phoneCounter = 0;
        }
        for (const gameObject of this.gameObjects) {
            gameObject.update();
        }
        requestAnimationFrame(() => this.gameLoop());
    }
    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
}
window.addEventListener("load", () => Game.getInstance());
class Grain extends GameObject {
    constructor() {
        super();
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }
}
window.customElements.define("grain-component", Grain);
class Phone extends GameObject {
    constructor() {
        super();
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }
}
window.customElements.define("phone-component", Phone);
class Zombie extends GameObject {
    constructor(chicken) {
        super();
        this._x = Math.random() * window.innerWidth;
        this._y = (Math.random() * window.innerHeight / 2) + (window.innerHeight / 2);
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        chicken.signUp(this);
    }
    alert() {
        return;
    }
}
window.customElements.define("zombie-component", Zombie);
class Facebook {
}
class WalkToPoint {
}
//# sourceMappingURL=main.js.map