<template>
  <div v-for = " pokemon in pokemons " class="col-sm-10">
      <h1>{{ pokemon.name }}</h1>
      <img :src="pokemon.image" alt="Imagen del pokémon">
      <p>ID: {{ pokemon.id }}</p>
      <p>Altura: {{ pokemon.height }} m</p>
      <p>Habilidades:</p>
      <ul>
        <li v-for="ability in pokemon.abilities" :key="ability.name">{{ ability.name }}</li>
      </ul>
    </div>
  </template>