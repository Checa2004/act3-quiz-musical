<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import AudioPlayer from '@/components/AudioPlayer.vue'
import QuestionCard from '@/components/QuestionCard.vue'

const store = useGameStore()
const fase = ref('inicio')
const nombre = ref('')
const indice = ref(0)
const respondida = ref(false)
const mensaje = ref('')
const player = ref(null)

const iniciar = () => {
  if (!nombre.value.trim()) return
  store.empezar(nombre.value)
  indice.value = 0
  respondida.value = false
  fase.value = 'juego'
}

const alResponder = (acierto) => {
  respondida.value = true
  player.value?.parar()
  store.responder(acierto ? 'acierto' : 'fallo', 2)
  mensaje.value = acierto ? '¡Correcto! +10 puntos' : '¡Fallaste! -5 puntos'
}

const sinTiempo = () => {
  if (respondida.value) return
  respondida.value = true
  store.responder('tiempo', 5)
  mensaje.value = '¡Tiempo agotado! 0 puntos'
}

const siguiente = () => {
  if (indice.value < 9) {
    indice.value++
    respondida.value = false
    mensaje.value = ''
  } else {
    store.guardarRanking()
    fase.value = 'fin'
  }
}
</script>

<template>
  <div class="caja">
    <div v-if="fase === 'inicio'">
      <h2>Introduce tu nombre</h2>
      <input v-model="nombre" placeholder="Tu nombre" @keyup.enter="iniciar" />
      <button class="btn" @click="iniciar">Empezar</button>
    </div>

    <div v-else-if="fase === 'juego'">
      <p><strong>{{ store.jugador }}</strong> | Pregunta {{ indice + 1 }}/10 | Puntos: {{ store.puntos }}</p>
      
      <AudioPlayer ref="player" :src="store.preguntas[indice].audio" @fin="sinTiempo" />
      <QuestionCard :pregunta="store.preguntas[indice]" :bloqueada="respondida" @elegir="alResponder" />

      <div v-if="respondida">
        <p><strong>{{ mensaje }}</strong></p>
        <button class="btn" @click="siguiente">{{ indice < 9 ? 'Siguiente' : 'Finalizar' }}</button>
      </div>
    </div>

    <div v-else>
      <h2>Fin de la partida</h2>
      <p>Puntos: <strong>{{ store.puntos }}</strong> ({{ store.aciertos }}/10 aciertos - {{ store.aciertos * 10 }}%)</p>
      <p v-if="store.ranking.some(r => r.nombre === store.jugador && r.puntos === store.puntos)">
        ¡Has entrado en el Top 10!
      </p>
      <p v-else>No has llegado al Top 10, ¡inténtalo de nuevo!</p>
      <button class="btn" @click="fase = 'inicio'">Jugar de nuevo</button>
    </div>
  </div>
</template>