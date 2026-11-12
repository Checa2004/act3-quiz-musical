<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['pregunta', 'bloqueada'])
const emit = defineEmits(['elegir'])

const elegida = ref('')

watch(() => props.pregunta, () => {
  elegida.value = ''
})

const clickOpcion = (op) => {
  if (props.bloqueada) return
  elegida.value = op
  emit('elegir', op === props.pregunta.correcta)
}
</script>

<template>
  <div>
    <h3>{{ pregunta.pregunta }}</h3>
    <button
      v-for="op in pregunta.opciones"
      :key="op"
      class="btn-opcion"
      :class="{
        verde: bloqueada && op === pregunta.correcta,
        rojo: bloqueada && op === elegida && op !== pregunta.correcta
      }"
      :disabled="bloqueada"
      @click="clickOpcion(op)"
    >
      {{ op }}
    </button>
  </div>
</template>