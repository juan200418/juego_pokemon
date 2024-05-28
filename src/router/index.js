import { createRouter, createWebHistory } from 'vue-router'
import PokemonsListView from '../views/PokemonsListView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PokemonsListView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
