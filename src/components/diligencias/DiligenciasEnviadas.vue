<template>
	<div>
		<v-layout>
			<v-flex>
				<v-toolbar flat color="white" dark>
					<v-spacer></v-spacer>
					<v-toolbar-title class="font-weight-light black--text">Serviços que você solicitou:</v-toolbar-title>
					<v-spacer></v-spacer>
				</v-toolbar>
				
				<v-divider></v-divider>
				
				<v-tabs class="hidden-sm-and-down" grow v-model="tab">
					<v-tab>
						<v-badge class="mr-2" color="green" overlap>
							<template v-slot:badge>
								<span v-if="diligences.open.length > 0">{{ diligences.open.length }}</span>
							</template>
							<v-icon>inbox</v-icon>
						</v-badge>
						Em aberto
					</v-tab>
					
					<v-tab>
						<v-badge class="mr-2" color="green" overlap>
							<template v-slot:badge>
								<span v-if="diligences.answered.length > 0">{{ diligences.answered.length }}</span>
							</template>
							<v-icon>comment</v-icon>
						</v-badge>
						Respondidos
					</v-tab>
					
					<v-tab>
						<v-badge class="mr-2" color="green" overlap>
							<template v-slot:badge>
								<span v-if="diligences.negotiation.length > 0">{{ diligences.negotiation.length }}</span>
							</template>
							<v-icon>forum</v-icon>
						</v-badge>
						Em Negociação
					</v-tab>
          
					<v-tab>
						<v-badge class="mr-2" color="green" overlap>
							<template v-slot:badge>
								<span v-if="diligences.waitingApproval.length > 0">{{ diligences.waitingApproval.length }}</span>
							</template>
							<v-icon>done</v-icon>
						</v-badge>
						Em Aproção
					</v-tab>
					
					<v-tab>
						<v-badge class="mr-2" color="green" overlap>
							<template v-slot:badge>
								<span v-if="diligences.finished.length > 0">{{ diligences.finished.length }}</span>
							</template>
							<v-icon>done_all</v-icon>
						</v-badge>
						Finalizados
					</v-tab>
				</v-tabs>
				
				<v-divider></v-divider>
				
				<v-tabs-items v-model="tab">
					<v-tab-item><Listar v-if="this.showListar" :diligences="this.diligences.open" /></v-tab-item>
					
					<v-tab-item><Listar v-if="this.showListar" :diligences="this.diligences.answered" /></v-tab-item>
					
					<v-tab-item><Listar v-if="this.showListar" :diligences="this.diligences.negotiation" /></v-tab-item>
					
					<v-tab-item><Listar v-if="this.showListar" :diligences="this.diligences.waitingApproval" /></v-tab-item>
					
					<v-tab-item><Listar v-if="this.showListar" :diligences="this.diligences.finished" /></v-tab-item>
				</v-tabs-items>
			</v-flex>
		</v-layout>
		<v-bottom-navigation
		v-model="tab"
		
		app
		class="hidden-lg-and-up"
		>
		<v-btn>
			<span v-if="tab === 0">Em aberto</span>

			<v-badge color="green" style="position: relative; top: -35px; z-index: 5">
				<template v-if="diligences.open.length > 0" v-slot:badge>{{diligences.open.length}}</template>
			</v-badge>

			<v-icon>
				inbox
			</v-icon>
		</v-btn>
		<v-btn>
			<span v-if="tab === 1">Respondidos</span>
			<v-badge color="green" style="position: relative; top: -35px; z-index: 5">
					<template v-if="diligences.answered.length > 0" v-slot:badge>{{diligences.answered.length}}</template>
			</v-badge>
			<v-icon>
				comment
			</v-icon>
		</v-btn>
		<v-btn>
			<span  v-if="tab === 2">Em negociação</span>
			<v-badge color="green" style="position: relative; top: -35px; z-index: 5">
					<template v-if="diligences.negotiation.length > 0" v-slot:badge>{{diligences.negotiation.length}}</template>
			</v-badge>
			<v-icon>
				forum
			</v-icon>
		</v-btn>
		<v-btn>
			<span  v-if="tab === 3">Em aprovação</span>
			<v-badge color="green" style="position: relative; top: -35px; z-index: 5">
					<template v-if="diligences.waitingApproval.length > 0" v-slot:badge>{{diligences.waitingApproval.length}}</template>
			</v-badge>
			<v-icon>
				done
			</v-icon>
		</v-btn>
		<v-btn>
			<span v-if="tab === 4">Finalizados</span>
			<v-badge color="green" style="position: relative; top: -35px; z-index: 5">
					<template v-if="diligences.finished.length > 0" v-slot:badge>{{diligences.finished.length}}</template>
			</v-badge>
			<v-icon>
				done_all
			</v-icon>
		</v-btn>
	</v-bottom-navigation>
</div>
</template>

<script>
	import axios from 'axios';
	import Listar from "./enviadas/Listar.vue";
	
	export default {
		components: {
			Listar
		},
		data() {
			return {
				diligences: {
					open: '',
					answered: '',
					negotiation: '',
					waitingApproval: '',
					finished: '',
				},
				tab: 0,
				showListar: false
			};
		},
		methods: {
			getDiligences(){
				this.$store.commit('setVueLoad', true)
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/diligences/all/sent`, 
				{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
				.then(res => {
					this.$store.commit('setVueLoad', false)
					this.diligences = res.data;
					this.showListar = true
					console.log(res.data);
				})
				.catch(e => console.log(e))	
			},
		},
		created(){
			this.getDiligences();
		}
		
	};
</script>

<style>
	.coluna {
		display: flex;
		flex-direction: column;
	}
	
	.chat {
		display: flex;
		width: 100%;
		height: 100vh;
		background: #fff;
	}
</style>