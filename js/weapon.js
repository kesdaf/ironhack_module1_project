class Weapon {
    constructor(ship,color,enemy) {
        this.ship = ship
        this.bullets = []
        if(color){
            this.color = color;
        }else {
            this.color = "red";
        }
        this.enemy =enemy
        
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
            this.enemy)

        this.bullets.push(bullet)
    }

    draw() {
        this.bullets.forEach(bullet => bullet.draw())
    }

    move() {
        this.bullets.forEach(bullet => bullet.move())
        this._removeBullets()
    }
    
    _removeBullets(){
        this.bullets = this.bullets.filter(b => b.isVisible())
    }

}