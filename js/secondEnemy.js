class SecondEnemy extends Enemy{
    constructor(ctx){
        super(ctx)
        this.w = 1.5* this.w
        this.weapons =[new secondWeapon(this,this.color,true)]
        this.hitpoints =15
        this.vy0=3
        this.vy=this.vy0
        this.img.src = "img/enemy_second.png"
    }
}

class ThirdEnemy extends SecondEnemy{
    constructor(ctx,ship){
        super(ctx)
        this.weapons =[new directionWeapon(this,this.color,true,ship)]
    }
}