<template>
	<div class="expandeDiv">
		<v-layout justify-left>
			<v-flex xs12>
				<v-toolbar dense class="elevation-3">
					<div class="linhaSemQuebra">
						<h3 class="text-xs-center font-weight-light">Dados do perfil</h3>
						<v-spacer></v-spacer>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn v-on="on" flat to="/home/usuario/servicos-atendidos" icon>
									<v-icon class="animated delay-2s infinite heartBeat" color="green">arrow_forward
									</v-icon>
								</v-btn>
							</template>
							<span>Serviços Atendidos</span>
						</v-tooltip>
					</div>
				</v-toolbar>
				<v-card class="pa-2">
					<div class="expandeDiv">
						<v-flex xs12>
							<v-flex xs12>
								<v-text-field label="nome" append-icon="account_circle" v-model="perfil.name" />
							</v-flex>
							<v-flex xs12>
								<v-text-field label="email" v-model="perfil.email" />
							</v-flex>

							<v-flex xs12>
								<v-text-field v-mask="masks.cpf" label="CPF" v-model="perfil.cpf" />
							</v-flex>

							<v-flex xs12>
								<v-select single-line menu-props="auto" label="Sexo" hide-details :items="sexOptions"
									v-model="perfil.sex" />
							</v-flex>

							<v-flex xs12>
								<v-text-field v-mask="masks.nascimento" class="mt-4" label="Nascimento"
									v-model="perfil.birthdate" />
							</v-flex>

							<v-flex xs12>
								<v-text-field v-mask="masks.telefone" label="Telefone" v-model="perfil.phone_1" />
							</v-flex>

							<v-flex xs12>

								<v-text-field v-mask="masks.cep" label="CEP" v-model="perfil.postal_code" @blur="pesquisaCep" />

							</v-flex>

							<v-flex xs12>
								<v-text-field label="Endereço" v-model="perfil.street" />
							</v-flex>

							<v-flex xs12>
								<v-text-field id="number" label="Número" v-model="perfil.number" />
							</v-flex>

							<v-flex xs12>
								<v-text-field label="Bairro" v-model="perfil.neighborhood" />
							</v-flex>

							<v-flex xs12>
								<v-text-field label="Cidade" v-model="perfil.city" />
							</v-flex>

							<v-flex xs12>
								<v-text-field label="Estado" v-model="perfil.state" />
							</v-flex>
						</v-flex>
					</div>
				</v-card>
				<v-flex xs12>
					<div class="linhaSemQuebra">

						<v-btn :disabled="carregandoSalvar" @click="salvarPerfil" block color="green"
							class="white--text">

							Salvar
							<v-icon color="white" size="18" class="ml-1">save</v-icon>
							<v-progress-circular class="ml-1" indeterminate size="18" color="white"
								v-if="carregandoSalvarPerfil"></v-progress-circular>
						</v-btn>
					</div>
				</v-flex>
			</v-flex>
		</v-layout>
	</div>

</template>

