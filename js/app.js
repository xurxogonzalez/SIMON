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
let time = 1000;
output.innerHTML = "-";


let interval = null;
const limpiar = () => {

    targets.forEach(element => {
        element.classList.remove("active");
    });


}
interval = null;

const game = () => {

    interval = setInterval(
        () => {


            const random = Math.floor(Math.random() * 4);
            targets[random].classList.add("active");
            setTimeout(
                () => {
                    limpiar();
                },
                time
            );


            //    topLeft.focus();
            //    topLeft.textContent = "hola";
        },
        time * 2
    );
}

const keyGame = (e) => {
    if (e.target.classList.contains('active')) {
        output.innerHTML = `${++you}-${simon}`;
    }else{
        output.innerHTML = `${you}-${++simon}`;
    }
    limpiar()

}

const powerOfSimon = () => {
    clearInterval(interval);
    interval = null;
    output.innerHTML = "-";
    you = 0;
    simon = 0;
}

//Eventos
powerCheck.addEventListener(
    "change",
    () => {
        if(!powerCheck.checked){
            powerOfSimon()
        }
    }

);

startBnt.addEventListener(
    "click",
    () => {

        if (powerCheck.checked) {
            if(!interval)
                game();
            console.log(interval);
            
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