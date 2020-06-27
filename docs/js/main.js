"use strict";
class GameObject extends HTMLElement {
    constructor() {
        super();
        this._x = 0;
        this._y = 0;
        this._xspeed = 0;
        this._yspeed = 0;
        this._speedMultiplier = 5;
        this._direction = 1;
        this.draw();
    }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
    get xspeed() { return this._xspeed; }
    set xspeed(value) { this._xspeed = value; }
    get yspeed() { return this._yspeed; }
    set yspeed(value) { this._yspeed = value; }
    get speedMultiplier() { return this._speedMultiplier; }
    set speedMultiplier(value) { this._speedMultiplier = value; }
    get direction() { return this._direction; }
    set direction(value) { this._direction = value; }
    get height() { return this.clientHeight; }
    get width() { return this.clientWidth; }
    get behavior() { return this._behavior; }
    set behavior(value) { this._behavior = value; }
    update() {
        this._x += this.xspeed;
        this._y += this.yspeed;
        this.draw();
    }
    draw() {
        this.style.transform = "translate(" + this._x + "px, " + this._y + "px) scale(" + this._direction + ",1)";
    }
    hasCollision(gameobject) {
        return (this._x < gameobject._x + gameobject.width &&
            this._x + this.width > gameobject._x &&
            this._y < gameobject._y + gameobject.height &&
            this._y + this.height > gameobject._y);
    }
}
class Chicken extends GameObject {
    constructor() {
        super();
        this.observers = [];
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        window.addEventListener("click", (e) => this.onWindowClick(e));
        this.behavior = new WalkToPoint(this);
    }
    onWindowClick(e) {
        this.behavior.update(e.clientX, e.clientY);
    }
    update() {
        super.update();
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
    onCollision(gameObject) {
        if (gameObject instanceof Phone) {
            this.alertObservers();
        }
    }
}
window.customElements.define("chicken-component", Chicken);
class Game {
    constructor() {
        this.gameObjects = [];
        this._gameOver = false;
        this._score = 0;
        this._ui = document.getElementsByTagName("ui")[0];
        this.grainCounter = 0;
        this.phoneCounter = 0;
        let chicken = new Chicken();
        this.gameObjects.push(chicken);
        for (let i = 0; i < 5; i++) {
            this.gameObjects.push(new Zombie(chicken));
        }
        this.gameLoop();
    }
    get gameOver() { return this._gameOver; }
    set gameOver(value) { this._gameOver = value; }
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
            this.checkCollision(gameObject);
            this._ui.innerHTML = "Score " + this._score;
        }
        if (!this.gameOver) {
            requestAnimationFrame(() => this.gameLoop());
        }
        else {
            for (const gameObject of this.gameObjects) {
                gameObject.remove();
                this._ui.innerHTML = "Je score is " + this._score + ". Herlaad de pagina (F5 of 'opnieuwpijl' linksbovenin de browser) om opnieuw te spelen.";
            }
            this._score = 0;
        }
    }
    checkCollision(gameObject1) {
        for (const gameObject2 of this.gameObjects) {
            if (gameObject1.hasCollision(gameObject2)) {
                gameObject1.onCollision(gameObject2);
            }
        }
    }
    addScore() {
        this._score++;
    }
    removeGameObject(gameObject) {
        let index = this.gameObjects.indexOf(gameObject);
        this.gameObjects.splice(index, 1);
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
        this._x = Math.random() * window.innerWidth;
        this._y = Math.random() * window.innerHeight;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }
    onCollision(gameObject) {
        if (gameObject instanceof Chicken) {
            Game.getInstance().addScore();
            Game.getInstance().removeGameObject(this);
            this.remove();
        }
    }
}
window.customElements.define("grain-component", Grain);
class Phone extends GameObject {
    constructor() {
        super();
        this._x = Math.random() * window.innerWidth;
        this._y = Math.random() * window.innerHeight;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }
    onCollision(gameObject) {
        if (gameObject instanceof Chicken) {
            Game.getInstance().removeGameObject(this);
            this.remove();
        }
    }
}
window.customElements.define("phone-component", Phone);
class Zombie extends GameObject {
    constructor(chicken) {
        super();
        this._x = Math.random() * window.innerWidth;
        this._y = (Math.random() * window.innerHeight / 2) + (window.innerHeight / 2);
        this._speedMultiplier = 3;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        this.behavior = new WalkToPoint(this);
        this.chicken = chicken;
        this.chicken.signUp(this);
    }
    update() {
        super.update();
        this.behavior.update(this.chicken.x, this.chicken.y);
    }
    alert() {
        this.behavior = new StandStill(this);
        this.style.backgroundImage = "url(images/calling.png)";
        setTimeout(() => {
            this.behavior = new WalkToPoint(this);
            this.style.backgroundImage = "url(images/zombie.png)";
        }, 2000);
    }
    onCollision(gameObject) {
        if (gameObject instanceof Chicken) {
            Game.getInstance().gameOver = true;
        }
    }
}
window.customElements.define("zombie-component", Zombie);
class StandStill {
    constructor(object) {
        this.object = object;
        this.object.xspeed = 0;
        this.object.yspeed = 0;
    }
    update() {
    }
}
class WalkToPoint {
    constructor(object) {
        this.object = object;
    }
    update(xPoint, yPoint) {
        let xdist = xPoint - this.object.x;
        let ydist = yPoint - this.object.y;
        let distance = Math.sqrt(xdist * xdist + ydist * ydist);
        this.object.xspeed = xdist / distance;
        this.object.yspeed = ydist / distance;
        this.object.xspeed *= this.object.speedMultiplier;
        this.object.yspeed *= this.object.speedMultiplier;
        this.object.direction = (this.object.xspeed < 0) ? 1 : -1;
    }
}
//# sourceMappingURL=main.js.map