<template>
	<div class="expandeDiv" style="flex-direction: column">
		<v-flex xs12>
			<v-toolbar dense class="elevation-3">
				<div class="linhaSemQuebra">
					<h3 class="text-xs-center font-weight-light">Cidades Atendidas</h3>
					<v-spacer></v-spacer>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn v-on="on" flat to="/home/usuario/areas-de-atuacao" icon>
								<v-icon class="animated delay-1s infinite heartBeat" color="green">
									arrow_forward
								</v-icon>
							</v-btn>
						</template>
						<span>Áreas de Atuação</span>
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

			<v-flex v-else xs12>
				<v-list pa-0 ma-0>
					<template v-for="(cidadesAtendidas, index) in itemsSelecionados">
						<v-list-item @click="" :key="cidadesAtendidas.city">
							<v-avatar class="ml-1">
								<v-icon color="green">done</v-icon>
							</v-avatar>
							<v-list-item-content>
								<v-list-item-title>
									{{ cidadesAtendidas.city }} - {{ cidadesAtendidas.state }}
								</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action>
								<v-btn color="red" icon @click="removeItem(cidadesAtendidas.id)">
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
						<v-combobox :items="items" v-model="itemsSelecionados" return-object item-value="city"
							item-text="city" :hide-selected="true" label="Cidades Atendidas" :multiple="true"
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

				<!-- novo aqui -->
				<v-flex xs12>
					<v-card class="arredondaBorda">
						<div class="expandeDiv">
							<v-autocomplete
								v-model="itemsSelecionados"
								:items="items"
								chips
								return-object
								label="Cidades Atendidas"
								item-text="city"
								item-value="city"
							>
								<template v-slot:selection="data">
									<v-chip
										v-bind="data.item"
										:input-value="data.city"
										close
										@click="data.item.city"
										@click:close="removeItem(data.item.id)"
									>
										<v-avatar left>
											<v-icon>place</v-icon>
										</v-avatar>
										{{ data.item.city }} - {{ data.item.state }}
									</v-chip>
								</template>
								<template v-slot:item="data">
									<template v-if="typeof data.item !== 'object'">
										<v-list-item-content v-text="data.item.city"></v-list-item-content>
									</template>
									<template v-else>
										<v-list-item-avatar>
											<v-icon>place</v-icon>
										</v-list-item-avatar>
										<v-list-item-content>
											<v-list-item-title v-html="data.item.city"></v-list-item-title>
											<v-list-item-subtitle v-html="data.item.state"></v-list-item-subtitle>
										</v-list-item-content>
									</template>
								</template>
							</v-autocomplete>
						</div>
					</v-card>
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
				itemsSelecionado: '',
				itemsSelecionados: [],
				carregandoSalvar: false,
			};
		},
		watch: {
			itemsSelecionado(val) {

			}
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
			pegaItemsSelecionados() {

				axios.get(`${this.$store.getters.api}/api/v1/users/cities/${this.$store.getters.getUsuario.id}`,
					{ headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } })
					.then((res) => {
						const ids_marcados = res.data.cities;
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

				axios.get(this.$store.getters.api + '/api/v1/cities',
					{ headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } })
					.then((res) => {
						this.items = res.data;
						this.pegaItemsSelecionados();
					});
			},
			salvar() {
				this.carregandoSalvar = true;

				const service_id = [];
				const { itemsSelecionados } = this;
				itemsSelecionados.map(item => service_id.push(item.id));

				const data = {
					city_id: service_id,
				};

				axios.put(`${this.$store.getters.api}/api/v1/users/cities/${this.$store.getters.getUsuario.id}`, data,
					{ headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } })
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