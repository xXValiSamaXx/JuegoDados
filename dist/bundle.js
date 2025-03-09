/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Dado.ts":
/*!*********************!*\
  !*** ./src/Dado.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Dado: () => (/* binding */ Dado)\n/* harmony export */ });\n// Clase Dado\nclass Dado {\n    constructor() {\n        this.puntos = 0;\n    }\n    /**\n     * Este método simula el lanzamiento de un dado, mediante la función random\n     * y asignando el valor al atributo puntos\n     */\n    lanzar() {\n        // Simular el lanzamiento (números entre 1-6)\n        this.puntos = Math.floor(Math.random() * 6) + 1;\n    }\n}\n\n\n//# sourceURL=webpack://juegodados/./src/Dado.ts?");

/***/ }),

/***/ "./src/JuegoDados.ts":
/*!***************************!*\
  !*** ./src/JuegoDados.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   JuegoDados: () => (/* binding */ JuegoDados)\n/* harmony export */ });\n/* harmony import */ var _Dado__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dado */ \"./src/Dado.ts\");\n/* harmony import */ var _Jugador__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Jugador */ \"./src/Jugador.ts\");\n/* harmony import */ var _Jugada__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Jugada */ \"./src/Jugada.ts\");\n\n\n\n// Clase JuegoDados\nclass JuegoDados {\n    constructor(nombreJugador1, nombreJugador2) {\n        this.jugador1 = new _Jugador__WEBPACK_IMPORTED_MODULE_1__.Jugador(nombreJugador1);\n        this.jugador2 = new _Jugador__WEBPACK_IMPORTED_MODULE_1__.Jugador(nombreJugador2);\n        this.cantidadJugadas = 0;\n        this.marcadorJugador1 = 0;\n        this.marcadorJugador2 = 0;\n        this.dado1 = new _Dado__WEBPACK_IMPORTED_MODULE_0__.Dado();\n        this.dado2 = new _Dado__WEBPACK_IMPORTED_MODULE_0__.Dado();\n        this.vencedor = null;\n        this.jugadorActivo = this.jugador1; // Por defecto, comienza el jugador 1\n        this.jugadorInactivo = this.jugador2;\n        this.partidaTerminada = false;\n        this.ultimaJugadaInfo = null;\n    }\n    elegirPrimerJugador() {\n        // 50% de probabilidad para cada jugador\n        if (Math.floor(Math.random() * 2) === 1) {\n            this.jugadorActivo = this.jugador1;\n            this.jugadorInactivo = this.jugador2;\n        }\n        else {\n            this.jugadorActivo = this.jugador2;\n            this.jugadorInactivo = this.jugador1;\n        }\n        return this.jugadorActivo.nombre;\n    }\n    iniciarJugada() {\n        const jugadaActual = new _Jugada__WEBPACK_IMPORTED_MODULE_2__.Jugada();\n        // Realizar la jugada con el jugador activo\n        this.ultimaJugadaInfo = jugadaActual.iniciarJugada(this.jugadorActivo, this.jugadorInactivo, this.dado1, this.dado2);\n        // Actualizar marcador del jugador correspondiente\n        if (this.jugadorActivo === this.jugador1) {\n            this.marcadorJugador1 += this.jugador1.puntoGanado;\n        }\n        else {\n            this.marcadorJugador2 += this.jugador2.puntoGanado;\n        }\n        // Alternar jugadores para la próxima jugada\n        this.cambiarJugadorActivo();\n    }\n    cambiarJugadorActivo() {\n        // Intercambiar jugador activo e inactivo\n        const temp = this.jugadorActivo;\n        this.jugadorActivo = this.jugadorInactivo;\n        this.jugadorInactivo = temp;\n    }\n    iniciarJuego() {\n        // Inicializar variables\n        this.cantidadJugadas = 0;\n        this.marcadorJugador1 = 0;\n        this.marcadorJugador2 = 0;\n        this.vencedor = null;\n        this.partidaTerminada = false;\n        // Elegir primer jugador aleatoriamente\n        return this.elegirPrimerJugador();\n    }\n    siguienteJugada() {\n        if (this.partidaTerminada) {\n            return {\n                terminado: true,\n                mensajeJugada: {\n                    numJugada: this.cantidadJugadas,\n                    puntajeJ1: this.marcadorJugador1,\n                    puntajeJ2: this.marcadorJugador2,\n                    nombreJ1: this.jugador1.nombre,\n                    nombreJ2: this.jugador2.nombre,\n                    dados: {\n                        dado1: 0,\n                        dado2: 0\n                    },\n                    jugadorActivo: \"\",\n                    puntoGanado: false,\n                    suma: 0\n                }\n            };\n        }\n        // Guardar el jugador que está lanzando en esta jugada\n        const jugadorLanzando = this.jugadorActivo.nombre;\n        const esJugador1 = this.jugadorActivo === this.jugador1;\n        this.iniciarJugada();\n        this.cantidadJugadas++;\n        if (!this.ultimaJugadaInfo) {\n            throw new Error(\"No se ha inicializado la última jugada\");\n        }\n        // Determinar si se ganó un punto en esta jugada\n        const jugadorGanoPunto = esJugador1 ?\n            this.jugador1.puntoGanado === 1 :\n            this.jugador2.puntoGanado === 1;\n        const mensajeJugada = {\n            numJugada: this.cantidadJugadas,\n            puntajeJ1: this.marcadorJugador1,\n            puntajeJ2: this.marcadorJugador2,\n            nombreJ1: this.jugador1.nombre,\n            nombreJ2: this.jugador2.nombre,\n            dados: {\n                dado1: this.ultimaJugadaInfo.dado1Valor,\n                dado2: this.ultimaJugadaInfo.dado2Valor\n            },\n            jugadorActivo: jugadorLanzando,\n            puntoGanado: jugadorGanoPunto,\n            suma: this.ultimaJugadaInfo.puntosObtenidos\n        };\n        // Verificar si algún jugador ganó\n        if (this.marcadorJugador1 >= 5 || this.marcadorJugador2 >= 5) {\n            this.vencedor = this.determinarVencedor();\n            this.partidaTerminada = true;\n            return {\n                terminado: true,\n                mensajeJugada: mensajeJugada,\n                vencedor: this.vencedor ? this.vencedor.nombre : \"Empate\"\n            };\n        }\n        return {\n            terminado: false,\n            mensajeJugada: mensajeJugada\n        };\n    }\n    determinarVencedor() {\n        // Caso empate\n        if (this.marcadorJugador1 === 5 && this.marcadorJugador2 === 5)\n            return null;\n        // Ganó el jugador 1\n        if (this.marcadorJugador1 >= 5) {\n            return this.jugador1;\n        }\n        else { // Ganó el jugador 2\n            if (this.marcadorJugador2 >= 5) {\n                return this.jugador2;\n            }\n        }\n        return null;\n    }\n}\n\n\n//# sourceURL=webpack://juegodados/./src/JuegoDados.ts?");

