"use strict";
/**
    querySelector()
    addEventListener()
    setInterval()
    clearInterval()
    setTimeout()
    play()
    Math.floor()
    Math.random()
*/

//Nodos
const topLeft = document.querySelector(".simon__topleft");
const targets = document.querySelectorAll("[class^=simon__]");
const output = document.querySelector(".controls__output");
const startBnt = document.querySelector(".controls__start");
const powerCheck = document.querySelector(".controls__power input");


//Variables
let you = 0;
let simon = 0;
let tiradas = 0;
let contador = 0;
let memoria = [];
let sw = false; 
let interval = null;
const sounds = {
    bottomleft: new Audio("../audio/simonSound1.mp3"),
    topright: new Audio("../audio/simonSound2.mp3"),
    topleft: new Audio("../audio/simonSound3.mp3"),
    bottomright: new Audio ("../audio/simonSound4.mp3"),
}

//Reseteo de marcador
output.innerHTML = "-";


//Funciones
/**
 * 
 * @param {*} e Evento del botón 
 */
const btnPush = (e) => {
    sounds[e.target.dataset.id].currentTime=0;
    sounds[e.target.dataset.id].play();
    //console.log(e.target.dataset.id) //identificador del botón pulsado
    //console.log(`${memoria.join()}. Contador: ${contador}, tiradas: ${tiradas}`)
    console.log(memoria)
    if(memoria.length>0){
        let indice = memoria.findIndex(
            (el) => el===e.target.dataset.id
        );
        if(indice!==-1)
            memoria.splice(indice,1);
        if(memoria.length===0){
            contador = 0;
            setTimeout(
                () => {
                    simonSay();
                },
                1000
            );
            
        }
    }  
}

/**
 * Mecanimos para realizar la serie de tiradas
 */
const simonSay = () => {
   
    interval = setInterval(
        () => {    
            contador++;
            if(interval && contador>=tiradas)
                clearInterval(interval);
            const random = Math.floor(Math.random() * 4);
            targets[random].classList.add("active");
            memoria.push(targets[random].dataset.id);
            setTimeout(
                () => {
                    targets[random].classList.remove("active");
                },
                500
            );
        },
        1000
    );

    aumentarTiradas();
    
}



const startGame = () => {
    if(sw)
        return;
    //console.log("go")
    
    simonSay();
    sw = true;
   
}

/**
 * Apagamos el juego
 */
const powerOffSimon = () => {
    clearInterval(interval);
    interval = null;
    contador = 0;
    tiradas = 0;
    output.innerHTML = "-";
    memoria = [];
    you = 0;
    simon = 0;
    sw = false;
}

/**
 * Aumentar las tiradas
 */
const aumentarTiradas = () => {
    tiradas = Math.floor(Math.random()*5);
}

//Eventos
powerCheck.addEventListener(
    "change",
    () => {
        if(!powerCheck.checked){
            powerOffSimon()
        }
    }

);

//Botón de comienzo de partida
startBnt.addEventListener(
    "click",
    () => {

        if (powerCheck.checked) {
                startGame(); //Si el power está marcado y pulsamos este botón empezamos el juego       
        } 

    }
);

//Botones que dispone el usuario para poder imitar la serie de Simón
targets.forEach(
    btn => {
        btn.addEventListener(
            "click",
            btnPush
        );
    }
);