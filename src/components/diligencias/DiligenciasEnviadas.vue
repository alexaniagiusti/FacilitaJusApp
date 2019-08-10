<template>
	<div>
		<v-layout>
			<v-flex>
				<v-toolbar flat color="white" dark>
					<v-spacer></v-spacer>
					<v-toolbar-title class="font-weight-light black--text">Diligências Enviadas</v-toolbar-title>
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
					<v-tab-item><Listar v-if="this.showListar" :diligences="this.diligences" /></v-tab-item>

					<v-tab-item><Listar v-if="this.showListar" :diligences="this.diligences" /></v-tab-item>

					<v-tab-item><Listar v-if="this.showListar" :diligences="this.diligences" /></v-tab-item>

					<v-tab-item><Listar v-if="this.showListar" :diligences="this.diligences" /></v-tab-item>
				</v-tabs-items>
			</v-flex>
		</v-layout>
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
				diligences: '',
				tab: 0,
				showListar: false
			};
		},
		methods: {
			withOpenStatus() {
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/diligences/sent/open/${this.$store.getters.getUsuario.email}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
            console.log(res.data)
						this.diligences = res.data;
						this.showListar = true
					})
					.catch(e => console.log(e))
			},
			
			withAnsweredStatus(){
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/diligences/sent/answered/${this.$store.getters.getUsuario.email}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
						this.diligences = res.data;
						this.showListar = true
					})
					.catch(e => console.log(e))
			},

			withNegotiationStatus(){
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/diligences/sent/negotiation/${this.$store.getters.getUsuario.email}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
						this.diligences = res.data;
						this.showListar = true
					})
					.catch(e => console.log(e))
			},

			withFinishedStatus(){
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/diligences/sent/finished/${this.$store.getters.getUsuario.email}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
						this.diligences = res.data;
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