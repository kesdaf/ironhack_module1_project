class secondEnemy extends Enemy{
    constructor(ctx){
        super(ctx)
        this.w = 1.5* this.w
        this.weapons =[new secondWeapon(this,this.color,true)]
        this.hitpoints =2
    }
}