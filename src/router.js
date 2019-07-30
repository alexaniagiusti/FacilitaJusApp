import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue'
import Cadastro from './pages/Cadastro.vue'

import Usuario from './pages/usuario/Index.vue'
import Diligencias from './pages/diligencias/Index.vue'

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/home/usuario',
          name: 'Usuario',
          component: Usuario
        },
        {
          path: '/home/diligencias',
          name: 'Diligencias',
          component: Diligencias
        }
      ]
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: Cadastro,
    }
  ]
})
