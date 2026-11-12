<script setup>
import { useGameStore } from '@/stores/gameStore'
const store = useGameStore()
</script>

<template>
  <div class="caja">
    <h2>Top 10 Mejores Puntuaciones</h2>
    <p v-if="store.ranking.length === 0">Aún no hay puntuaciones. ¡Sé el primero en jugar!</p>

    <ul v-else class="lista-ranking">
      <li v-for="(item, i) in store.ranking" :key="i" :class="{ actual: item.nombre === store.jugador }">
        <span>
          {{ i === 0 ? '👑' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}` }}
          <strong>{{ item.nombre }}</strong> ({{ item.precision }}% - {{ item.fecha }})
        </span>
        <strong>{{ item.puntos }} pts</strong>
      </li>
    </ul>
  </div>
</template>