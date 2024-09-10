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
let frecuenciaObjetivos = 2000
let bulletArray = []

//FUNCIONES GLOBALES DEL JUEGO
function startGame (){

  // cambiar pantallas
  splasScreenNode.style.display = "none" //ocultar la pantalla principal
  gameScreenNode.style.display = "flex" // que aparezca la pantalla de juego que estava oculta en el CSS


  //añadir elementos
  palomaObj = new Paloma
  
  


  // iniciar intervalo
setInterval (() => {
  gameLoop ()
}, Math.round(1000/60))


  // otros intervalos
  setInterval (()=>{
    addObjetivo()
  }, frecuenciaObjetivos)
}


function gameLoop (){//la que se ejecuta 60 vesces por segundo en el intervalo principal
 
  palomaObj.palomaMovement()

  objetivosArray.forEach ((eachObjetivo) => {
    eachObjetivo.objetivoAutomaticMovement ()
  })

  objetivoRandom ()

  detectarSiObjetivoSalio()

  bulletArray.forEach((eachBullet) =>{
    eachBullet.gravity()
  })
  detectarColisionBulletConObjetivos()
 }


function addObjetivo (){

  let newObjetivoMini = new Objetivo (490, "mini", 150, 90, 5)// se crea dentro de la función para añadirlo al array, pero no la necesitamos fuera
  objetivosArray.push(newObjetivoMini)
  
  let newObjetivoKid = new Objetivo (420, "kid", 45, 95, 1.5)
  objetivosArray.push(newObjetivoKid)

  let newObjetivoGrandma = new Objetivo (410, "grandma", 150, 90, 1)
  objetivosArray.push(newObjetivoGrandma)

  let newObjetivoBike = new Objetivo (440, "bike", 100, 90, 3)
  objetivosArray.push(newObjetivoBike)

  let newObjetivoConvertible = new Objetivo (520, "convertible", 150, 75, 5)
  objetivosArray.push(newObjetivoConvertible)
  
  console.log(objetivosArray)
}


function objetivoRandom (){
  let intervalObjetivos = setInterval (()=>{
    if (objetivosArray.length === 0){
      addObjetivo() // si el array esta vacio, añade uno
    }
    let randomIndex = Math.floor (Math.random()*(objetivosArray.length))
    let randomObjetivo = objetivosArray[randomIndex]
    return randomObjetivo
  }, 1000)
}

function detectarSiObjetivoSalio (){
  
   if (objetivosArray.length === 0){ //al inicio del juego el array esta vacio, el metodo .shift no tiene nada para quitar por eso debemos hacer la clausula de guardia antes
    return // no ejecuta la funcion
  }
  
  if ((objetivosArray[0].x + objetivosArray[0].w) <= 0){ //si el 1r objetivo del array sale del canvas (su posición X es menor o igual a 0), quitalo. Se suma w a la x para que tenga en cuenta el momento en el que el lado derecho del objetivo sale
    objetivosArray[0].node.remove()
    objetivosArray.shift()
  }
} 

function detectarColisionBulletConObjetivos(){
  //bullet => bulletArray.forEach para tener cada bullet
  //cada uno de los objetivos => objetivosArray.forEach para tener cada objetivo
  bulletArray.forEach ((eachBullet) => {
    objetivosArray.forEach((eachObjetivo)=>{
      if (
        eachObjetivo.x < eachBullet.x + eachBullet.w &&
        eachObjetivo.x + eachObjetivo.w > eachBullet.x &&
        eachObjetivo.y < eachBullet.y + eachBullet.h &&
        eachObjetivo.y + eachObjetivo.h > eachBullet.y
          ) {
        // Collision detected!
        console.log("hit!")
        }
      })  
  })
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
  }
})