class Bullet {
    constructor(ctx, x, y, color, direction) {
        this.ctx = ctx
        this.x = x
        this.y = y
        if(direction){
          this.vy = 2  
        }else{
          this.vy = -2  
        }
        
        this.vx = 0
        this.r = 0.5
        this.damage =1
        this.color = color
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
    }

    move() {
        this.y += this.vy
        this.x += this.vx
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
