<template>
	<div class="expandeDiv" style="flex-direction: column">
		<v-flex xs12>
			<v-toolbar dense class="elevation-3">
				<div class="linhaSemQuebra">
					<h3 class="text-xs-center font-weight-light">Serviços Atendidos</h3>
					<v-spacer></v-spacer>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn v-on="on" flat to="/home/usuario/cidades-atendidas" icon>
								<v-icon class="animated delay-2s infinite pulse" color="green">
									arrow_forward
								</v-icon>
							</v-btn>
						</template>
						<span>Cidades Atendidas</span>
					</v-tooltip>
				</div>
			</v-toolbar>
		</v-flex>

		<v-layout>
			<v-flex v-if="carregandoDados" xs12>
				<div class="mt-5 mb-5" style="display: flex; width: 100%; justify-content: center">
					<v-progress-circular indeterminate color="red"></v-progress-circular>
				</div>
			</v-flex>

			<v-flex xs12>
				<v-list pa-0 ma-0>
					<template v-for="(servicoAtendido, index) in itemsSelecionados">
						<v-list-item @click="" :key="servicoAtendido.service">
							<v-avatar class="ml-1">
								<v-icon color="green">done</v-icon>
							</v-avatar>
							<v-list-item-content>
								<v-list-item-title>
									{{ servicoAtendido.service }}
								</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action>
								<v-btn color="red" icon @click="removeItem(servicoAtendido.id)">
									<v-icon size="18" color="grey darken-2">
										delete
									</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
						<v-divider :key="index"></v-divider>
					</template>
				</v-list>
			</v-flex>
		</v-layout>

		<v-layout justify-center>
			<v-flex class="pa-2" xs12>

				<v-card class="arredondaBorda">
					<div class="expandeDiv">
						<v-combobox :items="items" v-model="itemsSelecionados" return-object item-value="service"
							item-text="service" :hide-selected="true" label="Serviços Atendidos" :multiple="true"
							:small-chips="true" />
					</div>
				</v-card>

				<v-flex xs12>
					<div class="linhaSemQuebra">
						<v-btn @click="salvar" block color="green" class="white--text mr-2">Salvar
							<v-icon color="white" size="18" class="ml-1">save</v-icon>
							<v-progress-circular class="ml-1" indeterminate size="18" color="white"
								v-if="carregandoSalvar"></v-progress-circular>
						</v-btn>
					</div>
				</v-flex>

			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				carregandoDados: true,
				items: [],
				itemsSelecionados: [],
				carregandoSalvar: false,
			};
		},
		methods: {
			removeItem(id) {
				const selecionados = this.itemsSelecionados;
				const novos = [];

				selecionados.map((item) => {
					if (item.id === id) {
					} else {
						novos.push(item);
					}
				});

				this.itemsSelecionados = novos;
			},
			pegaItemsSeecionados() {

				axios.get(`${this.$store.getters.api}/api/v1/users/services/${this.$store.getters.getUsuario.id}`, { headers: { Authorization: `${this.$store.getters.getToken}` } })
					.then((res) => {
						const ids_marcados = res.data.services;
						const todos = this.items;
						const itemsMarcados = [];

						todos.map((item) => {
							ids_marcados.map((i) => {
								if (i.id === item.id) {
									itemsMarcados.push(item);
								}
							});
						});

						this.itemsSelecionados = itemsMarcados;
						this.carregandoDados = false
					});
			},
			pegaDados() {

				axios.get(`${this.$store.getters.api}/api/v1/services`, { headers: { Authorization: `${this.$store.getters.getToken}` } })
					.then((res) => {
						this.items = res.data;
					});
				this.pegaItemsSeecionados();
			},
			salvar() {
				this.carregandoSalvar = true;

				const service_id = [];
				const { itemsSelecionados } = this;
				itemsSelecionados.map(item => service_id.push(item.id));

				const atualizacao = {
					service_id,
				};

				axios.put(`${this.$store.getters.api}/api/v1/users/services/${id}`, atualizacao, { headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } })
					.then((res) => {
						this.carregandoSalvar = false;
						this.$store.dispatch('snackbar_success', 'Atualizado Com Sucesso!.');
					})
					.catch((err) => {
						this.carregandoSalvar = false;
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