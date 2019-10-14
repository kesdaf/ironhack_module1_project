class thirdWeapon extends Weapon{
    shoot() {
        let bPosition = this.ship.y
        if(this.enemy){
            bPosition += this.ship.h
        }
        for(let i = -3; i<= 3; i += 3){
            for (let j=-2;j<=2;j += 1){
                const baseDirection = i==0? Math.random()*2 -1 :i
                const bullet = new Bullet(
                    this.ship.ctx,
                    this.ship.x + this.ship.w/2,
                    bPosition,
                    this.color,
                    this.enemy,
                    i,
                    j
                ) 
                this.bullets.push(bullet)            
            }
        }          
    }
}