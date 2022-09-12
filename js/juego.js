/*Valores por defecto para iniciar el juego*/
let juegoIniciado = false;
const artInicio = document.getElementById("inicio");
const artJuego = document.getElementById("juego");
const artAgregarPalabra = document.getElementById("agregarPalabra");
let listaDePalabras = ["ABRAZO","JAULA","MERMELADA","NARANJA","BOMBERO","AYUDANTE","ALFAJOR","COMPAÑERO","DINOSAURIO","MIERCOLES","CALABAZA","DIVERTIRSE","CARAMELO","JUNTAR","MELODIA","HELICOPTERO"];
const letrasUtilizadas = document.querySelector(".letras-utilizadas");
let listaDeLetrasUsadas = [];
let errores = 0;
let palabraCompleta = 0;
let areaDePalabra = document.querySelector(".areaDePalabra");
let canvas = document.querySelector("canvas");
let puntero = canvas.getContext("2d");

/* Recuadros de aviso */
const ganaste = document.querySelector(".ganaste");
const perdiste = document.querySelector(".perdiste");

/* Funcion del juego */
function inicioDelJuego(){

    volverValoresPorDefecto()
 
    sortearPalabra()

    ponerGuionesBajos()

    if(juegoIniciado){
        return;
    }

    /*Logica del Juego*/
    document.addEventListener("keydown", function(e){
        /*Obtiene la letra desde el teclado*/
        let teclaPresionada = e.key.toUpperCase();

        /*Verifica que la palabra aun no es descubierta && errores sea menor que 10 */
        if((errores < 10) && (palabraCompleta < palabraEnJuego.length) && teclaPresionada.length < 2){
            let utilizada = false;
            let letraCorrecta = false;

            /*Corrobora que la letra que presiono es valida*/
            const caracteresValidos = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
            for(let i = 0; i < caracteresValidos.length; i++){
                if(caracteresValidos[i] === teclaPresionada){

                    /*Verifica que la letra aun no se haya utilizado*/
                    for(let i = 0; i < listaDeLetrasUsadas.length; i++){
                        if(listaDeLetrasUsadas[i] === teclaPresionada){
                            utilizada = true;
                        }
                    }

                    /*Añade a la lista de letras usadas y la pinta en pantalla*/
                    if(!utilizada){
                        listaDeLetrasUsadas.push(teclaPresionada);
                    }

                    /*Si la letra pulsada esta , se pinta en su guion*/
                    for(let i = 0; i < palabraEnJuego.length; i++){
                        if(teclaPresionada === palabraEnJuego[i] && !utilizada){
                            const posicion = document.getElementById(`linea${i}`);
                            posicion.innerHTML = teclaPresionada;
                            letraCorrecta = true;
                            palabraCompleta ++;
                        }    
                    }

                    /*Si la letra presionada no esta en la palabra se incremeta el fallo y pinta una parte del muñeco*/
                    if(!letraCorrecta && !utilizada){
                        letrasUtilizadas.innerHTML += `<span class="utilizada">${teclaPresionada}</span>`;
                        errores ++;
                        switch (errores) {
                            case 1:
                                console.log("la-1");
                                // parte-1
                                puntero.moveTo(340, 290);
                                puntero.lineTo(50, 290);
                                puntero.stroke();
                                break;
                            case 2:
                                console.log("la-2");
                                // parte-2
                                puntero.moveTo(100, 290);
                                puntero.lineTo(100, 20);
                                puntero.stroke();
                                break;
                            case 3:
                                console.log("la-3");
                                // parte-3
                                puntero.moveTo(96, 20);
                                puntero.lineTo(280, 20);
                                puntero.stroke();
                                break;
                            case 4:
                                console.log("la-4");
                                // parte-4
                                puntero.moveTo(276, 20);
                                puntero.lineTo(276, 70);
                                puntero.stroke();
                                break;
                            case 5:
                                console.log("la-5");
                                // parte-5
                                puntero.moveTo(303,100);
                                puntero.arc(277, 100, 30, 0, 2 * 3.14);
                                puntero.stroke();
                                break;
                            case 6:
                                console.log("la-6");
                                // parte-6
                                puntero.moveTo(276, 130);
                                puntero.lineTo(276, 200);
                                puntero.stroke();
                                break;
                            case 7:
                                console.log("la-7");
                                // parte-7
                                puntero.moveTo(276, 130);
                                puntero.lineTo(246, 175);
                                puntero.stroke();
                                break;
                            case 8:
                                console.log("la-8");
                                // parte-8
                                puntero.moveTo(276, 130);
                                puntero.lineTo(306, 175);
                                puntero.stroke();
                                break;
                            case 9:
                                console.log("la-9");
                                // parte-9
                                puntero.moveTo(276, 198);
                                puntero.lineTo(250, 250);
                                puntero.stroke();
                                break;
                        }
                    }
                }
            }
        }

        /*En caso de perder se restablece el juego*/
        if(errores === 10){
            console.log("la-10");
            // muñeco-10
            puntero.moveTo(276, 198);
            puntero.lineTo(300, 250);
            puntero.stroke();
            perdiste.style.display = "flex"
            const mostrarPalabra = document.querySelector(".mostrarPalabra");
            mostrarPalabra.innerHTML = palabraEnJuego;
        }

        /*En caso de ganar se restablece el juego*/
        if(palabraCompleta === palabraEnJuego.length){
            ganaste.style.display = "flex";
            palabraCompleta++;
        }  
    });
};

