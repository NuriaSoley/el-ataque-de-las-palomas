//ELEMENTOS PRINCIPALES DEL DOM
//pantallas
const splasScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

//botones
const startBtnNode = document.querySelector("#start-btn")

//game box
const gameBoxNode = document.querySelector("#game-box")


//VARIABLES GLOBALES DEL JUEGO
let palomaObj = null
let objetivosArray = []
let frecuenciaObjetivos = 1500
let bulletArray = []
let gameIntervalId = null
let objetivosIntervalId = null

//FUNCIONES GLOBALES DEL JUEGO
function startGame (){

  // cambiar pantallas
  splasScreenNode.style.display = "none" //ocultar la pantalla principal
  gameScreenNode.style.display = "flex" // que aparezca la pantalla de juego que estava oculta en el CSS


  //añadir elementos
  palomaObj = new Paloma
  
  
  // iniciar intervalo
gameIntervalId = setInterval (() => {
  gameLoop ()
}, Math.round(1000/60))


  // otros intervalos
objetivosIntervalId = setInterval (()=>{
    crearObjetivo()
    getRandomObjetivo()
  }, frecuenciaObjetivos)
}

function gameLoop (){//la que se ejecuta 60 vesces por segundo en el intervalo principal
 
  palomaObj.palomaMovement()

  objetivosArray.forEach ((eachObjetivo) => {
    eachObjetivo.objetivoAutomaticMovement ()
  })

    detectarSiObjetivoSalio()

  bulletArray.forEach((eachBullet) =>{
    eachBullet.gravity()
  })
  detectarColisions()
 }

function crearObjetivo(){
  let numero = Math.floor(Math.random() * 6)

  if (numero === 0){
  let newObjetivoMini = new Objetivo (gameBoxNode.offsetWidth, 670, "mini", 150, 90, 5, "left")// se crea dentro de la función para añadirlo al array, pero no la necesitamos fuera
  objetivosArray.push(newObjetivoMini)
  }
  
  if (numero === 1){
  let newObjetivoKid = new Objetivo (gameBoxNode.offsetWidth, 615, "kid", 30, 50, 1.5, "left")
  objetivosArray.push(newObjetivoKid)
  }

  if (numero === 2){
  let newObjetivoGrandma = new Objetivo (gameBoxNode.offsetWidth, 570, "grandma", 90, 90, 1, "left")
  objetivosArray.push(newObjetivoGrandma)
  }

  if (numero === 3){
  let newObjetivoBike = new Objetivo (gameBoxNode.offsetWidth, 595, "bike", 100, 90, 3, "left")
  objetivosArray.push(newObjetivoBike)
  }

  if (numero === 4){
  let newObjetivoConvertible = new Objetivo (gameBoxNode.offsetWidth, 720, "convertible", 150, 75, 5, "left")
  objetivosArray.push(newObjetivoConvertible)
  }

  if (numero === 5){
    let newObjetivoCat = new Objetivo (0, 220, "cat", 65, 60, 5, "right")
    objetivosArray.push(newObjetivoCat)
    }
  
  console.log(objetivosArray)
}

function getRandomObjetivo (){
  const randomIndex = Math.floor (Math.random()*(objetivosArray.length))
  return objetivosArray[randomIndex]
}

function addObjetivo (){
  getRandomObjetivo()
  
}


function detectarSiObjetivoSalio (){
  
   if (objetivosArray.length === 0){ //al inicio del juego el array esta vacio, el metodo .shift no tiene nada para quitar por eso debemos hacer la clausula de guardia antes
    return // no ejecuta la funcion
  }
  
  if (objetivosArray[0].x <= 0|| objetivosArray[0].x >= gameBoxNode.offsetWidth){ //si el 1r objetivo del array sale del canvas (su posición X es menor o igual a 0), quitalo. Se suma w a la x para que tenga en cuenta el momento en el que el lado derecho del objetivo sale
    objetivosArray[0].node.remove()
    objetivosArray.shift()
  } 
}

function detectarColisions(){
  //* colision entre bala y objetivos
  //bullet => bulletArray.forEach para tener cada bullet
  //cada uno de los objetivos => objetivosArray.forEach para tener cada objetivo
  bulletArray.forEach ((eachBullet) => {
    objetivosArray.forEach((eachObjetivo)=>{
      if (
        eachObjetivo.x < eachBullet.x + eachBullet.w &&
        eachObjetivo.x + eachObjetivo.w > eachBullet.x &&
        eachObjetivo.y < eachBullet.y + eachBullet.h &&
        eachObjetivo.y + eachObjetivo.h > eachBullet.y
        ){
          //console.log("hit")
          if (eachObjetivo.node){
              eachObjetivo.node.remove()
              objetivosArray.splice(objetivosArray.indexOf(eachObjetivo), 1)
              //console.log("desaparece objetivo")

            }
          if (eachBullet.node){
            eachBullet.node.remove()
            bulletArray.splice(bulletArray.indexOf(eachBullet), 1)
            //console.log("desaparece bala")
          }
         }
      })
  })

  //*colision entre paloma y gato
 objetivosArray.forEach ((eachObjetivo) => {
    if (
      palomaObj.x < eachObjetivo.x + eachObjetivo.w &&
      palomaObj.x + palomaObj.w > eachObjetivo.x &&
      palomaObj.y < eachObjetivo.y + eachObjetivo.h &&
      palomaObj.y + palomaObj.h > eachObjetivo.y
    ) {
      // Collision detected!
      // console.log("El gato se came la paloma!")
      gameOver ()
    }
  })
}

function gameOver (){
  clearInterval (gameIntervalId)
  clearInterval (objetivosIntervalId)
  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display = "flex"
}

//EVENT LISTENERS
startBtnNode.addEventListener("click", startGame)
window.addEventListener("keydown", (event) => {//window porque no tiene nada que ver con la pantalla
  if (event.key === "d"){
    palomaObj.palomaMovement ("right") // la función está dentro del obj Paloma, por lo que tengo que pedirle que me busque la propiedad función
  }else if (event.key === "a"){
    palomaObj.palomaMovement ("left")
  }else if (event.key === "s"){
    const newBullet = palomaObj.shoot()
    bulletArray.push (newBullet)
  }else if (event.key === "w"){
    palomaObj.jump()
    palomaObj.gravity()
  }
})