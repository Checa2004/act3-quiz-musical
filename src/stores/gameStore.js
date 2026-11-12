import { defineStore } from 'pinia'
import { canciones } from '@/data/canciones'

export const useGameStore = defineStore('game', {
  state: () => ({
    jugador: '',
    puntos: 0,
    aciertos: 0,
    tiempoTotal: 0,
    preguntas: [],
    ranking: JSON.parse(localStorage.getItem('ranking')) || []
  }),

  actions: {
    empezar(nombre) {
      this.jugador = nombre
      this.puntos = 0
      this.aciertos = 0
      this.tiempoTotal = 0

      this.preguntas = [...canciones]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map(c => ({
          ...c,
          opciones: [...c.opciones].sort(() => Math.random() - 0.5)
        }))
    },

    responder(estado, segundos) {
      this.tiempoTotal += segundos
      if (estado === 'acierto') {
        this.puntos += 10
        this.aciertos++
      } else if (estado === 'fallo') {
        this.puntos -= 5
      }
    },

    guardarRanking() {
      this.ranking.push({
        nombre: this.jugador,
        puntos: this.puntos,
        precision: this.aciertos * 10,
        tiempo: this.tiempoTotal,
        fecha: new Date().toLocaleDateString()
      })

      this.ranking.sort((a, b) => b.puntos - a.puntos || a.tiempo - b.tiempo)
      this.ranking = this.ranking.slice(0, 10)
      localStorage.setItem('ranking', JSON.stringify(this.ranking))
    }
  }
})