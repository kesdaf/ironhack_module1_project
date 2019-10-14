class Reward {
    constructor(enemy) {
        this.ctx = enemy.ctx;
        this.x = enemy.x + enemy.w / 2;
        this.y = enemy.y + enemy.h / 2;
        this.h=10
        this.w =20
        this.vx = 0.1
        this.vy = 0.1
        this.tick=0
        this.visible=true

        this.img = new Image()
        this.img.src = "img/rewards.png"
        this.img.frames = 4
        if( Math.random() * 10 < 7){
            this.img.frameIndex =0;
            if( Math.random() * 10 < 5){
                this.img.frameIndex =1;
            }
        }else{
            this.img.frameIndex=3
           if(Math.random()*100 >95){
            this.img.frameIndex =4;
           } 
        } 
    }

    draw() {
        this.ctx.fillStyle = "green"
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
          );
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

    reward(ship){
        ship.hitpoints +=5
        if(ship.weapons.length <2 && this.img.frameIndex === 3){
            ship.weapons.push(new secondWeapon(ship))    
        }
        if(ship.weapons.length === 2 && this.img.frameIndex === 4){
            ship.weapons.push(new thirdWeapon(ship))    
        }
    }
}