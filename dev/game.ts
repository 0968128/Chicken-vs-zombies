class Game {
    private chicken:GameObject
    private zombies:GameObject[] = []
    private grains:Grain[] = []
    private grainCounter:number = 0
    private phones:Phone[] = []
    private phoneCounter:number = 0
    private static instance:Game

    private constructor() {
        // Kip en zombies laten spawnen
        this.chicken = new Chicken()
        for(let i = 0; i < 5; i++) {
            this.zombies.push(new Zombie(Math.random(), Math.random()))
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
        this.chicken.update()
        for(const zombie of this.zombies) {
            zombie.update()
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