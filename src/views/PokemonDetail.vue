<template>
  <div v-if="loading" class="row">
    <div class="col-sm-12 d-flex justify-content-center">
      <h3>Cargando...</h3>
    </div>
  </div>
  <div v-else>
    <div class="row">
      <div class="col-sm-12 d-flex justify-content-center">
        <h1 class="text-primary">
          {{ pokemon.name.toUpperCase() }}
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6 d-flex justify-content-center">
        <img class="image-detail" :src="pokemon.image" alt="">
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-sm-12">
        <h4 class="text-success">Tipo</h4>
        <div class="types">
          <div class="chip bg-info" v-for="(type, index) in pokemon.types" :key="index">
            <p class="text-primary">{{ type.name.toUpperCase() }}</p>
          </div>
        </div>
        <div class="abilities bg-light-green">
          <h4 class="text-success">Habilidades</h4>
          <p v-for="(ability, index) in pokemon.abilities" :key="index">
            {{ ability.name.toUpperCase() }}
          </p>
        </div>
        <div class="moves bg-light-blue">
          <h4 class="text-success">Movimientos</h4>
          <p v-for="(move, index) in pokemon.moves.slice(0, 3)" :key="index">
            {{ move.name.toUpperCase() }}
          </p>
        </div>
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
import { useRoute } from 'vue-router'
import PokemonServices from '@/services/PokemonServices'

export default {
  name: 'PokemonDetail',
  data() {
    return {
      loading: true,
      id: '',
      pokemon: {}
    }
  },
  async created() {
    const route = useRoute();
    this.id = route.params.id
    await this.getPokemon()
  },
  methods: {
    async getPokemon() {
      this.pokemon = await PokemonServices.getPokemonDetail(this.id)
      this.pokemon.types = await PokemonServices.getPokemonTypes(this.id); // Llamada a la función para obtener los tipos
      this.loading = false
      console.log('pokemon', this.pokemon)
    }
  }
}
</script>

<style>
.image-detail {
  width: 200px;
  height: 200px;
}

.types {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  padding: 5px 10px;
  border-radius: 15px;
  color: white;
}

.text-primary {
  color: blue;
}

.bg-light-green {
  background-color: #c7f4d4;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.bg-light-blue {
  background-color: #d8effe;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.bg-light-orange {
  background-color: #fbd7b7;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

</style>
