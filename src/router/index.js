import { createRouter, createWebHistory } from 'vue-router'; // Importa funciones necesarias de vue-router
import PokemonsListView from '../views/PokemonsListView.vue'; // Importa la vista de la lista de Pokémon
import PokemonDetail from '../views/PokemonDetail.vue'; // Importa la vista de los detalles del Pokémon
import JuegoPokemon from '../views/JuegoPokemon.vue'; // Importa la vista del juego de Pokémon

// Define las rutas para la aplicación
const routes = [
  {
    path: '/', // Ruta para la página de inicio
    name: 'home', // Nombre de la ruta
    component: PokemonsListView // Componente que se renderiza en esta ruta
  },
  {
    path: '/pokemon/:id', // Ruta para la vista de detalles del Pokémon, incluye un parámetro de ID
    name: 'detalle', // Nombre de la ruta
    component: PokemonDetail, // Componente que se renderiza en esta ruta
    props: true // Habilita el paso de props a este componente
  },
  {
    path: '/Juego', // Ruta para la vista del juego de Pokémon
    name: 'Juego', // Nombre de la ruta
    component: JuegoPokemon // Componente que se renderiza en esta ruta
  }
];

// Crea una instancia del router con el historial web y las rutas definidas
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Usa el historial web para manejar el enrutamiento
  routes // Define las rutas configuradas anteriormente
});

// Exporta la instancia del router para ser usada en la aplicación Vue
export default router;
