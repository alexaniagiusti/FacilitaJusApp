<template>
	<v-container fluid>
		<v-card class="pa-3">
			<v-layout row>
				<v-flex xs12 md4 pa-2>
					<v-text-field label="Nome" v-model="perfil.name" autocomplete="new-name" />
				</v-flex>

				<v-flex xs12 md4 pa-2>
					<v-text-field label="E-mail" v-model="perfil.email" autocomplete="new-email" />
				</v-flex>

				<v-flex xs12 md4 pa-2>
					<v-text-field v-mask="masks.cpf" label="CPF" v-model="perfil.cpf" />
				</v-flex>

			</v-layout>

			<v-layout row>
				<v-flex xs12 md3 pa-2>
					<v-select
						:items="sexOptions"
						hide-details
						single-line menu-props="auto"
						label="Sexo"
						v-model="perfil.sex" />
				</v-flex>

				<v-flex xs12 md2 pa-2>
					<v-text-field
						v-mask="masks.nascimento"
						v-model="perfil.birthdate"
						label="Nascimento" />
				</v-flex>
				<v-flex xs12 md2 pa-2>
					<v-text-field
						v-model="perfil.oabNumber"
						label="Número OAB" />
				</v-flex>
				<v-flex xs12 md2 pa-2>
					<v-select
						v-model="perfil.ufOAB"
						:items="estados"
						label="UF OAB" />
				</v-flex>

				<v-flex xs12 md3 pa-2>
						<v-select
							v-model="perfil.tipoAdv"
							label="Tipo"
							:items="['Estagiário(a)', 'Escritório', 'Advogado(a)']"
						>
						</v-select>
				</v-flex>
			</v-layout>

			<v-layout row>
				<v-flex xs12 md3 pa-2>
						<v-text-field v-mask="masks.cep" label="CEP" v-model="perfil.postal_code" @blur="pesquisaCep" autocomplete="new-cep" />
				</v-flex>

				<v-flex xs12 md3 pa-2>
						<v-text-field label="Endereço" v-model="perfil.street" autocomplete="new-endereco" />
				</v-flex>

				<v-flex xs12 md3 pa-2>
						<v-text-field id="number" label="Número" v-model="perfil.number" />
				</v-flex>

				<v-flex xs12 md3 pa-2>
						<v-text-field label="Telefone" v-model="perfil.phone_1" v-mask="masks.telefone" autocomplete="new-telefone" />
				</v-flex>
			</v-layout>

			<v-layout row>
				<v-flex xs12 md4 pa-2>
						<v-text-field label="Bairro" v-model="perfil.neighborhood" autocomplete="new-bairro" />
				</v-flex>

				<v-flex xs12 md4 pa-2>
						<v-text-field label="Cidade" v-model="perfil.city" autocomplete="new-city" />
				</v-flex>

				<v-flex xs12 md4 pa-2>
						<v-text-field label="Estado" v-model="perfil.state" autocomplete="new-state" />
				</v-flex>
				<v-flex xs12 md12 pa-2>
					<v-btn 
						:disabled="carregandoSalvarPerfil" 
						@click="salvarPerfil" 
						block color="green"
						class="white--text"> 	Salvar
					</v-btn>
				</v-flex>
			</v-layout>
		</v-card>
	</v-container>
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
					cep: "#####-###",
					oabNumber: "#.###.###"
				},
				sexOptions: ["Masculino", "Feminino"],
				estados: ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"],
				perfil: {
					tipoAdv: "",
					oabNumber: "",
					ufOAB: "",
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
					perfil.birthdate = formatedBirtdate;
					this.perfil = perfil;
				} else {
					this.perfil = perfil;
				}
			},
			salvarPerfil() {
				this.$store.commit('setVueLoad', true)
				this.carregandoSalvarPerfil = true;
				const birthDate = this.perfil.birthdate;
				const formatBirthDate = birthDate.split("/");
				const formatedBirtdate = `${formatBirthDate[2]}-${formatBirthDate[1]}-${
					formatBirthDate[0]
					}`;
				let perfilAtualizado = this.perfil;
				perfilAtualizado.birthdate = formatedBirtdate;
				
				axios
					.put(
						`${this.$store.getters.api}/api/v1/users/${this.$store.getters.getUsuario.id}`,
						perfilAtualizado,
						{headers: {Authorization: `Bearer ${this.$store.getters.getToken}`} }
					)
					.then(res => {
						this.$store.commit('setVueLoad', false)
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
