import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue';
import Cadastro from './pages/Cadastro.vue';

import Usuario from './pages/Usuario.vue';

// usuarios
import Atualizar from './components/usuario/Atualizar.vue';
import AreasDeAtuacao from './components/usuario/AreasDeAtuacao.vue';
import CidadesAtendidas from './components/usuario/CidadesAtendidas.vue';
import ServicosAtendidos from './components/usuario/ServicosAtendidos.vue';

//Diligências
import Diligencias from './pages/Diligencias.vue';
import DiligenciasEnviadas from './components/diligencias/DiligenciasEnviadas.vue'
import DiligenciasRecebidas from './components/diligencias/DiligenciasRecebidas.vue'
import VisualizarDiligenciaRecebida from './components/diligencias/recebidas/Visualizar.vue'
import VisualizarDiligenciaEnviada from './components/diligencias/enviadas/Visualizar.vue'

//Casos jurídicos
import CasosJuridicos from './pages/CasosJuridicos.vue';
import casosJuridicosRecibidos from './components/casos/CasosRecebidos.vue'

import VisualizarCasoRecebido from './components/casos/recebidos/Visualizar.vue'
import casosJuridicosEnviados from './components/casos/CasosEnviados.vue'
import VisualizarCasoEnviado from './components/casos/enviados/Visualizar.vue'

Vue.use(Router);

export default new Router({
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/login',
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
					children: [
						{
							path: '/perfil/atualizar',
							name: 'perfilUsuario',
							component: Atualizar,
						},
						{
							path: '/perfil/areas-de-atuacao',
							name: 'areasDeAtuacao',
							component: AreasDeAtuacao,
						},
						{
							path: '/perfil/cidades-atendidas',
							name: 'cidadesAtendidas',
							component: CidadesAtendidas,
						},
						{
							path: '/perfil/servicos-atendidos',
							name: 'servicosAtendidos',
							component: ServicosAtendidos,
						},
					],
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
					],
				},
				{
					path: '/casos-juridicos',
					name: 'casosJuridicos',
					component: CasosJuridicos,
					children : [
						{
							path: '/casos-juridicos/recebidos',
							name: 'casosJuridicosRecebidos',
							component: casosJuridicosRecibidos
						},
						{
							path: '/casos-juridicos/recebido/:id',
							name: 'visualizarCasoRecebido',
							component: VisualizarCasoRecebido
						},
						{
							path: '/casos-juridicos/enviados',
							name: 'casosJuridicosEnviados',
							component: casosJuridicosEnviados
						},
						{
							path: '/casos-juridicos/enviado/:id',
							name: 'visualizarCasoEnviado',
							component: VisualizarCasoEnviado
						}
					]
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
