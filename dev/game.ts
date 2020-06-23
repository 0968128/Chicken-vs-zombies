class Game {
    private gameObjects:GameObject[] = []
    private grains:Grain[] = []
    private grainCounter:number = 0
    private phones:Phone[] = []
    private phoneCounter:number = 0
    private static instance:Game

    private constructor() {
        // Kip en zombies laten spawnen
        let chicken:Chicken = new Chicken()
        this.gameObjects.push(chicken)
        for(let i = 0; i < 5; i++) {
            this.gameObjects.push(new Zombie(chicken))
        }
 
        this.gameLoop()
    }
    
    private gameLoop(){
        this.phoneCounter++
        this.grainCounter++

        console.log(`${this.phoneCounter} en ${this.grainCounter}`)

        if(this.grainCounter >= 180) {
            this.grains.push(new Grain())
            this.grainCounter = 0
        }

        if(this.phoneCounter >= 300) {
            this.phones.push(new Phone())
            this.phoneCounter = 0
        }

        // beweging
        for(const gameObject of this.gameObjects) {
            gameObject.update()
        }
        
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