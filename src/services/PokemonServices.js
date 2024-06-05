import axios from "axios";

export default {
  async getPokemons() {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      return response.data.results;
    } catch (error) {
      console.log(error);
    }
  },
  async getPokemonDetail(name) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const types = response.data.types.map((type) => type.type.name); // Obtener el tipo de pokemon
      return { ...response.data, types }; // Retornar los detalles del Pokémon junto con los tipos
    } catch (error) {
      console.log(error);
    }
  },
  async getPokemonAbilities(pokemon) {
    try {
      const abilitiesUrls = pokemon.abilities.map((ability) => ability.url);
      const responses = await Promise.all(abilitiesUrls.map((url) => axios.get(url))); //promesa que se resuelve con un array de habilidades del pokemon
      return responses.map((response) => response.data); // Retorna las habilidades del pokemon
    } catch (error) {
      console.log(error);
    }
  },
  async getRandomPokemon() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const randomIndex = Math.floor(Math.random() * response.data.count);
    const randomPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomIndex + 1}`);
    return randomPokemon.data;
  },
  async getPokemonImage(name) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data.sprites.front_default;
  },
};