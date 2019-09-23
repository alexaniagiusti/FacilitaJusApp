<template>
	<div>
		<v-layout>
			<v-flex>
				<v-toolbar flat color="white" dark>
					<v-spacer></v-spacer>
					<span class="font-weight-light black--text">Serviços que você está habilitado(a) para resonder:</span>
					<v-spacer></v-spacer>
				</v-toolbar>

				<v-divider></v-divider>

				<v-tabs class="hidden-sm-and-down" grow v-model="tab">
					<v-tab @click="withOpenStatus">
						<v-icon>inbox</v-icon>Em aberto
					</v-tab>

					<v-tab @click="withAnsweredStatus">
						<v-icon>comment</v-icon>Respondidos
					</v-tab>

					<v-tab @click="withNegotiationStatus">
						<v-icon>forum</v-icon>Em Negociação
					</v-tab>

					<v-tab @click="withFinishedStatus">
						<v-icon>done_all</v-icon>Finalizados
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
				<span>Respondidos</span>
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
				<span>Finalizados</span>
				<v-icon>
					done_all
				</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>

<script>
	import axios from 'axios';
	import Listar from "./recebidas/Listar";

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
				this.$store.commit('setVueLoad', true)
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/diligences/received/open/${this.$store.getters.getUsuario.id}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
						this.$store.commit('setVueLoad', false)
						this.diligences = res.data;
						this.verifyDiligencesExists('Não há serviços em aberto.');
						this.showListar = true
					})
					.catch(e => console.log(e))
			},

			withAnsweredStatus(){
				this.$store.commit('setVueLoad', true)
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/diligences/received/answered/${this.$store.getters.getUsuario.id}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
						this.$store.commit('setVueLoad', false)
						this.diligences = res.data;
						this.verifyDiligencesExists('Não há serviços respondidos.');
						this.showListar = true
					})
					.catch(e => console.log(e))
			},

			withNegotiationStatus(){
				this.$store.commit('setVueLoad', true)
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/diligences/received/negotiation/${this.$store.getters.getUsuario.id}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
						this.$store.commit('setVueLoad', false)
						this.diligences = res.data;
						this.verifyDiligencesExists('Não há serviços em negociação.');
						this.showListar = true
					})
					.catch(e => console.log(e))
			},

			withFinishedStatus(){
				this.$store.commit('setVueLoad', true)
				this.showListar = false
				axios.get(`${this.$store.getters.api}/api/v1/diligences/received/finished/${this.$store.getters.getUsuario.id}`, 
					{headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
					.then(res => {
						this.$store.commit('setVueLoad', false)
						this.diligences = res.data;
						this.verifyDiligencesExists('Não há serviços finalizados.');
						this.showListar = true
					})
					.catch(e => console.log(e))
			},

			verifyDiligencesExists(message){
				if(this.diligences.length <= 0){
					this.$store.dispatch("snackbar_warning", message);
					this.$store.dispa
				}
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