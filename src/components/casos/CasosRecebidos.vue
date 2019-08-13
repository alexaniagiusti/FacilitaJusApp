<template>
	<div>
		<v-layout>
			<v-flex>
				<v-toolbar flat color="white" dark>
					<v-spacer></v-spacer>
					<v-toolbar-title class="font-weight-light black--text">Casos Jurídicos Recebidos</v-toolbar-title>
					<v-spacer></v-spacer>
				</v-toolbar>

				<v-divider></v-divider>

				<v-tabs class="hidden-sm-and-down" grow v-model="tab">
					<v-tab @click="withOpenStatus">
						<v-icon>inbox</v-icon>Em aberto
					</v-tab>

					<v-tab @click="withAnsweredStatus">
						<v-icon>comment</v-icon>Respondidas
					</v-tab>

					<v-tab @click="withNegotiationStatus">
						<v-icon>forum</v-icon>Em Negociação
					</v-tab>

					<v-tab @click="withFinishedStatus">
						<v-icon>done_all</v-icon>Finalizadas
					</v-tab>
				</v-tabs>

				<v-divider></v-divider>

				<v-tabs-items v-model="tab">
					<v-tab-item><Listar v-if="this.showListar" :legalCases="this.legalCases" /></v-tab-item>

					<v-tab-item><Listar v-if="this.showListar" :legalCases="this.legalCases" /></v-tab-item>

					<v-tab-item><Listar v-if="this.showListar" :legalCases="this.legalCases" /></v-tab-item>

					<v-tab-item><Listar v-if="this.showListar" :legalCases="this.legalCases" /></v-tab-item>
				</v-tabs-items>
			</v-flex>
		</v-layout>
				<v-bottom-navigation
			v-model="tab"
			shift
			app
			class="hidden-lg-and-up"
		>
			<v-btn @click="withOpenStatus">
				<span>Em aberto</span>
				<v-icon>
						inbox
				</v-icon>
			</v-btn>
			<v-btn @click="withAnsweredStatus">
				<span>Respondidas</span>
				<v-icon>
					comment
				</v-icon>
			</v-btn>
			<v-btn @click="withNegotiationStatus">
				<span>
					Em negociação
				</span>
				<v-icon>
					forum
				</v-icon>
			</v-btn>
			<v-btn @click="withFinishedStatus">
				<span>Finalizadas</span>
				<v-icon>
					done_all
				</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>

<script>
	import axios from 'axios';
	import Listar from "./recebidos/Listar.vue";

	export default {
		components: {
			Listar
		},
		data() {
			return {
				legalCases: '',
				tab: 0,
				showListar: false
			};
		},
		methods: {
			withOpenStatus() {
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/legal-cases/received/open/${this.$store.getters.getUsuario.id}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
						this.legalCases = res.data;
						this.showListar = true
					})
					.catch(e => console.log(e))
			},
			
			withAnsweredStatus(){
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/legal-cases/received/answered/${this.$store.getters.getUsuario.id}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
						this.legalCases = res.data;
						this.showListar = true
					})
					.catch(e => console.log(e))
			},

			withNegotiationStatus(){
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/legal-cases/received/negotiation/${this.$store.getters.getUsuario.id}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
						this.legalCases = res.data;
						this.showListar = true
					})
					.catch(e => console.log(e))
			},

			withFinishedStatus(){
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/legal-cases/received/finished/${this.$store.getters.getUsuario.id}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
						this.legalCases = res.data;
						this.showListar = true
					})
					.catch(e => console.log(e))
			}
			
		},

		mounted() {
			this.withOpenStatus();
		},
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