import { JuegoDados } from './JuegoDados';

// Inicialización y control del juego
document.addEventListener('DOMContentLoaded', () => {
    // Referencias DOM con tipos correctos
    const setupDiv = document.getElementById('setup') as HTMLDivElement;
    const gameDiv = document.getElementById('game-board') as HTMLDivElement;
    const player1Input = document.getElementById('player1') as HTMLInputElement;
    const player2Input = document.getElementById('player2') as HTMLInputElement;
    const startButton = document.getElementById('start-game') as HTMLButtonElement;
    const nextMoveButton = document.getElementById('next-move') as HTMLButtonElement;
    const resetButton = document.getElementById('reset-game') as HTMLButtonElement;
    const gameLog = document.getElementById('game-log') as HTMLDivElement;
    const player1NameDisplay = document.getElementById('player1-name') as HTMLDivElement;
    const player2NameDisplay = document.getElementById('player2-name') as HTMLDivElement;
    const player1ScoreDisplay = document.getElementById('player1-score') as HTMLDivElement;
    const player2ScoreDisplay = document.getElementById('player2-score') as HTMLDivElement;
    const dice1Display = document.getElementById('dice1') as HTMLDivElement;
    const dice2Display = document.getElementById('dice2') as HTMLDivElement;
    
    let juegoActual: JuegoDados;
    
    // Función para mostrar mensajes en el log
    function addLogMessage(message: string) {
        if (!gameLog) return;
        
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = message;
        gameLog.appendChild(logEntry);
        gameLog.scrollTop = gameLog.scrollHeight;
    }
    
    // Iniciar el juego
    startButton?.addEventListener('click', () => {
        if (!player1Input || !player2Input || !player1NameDisplay || !player2NameDisplay || 
            !player1ScoreDisplay || !player2ScoreDisplay || !setupDiv || !gameDiv || 
            !dice1Display || !dice2Display) return;
            
        const player1Name = player1Input.value.trim() || "Jugador 1";
        const player2Name = player2Input.value.trim() || "Jugador 2";
        
        juegoActual = new JuegoDados(player1Name, player2Name);
        const primerJugador = juegoActual.iniciarJuego();
        
        // Actualizar la interfaz
        player1NameDisplay.textContent = player1Name;
        player2NameDisplay.textContent = player2Name;
        player1ScoreDisplay.textContent = "0";
        player2ScoreDisplay.textContent = "0";
        
        // Limpiar log
        if (gameLog) gameLog.innerHTML = '';
        
        // Mostrar tablero y ocultar setup
        setupDiv.classList.add('hidden');
        gameDiv.classList.remove('hidden');
        
        // Actualizar visualmente quién está activo
        actualizarJugadorActivo(primerJugador);
        
        // Mensaje inicial
        addLogMessage(`¡Juego iniciado! El primer jugador en lanzar será: ${primerJugador}`);
        addLogMessage("Objetivo: Llegar a 5 puntos. Se gana un punto cuando la suma de dados es 7.");
        
        // Resetear animaciones
        if (player1ScoreDisplay.parentElement) 
            player1ScoreDisplay.parentElement.classList.remove('winner');
        if (player2ScoreDisplay.parentElement)
            player2ScoreDisplay.parentElement.classList.remove('winner');
        
        dice1Display.textContent = '?';
        dice2Display.textContent = '?';
    });
    
    // Función para actualizar visualmente cuál jugador está activo
    function actualizarJugadorActivo(nombreJugador: string) {
        if (!player1NameDisplay || !player2NameDisplay || 
            !player1ScoreDisplay || !player2ScoreDisplay) return;
        
        // Resetear estilos primero
        player1NameDisplay.parentElement?.classList.remove('active-player');
        player2NameDisplay.parentElement?.classList.remove('active-player');
        
        // Aplicar estilo al jugador activo
        if (nombreJugador === juegoActual.jugador1.nombre) {
            player1NameDisplay.parentElement?.classList.add('active-player');
        } else {
            player2NameDisplay.parentElement?.classList.add('active-player');
        }
    }
    
    // Próxima jugada
    nextMoveButton?.addEventListener('click', () => {
        if (!juegoActual || !player1ScoreDisplay || !player2ScoreDisplay || 
            !dice1Display || !dice2Display) return;
        
        // Obtener el resultado de la jugada
        const resultado = juegoActual.siguienteJugada();
        const msg = resultado.mensajeJugada;
        
        // Actualizar dados
        dice1Display.textContent = msg.dados.dado1.toString();
        dice2Display.textContent = msg.dados.dado2.toString();
        
        // Actualizar marcadores
        player1ScoreDisplay.textContent = msg.puntajeJ1.toString();
        player2ScoreDisplay.textContent = msg.puntajeJ2.toString();
        
        // Actualizar jugador activo (será el que lance en la próxima jugada)
        actualizarJugadorActivo(juegoActual.jugadorActivo.nombre);
        
        // Agregar al log
        addLogMessage(`Jugada ${msg.numJugada}: ${msg.jugadorActivo} lanza los dados [${msg.dados.dado1} + ${msg.dados.dado2} = ${msg.suma}]`);

        // Mostrar si el jugador ganó punto
        if (msg.puntoGanado) {
            addLogMessage(`¡${msg.jugadorActivo} obtuvo un 7 y gana un punto!`);
        }
        
        // Verificar fin del juego
        if (resultado.terminado) {
            if (resultado.vencedor === "Empate") {
                addLogMessage(`¡Juego terminado! Resultado: EMPATE`);
            } else {
                addLogMessage(`¡Juego terminado! Ganador: ${resultado.vencedor}`);
                
                // Animar al ganador
                if (resultado.vencedor === juegoActual.jugador1.nombre) {
                    if (player1ScoreDisplay.parentElement) 
                        player1ScoreDisplay.parentElement.classList.add('winner');
                } else {
                    if (player2ScoreDisplay.parentElement)
                        player2ScoreDisplay.parentElement.classList.add('winner');
                }
            }
            
            if (nextMoveButton) nextMoveButton.disabled = true;
        }
    });
    
    // Reiniciar juego
    resetButton?.addEventListener('click', () => {
        if (!juegoActual || !player1ScoreDisplay || !player2ScoreDisplay || 
            !dice1Display || !dice2Display || !nextMoveButton) return;
        
        const player1Name = juegoActual.jugador1.nombre;
        const player2Name = juegoActual.jugador2.nombre;
        
        juegoActual = new JuegoDados(player1Name, player2Name);
        const primerJugador = juegoActual.iniciarJuego();
        
        // Actualizar marcadores
        player1ScoreDisplay.textContent = "0";
        player2ScoreDisplay.textContent = "0";
        
        // Limpiar log
        if (gameLog) gameLog.innerHTML = '';
        
        // Actualizar visualmente jugador activo
        actualizarJugadorActivo(primerJugador);
        
        // Mensaje inicial
        addLogMessage(`¡Juego reiniciado! El primer jugador en lanzar será: ${primerJugador}`);
        addLogMessage("Objetivo: Llegar a 5 puntos. Se gana un punto cuando la suma de dados es 7.");
        
        // Resetear animaciones
        if (player1ScoreDisplay.parentElement) 
            player1ScoreDisplay.parentElement.classList.remove('winner');
        if (player2ScoreDisplay.parentElement)
            player2ScoreDisplay.parentElement.classList.remove('winner');
        
        dice1Display.textContent = '?';
        dice2Display.textContent = '?';
        
        nextMoveButton.disabled = false;
    });
});