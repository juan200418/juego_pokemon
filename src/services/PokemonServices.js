import axios from 'axios'

export default {
    async getPokemons() {
        return await axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(response =>{
            return response.data.results
        })
        .catch(
            error => {
                console.log(error)
            } 
        )
    },
    async getPokemonDetail(name) {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response =>{
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    }

}