import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue'
import Cadastro from './pages/Cadastro.vue'

import Usuario from './pages/Usuario'
import Diligencias from './pages/Diligencias'
import DiligenciasGerais from './components/diligencias/Diligencias.vue'

//usuarios
import Atualizar from './components/usuario/Atualizar'
import AreasDeAtuacao from './components/usuario/AreasDeAtuacao'
import CidadesAtendidas from './components/usuario/CidadesAtendidas'
import ServicosAtendidos from './components/usuario/ServicosAtendidos'



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
          component: Usuario,
          children: [
            {
              path: '/home/usuario/atualizar',
              name: 'Atualizar Usuário',
              component: Atualizar
            },
            {
              path: '/home/usuario/areas-de-atuacao',
              name: 'Áreas de Atuação',
              component: AreasDeAtuacao
            },
            {
              path: '/home/usuario/cidades-atendidas',
              name: 'Cidades Atendidas',
              component: CidadesAtendidas
            },
            {
              path: '/home/usuario/servicos-atendidos',
              name: 'Servicos Atendidos',
              component: ServicosAtendidos
            }
          ]
        },
        {
          path: '/home/diligencias',
          name: 'Diligencias',
          component: Diligencias,
          children: [
            {
              path: '/home/diligencias/geral',
              name: 'Todas as Diligências',
              component: DiligenciasGerais
            }
          ]
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
  