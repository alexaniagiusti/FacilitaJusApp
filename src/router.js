import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue'
import Cadastro from './pages/Cadastro.vue'
import EditarPerfil from './pages/Perfil.vue'

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
          path: '/home/editarperfil',
          name: 'Editar Perfil',
          component: EditarPerfil
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
