class Enemy{
    constructor(ctx){
        this.ctx = ctx
        this.x = Math.random() * this.ctx.canvas.width
        this.y = -15
        this.w = 10
        this.h = 5

        this.color= Math.random()*10 >5 ?"white":"black"
        this.vx = 0
        this.vy = 0.5
        this.vx0 = 0
        this.vy0 = 0.5     
        this.hitpoints = 1
        this.weapons =[new Weapon(this,this.color,true)]

        this.angle=0
        this.tick=0
    }

    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.rotate(this.angle)
        this.ctx.fillRect(
            this.x,
            this.y,
            this.w,
            this.h
          ) 
        this.weapons.forEach(w => w.draw())
    }

    shoot(){
        if(this.tick++ >30){
            this.tick=0
            this.weapons.forEach(w => w.shoot())
        } 
    }

    move(){
        this._dance()

        if(this.x < 0 || this.x +this.w > this.ctx.canvas.width){
            this.vx = -1 * this.vx
        }
        if(this.vy < 0 && this.y + this.h <= 0){
            this.vy = -1 *this.vy
        }
        this.y += this.vy
        this.x += this.vx     
        this.shoot()   
        this.weapons.forEach(w=>w.move())
    }

    _dance(){
        const rd = Math.random()*10
        if(this.tick === 30) {
            this.vx = this.vx0
            this.vy = this.vy0
        }
        if(this.tick === 0 && rd >8){
            this.vy = this.vx
            if(rd >9){
                this.vx = -1 * this.vy0
            }else{
                this.vx = this.vy0
            }
        } else {
            // this.vx = this.vx0
            // this.vy = this.vy0 
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