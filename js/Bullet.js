class Bullet {
  constructor (x, y){
    this.x = palomaObj.x + 20
    this.y = palomaObj.y + palomaObj.h
    this.h = 45
    this.w = 35
    this.gravitySpeed = 4

     //añadir bullet
     this.node = document.createElement("img")
     this.node.src="./Images/bullet.png"
     gameBoxNode.append(this.node)

      //ajustar dimensiones
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`

    //ajustar posicón
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

  }

 gravity (){
  this.y += this.gravitySpeed
  this.node.style.top = `${this.y}px`

  if ((this.y + this.h) >= gameBoxNode.offsetHeight){
    this.node.remove()
  }
 }

}