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
  detectarColisionBulletConObjetivos()
 }

function crearObjetivo(){
  let numero = Math.floor(Math.random() * 5)

  if (numero === 0){
  let newObjetivoMini = new Objetivo (490, "mini", 150, 90, 5)// se crea dentro de la función para añadirlo al array, pero no la necesitamos fuera
  objetivosArray.push(newObjetivoMini)
  }
  
  if (numero === 1){
  let newObjetivoKid = new Objetivo (415, "kid", 45, 95, 1.5)
  objetivosArray.push(newObjetivoKid)
  }

  if (numero === 2){
  let newObjetivoGrandma = new Objetivo (410, "grandma", 150, 90, 1)
  objetivosArray.push(newObjetivoGrandma)
  }

  if (numero === 3){
  let newObjetivoBike = new Objetivo (440, "bike", 100, 90, 3)
  objetivosArray.push(newObjetivoBike)
  }

  if (numero === 4){
  let newObjetivoConvertible = new Objetivo (520, "convertible", 150, 75, 5)
  objetivosArray.push(newObjetivoConvertible)
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