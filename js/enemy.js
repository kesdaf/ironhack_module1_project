class Enemy{
    constructor(ctx){
        this.ctx = ctx
        this.x = Math.random() * this.ctx.canvas.width
        this.y = -15
        this.w = 5
        this.h = 5

        this.vx = 0
        this.vy = 0.5
        this.vx0 = 0
        this.vy0 = 0.5     
        this.hitpoints = 1
        this.weapons =[new Weapon(this,"black",true)]
        this.tick=0
    }

    draw(){
        this.ctx.fillRect(
            this.x,
            this.y,
            this.w,
            this.h
          ) 
        if(this.tick++ >10){
            this.tick=0
            this.weapons.forEach(w => w.shoot())
        }
        this.weapons.forEach(w => w.draw())
    }

    move(){
        this._dance()
        this.y += this.vy
        this.x += this.vx
    }

    _dance(){
        this.vx = this.vx0
        this.vy = this.vy0
        const rd = Math.random()*10
        if(rd >8){
            this.vy = 0
            if(rd >9){
                this.vx=-1
            }else{
                this.vx=1
            }
        }
    }

    hit(damage){
        this.hitpoints -= damage
    }
    isVisible(){
        return this.y <this.ctx.canvas.height && this.hitpoints >0
    }

    collide(el){
        const colX = el.x + el.w >= this.x && el.x <= this.x + this.w
        const colY = el.y + el.h >= this.y  && el.y <= this.y + this.h
      
        return colX && colY
    }
}