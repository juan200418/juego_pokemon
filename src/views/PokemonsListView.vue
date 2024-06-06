<template>
  <!-- Contenedor principal -->
  <div class="row">
  </div>
  <!-- Mostrar lista de pokemons si existe al menos uno -->
  <div v-if="pokemons.length > 0">
    <!-- Fila de tarjetas de pokemons centrada -->
    <div class="row d-flex justify-content-center">
      <!-- Iterar sobre cada pokemon y crear una tarjeta para cada uno -->
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="col-sm-8">
        <!-- Tarjeta de cada pokemon con evento click para ir al detalle -->
        <div class="card card-pokemon" @click="goToDetail(pokemon.id)">
          <!-- Imagen del pokemon -->
          <div class="card-image">
            <img :src="pokemon.image" alt="" width="100px"/>
          </div>
          <!-- Nombre del pokemon -->
          <div class="col-12 card-title">
            <h4>{{ pokemon.name }}</h4>
          </div>
        </div>
      </div>
    </div>
    <!-- Botones de paginación -->
    <div class="buttons-pager">
      <button class="btn btn-primary ml-3" @click="previousPage()">
        Anterior
      </button>
      <button class="btn btn-primary ml-3" @click="nextPage()">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices'

export default {
  name: "PokemonListView",
  components: {},
  data() {
    return {
      pokemons: [], // Lista de pokemons
      page: 0, // Página actual
      start: 1, // Índice de inicio de la lista
      end: 10, // Índice de fin de la lista
    };
  },
  async created() {
    // Obtener lista de pokemons al crear el componente
    await this.getPokemonsList(this.start, this.end);
    console.log(this.pokemons);
  },
  methods: {
    // Método para ir a la página siguiente
    async nextPage() {
      if (this.page < 65) {
        this.pokemons = []; // Limpiar la lista de pokemons
        this.page = this.page + 1; // Incrementar el número de página
        this.start = this.page * 10 + 1; // Calcular nuevo índice de inicio
        this.end = (this.page + 1) * 10; // Calcular nuevo índice de fin
        await this.getPokemonsList(this.start, this.end); // Obtener nueva lista de pokemons
      }
    },
    // Método para ir a la página anterior
    async previousPage() {
      if (this.page > 0) {
        this.pokemons = []; // Limpiar la lista de pokemons
        this.page = this.page - 1; // Decrementar el número de página
        this.start = this.page * 10 + 1; // Calcular nuevo índice de inicio
        this.end = (this.page + 1) * 10; // Calcular nuevo índice de fin
        await this.getPokemonsList(this.start, this.end); // Obtener nueva lista de pokemons
      }
    },
    // Método para obtener la lista de pokemons
    async getPokemonsList(start, end) {
      this.pokemons = await PokemonServices.getPokemonList(start, end);
    },
    // Método para ir a la página de detalle del pokemon
    goToDetail(pokemonId) {
      this.$router.push({
        name: 'detalle',
        params: { id: pokemonId }
      });
    }
  },
};
</script>

<style scoped>
/* Estilo para el contenedor principal */
.row {
  background-color: #91c8ff;
}
/* Estilo para las tarjetas de los pokemons */
.card-pokemon {
  background-color: rgb(194, 255, 194);
  margin-bottom: 20px;
  cursor: pointer;
  text-align: center;
}
/* Estilo para la imagen del pokemon */
.card-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}
/* Estilo para el título de la tarjeta */
.card-title {
  margin-top: 10px;
  width: 100%;
  text-align: center;
}
</style>
