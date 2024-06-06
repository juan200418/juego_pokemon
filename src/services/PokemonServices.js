import axios from "axios"; // Importa axios para hacer solicitudes HTTP

export default {
  // Método para obtener una lista de Pokémon dados un rango de IDs
  async getPokemonList(start, end) {
    const gottenPokemons = []; // Array para almacenar los Pokémon obtenidos
    for (let i = start; i <= end; i++) {
      const itemPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(response => response.data) // Obtiene los datos de la respuesta
        .catch(error => {
          console.log(error); // Maneja errores en la solicitud
        });

      // Si se obtuvo el Pokémon, agregarlo a la lista con su id, nombre e imagen
      if (itemPokemon) {
        const addedPokemon = {
          id: itemPokemon.id,
          name: itemPokemon.name,
          image: itemPokemon.sprites.other.dream_world.front_default,
        };
        gottenPokemons.push(addedPokemon);
      }
    }
    return gottenPokemons; // Devuelve la lista de Pokémon obtenidos
  },

  // Método para obtener los detalles de un Pokémon por su ID
  async getPokemonDetail(id) {
    const gottenPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.log(error);
      });

    // Si se obtuvo el Pokémon, estructura y devuelve sus detalles
    if (gottenPokemon) {
      let pokemon = {
        id: gottenPokemon.id,
        name: gottenPokemon.name,
        image: gottenPokemon.sprites.other.dream_world.front_default,
        abilities: await this.getAbilities(gottenPokemon.abilities), // Llama a método para obtener habilidades
        moves: await this.getMoves(gottenPokemon.moves), // Llama a método para obtener movimientos
        stats: await this.getStats(gottenPokemon.stats), // Llama a método para obtener estadísticas
      };
      return pokemon;
    }
  },

  // Método para obtener una lista de Pokémon para el juego
  async getListForGame() {
    const list = await this.idForGame(); // Obtiene la lista de IDs de Pokémon para el juego
    let pokemons = [];
    for (const element of list) {
      const gottenPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${element}`)
        .then(response => response.data)
        .catch(error => {
          console.log(error);
        });

      // Si se obtuvo el Pokémon, agregarlo a la lista con su id, nombre e imagen
      if (gottenPokemon) {
        let pokemon = {
          id: gottenPokemon.id,
          name: gottenPokemon.name,
          image: gottenPokemon.sprites.other.dream_world.front_default,
        };
        pokemons.push(pokemon);
      }
    }
    return pokemons; // Devuelve la lista de Pokémon para el juego
  },

  // Método para obtener las habilidades de un Pokémon
  async getAbilities(abilities) {
    let gottenAbilities = [];
    for (const element of abilities) {
      const abilityData = await axios.get(`${element.ability.url}`)
        .then(response => response.data)
        .catch(error => {
          console.log(error);
        });

      // Si se obtuvieron los datos de la habilidad, agrega su nombre y descripción
      if (abilityData) {
        let texts = abilityData.flavor_text_entries;
        let description = texts.find(text => text.language.name === "es");
        gottenAbilities.push({
          name: element.ability.name,
          description: description ? description.flavor_text : "No description available"
        });
      }
    }
    return gottenAbilities; // Devuelve la lista de habilidades
  },

  // Método para obtener los movimientos de un Pokémon
  async getMoves(moves) {
    let gottenMoves = [];
    for (const element of moves) {
      const moveData = await axios.get(`${element.move.url}`)
        .then(response => response.data)
        .catch(error => {
          console.log(error);
        });

      // Si se obtuvieron los datos del movimiento, agrega su nombre y descripción
      if (moveData) {
        let texts = moveData.flavor_text_entries;
        let description = texts.find(text => text.language.name === "es");
        gottenMoves.push({
          name: element.move.name,
          description: description ? description.flavor_text : "No description available"
        });
      }
    }
    return gottenMoves; // Devuelve la lista de movimientos
  },

  // Método para obtener las estadísticas de un Pokémon
  async getStats(stats) {
    let gottenStats = [];
    for (const stat of stats) {
      gottenStats.push({
        name: stat.stat.name,
        base_stat: stat.base_stat
      });
    }
    return gottenStats; // Devuelve la lista de estadísticas
  },

  // Método para obtener una lista de IDs de Pokémon para el juego
  async idForGame() {
    // Esta función debería devolver una lista de IDs de Pokémon para el juego. 
    // Aquí hay una implementación de ejemplo que devuelve los primeros 10 IDs.
    // Puedes modificarla para ajustarse a tus necesidades.
    let ids = [];
    for (let i = 1; i <= 151; i++) {
      ids.push(i);
    }
    return ids; // Devuelve la lista de IDs
  },

  // Método para obtener los tipos de un Pokémon por su ID
  async getPokemonTypes(id) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = response.data;
    const types = data.types.map(type => {
      return {
        name: type.type.name
      };
    });
    return types; // Devuelve la lista de tipos
  }
};
