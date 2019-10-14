class secondWeapon extends Weapon{
    shoot() {
        let bPosition = this.ship.y
        if(this.enemy){
            bPosition += this.ship.h
        }
        for(let i = -3; i<= 3; i = i + 3){

         const bullet = new Bullet(
            this.ship.ctx,
            this.ship.x + this.ship.w/2,
            bPosition,
            this.color,
            this.enemy,
            i
        )

        this.bullets.push(bullet)           
        }
    }
}