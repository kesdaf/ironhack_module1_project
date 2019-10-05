class Bullet {
    constructor(ctx, x, y, color, direction, vx,vy, objetive) {
        this.ctx = ctx
        this.x = x
        this.y = y
        if(direction){
          this.vy = 3 
        }else{
          this.vy = -3  
        }
        if(vy){
            this.vy =vy
        }
        if(vx){
            this.vx =vx
        }else{
           this.vx = 0 
        }
        this.objetive = objetive
        if(this.objetive){
            this.vx0 = this.vx
            this.vx=0
        }
        this.r = 2
        this.damage =1
        this.color = color
        this.tick=0
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
    }

    move() {

        if(this.objetive && this.tick%20 ===0 ){
            // this.tick=0
            this.vx = this.vx0
            if(this.x > this.objetive.x ){
                this.vx =-1 * this.vx0
            }
            if(this.y > this.objetive.y && this.y < this.ctx.canvas.height *0.9){
                this.vy *=-1
            }    
        }
      
        this.y += this.vy
        this.x += this.vx

        this.tick++
    }

    isVisible() {
        return this.x > 0 && this.x < this.ctx.canvas.width
            || this.y > 0 && this.y > this.ctx.canvas.height
    }

    collide(el){
        const colX = el.x + el.w >= this.x - this.r && el.x <= this.x + this.r
        const colY = el.y + el.h >= this.y - this.r && el.y <= this.y + this.r
      
        return colX && colY
    }
}
