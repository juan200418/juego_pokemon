<template>
  <!-- Mostrar spinner de carga cuando loading sea verdadero -->
  <div v-if="loading" class="row">
    <div class="col-sm-12 d-flex justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <!-- Mostrar contenido cuando loading sea falso -->
  <div v-else>
    <div class="row">
      <div class="col-sm-12 d-flex justify-content-center">
        <!-- Mostrar el nombre del Pokémon en mayúsculas -->
        <h1 class="text-primary">
          {{ pokemon.name.toUpperCase() }}
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6 d-flex justify-content-center">
        <!-- Mostrar la imagen del Pokémon -->
        <img class="image-detail" :src="pokemon.image" alt="">
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-sm-12">
        <!-- Mostrar el tipo del Pokémon -->
        <h4 class="text-success">Tipo</h4>
        <div class="types">
          <div class="chip bg-info" v-for="(type, index) in pokemon.types" :key="index">
            <p class="text-primary">{{ type.name.toUpperCase() }}</p>
          </div>
        </div>
        <!-- Mostrar las habilidades del Pokémon -->
        <div class="abilities bg-light-green">
          <h4 class="text-success">Habilidades</h4>
          <p v-for="(ability, index) in pokemon.abilities" :key="index">
            {{ ability.name.toUpperCase() }}
          </p>
        </div>
        <!-- Mostrar los movimientos del Pokémon -->
        <div class="moves bg-light-blue">
          <h4 class="text-success">Movimientos</h4>
          <p v-for="(move, index) in pokemon.moves.slice(0, 3)" :key="index">
            {{ move.name.toUpperCase() }}
          </p>
        </div>
        <!-- Mostrar las estadísticas base del Pokémon -->
        <div class="stats bg-light-orange">
          <h4 class="text-success">Estadísticas Base</h4>
          <p v-for="(stat, index) in pokemon.stats" :key="index">
            {{ stat.name.toUpperCase() }}: {{ stat.base_stat }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'  // Importa el hook useRoute de vue-router para acceder a las rutas
import PokemonServices from '@/services/PokemonServices'  // Importa los servicios de Pokémon

export default {
  name: 'PokemonDetail',  // Nombre del componente
  data() {
    return {
      loading: true,  // Indica si los datos están cargando
      id: '',  // ID del Pokémon
      pokemon: {}  // Detalles del Pokémon
    }
  },
  async created() {
    // Obtener la ruta actual
    const route = useRoute();
    this.id = route.params.id  // Establecer el ID del Pokémon desde los parámetros de la ruta
    await this.getPokemon()  // Llamar a la función para obtener los detalles del Pokémon
  },
  methods: {
    async getPokemon() {
      // Obtener detalles del Pokémon por ID
      this.pokemon = await PokemonServices.getPokemonDetail(this.id)
      // Obtener tipos del Pokémon por ID
      this.pokemon.types = await PokemonServices.getPokemonTypes(this.id);
      // Desactivar el indicador de carga
      this.loading = false
      console.log('pokemon', this.pokemon)  // Mostrar los detalles del Pokémon en la consola
    }
  }
}
</script>

<style>
.image-detail {
  width: 200px; /* // Ancho de la imagen*/
  height: 200px; /* // Altura de la imagen*/
}

.types {
  display: flex;  /*// Utiliza flexbox para los tipos*/
  flex-wrap: wrap;  /*// Permitir que los tipos se envuelvan en la siguiente línea si es necesario*/
  gap: 10px; /* // Espacio entre los tipos*/
}

.chip {
  padding: 5px 10px;  /*//Espaciado interno*/
  border-radius: 15px; /* // Bordes redondeados*/
  background-color: #fff3b0;  /* Fondo amarillo claro */
  color: black;  /* Texto negro */
}

.text-primary {
  color: rgb(28, 28, 105); /*  // Color del texto primario*/
}


.bg-light-green {
  background-color: #c7f4d4;  /*/Fondo verde claro*/
  padding: 10px;  /*// Espaciado interno*/
  border-radius: 5px; /* // Bordes redondeados*/
  margin-bottom: 20px;/* // Margen inferior*/
}

.bg-light-blue {
  background-color: #d8effe; /* // Fondo azul claro*/
  padding: 10px;  /*// Espaciado interno*/
  border-radius: 5px;  /*// Bordes redondeados*/
  margin-bottom: 20px; /* // Margen inferior*/
}

.bg-light-orange {
  background-color: #fbd7b7; /* // Fondo naranja claro*/
  padding: 10px; /* // Espaciado interno*/
  border-radius: 5px; /* // Bordes redondeados*/
  margin-bottom: 20px;  /*// Margen inferior*/
}
</style>
