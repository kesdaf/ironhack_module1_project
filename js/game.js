class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.ship = new Ship(ctx)
        this.enemies =[]
        this.rewards =[]
        this.intervalId = null;
        this.tick =0
        this.noEnemies =true


        this.score=0
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
        this.rewards.forEach(r => r.draw())

        this.reards
        this.tick++
        if(this.tick >100){
            this.tick = 0
        }
    }

    _addEnemies(){
        const number = Math.floor(Math.random()*10)
        for(let i=0; i<number; i++){
            let addEnemy
            addEnemy = new directionEnemy(this.ctx,this.ship)
            // if(this.score >0 && Math.random()*10 >3){
            //     if(Math.random()*10 >3){
            //         addEnemy = new directionEnemy(this.ctx,this.ship)
            //     }else{
            //        addEnemy = new secondEnemy(this.ctx) 
            //     }
                
            // }else{
            //     addEnemy = new Enemy(this.ctx)
            // } 
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
        this.rewards.forEach(r=>r.move())
        this._pickRewards()
        this._removeRewards()

        this._gameOver()
    }

    _hitEnemy(){
        let hits=0
        this.ship.weapons.forEach(w =>{
            w.bullets.forEach(b=>{
                this.enemies.forEach(e =>{
                    if(b.collide(e)){
                        e.hit(b.damage)
                        hits++
                        if(Math.random()*100 >10){
                            this.rewards.push(new Reward(e))
                        }
                    }
                })
            })
        });
        this.score +=hits
    }

    _pickRewards(){
        this.rewards.forEach(r =>{
            if(r.collide(this.ship)){
                r.visible = false
                this.ship.hitpoints += 5;
                console.log(this.ship.hitpoints)
            }
        })
    }

    _hitShip(){
        let hits =0;
        this.enemies.forEach( e=>{
            if(e.collide(this.ship)){
                this.ship.hit(e.hitpoints)
                
                console.log(this.ship.hitpoints)
            }
            e.weapons.forEach(w =>{
                w.bullets.forEach(b=>{
                    if(b.color != this.ship.color && b.collide(this.ship)){
                        this.ship.hit(b.damage)
                        console.log(this.ship.hitpoints)
                    }
                })
            })
        })
    }

    _removeRewards(){
        this.rewards = this.rewards.filter(r => r.isVisible())
    }

    _gameOver(){
        if(this.ship.hitpoints<=0){
            clearInterval(this.intervalId)
            this._drawMessage("Your Final Score " + Math.floor (this.score))
        }
    }
    _drawMessage(message) {
        this.ctx.font = "10px sans-serif";
        this.ctx.lineWidth = 1;
       this.ctx.fillText(message, this.ctx.canvas.width/3, this.ctx.canvas.height -2);
      }
}