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
const btnStart = document.querySelector(".controls__start");
const powerCheck = document.querySelector(".controls__power input");
const strictCheck = document.querySelector(".controls__strict input");


//Variables
let tiradas = 0;
let contador = 0;
let simonTiradas = [];
let interval = null;
const sounds = {
    bottomleft: new Audio("../audio/simonSound1.mp3"),
    topright: new Audio("../audio/simonSound2.mp3"),
    topleft: new Audio("../audio/simonSound3.mp3"),
    bottomright: new Audio("../audio/simonSound4.mp3"),
}

//Reseteo de marcador
output.innerHTML = "-";
btnStart.value = "on";


//Funciones
/**
 * 
 * @param {*} e Evento del botón 
 */
const btnPush = (e) => {
    sounds[e.target.dataset.id].currentTime = 0;
    sounds[e.target.dataset.id].play();
    //console.log(e.target.dataset.id) //identificador del botón pulsado
    //console.log(`${memoria.join()}. Contador: ${contador}, tiradas: ${tiradas}`)
    console.log(simonTiradas)

    if (simonTiradas.length > 0) {
        let indice = 0;
        let find = false;
        if (strictCheck.checked) {
            find = (e.target.dataset.id === simonTiradas[indice]) ? true : false;
        }
        else {
            indice = simonTiradas.findIndex(
                (el) => el === e.target.dataset.id
            );
            find = (indice !== -1) ? true : false;
        }


        if (find) {
            simonTiradas.splice(indice, 1);
            output.style.backgroundColor = `rgb(${[61, 58, 70].join()})`;


        } else {
            output.style.backgroundColor = "red";
        }
        if (simonTiradas.length === 0) {
            contador = 0;
            btnStart.value = "on"; //Hasta que el array no llegue a 0 no dejamos que simón vuelva a hablar pulsando de nuevo el botón Start

        }
        output.innerHTML = simonTiradas.length;

    }

}

/**
 * Almacenamos en un array las tiradas de Simón
 */
const simonSay = () => {

    interval = setInterval(
        () => {
            contador++;
            if (interval && contador >= tiradas)
                clearInterval(interval);
            const random = Math.floor(Math.random() * 4);
            targets[random].classList.add("active");
            simonTiradas.push(targets[random].dataset.id);
            setTimeout(
                () => {
                    targets[random].classList.remove("active");
                },
                500
            );
        },
        1000
    );

    generarTiradas();

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
    simonTiradas = [];
    btnStart.value = "on";
}

/**
 * Generamos las tiradas. En este caso de forma aleatoria entre 1 y 5
 */
const generarTiradas = () => {
    tiradas = Math.floor(Math.random() * 5);
    output.innerHTML = tiradas ? tiradas : 1;
}

//Eventos
powerCheck.addEventListener(
    "change",
    () => {
        if (!powerCheck.checked) {
            powerOffSimon()
        }
    }

);

//Botón de comienzo de partida
btnStart.addEventListener(
    "click",
    (e) => {

        if (powerCheck.checked && btnStart.value === "on") {

            simonSay(); //Simón realiza una tirada 
            btnStart.value = "off";//Apagamos el botón hasta que el usuario realice la tirada de manera correcta   
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