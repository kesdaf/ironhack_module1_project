class Bullet {
    constructor(ctx, x, y, color, direction, vx,vy, objetive) {
        this.ctx = ctx
        this.x = x
        this.y = y
        if(direction){
          this.vy = 8 
        }else{
          this.vy = -8  
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
        this.r = 10
        this.damage =1
        this.color = color
        this.tick=0

        this.img = new Image()
        this.img.src = "img/bullet.png"
        this.img.frames = 3
        if(color === "black"){
            this.img.frameIndex = 0
        }else if(color === "white"){
            this.img.frameIndex = 1
        }else{
            this.img.frameIndex = 2
        }

        this.visible =true

    }
    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x,
            this.y,
            this.r,
            this.r
          );
    }

    move() {

        if(this.objetive && this.tick%20 ===0 && this.tick<500 ){
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
        return this.visible && (this.x > 0 && this.x < this.ctx.canvas.width
            || this.y > 0 && this.y > this.ctx.canvas.height)
    }

    collide(el){
        const colX = el.x + el.w >= this.x - this.r && el.x <= this.x + this.r
        const colY = el.y + el.h >= this.y - this.r && el.y <= this.y + this.r
      
        return colX && colY
    }
}
