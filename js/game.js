class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.ship = new Ship(ctx)
        this.enemies =[]
        this.rewards =[]
        this.intervalId = null;
        this.tick =0
        this.noEnemies =true
        this.bg = new Background(ctx)
        this.score=0
        this.remainBullets=[]
        this.tickMoreEnemies =0
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

        this.bg.draw() 

        this.enemies.forEach(e => e.draw())
        this.remainBullets.forEach(b=>b.draw())
        
        if(this.noEnemies || 
            this.enemies.length < 5 ||
            this.tickMoreEnemies> 60*(15+Math.random()*5)){// && this.tick >5){
            this._addEnemies()
            this.noEnemies = false
            this.tickMoreEnemies =0
        }
        this.tickMoreEnemies++
        this.rewards.forEach(r => r.draw())       
        
        this.ship.draw()

        this.tick++
        if(this.tick >100){
            this.tick = 0
        }
    }

    _addEnemies(){
        const number = Math.floor(Math.random()*15)
        for(let i=0; i<number; i++){
            let addEnemy
             addEnemy = new boss(this.ctx,this.ship)
            if(this.score >0 && i>5){
                const rndEnemyselection = Math.random()*30 
                if(rndEnemyselection<10){
                    addEnemy = new directionEnemy(this.ctx,this.ship)
                }else if(rndEnemyselection >28){
                    addEnemy = new boss(this.ctx,this.ship)
                }else if(rndEnemyselection <20){
                    addEnemy = new SecondEnemy(this.ctx) 
                }else{
                    addEnemy = new ThirdEnemy(this.ctx,this.ship) 
                }
                
            }else{
                addEnemy = new Enemy(this.ctx)
            } 
            this.enemies.push(addEnemy)            
        }
    }
    _removeEnemies(){
        this.enemies.filter(e => !e.isVisible()).forEach(e =>{
            e.weapons.forEach(w=>this.remainBullets = this.remainBullets.concat(w.bullets))
        })
        this.enemies = this.enemies.filter(e => e.isVisible())
        if(this.enemies.length === 0){
            this.noEnemies =true;
        }
        this.remainBullets.filter(b => b.isVisible())
    }
    _move(){
        this.bg.move() 
        this.ship.move()
        this.enemies.forEach(e => e.move())
        this.remainBullets.forEach(b=>b.move())
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
                        b.visible =false
                        e.hit(b.damage)
                        hits++
                        if(e.hitpoints<=0 && Math.random()*100 >10){
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
                r.reward(this.ship)
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
                    if(b.collide(this.ship)){
                        b.visible =false
                        if(b.color != this.ship.shield){
                            this.ship.hit(b.damage)
                        }
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