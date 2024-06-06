<template>
  <div class="row">
    <div class="col-sm-12 d-flex justify-content-center">
      <h3 class="text-primary">¿QUIÉN ES ESE POKÉMON?</h3>
    </div>
  </div>
  <div v-if="!loading">
    <div class="row">
      <div class="col-sm-10 d-flex justify-content-center">
        <div class="container-image">
          <img v-if="!showResult" class="hidden-image" :src="correct.image" alt="" />
          <img v-if="showResult" :src="correct.image" alt="" />
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div v-for="option in pokemons" :key="option.id" class="col-sm-6 d-flex justify-content-center">
        <button
          class="btn btn-primary mt-2 btn-option"
          :disabled="disabledOptions"
          @click="validateCorrect(option.id)"
        >
          {{ option.name }}
        </button>
      </div>
    </div>
    <div v-if="showResult">
      <div class="row">
        <div v-if="result" class="col-sm-12 d-flex justify-content-center">
          <h4 class="text-success">¡Correcto!</h4>
        </div>
        <div v-else class="col-sm-12 d-flex justify-content-center">
          <h4 class="text-danger">Incorrecto</h4>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-center">
          <h4>El pokémon correcto es {{ correct.name.toUpperCase() }}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-center">
          <button class="btn btn-success btn-option" @click="getPokemonList()">
            Volver a intentar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="row d-flex justify-content-center align-items-center container-loader">
      <h4>Cargando...</h4>
    </div>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices';

export default {
  name: "juegoPokemon",
  data() {
    return {
      pokemons: [],
      pos: -1,
      correct: {},
      showResult: false,
      result: false,
      disabledOptions: false,
      loading: true
    };
  },
  mounted() {
    this.getPokemonList();
  },
  methods: {
    async getPokemonList() {
      this.loading = true;
      this.disabledOptions = false;
      this.showResult = false;
      this.pokemons = await PokemonServices.getListForGame();
      setTimeout(() => {
        this.pos = Math.floor(Math.random() * 4);
        this.correct = this.pokemons[this.pos];
        this.loading = false;
      }, 1000);
    },
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
  filter: brightness(0);
}
.container-image {
  position: relative;
  width: 200px;
  height: 200px;
}
.container-loader {
  height: 200px;
}
</style>
