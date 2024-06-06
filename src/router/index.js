import { createRouter, createWebHistory } from 'vue-router'
import PokemonsListView from '../views/PokemonsListView.vue'
import PokemonDetail from '../views/PokemonDetail.vue'
import JuegoPokemon from '../views/JuegoPokemon.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PokemonsListView
  },
  {
    path: '/pokemon/:id', 
    name: 'detalle',
    component: PokemonDetail,
    props: true 
  },
  {
    path: '/Juego',
    name: 'Juego',
    component: JuegoPokemon,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
