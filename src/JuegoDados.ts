import { Dado } from './Dado';
import { Jugador } from './Jugador';
import { Jugada } from './Jugada';

// Interfaz para los mensajes de jugada
export interface MensajeJugada {
    numJugada: number;
    puntajeJ1: number;
    puntajeJ2: number;
    nombreJ1: string;
    nombreJ2: string;
    dados: {
        dado1: number;
        dado2: number;
    };
    jugadorActivo: string;
    puntoGanado: boolean;
    suma: number;
}

// Interfaz para los resultados de jugada
export interface ResultadoJugada {
    terminado: boolean;
    mensajeJugada: MensajeJugada;
    vencedor?: string;
}

// Clase JuegoDados
export class JuegoDados {
    cantidadJugadas: number;
    jugador1: Jugador;
    jugador2: Jugador;
    marcadorJugador1: number;
    marcadorJugador2: number;
    dado1: Dado;
    dado2: Dado;
    vencedor: Jugador | null;
    jugadorActivo: Jugador; // Referencia al jugador que lanza en esta jugada
    jugadorInactivo: Jugador; // Referencia al jugador que no lanza en esta jugada
    private partidaTerminada: boolean;
    private ultimaJugadaInfo: { 
        puntosObtenidos: number, 
        dado1Valor: number, 
        dado2Valor: number 
    } | null;

    constructor(nombreJugador1: string, nombreJugador2: string) {
        this.jugador1 = new Jugador(nombreJugador1);
        this.jugador2 = new Jugador(nombreJugador2);
        this.cantidadJugadas = 0;
        this.marcadorJugador1 = 0;
        this.marcadorJugador2 = 0;
        this.dado1 = new Dado();
        this.dado2 = new Dado();
        this.vencedor = null;
        this.jugadorActivo = this.jugador1; // Por defecto, comienza el jugador 1
        this.jugadorInactivo = this.jugador2;
        this.partidaTerminada = false;
        this.ultimaJugadaInfo = null;
    }

    elegirPrimerJugador(): string {
        // 50% de probabilidad para cada jugador
        if (Math.floor(Math.random() * 2) === 1) {
            this.jugadorActivo = this.jugador1;
            this.jugadorInactivo = this.jugador2;
        } else {
            this.jugadorActivo = this.jugador2;
            this.jugadorInactivo = this.jugador1;
        }
        return this.jugadorActivo.nombre;
    }

    iniciarJugada(): void {
        const jugadaActual = new Jugada();
        
        // Realizar la jugada con el jugador activo
        this.ultimaJugadaInfo = jugadaActual.iniciarJugada(
            this.jugadorActivo, 
            this.jugadorInactivo,
            this.dado1, 
            this.dado2
        );
        
        // Actualizar marcador del jugador correspondiente
        if (this.jugadorActivo === this.jugador1) {
            this.marcadorJugador1 += this.jugador1.puntoGanado;
        } else {
            this.marcadorJugador2 += this.jugador2.puntoGanado;
        }
        
        // Alternar jugadores para la próxima jugada
        this.cambiarJugadorActivo();
    }
    
    cambiarJugadorActivo(): void {
        // Intercambiar jugador activo e inactivo
        const temp = this.jugadorActivo;
        this.jugadorActivo = this.jugadorInactivo;
        this.jugadorInactivo = temp;
    }

    iniciarJuego(): string {
        // Inicializar variables
        this.cantidadJugadas = 0;
        this.marcadorJugador1 = 0;
        this.marcadorJugador2 = 0;
        this.vencedor = null;
        this.partidaTerminada = false;
        
        // Elegir primer jugador aleatoriamente
        return this.elegirPrimerJugador();
    }

    siguienteJugada(): ResultadoJugada {
        if (this.partidaTerminada) {
            return {
                terminado: true,
                mensajeJugada: {
                    numJugada: this.cantidadJugadas,
                    puntajeJ1: this.marcadorJugador1,
                    puntajeJ2: this.marcadorJugador2,
                    nombreJ1: this.jugador1.nombre,
                    nombreJ2: this.jugador2.nombre,
                    dados: {
                        dado1: 0,
                        dado2: 0
                    },
                    jugadorActivo: "",
                    puntoGanado: false,
                    suma: 0
                }
            };
        }

        // Guardar el jugador que está lanzando en esta jugada
        const jugadorLanzando = this.jugadorActivo.nombre;
        const esJugador1 = this.jugadorActivo === this.jugador1;
        
        this.iniciarJugada();
        this.cantidadJugadas++;
        
        if (!this.ultimaJugadaInfo) {
            throw new Error("No se ha inicializado la última jugada");
        }
        
        // Determinar si se ganó un punto en esta jugada
        const jugadorGanoPunto = esJugador1 ? 
            this.jugador1.puntoGanado === 1 :
            this.jugador2.puntoGanado === 1;
        
        const mensajeJugada: MensajeJugada = {
            numJugada: this.cantidadJugadas,
            puntajeJ1: this.marcadorJugador1,
            puntajeJ2: this.marcadorJugador2,
            nombreJ1: this.jugador1.nombre,
            nombreJ2: this.jugador2.nombre,
            dados: {
                dado1: this.ultimaJugadaInfo.dado1Valor,
                dado2: this.ultimaJugadaInfo.dado2Valor
            },
            jugadorActivo: jugadorLanzando,
            puntoGanado: jugadorGanoPunto,
            suma: this.ultimaJugadaInfo.puntosObtenidos
        };

        // Verificar si algún jugador ganó
        if (this.marcadorJugador1 >= 5 || this.marcadorJugador2 >= 5) {
            this.vencedor = this.determinarVencedor();
            this.partidaTerminada = true;
            
            return {
                terminado: true,
                mensajeJugada: mensajeJugada,
                vencedor: this.vencedor ? this.vencedor.nombre : "Empate"
            };
        }

        return {
            terminado: false,
            mensajeJugada: mensajeJugada
        };
    }

    determinarVencedor(): Jugador | null {
        // Caso empate
        if (this.marcadorJugador1 === 5 && this.marcadorJugador2 === 5)
            return null;

        // Ganó el jugador 1
        if (this.marcadorJugador1 >= 5) {
            return this.jugador1;
        } else { // Ganó el jugador 2
            if (this.marcadorJugador2 >= 5) {
                return this.jugador2;
            }
        }
        return null;
    }
}