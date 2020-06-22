"use strict";
class Chicken extends HTMLElement {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.direction = 1;
        this.speedMultiplier = 5;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        window.addEventListener("click", (e) => this.onWindowClick(e));
    }
    onWindowClick(e) {
        this.calculateSpeedToPoint(e.clientX, e.clientY);
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
    calculateSpeedToPoint(xPoint, yPoint) {
        let xdist = xPoint - this.x;
        let ydist = yPoint - this.y;
        let distance = Math.sqrt(xdist * xdist + ydist * ydist);
        this.xspeed = xdist / distance;
        this.yspeed = ydist / distance;
        this.xspeed *= this.speedMultiplier;
        this.yspeed *= this.speedMultiplier;
        this.direction = (this.xspeed < 0) ? 1 : -1;
    }
    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.draw();
    }
    draw() {
        this.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.direction + ",1)";
    }
}
window.customElements.define("chicken-component", Chicken);
class Game {
    constructor() {
        this.zombies = [];
        this.grains = [];
        this.grainCounter = 0;
        this.phones = [];
        this.phoneCounter = 0;
        this.chicken = new Chicken();
        for (let i = 0; i < 5; i++) {
            this.zombies.push(new Zombie(Math.random(), Math.random()));
        }
        this.gameLoop();
    }
    gameLoop() {
        this.phoneCounter++;
        this.grainCounter++;
        console.log(`${this.phoneCounter} en ${this.grainCounter}`);
        if (this.grainCounter >= 180) {
            this.grains.push(new Grain());
            this.grainCounter = 0;
        }
        if (this.phoneCounter >= 300) {
            this.phones.push(new Phone());
            this.phoneCounter = 0;
        }
        this.chicken.update();
        for (const zombie of this.zombies) {
            zombie.update();
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
class Grain extends HTMLElement {
    constructor() {
        super();
        this._x = 300;
        this._y = 500;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        this.draw();
    }
    draw() {
        this.style.transform = "translate(" + this._x + "px, " + this._y + "px)";
    }
}
window.customElements.define("grain-component", Grain);
class Phone extends HTMLElement {
    constructor() {
        super();
        this._x = 500;
        this._y = 300;
        this._direction = 1;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        this.draw();
    }
    draw() {
        this.style.transform = "translate(" + this._x + "px, " + this._y + "px) scale(" + this._direction + ",1)";
    }
}
window.customElements.define("phone-component", Phone);
class Zombie extends HTMLElement {
    constructor(randomX, randomY) {
        super();
        this._direction = 1;
        this._x = randomX * (window.innerWidth - 100) + 100;
        this._y = randomY * (window.innerHeight - 100) + 100;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }
    update() {
        this.draw();
    }
    draw() {
        this.style.transform = "translate(" + this._x + "px, " + this._y + "px) scale(" + this._direction + ",1)";
    }
}
window.customElements.define("zombie-component", Zombie);
//# sourceMappingURL=main.js.map