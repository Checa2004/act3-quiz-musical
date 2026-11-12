# 🎵 Quiz Musical - Actividad 3 (DAW)

Aplicación web SPA desarrollada con **Vue 3** para la asignatura de Desarrollo Web en Entorno Cliente (CFGS DAW). Consiste en un concurso musical donde el jugador debe adivinar qué pista suena escuchando fragmentos aleatorios de 5 segundos.

## 🚀 Tecnologías utilizadas

* **Vue 3** (Composition API)
* **Vue Router** (Navegación SPA entre Inicio, Concurso y Ranking)
* **Pinia** (Gestión del estado global de la partida y persistencia del ranking en `localStorage`)
* **Howler.js** (Reproducción y control de fragmentos de audio de 5 segundos)
* **Vite** (Entorno de desarrollo y empaquetado)

## 📋 Funcionalidades

* **Landing Page (`/`)**: Explica la mecánica del juego y enlaza con el concurso y la clasificación.
* **Concurso (`/jugar`)**:
  * Solicita el nombre del jugador antes de iniciar.
  * Selecciona 10 canciones al azar de un catálogo de 20 pistas y desordena las 4 opciones en cada partida.
  * Reproduce automáticamente 5 segundos aleatorios de cada canción.
  * Sistema de puntuación: **+10 puntos** por acierto, **-5 puntos** por fallo y **0 puntos** si se agota el tiempo.
* **Ranking Top-10 (`/ranking`)**: Guarda las 10 mejores puntuaciones en el navegador (`localStorage`), ordenadas por puntuación y tiempo total de escucha en caso de empate.

## 📂 Estructura del proyecto

```text
src/
├── assets/
│   └── main.css           # Estilos de la aplicación
├── components/
│   ├── AudioPlayer.vue    # Reproductor de audio con Howler.js
│   ├── NavBar.vue         # Barra de navegación
│   └── QuestionCard.vue   # Tarjeta de pregunta y opciones (props/emits)
├── data/
│   └── canciones.js       # Catálogo de 20 pistas de audio y respuestas
├── router/
│   └── index.js           # Configuración de rutas
├── stores/
│   └── gameStore.js       # Estado global y ranking con Pinia
├── views/
│   ├── HomeView.vue       # Vista principal (Landing)
│   ├── QuizView.vue       # Vista del juego
│   └── RankingView.vue    # Vista de clasificación
├── App.vue
└── main.js