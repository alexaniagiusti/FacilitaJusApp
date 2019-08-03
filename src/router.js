import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue'
import Cadastro from './pages/Cadastro.vue'

import Usuario from './pages/Usuario'
import Diligencias from './pages/Diligencias'

//usuarios
import Atualizar from './components/usuario/Atualizar'
import AreasDeAtuacao from './components/usuario/AreasDeAtuacao'
import CidadesAtendidas from './components/usuario/CidadesAtendidas'
import ServicosAtendidos from './components/usuario/ServicosAtendidos'

//Visualização de diligencias
import DiligenciasEnviadas from './components/diligencias/visualizarDiligencias/DiligenciasEnviadas'
import DiligenciasRespondidas from './components/diligencias/visualizarDiligencias/DiligenciasRespondidasPeloUsuario'
import DiligenciasPorUsuario from './components/diligencias/visualizarDiligencias/DiligenciasPorUsuario'
import ListarDiligencias from './components/diligencias/visualizarDiligencias/ListarDiligencias'

//Diligencias
import CadastrarDiligencia from './components/diligencias/CadastrarDiligencias'
import ChatDeDiligencias from './components/diligencias/ChatDeDiligencias'
import PegarDiligencia from './components/diligencias/PagarDiligencias'

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
  