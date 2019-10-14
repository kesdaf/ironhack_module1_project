class Background{
    constructor(ctx) {
        this.x=0
        this.y=0
        this.ctx = ctx;
        this.w= ctx.canvas.width
        this.h = ctx.canvas.height
        this.img = new Image()
        this.img.src = "img/background.png"
        this.vy=5
    }

    draw(){
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
          )
      
          this.ctx.drawImage(
            this.img,
            this.x ,
            this.y - this.h,
            this.w,
            this.h
          )
    }

    move(){
        this.y +=this.vy
        if(this.y === this.ctx.canvas.height){
            this.y=0
        }
    }

}