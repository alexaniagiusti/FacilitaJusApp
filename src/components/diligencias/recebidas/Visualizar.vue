<template>
	<v-layout v-if="mostrarDiligencia">
		<v-flex>
			<v-card>
				<v-card-title>Diligência #{{dadosDiligencia.diligence.id}}</v-card-title>

				<template>
					<v-simple-table>
						<tbody>
							<tr>
								<td><strong>Tipo:</strong></td>
								<td>{{ dadosDiligencia.diligence.service.service }}</td>
							</tr>
							<tr>
								<td><strong>Cidade:</strong></td>
								<td>{{ dadosDiligencia.diligence.city.city }} -
									{{ dadosDiligencia.diligence.city.state }}</td>
							</tr>
							<tr>
								<td><strong>Nome:</strong></td>
								<td>{{ dadosDiligencia.diligence.name}}</td>
							</tr>

							<tr>
								<td><strong>Telefone:</strong></td>
								<td>{{ dadosDiligencia.diligence.phone}}</td>
							</tr>

							<tr>
								<td><strong>Data:</strong></td>
								<td>{{ dadosDiligencia.diligence.date | dateFilter}}</td>
							</tr>

							<tr>
								<td><strong>Hora:</strong></td>
								<td>{{ dadosDiligencia.diligence.time }}</td>
							</tr>

							<tr>
								<td><strong>Preço:</strong></td>
								<td>R$ {{ dadosDiligencia.diligence.price }}</td>
							</tr>

							<tr>
								<td><strong>Mensagem:</strong></td>
								<td>{{ dadosDiligencia.diligence.message}}</td>
							</tr>
						</tbody>
					</v-simple-table>
				</template>
			</v-card>
			<Chat v-if="this.dadosDiligencia.chat != null" :chatId="this.dadosDiligencia.chat.id" :url="this.urlChat" />
			<Chat v-if="this.dadosDiligencia.chat == null" :chatId="null" :url="this.urlChat" />

		</v-flex>

	</v-layout>
</template>

<script>
	import { mapState } from 'vuex'
	import moment from 'moment'
	import 'moment/locale/pt-br'
	import axios from 'axios'
	import Chat from '../../chat/Chat'
	import Helper from  '../../../helper.js'

	export default {
		props: ['id'],
		components: {
			Chat
		},
		data() {
			return {
				dadosDiligencia: '',
				mostrarDiligencia: false,
				urlChat: ''
			}
		},
		filters: {
			horaDaMensagem(val) {
				return moment(val).locale('pt-br').fromNow()
			},
				dateFilter(val) {
				const dateFomatted = new Helper().dateFilter(val)
				return dateFomatted
			}
		},
		watch: {
			id() {
				this.getDiligence()
			}
		},
		methods: {
			getDiligence() {
			this.$store.commit('setVueLoad', true)
			axios.get(`${this.$store.getters.api}/api/v1/diligence/received/${this.$route.params.id}`, { headers: { 'Authorization': `Bearer ${this.$store.getters.getToken}` } })
				.then(res => {
					this.$store.commit('setVueLoad', false)
					this.dadosDiligencia = res.data;
					this.urlChat = `${this.$store.getters.api}/api/v1/diligence/received/${this.dadosDiligencia.diligence.id}/reply`
					this.mostrarDiligencia = true;
				})
				.catch(e => console.log(e))
			}
		},
		mounted() {
			this.getDiligence()
		},
	}
</script>