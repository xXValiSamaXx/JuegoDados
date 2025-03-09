// Clase Dado
export class Dado {
    puntos: number;

    constructor() {
        this.puntos = 0;
    }

    /**
     * Este método simula el lanzamiento de un dado, mediante la función random
     * y asignando el valor al atributo puntos
     */
    lanzar(): void {
        // Simular el lanzamiento (números entre 1-6)
        this.puntos = Math.floor(Math.random() * 6) + 1;
    }
}