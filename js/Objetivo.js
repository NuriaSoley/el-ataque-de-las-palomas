class Objetivo {
  constructor (posiitionY, type, w, h, speed){
    this.x = gameBoxNode.offsetWidth
    this.y = posiitionY
    this.w = w
    this.h = h
    this.speed = speed

    //crear el objetivo
    this.node = document.createElement("img")
    if (type === "mini"){
      this.node.src="./Images/Mini.png"
    }else if(type === "convertible"){
      this.node.src="./Images/convertible.png"
    }else if(type === "bike"){
      this.node.src="./Images/bike.png"
    }else if(type === "kid"){
      this.node.src="./Images/Kid.png"
    }else if(type === "grandma"){
      this.node.src="./Images/grandma.png"
    }
    gameBoxNode.append(this.node)

    //ajustar dimensiones
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`

    //ajustar posición
    this.node.style.position = "absolute" 
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

  }

  objetivoAutomaticMovement (){
    this.x -= this.speed
    this.node.style.left = `${this.x}px`
  }
}