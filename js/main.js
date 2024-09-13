//ELEMENTOS PRINCIPALES DEL DOM
//pantallas
const splasScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")
const inputNameNode = document.querySelector("#name")//nodo para el input donde el jugador introduce el nombre
const scoreDisplayNode = document.querySelector("#scoreDisplay")
const scoreListStart = document.querySelector("#popularity-list-start")
const scoreListEnd = document.querySelector("#popularity-list-end")

//botones
const startBtnNode = document.querySelector("#start-btn")
const restartBtnNode = document.querySelector("#restart-btn")
const menuBtnNode = document.querySelector("#menu-btn")
const musicBtnNode = document.querySelector("#music-on")
const muteBtnNode = document.querySelector("#music-off")

//game box
const gameBoxNode = document.querySelector("#game-box")



//VARIABLES GLOBALES DEL JUEGO
let palomaObj = null
let objetivosArray = []
let frecuenciaObjetivos = 1500
let bulletArray = []
let gameIntervalId = null
let objetivosIntervalId = null
let score = 0
let playerName = ""


//AUDIO
let gameAmbientSound = new Audio ("./audio/city-street.mp3")
gameAmbientSound.loop = true
gameAmbientSound.volume = 0.1
let splashSound = new Audio ("./audio/wet-splat.mp3")
splashSound.volume = 0.1
let catSound = new Audio ("./audio/angry-cat.mp3")
catSound.volume = 0.2
let wingsSound = new Audio ("./audio/wing-flaps.wav")
wingsSound.volume = 0.1
let pigeonSound = new Audio ("./audio/pigeon-coo.mp3")
pigeonSound.loop = true
pigeonSound.volume = 0.2
let gameMusic = new Audio ("./audio/Bossfight-Flirt_Flirt_Oh_It_hurts.mp3")
gameMusic.loop = false
gameMusic.volume = 0.04

gameMusic.play()
showScoresStart()

//FUNCIONES GLOBALES DEL JUEGO
function startGame (){

  // cambiar pantallas
  splasScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex" 

  gameAmbientSound.play()
  pigeonSound.play()
  musicBtnNode.disabled = true
  
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

function gameLoop (){
 
  palomaObj.palomaMovement()

  objetivosArray.forEach ((eachObjetivo) => {
    eachObjetivo.objetivoAutomaticMovement ()
  })

    detectarSiObjetivoSalio()

  bulletArray.forEach((eachBullet) =>{
    eachBullet.gravity()
  })
  detectarColisions()

  palomaObj.gravity()
  
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
          splashSound.play()
          if (eachObjetivo.type === "grandma"){
            score += 1
            updateScore()
          }else if (eachObjetivo.type === "kid"){
            score += 2
            updateScore()
          }else if (eachObjetivo.type === "bike"){
            score += 3
            updateScore()
          }else if (eachObjetivo.type === "mini"){
            score += 4
            updateScore()
          }else if (eachObjetivo.type === "convertible"){
            score += 5
            updateScore()
          }
          
          if (eachObjetivo.node){
              eachObjetivo.node.remove()
              objetivosArray.splice(objetivosArray.indexOf(eachObjetivo), 1)
            }
          if (eachBullet.node){
            eachBullet.node.remove()
            bulletArray.splice(bulletArray.indexOf(eachBullet), 1)
          }
         }
      })
  })

  function updateScore(){
    scoreDisplayNode.innerText = `Points: ${score}`
   }

  //*colision entre paloma y gato
 objetivosArray.forEach ((eachObjetivo) => {
    if (
      palomaObj.x < eachObjetivo.x + eachObjetivo.w &&
      palomaObj.x + palomaObj.w > eachObjetivo.x &&
      palomaObj.y < eachObjetivo.y + eachObjetivo.h &&
      palomaObj.y + palomaObj.h > eachObjetivo.y
    ) {
      // Collision detected!
      catSound.play()
      gameOver ()
    }
  })
}

