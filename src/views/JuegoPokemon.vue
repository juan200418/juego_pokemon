<template>
  <!-- Contenedor principal -->
  <div class="row">
    <div class="col-sm-12 d-flex justify-content-center">
      <h3 class="text-primary">¿QUIÉN ES ESE POKÉMON?</h3>
    </div>
  </div>
  <!-- Mostrar el contenido solo cuando no esté cargando -->
  <div v-if="!loading">
    <div class="row">
      <div class="col-sm-12 d-flex justify-content-center">
        <!-- Contenedor de la imagen del Pokémon -->
        <div class="container-image">
          <!-- Mostrar imagen oculta si no se ha revelado el resultado -->
          <img v-if="!showResult" class="hidden-image" :src="correct.image" alt="" />
          <!-- Mostrar imagen revelada si se ha revelado el resultado -->
          <img v-if="showResult" :src="correct.image" alt="" />
        </div>
      </div>
    </div>
    <!-- Opciones de respuesta -->
    <div class="row mt-3">
      <div class="col-sm-6" v-for="option in pokemons" :key="option.id">
        <div class="d-flex justify-content-center">
          <!-- Botón de opción para cada Pokémon -->
          <button
            class="btn btn-primary mt-2 btn-option"
            :disabled="disabledOptions"
            @click="validateCorrect(option.id)"
          >
            {{ option.name }}
          </button>
        </div>
      </div>
    </div>
    <!-- Mostrar resultado después de seleccionar una opción -->
    <div v-if="showResult">
      <div class="row">
        <!-- Mensaje de respuesta correcta -->
        <div v-if="result" class="col-sm-12 d-flex justify-content-center">
          <h4 class="text-success">¡Correcto!</h4>
        </div>
        <!-- Mensaje de respuesta incorrecta -->
        <div v-else class="col-sm-12 d-flex justify-content-center">
          <h4 class="text-danger">Incorrecto</h4>
        </div>
      </div>
      <!-- Mostrar nombre del Pokémon correcto -->
      <div class="row">
        <div class="col d-flex justify-content-center">
          <h4>El pokémon correcto es {{ correct.name.toUpperCase() }}</h4>
        </div>
      </div>
      <!-- Botón para volver a intentar -->
      <div class="row">
        <div class="col d-flex justify-content-center">
          <button class="btn btn-success btn-option" @click="getPokemonList()">
            Volver a intentar
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Mostrar spinner de carga cuando esté cargando -->
  <div v-else>
    <div class="row d-flex justify-content-center align-items-center container-loader">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices';

export default {
  name: "juegoPokemon",
  data() {
    return {
      pokemons: [], // Lista de Pokémon disponibles para seleccionar
      pos: -1, // Posición del Pokémon correcto en la lista
      correct: {}, // Detalles del Pokémon correcto
      showResult: false, // Mostrar resultado después de seleccionar una opción
      result: false, // Indica si la opción seleccionada es correcta
      disabledOptions: false, // Deshabilitar opciones después de seleccionar
      loading: true // Indica si la página está cargando
    };
  },
  mounted() {
    // Obtener lista de Pokémon al montar el componente
    this.getPokemonList();
  },
  methods: {
    // Obtener lista de Pokémon para el juego
    async getPokemonList() {
      this.loading = true;
      this.disabledOptions = false;
      this.showResult = false;
      
      // Obtener todos los Pokémon disponibles
      const allPokemons = await PokemonServices.getListForGame();
      
      // Seleccionar cuatro Pokémon al azar
      const selectedPokemons = [];
      while (selectedPokemons.length < 4) {
        const randomIndex = Math.floor(Math.random() * allPokemons.length);
        const randomPokemon = allPokemons[randomIndex];
        if (!selectedPokemons.some(pokemon => pokemon.id === randomPokemon.id)) {
          selectedPokemons.push(randomPokemon);
        }
      }
      
      // Asignar los Pokémon seleccionados a la lista de Pokémon
      this.pokemons = selectedPokemons;
      
      // Seleccionar un Pokémon correcto al azar
      setTimeout(() => {
        this.pos = Math.floor(Math.random() * 4);
        this.correct = this.pokemons[this.pos];
        this.loading = false;
      }, 1000);
    },
    // Validar si la opción seleccionada es correcta
    validateCorrect(id) {
      if (id === this.correct.id) {
        this.result = true;
      } else {
        this.result = false;
      }
      this.disabledOptions = true;
      this.showResult = true;
    },
  },
};
</script>

<style>
.hidden-image {
  filter: brightness(0); /* Ocultar imagen aplicando filtro de brillo */
}
.container-image {
  position: relative;
  width: 200px;
  height: 200px;
}
.container-image img {
  width: 100%; 
  height: auto; 
}
.container-loader {
  height: 200px; /* Altura del contenedor del spinner de carga */
}
.btn-option {
  width: 100%; /* Ancho completo para los botones de opción */
}
</style>
