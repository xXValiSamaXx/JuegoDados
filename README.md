# Juego de Dados

Una implementación en TypeScript de un juego de dados convertido desde Java, con una interfaz web interactiva.

## Descripción

Este proyecto es una conversión de un juego de dados originalmente escrito en Java a TypeScript. La aplicación permite a dos jugadores competir lanzando dados hasta que uno de ellos alcance 5 puntos. Se gana un punto cuando la suma de los dados es exactamente 7.

## Características

- Interfaz gráfica intuitiva y responsiva
- Visualización clara de turnos por jugador con indicador visual del jugador activo
- Sistema de puntuación basado en la obtención del número 7
- Historial de jugadas con resultados detallados
- Animación para el jugador ganador

## Instalación

1. **Clonar el repositorio**
   
   ```bash
   git clone https://github.com/xXValiSamaXx/JuegoDados.git
   cd JuegoDados
   ```

2. **Instalar dependencias**
   
   Abre una terminal en la carpeta del proyecto y ejecuta:
   
   ```bash
   npm install
   ```
   
   Esto instalará todas las dependencias necesarias definidas en el `package.json`.

3. **Compilar el proyecto**
   
   Ejecuta:
   
   ```bash
   npm run build
   ```
   
   Esto compilará los archivos TypeScript a JavaScript y los guardará en la carpeta `dist`.

## Ejecución

Para iniciar el servidor de desarrollo y abrir la aplicación en tu navegador:

```bash
npm start
```

O simplemente abre el archivo `index.html` en tu navegador después de compilar.

## Estructura del Proyecto

```
JuegoDados/
├── src/
│   ├── Dado.ts         # Clase para simular un dado
│   ├── Jugador.ts      # Clase para representar a un jugador
│   ├── Jugada.ts       # Clase para gestionar una jugada
│   ├── JuegoDados.ts   # Clase principal que controla el juego
│   └── Principal.ts    # Punto de entrada, gestiona la interfaz
├── dist/               # Archivos compilados (generados)
├── index.html          # Interfaz de usuario
├── package.json        # Configuración de dependencias
├── tsconfig.json       # Configuración de TypeScript
└── webpack.config.js   # Configuración de Webpack
```

## Tecnologías Utilizadas

- TypeScript
- HTML5
- CSS3
- Webpack
- Node.js (solo para desarrollo)
