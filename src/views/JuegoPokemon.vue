<template>
    <div>
      <h3 class="text-primary">¿Quién es ese Pokémon?</h3>
      <img :src="pokemonImage" alt="Silueta de Pokémon" style="width: 200px; height: 200px;">
      <div v-for="(option, index) in options" :key="index" @click="checkAnswer(option)">
        {{ option }}
      </div>
      <div v-if="showResult">
        <p>{{ resultMessage }}</p>
        <button @click="nextPokemon">Siguiente Pokémon</button>
      </div>
    </div>
  </template>
  
  <script>
  import PokemonServices from '@/services/PokemonServices'
  
  export default {
    name: 'PokemonGame',
    data() {
      return {
        pokemonImage: '',
        correctAnswer: '',
        options: [],
        showResult: false,
        resultMessage: ''
      }
    },
    async created() {
      await this.getNextPokemon();
    },
    methods: {
      async getNextPokemon() {
        // Obtener un Pokémon al azar
        const randomPokemon = await PokemonServices.getRandomPokemon();
        this.correctAnswer = randomPokemon.name;
  
        // Obtener la imagen de la silueta del Pokémon
        // Esto podría ser una imagen predeterminada de una silueta de Pokémon
        this.pokemonImage = randomPokemon.silhouetteImage;
  
        // Obtener opciones de Pokémon
        this.options = await PokemonServices.getRandomPokemonOptions(this.correctAnswer);
      },
      checkAnswer(option) {
        this.showResult = true;
        if (option === this.correctAnswer) {
          this.resultMessage = '¡Correcto!';
        } else {
          this.resultMessage = 'Incorrecto. La respuesta correcta es ' + this.correctAnswer + '.';
        }
      },
      nextPokemon() {
        this.showResult = false;
        this.getNextPokemon();
      }
    }
  }
  </script>
  