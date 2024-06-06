import axios from "axios";

export default {
  async getPokemonList(start, end) {
    const gottenPokemons = [];
    for (let i = start; i <= end; i++) {
      const itemPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(response => response.data)
        .catch(error => {
          console.log(error);
        });

      if (itemPokemon) {
        const addedPokemon = {
          id: itemPokemon.id,
          name: itemPokemon.name,
          image: itemPokemon.sprites.other.dream_world.front_default,
        };
        gottenPokemons.push(addedPokemon);
      }
    }
    return gottenPokemons;
  },

  async getPokemonDetail(id) {
    const gottenPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.log(error);
      });

    if (gottenPokemon) {
      let pokemon = {
        id: gottenPokemon.id,
        name: gottenPokemon.name,
        image: gottenPokemon.sprites.other.dream_world.front_default,
        abilities: await this.getAbilities(gottenPokemon.abilities),
        moves: await this.getMoves(gottenPokemon.moves),
        stats: await this.getStats(gottenPokemon.stats),
      };
      return pokemon;
    }
  },

  async getListForGame() {
    const list = await this.idForGame();
    let pokemons = [];
    for (const element of list) {
      const gottenPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${element}`)
        .then(response => response.data)
        .catch(error => {
          console.log(error);
        });

      if (gottenPokemon) {
        let pokemon = {
          id: gottenPokemon.id,
          name: gottenPokemon.name,
          image: gottenPokemon.sprites.other.dream_world.front_default,
        };
        pokemons.push(pokemon);
      }
    }
    return pokemons;
  },

  async getAbilities(abilities) {
    let gottenAbilities = [];
    for (const element of abilities) {
      const abilityData = await axios.get(`${element.ability.url}`)
        .then(response => response.data)
        .catch(error => {
          console.log(error);
        });

      if (abilityData) {
        let texts = abilityData.flavor_text_entries;
        let description = texts.find(text => text.language.name === "es");
        gottenAbilities.push({
          name: element.ability.name,
          description: description ? description.flavor_text : "No description available"
        });
      }
    }
    return gottenAbilities;
  },

  async getMoves(moves) {
    let gottenMoves = [];
    for (const element of moves) {
      const moveData = await axios.get(`${element.move.url}`)
        .then(response => response.data)
        .catch(error => {
          console.log(error);
        });

      if (moveData) {
        let texts = moveData.flavor_text_entries;
        let description = texts.find(text => text.language.name === "es");
        gottenMoves.push({
          name: element.move.name,
          description: description ? description.flavor_text : "No description available"
        });
      }
    }
    return gottenMoves;
  },

  async getStats(stats) {
    let gottenStats = [];
    for (const stat of stats) {
      gottenStats.push({
        name: stat.stat.name,
        base_stat: stat.base_stat
      });
    }
    return gottenStats;
  },

  async idForGame() {
    // Esta función debería devolver una lista de IDs de Pokémon para el juego. 
    // Aquí hay una implementación de ejemplo que devuelve los primeros 10 IDs.
    // Puedes modificarla para ajustarse a tus necesidades.
    let ids = [];
    for (let i = 1; i <= 10; i++) {
      ids.push(i);
    }
    return ids;
  },
  async getPokemonTypes(id) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = response.data;
    const types = data.types.map(type => {
      return {
        name: type.type.name
      };
    });
    return types;
  }
  
};