function gameOver (){
  clearInterval (gameIntervalId)
  clearInterval (objetivosIntervalId)
  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display = "flex"
  gameAmbientSound.pause()
  pigeonSound.pause()
  gameMusic.pause()
  gameAmbientSound.currentTime = 0
  pigeonSound.currentTime = 0
  gameMusic.currentTime = 0
  showScoresEnd()
}

function restartGame (){
  
  gameOverScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"
  gameBoxNode.innerHTML = ""
  palomaObj = null
  objetivosArray = []
  bulletArray= []
  gameIntervalId = null
  objetivosIntervalId = null
  score = 0
  scoreDisplayNode.innerText = `Points ${score}`
  startGame()
}

function backToMenu (){
  gameOverScreenNode.style.display = "none"
  splasScreenNode.style.display = "flex"
  gameBoxNode.innerHTML = ""
  palomaObj = null
  objetivosArray = []
  bulletArray= []
  gameIntervalId = null
  objetivosIntervalId = null
  score = 0
  scoreDisplayNode.innerText = `Points ${score}`
  gameMusic.currentTime = 0
}

function stopMusic(){
  gameMusic.pause()
}

function getPlayerName (){ //para guardar el nombre que el jugador escribe en pantalla inicio
  let inputName = inputNameNode.value.trim()
  if (inputName.length === 0){
    playerName = "Pigeon"
    inputNameNode.value = "Pigeon"
  }else{
    playerName = inputName
  }
}


//!funciones para el localStorage
function storeScoreStart(name, score) {
  const newScore = { name, score };

  let scores = JSON.parse(localStorage.getItem('scores')) || [];
  scores.push(newScore);
  localStorage.setItem('scores', JSON.stringify(scores));
}

function showScoresStart() {
  // Limpiar la lista de puntuaciones anterior
  scoreListStart.innerHTML = ''; 

  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  scores.sort((a, b) => b.score - a.score);

  const bestScores = scores.slice(0, 5);

  bestScores.forEach(score => {
    const li = document.createElement('li');
    li.textContent = `${score.name} - ${score.score} points`;
    scoreListStart.appendChild(li);
  });
}

function storeScoreEnd(name, score) {
  const newScore = { name, score };

  let scores = JSON.parse(localStorage.getItem('scores')) || [];
  scores.push(newScore);
  localStorage.setItem('scores', JSON.stringify(scores));
}

function showScoresEnd() {
  // Limpiar la lista de puntuaciones anterior
  scoreListEnd.innerHTML = ''; 

  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  scores.sort((a, b) => b.score - a.score);

  const bestScores = scores.slice(0, 5);

  bestScores.forEach(score => {
    const li = document.createElement('li');
    li.textContent = `${score.name} - ${score.score} points`;
    scoreListEnd.appendChild(li);
  });
}

//EVENT LISTENERS
startBtnNode.addEventListener("click", startGame)

restartBtnNode.addEventListener("click", restartGame)

menuBtnNode.addEventListener("click", backToMenu)

musicBtnNode.addEventListener("click", ()=>{
  gameMusic.play()
  musicBtnNode.disabled = true
  muteBtnNode.disabled = false
})

muteBtnNode.addEventListener("click", ()=>{
  gameMusic.pause()
  musicBtnNode.disabled = false
  muteBtnNode.disables = true
})

window.addEventListener("keydown", (event) => {//window porque no tiene nada que ver con la pantalla
  if (event.key === "d"){
    palomaObj.palomaMovement ("right") // la función está dentro del obj Paloma, por lo que tengo que pedirle que me busque la propiedad función
  }else if (event.key === "a"){
    palomaObj.palomaMovement ("left")
  }else if (event.key === "s"){
    const newBullet = palomaObj.shoot()
    if (newBullet){
    bulletArray.push (newBullet)
    }
  }else if (event.key === "w"){
    wingsSound.play()
    palomaObj.jump()
  }
})

