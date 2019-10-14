class boss extends directionEnemy{
    constructor(ctx,ship){
        super(ctx,ship)
        this.weapons =[new thirdWeapon(this,this.color,true)]
        this.hitpoints=100
        
        this.img.src = "img/boss.png"
    }
}