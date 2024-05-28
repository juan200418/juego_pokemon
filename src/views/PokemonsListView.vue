<template>
  <div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <h3 class="text-primary">Listado de Pokemons</h3>
      </div>
    </div>
    <div class="row p-3 mt-3 mb-3 d-flex justify-content-center">
      <div v-for="pokemon in pokemons" class="col-sm-10">
        <div @click="watchDetail(pokemon.name)" class="card d-flex justify-content-center align-items-center mb-3">
          <div class="card-title">
            <h4>
              {{ pokemon.name }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PokemonServices from '@/services/PokemonServices'
export default {
  name: 'PokemonsListView',
  components: {
    
  },
  data() {
    return {
      pokemons: [],
      selectedPokemon: {}
    }
  },
  async created(){
    this.pokemons = await PokemonServices.getPokemons();
    console.log(this.pokemons)
  },
  methods: {
    async watchDetail(name){
      this.selectedPokemon = await PokemonServices.getPokemonDetail(name)
      console.log('Pokemon', this.selectedPokemon)
    }
  }
}
</script>
