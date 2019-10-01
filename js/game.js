class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.ship = new Ship(ctx)
        this.enemies =[]
      
        this.intervalId = null;
        this.tick =0
        this.noEnemies =true
      } 
      
    run() {
        this.intervalId = setInterval(() => {
            this._clear()
            this._draw()
            this._move()    
        }, 1000/60)
    }

    _clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    _draw() {
        this.ctx.fillStyle ="#58CCED"
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.fillStyle ="black"

       
        this.ship.draw()
        this.enemies.forEach(e => e.draw())

        if(this.noEnemies && this.tick >5){
            this._addEnemies()
            this.noEnemies = false
        }
        this.tick++
        if(this.tick >100){
            this.tick = 0
        }
    }

    _addEnemies(){
        const number = Math.floor(Math.random()*10)
        for(let i=0; i<number; i++){
            const addEnemy = new Enemy(this.ctx)
            this.enemies.push(addEnemy)            
        }

    }
    _removeEnemies(){
        this.enemies = this.enemies.filter(e => e.isVisible())
        if(this.enemies.length === 0){
            this.noEnemies =true;
        }
    }
    _move(){
        this.ship.move()
        this.enemies.forEach(e => e.move())
        this._hitEnemy()
        this._removeEnemies()
        this._hitShip()
    }

    _hitEnemy(){
        let hits=0
        this.ship.weapons.forEach(w =>{
            w.bullets.forEach(b=>{
                this.enemies.forEach(e =>{
                    if(b.collide(e)){
                        e.hit(b.damage)
                        hits++
                    }
                })
            })
        });
    }
    _hitShip(){
        let hits =0;
        this.enemies.forEach( e=>{
            if(e.collide(this.ship)){
                this.ship.hit(e.hitpoints)
            }
            e.weapons.forEach(w =>{
                this.bullets.forEach(b=>{
                    if(b.collide(this.ship)){
                        this.ship.hit(b.damage)
                    }
                })
            })
        })
    }
}