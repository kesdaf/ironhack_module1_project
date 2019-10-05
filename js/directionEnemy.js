class directionEnemy extends Enemy{
    constructor(ctx,ship){
        super(ctx)
        this.w = 2* this.w
        this.weapons =[new directionWeapon(this,this.color,true,ship)]
        this.hitpoints =3
        this.player = ship
        this.specialBehabiour =0
    }

    draw(){
        this.ctx.save();
        super.draw();
        this.ctx.restore()
    }
    move(){
        if(this.specialBehabiour <200){
            this.specialBehabiour++;
        
            if(this.x < 0 || this.x +this.w > this.ctx.canvas.width || this.x >this.player.x){
                this.vx = -1 * this.vx
            }
            if(this.vy < 0 && this.y + this.h <= 0 ||this.y >this.player.y){
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