/***/ }),

/***/ "./src/Jugada.ts":
/*!***********************!*\
  !*** ./src/Jugada.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Jugada: () => (/* binding */ Jugada)\n/* harmony export */ });\n// Clase Jugada\nclass Jugada {\n    /**\n     * Este método hace la función del constructor\n     */\n    iniciarJugada(jugadorActivo, jugadorInactivo, dado1, dado2) {\n        // Lanzar los dados solo para el jugador activo\n        const puntosObtenidos = jugadorActivo.lanzaDados(dado1, dado2);\n        // Determinar si ganó un punto (solo si sacó exactamente 7)\n        if (puntosObtenidos === 7) {\n            jugadorActivo.puntoGanado = 1;\n        }\n        else {\n            jugadorActivo.puntoGanado = 0;\n        }\n        // El jugador inactivo no gana puntos en esta jugada\n        jugadorInactivo.puntoGanado = 0;\n        return {\n            puntosObtenidos: puntosObtenidos,\n            dado1Valor: dado1.puntos,\n            dado2Valor: dado2.puntos\n        };\n    }\n}\n\n\n//# sourceURL=webpack://juegodados/./src/Jugada.ts?");

/***/ }),

/***/ "./src/Jugador.ts":
/*!************************!*\
  !*** ./src/Jugador.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Jugador: () => (/* binding */ Jugador)\n/* harmony export */ });\n// Clase Jugador\nclass Jugador {\n    constructor(nombre = \"\") {\n        this.nombre = nombre;\n        this.puntoGanado = 0;\n    }\n    /**\n     *\n     * @param dado1 Primer dado a lanzar\n     * @param dado2 Segundo dado a lanzar\n     * @returns Devuelve la suma de los puntos obtenidos en ambos dados\n     */\n    lanzaDados(dado1, dado2) {\n        dado1.lanzar();\n        dado2.lanzar();\n        // Retornar los puntos que cayeron en los dados\n        return dado1.puntos + dado2.puntos;\n    }\n}\n\n\n//# sourceURL=webpack://juegodados/./src/Jugador.ts?");

