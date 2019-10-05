class Reward {
    constructor(enemy) {
        this.ctx = enemy.ctx;
        this.x = enemy.x + enemy.w / 2;
        this.y = enemy.y + enemy.h / 2;
        this.h=5
        this.w =5
        this.vx = 0.1
        this.vy = 0.1
        this.tick=0
        this.visible=true
    }

    draw() {
        this.ctx.fillStyle = "green"
        this.ctx.fillRect(
            this.x,
            this.y,
            this.w,
            this.h
        )
    }
    move() {
        const direction = Math.random() * 10 < 5;
        const positive = Math.random() * 10 < 5;
        if (direction) { 
            this.y += positive? this.vy : -1 * this.vy
        }else{
            this.x += positive? this.vx : -1 * this.vx
        }

        this.tick ++
    }

    isVisible(){
        return this.tick < 60*3 && this.visible
    }

    collide(el){
        const colX = el.x + el.w >= this.x && el.x <= this.x + this.w
        const colY = el.y + el.h >= this.y  && el.y <= this.y + this.h
      
        return colX && colY
    }
}