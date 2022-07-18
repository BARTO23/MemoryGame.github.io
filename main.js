//inicializacion de variables
let tarjetasDestapadas = 0
let tarjeta1 = null
let tarjeta2 = null
let primerResultado = null
let segundoResultado = null
let movimientos = 0
let aciertos = 0
let temporizador = false
let timer = 30
let timerInicial = 30
let tiempoRegresivoId = null

//apuntando a documento html
let mostrarMovimientos = document.getElementById('movimientos')
let mostrarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('t-Restante')

//variables de audio
let winAudio = new Audio('./sonidos/win.wav')
let loseAudio = new Audio('./sonidos/lose.wav')
let clickAudio = new Audio('./click.wav')
let rightAudio = new Audio('./sonidos/right.wav')
let wrongAudio = new Audio('./sonidos/wrong.wav')

//1.Generar un arreglo de numeros aleatorios
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]//arreglo de elementos desordenados

//desordenar el arreglo usando .sort
numbers = numbers.sort(() => {return Math.random() -0.5})
console.log(numbers)

//funciones
function contarTiempo(){
   tiempoRegresivoId = setInterval(()=>{
        timer--
        mostrarTiempo.innerHTML = `Tiempo ${timer} segundos`
        if(timer == 0){
            clearInterval(tiempoRegresivoId)
            bloquearTarjetas()
            loseAudio.play()
        }
    },1000)
}

function bloquearTarjetas(){
    for(let i = 0; i <= 15; i++ ){
        let tarjetaBloqueada = document.getElementById(i)
        tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numbers[i]}.png" alt="">`
        tarjetaBloqueada.disabled = true
    }
}

//2. Esperar boton precionado

//Funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo()
        temporizador = true
    }

    tarjetasDestapadas++
    console.log(tarjetasDestapadas)

    if(tarjetasDestapadas == 1){
        //Mostrar el primer numero
        tarjeta1 = document.getElementById(id)
        primerResultado = numbers[id]
        tarjeta1.innerHTML = `<img src="./imagenes/${primerResultado}.png" alt="">`
        clickAudio.play()

        //Deshabilitar el pirmer boton
        tarjeta1.disabled = true
        
    }else if(tarjetasDestapadas == 2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id)
        segundoResultado = numbers[id]
        tarjeta2.innerHTML = `<img src="./imagenes/${segundoResultado}.png" alt="">`
        clickAudio.play()

        //deshabilitar segundo boton
        tarjeta2.disabled = true

        //incrementar movimientos
        movimientos++
        mostrarMovimientos.innerHTML = `Movimientos ${movimientos}`

        if(primerResultado == segundoResultado){
            //Resetear contador de tarjetas destapadas
            tarjetasDestapadas = 0;
    
            //Aumentar aciertos
            aciertos++
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`
            rightAudio.play()

            if(aciertos == 8){
                winAudio.play()
                clearInterval(tiempoRegresivoId)
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`
                mostrarTiempo.innerHTML = `Fantastico! 🎉 Solo demoraste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos ${movimientos}😎🤘`
            }
    
        }else{
            wrongAudio.play()
            //Mostrar momentaneamente los valores
            setTimeout(() => {
                tarjeta1.innerHTML = ''
                tarjeta2.innerHTML = ''
                tarjeta1.disabled = false
                tarjeta2.disabled = false
                tarjetasDestapadas = 0
            }, 300);
        }
    }
}