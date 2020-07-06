class Game {
    // Fields
    private gameObjects:GameObject[] = []
    private _gameOver:boolean = false
    private _score:number = 0
    private _ui:Element = document.getElementsByTagName("ui")[0]
    private static instance:Game

    // Timers (ook fields)
    private grainCounter:number = 0
    private phoneCounter:number = 0

    // Properties
    public get gameOver() { return this._gameOver }
    public set gameOver(value:boolean) { this._gameOver = value }

    private constructor() {
        // Kip en zombies laten spawnen
        let chicken:Chicken = new Chicken()
        this.gameObjects.push(chicken)

        // For loop enemy spawn
        for(let i = 0; i < 5; i++) {
            this.gameObjects.push(new Zombie(chicken))
        }

        // Gameloop starten
        this.gameLoop()
    }
    
    private gameLoop() {
        // Eén optellen per in-game-frame
        this.phoneCounter++
        this.grainCounter++

        // Score bijwerken
        this._ui.innerHTML = "Score " + this._score

        // Als de counters een getal voorbijgaan: nieuw object spawnen en resetten
        if(this.grainCounter >= 180) {
            this.gameObjects.push(new Grain())
            this.grainCounter = 0
        }

        if(this.phoneCounter >= 300) {
            this.gameObjects.push(new Phone())
            this.phoneCounter = 0
        }

        // Objecten in het scherm laten verschijnen, bewegen en controleren op botsingen
        for(const gameObject of this.gameObjects) {
            gameObject.update()
            this.checkCollision(gameObject)
        }
        
        // Gameloop aan de gang houden
        if(!this._gameOver) {
            requestAnimationFrame(() => this.gameLoop())
        } else {
            for(const gameObject of this.gameObjects) {
                gameObject.remove()
                this._ui.innerHTML = "Je score is " + this._score + ". Herlaad de pagina (F5 of 'opnieuwpijl' linksbovenin de browser) om opnieuw te spelen."
            }
            this._score = 0
        }
    }

    private checkCollision(gameObject1:GameObject) {
        // Code die objecten nagaat op botsingen
        for(const gameObject2 of this.gameObjects) {
            if(gameObject1.hasCollision(gameObject2)) {
                gameObject1.onCollision(gameObject2)
            }
        }
    }

    public addScore():void {
        this._score++
    }

    public removeGameObject(gameObject:GameObject) {
        let index = this.gameObjects.indexOf(gameObject)
        this.gameObjects.splice(index, 1)
    }

    public static getInstance():Game {
        if(!Game.instance) {
            Game.instance = new Game()
        }
        return Game.instance
    }
} 

window.addEventListener("load", () => Game.getInstance())