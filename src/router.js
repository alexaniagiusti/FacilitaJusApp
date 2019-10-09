import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/Login.vue';
import ResetPassword from './pages/ResetPassword.vue';
import Home from './pages/Home.vue';
import Cadastro from './pages/Cadastro.vue';
import Usuario from './pages/Usuario.vue';
import SejaPremium from './pages/SejaPremium.vue';


// Diligências
import Diligencias from './pages/Diligencias.vue';
import DiligenciasEnviadas from './components/diligencias/DiligenciasEnviadas.vue';
import DiligenciasRecebidas from './components/diligencias/DiligenciasRecebidas.vue';
import VisualizarDiligenciaRecebida from './components/diligencias/recebidas/Visualizar.vue';
import VisualizarDiligenciaEnviada from './components/diligencias/enviadas/Visualizar.vue';
import EnviarDiligencia from './components/diligencias/Enviar.vue';

// Casos jurídicos
import CasosJuridicos from './pages/CasosJuridicos.vue';
import casosJuridicosRecibidos from './components/casos/CasosRecebidos.vue';
import EnviarCasoJuridico from './components/casos/Enviar.vue';

import VisualizarCasoRecebido from './components/casos/recebidos/Visualizar.vue';
import casosJuridicosEnviados from './components/casos/CasosEnviados.vue';
import VisualizarCasoEnviado from './components/casos/enviados/Visualizar.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  // mode: 'history',
  routes: [
    {
      path: '/reset/password/:token',
      name: 'resetPassword',
      component: ResetPassword,
      props: true,
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/perfil',
          name: 'Usuario',
          component: Usuario,
        },
        {
          path: '/seja-premium',
          name: 'sejapremium',
          component: SejaPremium,
        },
        {
          path: '/diligencias',
          name: 'Diligencias',
          component: Diligencias,
          children: [
            {
              path: '/diligencias/diligencias-enviadas',
              name: 'diligenciasEnviadas',
              component: DiligenciasEnviadas,
            },
            {
              path: '/diligencia/recebida/:id',
              name: 'visualizarDiligenciaRecebida',
              component: VisualizarDiligenciaRecebida,
              props: true,
            },
            {
              path: '/diligencias/diligencias-recebidas',
              name: 'diligenciasRecebidas',
              component: DiligenciasRecebidas,
            },
            {
              path: '/diligencia/enviada/:id',
              name: 'visualizarDiligenciaEnviada',
              component: VisualizarDiligenciaEnviada,
            },
            {
              path: '/diligencia/enviar',
              name: 'enviarDiligencia',
              component: EnviarDiligencia,
            },
            {
              path: '/enviar-caso',
              name: 'enviarCasoJuridico',
              component: EnviarCasoJuridico,
            },
          ],
        },
        {
          path: '/casos-juridicos',
          name: 'casosJuridicos',
          component: CasosJuridicos,
          children: [
            {
              path: '/casos-juridicos/recebidos',
              name: 'casosJuridicosRecebidos',
              component: casosJuridicosRecibidos,
            },
            {
              path: '/casos-juridicos/recebido/:id',
              name: 'visualizarCasoRecebido',
              component: VisualizarCasoRecebido,
              props: true,
            },
            {
              path: '/casos-juridicos/enviados',
              name: 'casosJuridicosEnviados',
              component: casosJuridicosEnviados,
            },
            {
              path: '/casos-juridicos/enviado/:id',
              name: 'visualizarCasoEnviado',
              component: VisualizarCasoEnviado,
            },
          ],
        },
      ],
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: Cadastro,
    },
  ],
});