/***/ }),

/***/ "./src/Principal.ts":
/*!**************************!*\
  !*** ./src/Principal.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _JuegoDados__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JuegoDados */ \"./src/JuegoDados.ts\");\n\n// Inicialización y control del juego\ndocument.addEventListener('DOMContentLoaded', () => {\n    // Referencias DOM con tipos correctos\n    const setupDiv = document.getElementById('setup');\n    const gameDiv = document.getElementById('game-board');\n    const player1Input = document.getElementById('player1');\n    const player2Input = document.getElementById('player2');\n    const startButton = document.getElementById('start-game');\n    const nextMoveButton = document.getElementById('next-move');\n    const resetButton = document.getElementById('reset-game');\n    const gameLog = document.getElementById('game-log');\n    const player1NameDisplay = document.getElementById('player1-name');\n    const player2NameDisplay = document.getElementById('player2-name');\n    const player1ScoreDisplay = document.getElementById('player1-score');\n    const player2ScoreDisplay = document.getElementById('player2-score');\n    const dice1Display = document.getElementById('dice1');\n    const dice2Display = document.getElementById('dice2');\n    let juegoActual;\n    // Función para mostrar mensajes en el log\n    function addLogMessage(message) {\n        if (!gameLog)\n            return;\n        const logEntry = document.createElement('div');\n        logEntry.className = 'log-entry';\n        logEntry.textContent = message;\n        gameLog.appendChild(logEntry);\n        gameLog.scrollTop = gameLog.scrollHeight;\n    }\n    // Iniciar el juego\n    startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener('click', () => {\n        if (!player1Input || !player2Input || !player1NameDisplay || !player2NameDisplay ||\n            !player1ScoreDisplay || !player2ScoreDisplay || !setupDiv || !gameDiv ||\n            !dice1Display || !dice2Display)\n            return;\n        const player1Name = player1Input.value.trim() || \"Jugador 1\";\n        const player2Name = player2Input.value.trim() || \"Jugador 2\";\n        juegoActual = new _JuegoDados__WEBPACK_IMPORTED_MODULE_0__.JuegoDados(player1Name, player2Name);\n        const primerJugador = juegoActual.iniciarJuego();\n        // Actualizar la interfaz\n        player1NameDisplay.textContent = player1Name;\n        player2NameDisplay.textContent = player2Name;\n        player1ScoreDisplay.textContent = \"0\";\n        player2ScoreDisplay.textContent = \"0\";\n        // Limpiar log\n        if (gameLog)\n            gameLog.innerHTML = '';\n        // Mostrar tablero y ocultar setup\n        setupDiv.classList.add('hidden');\n        gameDiv.classList.remove('hidden');\n        // Actualizar visualmente quién está activo\n        actualizarJugadorActivo(primerJugador);\n        // Mensaje inicial\n        addLogMessage(`¡Juego iniciado! El primer jugador en lanzar será: ${primerJugador}`);\n        addLogMessage(\"Objetivo: Llegar a 5 puntos. Se gana un punto cuando la suma de dados es 7.\");\n        // Resetear animaciones\n        if (player1ScoreDisplay.parentElement)\n            player1ScoreDisplay.parentElement.classList.remove('winner');\n        if (player2ScoreDisplay.parentElement)\n            player2ScoreDisplay.parentElement.classList.remove('winner');\n        dice1Display.textContent = '?';\n        dice2Display.textContent = '?';\n    });\n    // Función para actualizar visualmente cuál jugador está activo\n    function actualizarJugadorActivo(nombreJugador) {\n        var _a, _b, _c, _d;\n        if (!player1NameDisplay || !player2NameDisplay ||\n            !player1ScoreDisplay || !player2ScoreDisplay)\n            return;\n        // Resetear estilos primero\n        (_a = player1NameDisplay.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove('active-player');\n        (_b = player2NameDisplay.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('active-player');\n        // Aplicar estilo al jugador activo\n        if (nombreJugador === juegoActual.jugador1.nombre) {\n            (_c = player1NameDisplay.parentElement) === null || _c === void 0 ? void 0 : _c.classList.add('active-player');\n        }\n        else {\n            (_d = player2NameDisplay.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add('active-player');\n        }\n    }\n    // Próxima jugada\n    nextMoveButton === null || nextMoveButton === void 0 ? void 0 : nextMoveButton.addEventListener('click', () => {\n        if (!juegoActual || !player1ScoreDisplay || !player2ScoreDisplay ||\n            !dice1Display || !dice2Display)\n            return;\n        // Obtener el resultado de la jugada\n        const resultado = juegoActual.siguienteJugada();\n        const msg = resultado.mensajeJugada;\n        // Actualizar dados\n        dice1Display.textContent = msg.dados.dado1.toString();\n        dice2Display.textContent = msg.dados.dado2.toString();\n        // Actualizar marcadores\n        player1ScoreDisplay.textContent = msg.puntajeJ1.toString();\n        player2ScoreDisplay.textContent = msg.puntajeJ2.toString();\n        // Actualizar jugador activo (será el que lance en la próxima jugada)\n        actualizarJugadorActivo(juegoActual.jugadorActivo.nombre);\n        // Agregar al log\n        addLogMessage(`Jugada ${msg.numJugada}: ${msg.jugadorActivo} lanza los dados [${msg.dados.dado1} + ${msg.dados.dado2} = ${msg.suma}]`);\n        // Mostrar si el jugador ganó punto\n        if (msg.puntoGanado) {\n            addLogMessage(`¡${msg.jugadorActivo} obtuvo un 7 y gana un punto!`);\n        }\n        // Verificar fin del juego\n        if (resultado.terminado) {\n            if (resultado.vencedor === \"Empate\") {\n                addLogMessage(`¡Juego terminado! Resultado: EMPATE`);\n            }\n            else {\n                addLogMessage(`¡Juego terminado! Ganador: ${resultado.vencedor}`);\n                // Animar al ganador\n                if (resultado.vencedor === juegoActual.jugador1.nombre) {\n                    if (player1ScoreDisplay.parentElement)\n                        player1ScoreDisplay.parentElement.classList.add('winner');\n                }\n                else {\n                    if (player2ScoreDisplay.parentElement)\n                        player2ScoreDisplay.parentElement.classList.add('winner');\n                }\n            }\n            if (nextMoveButton)\n                nextMoveButton.disabled = true;\n        }\n    });\n    // Reiniciar juego\n    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener('click', () => {\n        if (!juegoActual || !player1ScoreDisplay || !player2ScoreDisplay ||\n            !dice1Display || !dice2Display || !nextMoveButton)\n            return;\n        const player1Name = juegoActual.jugador1.nombre;\n        const player2Name = juegoActual.jugador2.nombre;\n        juegoActual = new _JuegoDados__WEBPACK_IMPORTED_MODULE_0__.JuegoDados(player1Name, player2Name);\n        const primerJugador = juegoActual.iniciarJuego();\n        // Actualizar marcadores\n        player1ScoreDisplay.textContent = \"0\";\n        player2ScoreDisplay.textContent = \"0\";\n        // Limpiar log\n        if (gameLog)\n            gameLog.innerHTML = '';\n        // Actualizar visualmente jugador activo\n        actualizarJugadorActivo(primerJugador);\n        // Mensaje inicial\n        addLogMessage(`¡Juego reiniciado! El primer jugador en lanzar será: ${primerJugador}`);\n        addLogMessage(\"Objetivo: Llegar a 5 puntos. Se gana un punto cuando la suma de dados es 7.\");\n        // Resetear animaciones\n        if (player1ScoreDisplay.parentElement)\n            player1ScoreDisplay.parentElement.classList.remove('winner');\n        if (player2ScoreDisplay.parentElement)\n            player2ScoreDisplay.parentElement.classList.remove('winner');\n        dice1Display.textContent = '?';\n        dice2Display.textContent = '?';\n        nextMoveButton.disabled = false;\n    });\n});\n\n\n//# sourceURL=webpack://juegodados/./src/Principal.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Principal.ts");
/******/ 	
/******/ })()
;