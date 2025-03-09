import { Dado } from './Dado';

// Clase Jugador
export class Jugador {
    nombre: string;
    puntoGanado: number;

    constructor(nombre: string = "") {
        this.nombre = nombre;
        this.puntoGanado = 0;
    }

    /**
     * 
     * @param dado1 Primer dado a lanzar
     * @param dado2 Segundo dado a lanzar
     * @returns Devuelve la suma de los puntos obtenidos en ambos dados
     */
    lanzaDados(dado1: Dado, dado2: Dado): number {
        dado1.lanzar();
        dado2.lanzar();

        // Retornar los puntos que cayeron en los dados
        return dado1.puntos + dado2.puntos;
    }
}