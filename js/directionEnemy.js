class directionEnemy extends Enemy{
    constructor(ctx,ship){
        super(ctx)
        this.h = 1.5* this.h
        this.w = 1.5* this.w
        this.weapons =[new directionWeapon(this,this.color,true,ship)]
        this.hitpoints =10
        this.player = ship
        this.specialBehabiour =0
        this.vy0 =2
        this.vy=2
        this.vx =this.vy
        this.changedirectionDelay=0

        this.img.src = "img/enemy_direction.png"
    }

    draw(){
        this.ctx.save();
        super.draw();
        this.ctx.restore()
    }
    move(){
        this.changedirectionDelay = this.changedirectionDelay>50? 0:this.changedirectionDelay+1
        if(this.specialBehabiour <500){
            this.specialBehabiour++;
        
            if(this.x < 0 || this.x +this.w > this.ctx.canvas.width 
                || this.vx>0 && this.x >this.player.x &&  this.changedirectionDelay===0){
                this.vx = -1 * this.vx
            }
           
            if(this.vy < 0 && this.y + this.h <= 0 
                ||this.vy >0 && this.y >this.player.y && this.changedirectionDelay===0){
                this.vy = -1 *this.vy
            }

            this.y += this.vy
            this.x += this.vx 
//            this.angle = Math.atan2(this.player.x -this.x, this.player.y - this.y)  
            this.shoot()   
            this.weapons.forEach(w=>w.move())
        }else {
            super.move()
        }
    }
}