class Ship{
    constructor(ctx){
        this.ctx = ctx;
        this.w = 10
        this.h = 10
        this.x = (ctx.canvas.width - this.w)/2
        this.y = ctx.canvas.height - this.h -10

        this.vy = 0
        this.vx = 0

        this.hitpoints =10

        this.weapons=[new Weapon(this)]
        this.weaponRelay = true

        this.actions = {
            right: false,
            left: false,
            up: false,
            down:false,
            shoot: false
          }
        this._setListeners()
        this.tick = 0
    }
    
    draw(){
        this.ctx.fillRect(
            this.x,
            this.y,
            this.w,
            this.h
          ) 
        
        this.weapons.forEach(w => w.draw())
    }
    
    move(){
        this._applyActions()
        this.y += this.vy
        this.x += this.vx

        if (this.x<=0) {
            this.x = 0
        }else if(this.x + this.w >= this.ctx.canvas.width){
          this.x = this.ctx.canvas.width - this.w
        }
        if(this.y <=0){
            this.y =0
        }else if(this.y + this.h >= this.ctx.canvas.height){
            this.y = this.ctx.canvas.height - this.h
        }

        this.weapons.forEach(w => w.move())
    }

    _applyActions() {
        if (this.actions.up) {
          this.vy = -2;
        } else if (this.actions.down){
            this.vy =2;
        }else{
          this.vy = 0;
        }
        
        if (this.actions.left) {
            this.vx = -2
        } else if (this.actions.right){
            this.vx = 2
        }else{
            this.vx = 0
        }

        if(this.actions.shoot){
            if (this.weaponRelay){
                this.weapons.forEach(w =>{
                    w.shoot()
                })
                this.weaponRelay = false
            }
        }else {
            this.weaponRelay = true
        }
   
    }
    hit(damage){
        this.hitpoints -= damage
    }
    _setListeners() {
        document.onkeydown = e => this._switchAction(e.keyCode, true)
        document.onkeyup = e => this._switchAction(e.keyCode, false)
    }

    _switchAction(key, apply) {
        switch (key) {
          case UP:
            this.actions.up = apply
            break
          case DOWN:
            this.actions.down = apply
            break
          case RIGHT:
            this.actions.right = apply
            break
          case LEFT:
            this.actions.left = apply
            break
          case SPACE:
            this.actions.shoot = apply
            break
    
        }
    }
}