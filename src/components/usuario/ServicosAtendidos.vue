<template>
	<v-container fluid>
		<v-layout class="arredondaBorda" ma-1 pa-2 elevation-2 row wrap>

			<v-flex xs12 md4 v-for="service in items" :key="service.id">
				<v-checkbox v-model="itemsSelecionados" :label="service.service" :value="service.id"></v-checkbox>
			</v-flex>

			<v-flex xs12>
				<v-btn block class="green white--text" @click="salvar">Salvar</v-btn>
			</v-flex>

		</v-layout>
	</v-container>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				items: [],
				itemsSelecionados: [],
			};
		},
		watch: {
			//itemsSelecionados() {this.salvar()}
		},
		methods: {
			pegaItemsSelecionados() {
				axios.get(`${this.$store.getters.api}/api/v1/users/services/${this.$store.getters.getUsuario.id}`, { headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } })
					.then((res) => {
						const ids_marcados = res.data.services;
						const todos = this.items;
						const itemsMarcados = [];

						todos.map((item) => {
							ids_marcados.map((i) => {
								if (i.id === item.id) {
									itemsMarcados.push(item.id);
								}
							});
						});

						this.itemsSelecionados = itemsMarcados;
						this.carregandoDados = false
					});
			},
			pegaDados() {
				this.$store.commit('setVueLoad', true)
				axios.get(`${this.$store.getters.api}/api/v1/services`, { headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } })
					.then((res) => {
						this.$store.commit('setVueLoad', false)
						this.items = res.data;
					})
					.catch((erro) => {
						this.$store.commit('setVueLoad', false)
						this.$store.dispatch('snackbar_error', 'Erro: ' + erro)
					})
				this.pegaItemsSelecionados();
			},
			salvar() {
				this.$store.commit('setVueLoad', true)

				const data = {
					service_id: this.itemsSelecionados
				};

				axios.put(`${this.$store.getters.api}/api/v1/users/services/${this.$store.getters.getUsuario.id}`, data, { headers: { Authorization: `Bearer ${this.$store.getters.getUsuario.token}` } })
					.then((res) => {
						this.$store.commit('setVueLoad', false)
						this.$store.dispatch('snackbar_success', 'Atualizado Com Sucesso!.');
					})
					.catch((err) => {
						this.$store.commit('setVueLoad', false)
						this.$store.dispatch('snackbar_error', err);
					});
			},
		},
		created() {
			this.pegaDados();
		},
	};
</script>

<style>
	.arredondaBorda {
		border-radius: 6px;
		padding: 10px;
	}
</style>