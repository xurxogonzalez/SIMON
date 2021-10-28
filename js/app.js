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
const topLeft = document.querySelector(".simon__topleft");
const targets = document.querySelectorAll("[class^=simon__]");
const output = document.querySelector(".controls__output");
const startBnt = document.querySelector(".controls__start");
const powerCheck = document.querySelector(".controls__power input");

let you = 0;
let simon = 0;
let time = 500;
output.innerHTML = "-";


let interval = null;
const limpiar = () => {

    targets.forEach(element => {
        element.classList.remove("active");
    });


}
interval = null;



const keyGame = (e) => {
    if (e.target.classList.contains('active')) {
        output.innerHTML = `${++you}-${simon}`;
    }else{
        output.innerHTML = `${you}-${++simon}`;
    }
    limpiar()

}

/**
 * Juego se inicia
 */

let tiradas = 4;
let contador = 0;
let memoria = [];
const goGame = () => {
    if(interval)
        return;
    interval = setInterval(
        () => {
            
            if(contador>=tiradas)
                clearInterval(interval);
            contador++;
            const random = Math.floor(Math.random() * 4);
            targets[random].classList.add("active");
            //memoria.push(targets[random].)
            setTimeout(
                () => {
                    limpiar();
                },
                time
            );

           

            console.log(`${tiradas}-${contador}`)


            //    topLeft.focus();
            //    topLeft.textContent = "hola";
        },
        time * 2
    );
}

/**
 * Apagamos el juego
 */
const powerOffSimon = () => {
    clearInterval(interval);
    interval = null;
    contador = 0;
    tiradas = 4;
    output.innerHTML = "-";
    you = 0;
    simon = 0;
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

startBnt.addEventListener(
    "click",
    () => {

        if (powerCheck.checked) {
                goGame(); //Si el power está marcado y pulsamos este botón empezamos el juego            
        } 

    }
);

targets.forEach(
    btn => {
        btn.addEventListener(
            "click",
            keyGame
        );
    }
);