<script>
	import axios from "axios";
	import { mask } from "vue-the-mask";

	export default {
		directives: {
			mask
		},
		data() {
			return {
				masks: {
					cpf: "###.###.###-##",
					nascimento: "##/##/####",
					telefone: "(##) # ####-####",
					cep: "#####-###"
				},
				sexOptions: ["Masculino", "Feminino"],
				perfil: {
					name: "",
					email: "",
					cpf: "",
					sex: "",
					birthdate: "",
					phone_1: "",
					postal_code: "",
					street: "",
					number: "",
					neighborhood: "",
					city: "",
					state: ""
				},
				teste: "",
				carregandoSalvarPerfil: false
			};
		},
		picker: new Date().toISOString().substr(0, 10),
		methods: {
			pegaDadosDoPerfil() {
				let perfil = JSON.parse(sessionStorage.usuario);
				if (perfil.birthdate !== null) {
					const formatBirthDate = perfil.birthdate.split("-");
					const formatedBirtdate = `${formatBirthDate[2]}/${formatBirthDate[1]}/${
						formatBirthDate[0]
						}`;
					console.log("teste: " + formatedBirtdate);
					perfil.birthdate = formatedBirtdate;
					this.perfil = perfil;
				} else {
					this.perfil = perfil;
				}
			},
			salvarPerfil() {
				this.carregandoSalvarPerfil = true;
				const birthDate = this.perfil.birthdate;
				const formatBirthDate = birthDate.split("/");
				const formatedBirtdate = `${formatBirthDate[2]}-${formatBirthDate[1]}-${
					formatBirthDate[0]
					}`;
				let perfilAtualizado = this.perfil;
				perfilAtualizado.birthdate = formatedBirtdate;
				const { token } = this.perfil;
				const { id } = this.perfil;
				const headers = {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				};
				axios
					.put(
						`${this.$store.getters.api}/api/v1/users/${id}`,
						perfilAtualizado,
						headers
					)
					.then(res => {
						this.$store.dispatch("snackbar_success", "Dados Atualizados.");
						sessionStorage.usuario = JSON.stringify(this.perfil);
						this.carregandoSalvarPerfil = false;
					})
					.catch(err => {
						this.$store.dispatch("snackbar_error", err);
					});
			},
			pesquisaCep() {
				axios.get(`https://viacep.com.br/ws/${this.perfil.postal_code}/json/`)
					.then(res => {
						this.perfil.street = res.data.logradouro;
						this.perfil.neighborhood = res.data.bairro;
						this.perfil.city = res.data.localidade;
						this.perfil.state = res.data.uf;
						document.getElementById("number").focus();
					})
					.catch(e => console.log(e));
			}
		},
		created() {
			this.pegaDadosDoPerfil();
		}
	};
=======
</template>

<script>
	import axios from "axios";
	import { mask } from "vue-the-mask";

	export default {
		directives: {
			mask
		},
		data() {
			return {
				masks: {
					cpf: "###.###.###-##",
					nascimento: "##/##/####",
					telefone: "(##) # ####-####",
					cep: "#####-###"
				},
				sexOptions: ["Masculino", "Feminino"],
				perfil: {
					name: "",
					email: "",
					cpf: "",
					sex: "",
					birthdate: "",
					phone_1: "",
					postal_code: "",
					street: "",
					number: "",
					neighborhood: "",
					city: "",
					state: ""
				},
				teste: "",
				carregandoSalvarPerfil: false
			};
		},
		picker: new Date().toISOString().substr(0, 10),
		methods: {
			pegaDadosDoPerfil() {
				let perfil = JSON.parse(sessionStorage.usuario);
				if (perfil.birthdate !== null) {
					const formatBirthDate = perfil.birthdate.split("-");
					const formatedBirtdate = `${formatBirthDate[2]}/${formatBirthDate[1]}/${
						formatBirthDate[0]
						}`;
					console.log("teste: " + formatedBirtdate);
					perfil.birthdate = formatedBirtdate;
					this.perfil = perfil;
				} else {
					this.perfil = perfil;
				}
			},
			salvarPerfil() {
				this.carregandoSalvarPerfil = true;
				const birthDate = this.perfil.birthdate;
				const formatBirthDate = birthDate.split("/");
				const formatedBirtdate = `${formatBirthDate[2]}-${formatBirthDate[1]}-${
					formatBirthDate[0]
					}`;
				let perfilAtualizado = this.perfil;
				perfilAtualizado.birthdate = formatedBirtdate;
				const { token } = this.perfil;
				const { id } = this.perfil;
				const headers = {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				};
				axios
					.put(
						`${this.$store.getters.api}/api/v1/users/${id}`,
						perfilAtualizado,
						headers
					)
					.then(res => {
						this.$store.dispatch("snackbar_success", "Dados Atualizados.");
						sessionStorage.usuario = JSON.stringify(this.perfil);
						this.carregandoSalvarPerfil = false;
					})
					.catch(err => {
						this.$store.dispatch("snackbar_error", err);
					});
			},
			pesquisaCep() {
				axios.get(`https://viacep.com.br/ws/${this.perfil.postal_code}/json/`)
				.then(res => {
					this.perfil.street = res.data.logradouro;
					this.perfil.neighborhood = res.data.bairro;
					this.perfil.city = res.data.localidade;
					this.perfil.state = res.data.uf;
					document.getElementById("number").focus();
				})
				.catch(e => console.log(e));
			}
		},
		created() {
			this.pegaDadosDoPerfil();
		}
	};
</script>

<style>
	.arredondaBorda {
		border-radius: 6px;
		padding: 10px;
	}
</style>