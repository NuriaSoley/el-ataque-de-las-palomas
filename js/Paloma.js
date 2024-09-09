class Paloma {
  constructor (){
    this.x = 70;
    this.y = 110;
    this.h = 60;
    this.w = 70;
    this.movementSpeed = 2;
    

    //añadir paloma
    this.node = document.createElement("img")
    this.node.src="./Images/Paloma.png"
    gameBoxNode.append(this.node)

    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = "absolute" // nos permite ajuste el top y el left y posicionarlo en relación a la caja de juego.
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }

  palomaMovement (direction){
    if (direction === "right"){
      this.x += this.movementSpeed
      this.node.style.left = `${this.x}px`
    }else if (direction === "left") {
      this.x -= this.movementSpeed
      this.node.style.left = `${this.x}px`
    }

  }
}