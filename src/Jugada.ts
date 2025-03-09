import { Dado } from './Dado';
import { Jugador } from './Jugador';

// Clase Jugada
export class Jugada {
    /**
     * Este método hace la función del constructor
     */
    iniciarJugada(jugadorActivo: Jugador, jugadorInactivo: Jugador, dado1: Dado, dado2: Dado): { 
        puntosObtenidos: number, 
        dado1Valor: number, 
        dado2Valor: number 
    } {
        // Lanzar los dados solo para el jugador activo
        const puntosObtenidos = jugadorActivo.lanzaDados(dado1, dado2);
        
        // Determinar si ganó un punto (solo si sacó exactamente 7)
        if (puntosObtenidos === 7) {
            jugadorActivo.puntoGanado = 1;
        } else {
            jugadorActivo.puntoGanado = 0;
        }
        
        // El jugador inactivo no gana puntos en esta jugada
        jugadorInactivo.puntoGanado = 0;
        
        return {
            puntosObtenidos: puntosObtenidos,
            dado1Valor: dado1.puntos,
            dado2Valor: dado2.puntos
        };
    }
}