/*Restablece los valores por defecto para iniciar el juego*/
function volverValoresPorDefecto(){
    letrasUtilizadas.innerHTML = "";
    listaDeLetrasUsadas = [];
    errores = 0;
    palabraCompleta = 0;
    puntero.lineWidth = 8;
    puntero.strokeStyle = "#082d5b"
    puntero.clearRect ( 0 , 0 , 600 , 400 );
   }

/*Sortea la palabra a ser descubierta*/
function sortearPalabra(){
    let sortear = () => listaDePalabras[Math.floor(Math.random() * listaDePalabras.length)];
    palabraEnJuego = sortear();
}

/*Pone los guiones para la palabra secreta*/
function ponerGuionesBajos(){
    areaDePalabra.innerHTML = "";
    for(let i = 0; i < palabraEnJuego.length; i++){
        areaDePalabra.innerHTML += `<span id='linea${i}' class='linea'></span>`;
    }
}

//Botones
const btnIniciarJuego = document.getElementById("btn-iniciarJuego").addEventListener("click", function(){
    inicioDelJuego();
    juegoIniciado = true;
    artJuego.style.display = "flex";
    artInicio.style.display = "none";
});

const btnCambiarPalabra = document.getElementById("btn-cambiarPalabra").addEventListener("click", function(){
    juegoIniciado = true;
    inicioDelJuego();
});

const btnRendirse = document.getElementById("btn-rendirse").addEventListener("click", function(){
    artJuego.style.display = "none";
    artAgregarPalabra.style.display = "none";
    artInicio.style.display = "flex";
});

const btnAgregarPalabra = document.getElementById("btn-agregarPalabra").addEventListener("click", function(){
    artAgregarPalabra.style.display = "flex";
    artInicio.style.display = "none";
});

const btnOkPerdiste = document.querySelector(".btn-ok-perdiste").addEventListener("click", function(){
    perdiste.style.display = "none";
});

const btnOkGanaste = document.querySelector(".btn-ok-ganaste").addEventListener("click", function(){
    ganaste.style.display = "none";
});

/* Agrega una palabra*/
let textAgregarPalabra = document.querySelector("#txtAgregar");
const agregada = document.querySelector(".agregada");
const existe = document.querySelector(".existe");
let alerta = document.querySelector(".alerta");

let btnAgregar = document.querySelector("#btn-agregar").addEventListener("click", function(event){
    event.preventDefault()

    let yaExiste = false;
    let palabraDigitada = textAgregarPalabra.value.toUpperCase();
    let contieneEspacios = palabraDigitada.indexOf(" ");
        
    for(let palabra of listaDePalabras){
        if(palabraDigitada === palabra){
            yaExiste = true;
        }
    }

    if(yaExiste){
        existe.style.display = "flex";
    }
    else if((textAgregarPalabra.value.length > 0) && (palabraDigitada.length <= 12) && (contieneEspacios === -1)){
        listaDePalabras.push(palabraDigitada);
        alerta.style.color = "#495057"
        alerta.style.fontSize = "15px"
        agregada.style.display = "flex";
        textAgregarPalabra.value = ""; 
    }
    else{
        alerta.style.color = "red"
        alerta.style.fontSize = "20px"
    }

});

const btnOkAgregada = document.querySelector(".btn-ok-agregada").addEventListener("click", function(){
    agregada.style.display = "none";
});

const btnOkExiste = document.querySelector(".btn-ok-existe").addEventListener("click", function(){
    existe.style.display = "none";
});

let btnCancelar = document.querySelector("#btn-cancelar").addEventListener("click", function(event){
    event.preventDefault();
    artJuego.style.display = "none";
    artAgregarPalabra.style.display = "none";
    artInicio.style.display = "flex";
});