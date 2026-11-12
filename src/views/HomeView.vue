<template>
  <section class="card home-card">
    <h1>Adivina la Canción</h1>
    <p class="subtitle">Escucha fragmentos de 5 segundos y demuestra cuánto sabes de música.</p>

    <div class="rules-grid">
      <div class="rule-item">
        <h3>1. Escucha</h3>
        <p>Sonarán 5 segundos aleatorios de cada canción.</p>
      </div>
      <div class="rule-item">
        <h3>2. Adivina</h3>
        <p>Elige la opción correcta antes de que acabe el tiempo.</p>
      </div>
      <div class="rule-item">
        <h3>3. Puntúa</h3>
        <p>+10 puntos por acierto, -5 por fallo y 0 si no respondes.</p>
      </div>
    </div>

    <div class="actions">
      <RouterLink to="/jugar" class="btn btn-primary">Comenzar a Jugar</RouterLink>
      <RouterLink to="/ranking" class="btn btn-secondary">Ver Ranking</RouterLink>
    </div>
  </section>
</template>