class Game {
    // Fields
    private gameObjects:GameObject[] = []
    private static instance:Game

    // Timers (ook fields)
    private grainCounter:number = 0
    private phoneCounter:number = 0

    private constructor() {
        // Kip en zombies laten spawnen
        let chicken:Chicken = new Chicken()
        this.gameObjects.push(chicken)
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

        // Als de counters een getal voorbijgaan: nieuw object spawnen en resetten
        if(this.grainCounter >= 180) {
            this.gameObjects.push(new Grain())
            this.grainCounter = 0
        }

        if(this.phoneCounter >= 300) {
            this.gameObjects.push(new Phone())
            this.phoneCounter = 0
        }

        // Objecten in het scherm laten verschijnen en bewegen
        for(const gameObject of this.gameObjects) {
            gameObject.update()
        }
        
        // Gameloop aan de gang houden
        requestAnimationFrame(() => this.gameLoop())
    }

    public static getInstance():Game {
        if(!Game.instance) {
            Game.instance = new Game()
        }
        return Game.instance
    }
} 

window.addEventListener("load", () => Game.getInstance())