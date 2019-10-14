class directionWeapon extends Weapon{
    constructor(ship,color,enemy,objetive){
        super(ship,color,enemy)
        this.objetive = objetive
    }
    shoot() {
        let bPosition = this.ship.y
        if(this.enemy){
            bPosition += this.ship.h
        }

         const bullet = new Bullet(
            this.ship.ctx,
            this.ship.x + this.ship.w/2,
            bPosition,
            this.color,
            this.enemy,
            3,
            3,
            this.objetive
        )

        this.bullets.push(bullet) 
    }
}