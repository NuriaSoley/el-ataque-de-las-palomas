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

//FUNCIONES GLOBALES DEL JUEGO
function startGame (){

  // cambiar pantallas
  splasScreenNode.style.display = "none" //ocultar la pantalla principal
  gameScreenNode.style.display = "flex" // que aparezca la pantalla de juego que estava oculta en el CSS

  //añadir elementos
  palomaObj = new Paloma

  // iniciar intervalo
setInterval (() => {

}, Math.round(1000/60))

  // otros intervalos
}

function gameLoop (){

}

//EVENT LISTENERS
startBtnNode.addEventListener("click", startGame)
gameBoxNode.addEventListener("keydown", (event)=>{
  if (event.key === "d"){
    palomaMovement ("right")
  }else if (event.key === "a"){
    palomaMovement ("left")
  }
})