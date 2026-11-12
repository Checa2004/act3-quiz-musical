<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { Howl } from 'howler'

const props = defineProps(['src'])
const emit = defineEmits(['fin'])

let sound = null
let timer = null

const parar = () => {
  clearTimeout(timer)
  if (sound) sound.stop()
}

const sonar = () => {
  parar()
  sound = new Howl({
    src: [props.src],
    onload() {
      const inicio = Math.random() * Math.max(0, sound.duration() - 5)
      sound.seek(inicio)
      sound.play()
      timer = setTimeout(() => {
        parar()
        emit('fin')
      }, 5000)
    }
  })
}

onMounted(sonar)
watch(() => props.src, sonar)
onUnmounted(parar)
defineExpose({ parar })
</script>

<template>
  <p class="audio-info"> Escuchando fragmento (5s)...</p>
</template>