
// valores de tablero
// 1 blanco
// -1 negro
// 0 vacio
const valoresTablero = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,-1,1,0,0,0],
    [0,0,0,1,-1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
]

const howMany = (matrix, positionX, positionY) => {

    for (let i = 0; i < matrix[positionY].length; i++){
        try {
            let x = matrix[positionY + i][positionX + i]
        } catch (error) {
            return i-1
        } 
    }  
    return i              
}



const flipTheNeighbors = (indexColumna, indexFila, turno, estadoTablero) => {
    
    
    const flipDiagonals = () => {


        const flipDiagonalRight = ()  =>{


            let howManyAnalyzeHorizontal = estadoTablero[indexFila].length - 1 - indexColumna
            const howManyAnalyzeVertical = indexFila
            let numberTurno = 0
            if (turno) {
                numberTurno = 1
            } else {
                numberTurno = -1
            }
            let banderaDoIt = false;

            
            let analizarHorizontal = indexColumna
            for (let i = howManyAnalyzeVertical-1; i > 0; i-- ) {

                let x = estadoTablero[i][analizarHorizontal +1]
                if (x === numberTurno) {
                    banderaDoIt = true
                } 
                analizarHorizontal++
            }

            // si si hay una ficha de su tipo en la diagonal entonces...
            if (banderaDoIt) {
                const banderaEmpezarCambiar = false
                

 
                

                // de su casilla al tope 
                let y = indexFila-1
                let j = {y:0,x:0}

                for (let i = indexColumna+1; i <= 7; i++ ) {

                    //console.log(estadoTablero[y][i])
                    //console.log(y, i)


                    if (estadoTablero[y][i] === numberTurno) {
                        j = {y: y, x: i}
                    } 

                    y--
                }

                console.log(j)

                y = indexFila - 1

                for (let i = indexColumna+1; i <= estadoTablero[0].length-1; i++ ) {

                    //console.log(estadoTablero[y][i])
                    console.log(y, i)

                    if ((estadoTablero[y][i] != numberTurno) && (y > j.y && i < j.x)) { 
                        estadoTablero[y][i] = numberTurno
                    }

                    y--
                }

                y = 0


            }

        }

        const flipDiagonalLeft = ()  =>{


            let howManyAnalyzeHorizontal = estadoTablero[indexFila].length - 1 - indexColumna
            const howManyAnalyzeVertical = indexFila
            let numberTurno = 0
            if (turno) {
                numberTurno = 1
            } else {
                numberTurno = -1
            }
            let banderaDoIt = false;

            
            let analizarHorizontal = indexColumna
            for (let i = howManyAnalyzeVertical-1; i > 0; i-- ) {

                let x = estadoTablero[i][analizarHorizontal +1]
                if (x === numberTurno) {
                    banderaDoIt = true
                } 
                analizarHorizontal--
            }

            // si si hay una ficha de su tipo en la diagonal entonces...
            if (banderaDoIt) {
                const banderaEmpezarCambiar = false

                // de su casilla al tope 
                let y = indexFila-1
                let j = {y:0,x:0}

                for (let i = indexColumna+1; i >= 0; i-- ) {

                    //console.log(estadoTablero[y][i])
                    //console.log(y, i)


                    if (estadoTablero[y][i] === numberTurno) {
                        j = {y: y, x: i}
                    } 

                    y--
                }

                console.log(j)

                y = indexFila - 1

                for (let i = indexColumna+1; i <= estadoTablero[0].length-1; i++ ) {

                    //console.log(estadoTablero[y][i])
                    console.log(y, i)

                    if ((estadoTablero[y][i] != numberTurno) && (y > j.y && i < j.x)) { 
                        estadoTablero[y][i] = numberTurno
                    }

                    y--
                }

                y = 0


            }

        }

        flipDiagonalRight()
        flipDiagonalLeft()
        

    }

    flipDiagonals()
    






    
}

