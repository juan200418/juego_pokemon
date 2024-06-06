<template>
  <div class="row">
  </div>
  <div v-if="pokemons.length > 0">
    <div class="row d-flex justify-content-center">
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="col-sm-8">
        <div class="card card-pokemon" @click="goToDetail(pokemon.id)">
          <div class="card-image">
            <img :src="pokemon.image" alt="" width="100px"/>
          </div>
          <div class="col-3 card-title">
            <h4>{{ pokemon.name }}</h4>
          </div>
        </div>
      </div>
    </div>
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
      pokemons: [],
      page: 0,
      start: 1,
      end: 10,
    };
  },
  async created() {
    await this.getPokemonsList(this.start, this.end);
    console.log(this.pokemons);
  },
  methods: {
    async nextPage() {
      if (this.page < 65) {
        this.pokemons = [];
        this.page = this.page + 1;
        this.start = this.page * 10 + 1;
        this.end = (this.page + 1) * 10;
        await this.getPokemonsList(this.start, this.end);
      }
    },
    async previousPage() {
      if (this.page > 0) {
        this.pokemons = [];
        this.page = this.page - 1;
        this.start = this.page * 10 + 1;
        this.end = (this.page + 1) * 10;
        await this.getPokemonsList(this.start, this.end);
      }
    },
    async getPokemonsList(start, end) {
      this.pokemons = await PokemonServices.getPokemonList(start, end);
    },
    goToDetail(pokemonId) {
      this.$router.push({
        name: 'detalle',
        params: { id: pokemonId }
      });
    }
  },
};
</script>
