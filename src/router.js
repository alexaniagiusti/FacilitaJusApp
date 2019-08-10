import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue';
import Cadastro from './pages/Cadastro.vue';

import Usuario from './pages/Usuario.vue';
import Diligencias from './pages/Diligencias.vue';
import DiligenciasEnviadas from './components/diligencias/DiligenciasEnviadas.vue'
import DiligenciasRecebidas from './components/diligencias/DiligenciasRecebidas.vue'

// usuarios
import Atualizar from './components/usuario/Atualizar.vue';
import AreasDeAtuacao from './components/usuario/AreasDeAtuacao.vue';
import CidadesAtendidas from './components/usuario/CidadesAtendidas.vue';
import ServicosAtendidos from './components/usuario/ServicosAtendidos.vue';

//Diligências
import VisualizarDiligenciaRecebida from './components/diligencias/recebidas/Visualizar.vue'
import VisualizarDiligenciaEnviada from './components/diligencias/enviadas/Visualizar.vue'

//Casos jurídicos
import casosJuridicosRecibidos from './components/casos/CasosRecebidos.vue'

Vue.use(Router);

export default new Router({
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login,
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
							component: Atualizar,
						},
						{
							path: '/home/usuario/areas-de-atuacao',
							name: 'Áreas de Atuação',
							component: AreasDeAtuacao,
						},
						{
							path: '/home/usuario/cidades-atendidas',
							name: 'Cidades Atendidas',
							component: CidadesAtendidas,
						},
						{
							path: '/home/usuario/servicos-atendidos',
							name: 'Servicos Atendidos',
							component: ServicosAtendidos,
						},
					],
				},
				{
					path: '/home/diligencias',
					name: 'Diligencias',
					component: Diligencias,
					children: [
						{
							path: '/home/diligencias/diligencias-enviadas',
							name: 'diligenciasEnviadas',
							component: DiligenciasEnviadas,
						},
						{
							path: '/home/diligencia/recebida/:id',
							name: 'visualizarDiligenciaRecebida',
							component: VisualizarDiligenciaRecebida,
						},
						{
							path: '/home/diligencias/diligencias-recebidas',
							name: 'diligenciasRecebidas',
							component: DiligenciasRecebidas,
						},
						{
							path: '/home/diligencia/enviada/:id',
							name: 'visualizarDiligenciaEnviada',
							component: VisualizarDiligenciaEnviada,
						},
					],
				},
				{
					path: '/home/casos',
					children : [
						{
							path: '/home/casos/recebidos',
							name: 'casosJuridicosRecebidos',
							component: casosJuridicosRecibidos
						}
					]
				}
			],
		},
		{
			path: '/cadastro',
			name: 'cadastro',
			component: Cadastro,
		},
	],
});