const changeMatrix = (indexFila, indexColumna, turno, estadoTablero, state) => {

    // posiciones adelante atras, a un lado y al otro de la casilla debe tener una ficha ahi
    const posicion1 = estadoTablero[indexFila+1][indexColumna] !== 0
    const posicion2 = estadoTablero[indexFila-1][indexColumna] !== 0
    const posicion3 = estadoTablero[indexFila][indexColumna+1] !== 0
    const posicion4 = estadoTablero[indexFila][indexColumna-1] !== 0 
    // diagonales tambien
    const posicion5 = estadoTablero[indexFila+1][indexColumna+1] !== 0 
    const posicion6 = estadoTablero[indexFila+1][indexColumna-1] !== 0  
    const posicion7 = estadoTablero[indexFila-1][indexColumna+1] !== 0  
    const posicion8 = estadoTablero[indexFila-1][indexColumna-1] !== 0  
    
    if ( posicion1 || posicion2 || posicion3 || posicion4 || posicion5 || posicion6 || posicion7 || posicion8 )  {

        if (turno) {
            estadoTablero[indexFila][indexColumna] = 1
            state.turno = !state.turno
    
        } else {
            estadoTablero[indexFila][indexColumna] = -1
            state.turno = !state.turno
        }
    
    } 

    flipTheNeighbors(indexColumna, indexFila, turno, estadoTablero)

 

}

const pieza = ( {
    size = 30,
    color
}) => {
    const pieza = document.createElement('div')
    pieza.style.width = `${size}px`
    pieza.style.height = `${size}px`
    pieza.style.borderRadius = `${size / 2}px`
    pieza.style.backgroundColor = color
    pieza.style.display = 'in-line'

    return pieza
}

const casilla = (value, indexFila, indexColumna, turno, estadoTablero, state) => {
    
    
    
    const casilla = document.createElement('div') 
    casilla.style.borderStyle = 'solid'
    casilla.style.borderColor = 'black' 
    casilla.style.minWidth = '30px';
    casilla.style.minHeight = '30px';

    // boton dentro de la casilla
    const botonCasilla = document.createElement('button')
    botonCasilla.style.width = '100%'
    botonCasilla.style.height = '100%'
    botonCasilla.style.backgroundColor = 'green'
    botonCasilla.style.border = '1px solid #51ad51'

    botonCasilla.onclick = () => {

        changeMatrix(indexFila, indexColumna, turno, estadoTablero, state)
        flipTheNeighbors(indexColumna, indexFila, turno, estadoTablero)
        state.cuantosTurnosLLevamos++
        root.innerHTML = '';
        render(root, state);
    


    }

    casilla.appendChild(botonCasilla)

    if (value === 1) {
        casilla.innerHTML =  ''
        casilla.appendChild(pieza({color: 'rgb(255, 255, 255)'}))
    } 
    if (value === -1) {
        casilla.innerHTML =  ''
        casilla.appendChild(pieza({color:'black'}))
    } 
       
    return casilla

}



const render = (mount, state) => {
    const {turno} = state
    const {estadoTablero} = state
    const {cuantosTurnosLLevamos} = state


    const tablero = document.createElement('div')
    const sizeT = 300
    tablero.style.backgroundColor = 'rgb(37, 53, 41)'
    tablero.style.width = `${sizeT}px`
    tablero.style.height = `${sizeT}px`

    // flexbox mode
    tablero.style.display = 'flex'
    tablero.style.flexDirection = 'row'
    tablero.style.justifyContent = 'space-around'
    tablero.style.flexFlow = 'wrap'

    valoresTablero.map((subarray, indexFila) => subarray.map((value, indexColumna) => casilla(value, indexFila, indexColumna, turno, estadoTablero, state)).forEach(element => {
        tablero.appendChild(element)
    }))
    

    
    mount.appendChild(tablero)

};


const root = document.getElementById('root')
const x = root.nodeType

const APP_STATE = {
    turno: true,
    estadoTablero: valoresTablero,
    cuantosTurnosLLevamos: 0,
}
render(root, APP_STATE);

