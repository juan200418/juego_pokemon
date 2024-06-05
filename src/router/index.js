import { createRouter, createWebHistory } from 'vue-router'
import PokemonsListView from '../views/PokemonsListView.vue'
import PokemonDetail from '../views/PokemonDetail.vue'
import juegoPokemon from '../views/JuegoPokemon.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: PokemonsListView
  },
  {
    path: '/pokemon/:name', 
    name: 'detalle',
    component: PokemonDetail,
    props: true 
  },
  {
    path: '/juego',
    name: 'juego',
    component: juegoPokemon,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
