class Paloma {
  constructor (){
    this.x = 70;
    this.y = 225;
    this.h = 50;
    this.w = 45;
    this.movementSpeed = 20;
    this.canShoot = true
    this.jumpSpeed = 2
    this.gravitySpeed = 2
    this.isJumping = false
  
    
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
    return new Bullet (`${this.x}px`, this.y)
    }
  }

