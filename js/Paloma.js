class Paloma {
  constructor (){
    this.x = 70;
    this.y = 225;
    this.h = 50;
    this.w = 45;
    this.movementSpeed = 20;
    this.gravitySpeed = 2
    this.canJump = true
    this.jumpSpeed = 130
    this.canShoot = true
     
      
    //añadir paloma
    this.node = document.createElement("img")
    this.node.src="./Images/Paloma.png"
    gameBoxNode.append(this.node)

    //ajustar dimensiones
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`

    //ajustar posición
    this.node.style.position = "absolute" 
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }

  // metodo movimento paloma
  palomaMovement (direction){
    if (direction === "right"){
      this.x += this.movementSpeed
      this.node.style.left = `${this.x}px`
    }else if (direction === "left") {
      this.x -= this.movementSpeed
      this.node.style.left = `${this.x}px`
    }
  }

  shoot (){
    if (this.canShoot === false){ //si es falso, no puede disparar, no ejecutes la funcion
      return
    }
    this.canShoot = false
    const newBullet = new Bullet (`${this.x}px`, this.y)
    setTimeout (()=> {
      this.canShoot = true
    }, 1000)
    return newBullet
  }
  
  jump (){
    if (this.canJump === false){
      return
    }
    this.canJump = false
    this.y -= this.jumpSpeed
    this.node.style.top = `${this.y}px`
    setTimeout (()=> {
      this.canJump = true
    }, 500)
  }

  gravity(){
    if (this.y > 225){
      return
    }
    this.y += this.gravitySpeed
    this.node.style.top = `${this.y}px`
  }

}


