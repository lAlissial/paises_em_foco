import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './views/HomePage/HomeComponent.vue'
import MapComponent from './views/MapPage/MapComponent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/map',
    name: 'map',
    component: MapComponent
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/AboutPage/AboutComponent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
