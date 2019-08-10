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
						<v-icon>drafts</v-icon>Em aberto
					</v-tab>

					<v-tab @click="withAnsweredStatus">
						<v-icon>drafts</v-icon>Respondidas
					</v-tab>

					<v-tab @click="withNegotiationStatus">
						<v-icon>drafts</v-icon>Em Negociação
					</v-tab>

					<v-tab @click="withFinishedStatus">
						<v-icon>drafts</v-icon>Finalizadas
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
                        console.log(res.data)
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
						console.log(res.data)
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
						console.log(res.data)
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
						console.log(res.data)
						this.legalCases = res.data;
						this.showListar = true
					})
					.catch(e => console.log(e))
			}
			
		},

		mounted() {
            console.log('component ok!')
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