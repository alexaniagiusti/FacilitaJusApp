<template>
	<div class="visualizar" v-if="mostrarDiligencia">
		<v-flex xs12>
			<v-card>
				<v-card-title>Diligência #{{dadosDiligencia.id}}</v-card-title>

				<template>
					<v-simple-table>
						<tbody>
							<tr>
								<td><strong>Tipo:</strong></td>
								<td>{{ dadosDiligencia.service.service }}</td>
							</tr>
							<tr>
								<td><strong>Status:</strong></td>
								<td>{{ dadosDiligencia.status.status }}</td>
							</tr>
							<tr>
								<td><strong>Cidade:</strong></td>
								<td>{{ dadosDiligencia.city.city }} - {{ dadosDiligencia.city.state }}</td>
							</tr>
							<tr>
								<td><strong>Nome:</strong></td>
								<td>{{ dadosDiligencia.name}}</td>
							</tr>

							<tr>
								<td><strong>Telefone:</strong></td>
								<td>{{ dadosDiligencia.phone}}</td>
							</tr>

							<tr>
								<td><strong>Mensagem:</strong></td>
								<td>{{ dadosDiligencia.message}}</td>
							</tr>
						</tbody>
					</v-simple-table>
				</template>
			</v-card>
		</v-flex>

		<v-layout>
			<v-flex xs12 md3 class="pa-2">
				<v-card height="488" class="elevation-0">
					<v-card-title>Respostas</v-card-title>
					<v-list subheader>
						<v-list-item v-for="item of dadosDiligencia.chats" @click="openChat(item.id)" :key="item.id">
							<v-list-item-avatar>
								<v-img
									src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/avatar.png?alt=media&token=51d40592-131a-4f3c-939c-b08fc1613842">
								</v-img>
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title v-text="item.recipient_user.name"></v-list-item-title>
							</v-list-item-content>

							<v-list-item-icon>
								<!-- <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon> -->
							</v-list-item-icon>
						</v-list-item>
					</v-list>
				</v-card>
			</v-flex>
			<v-flex xs12 md9 class="pa-2">
				<Chat v-if="this.showChat" :chatId="this.chatId" :url="this.chatUrl" />
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import moment from 'moment'
	import 'moment/locale/pt-br'
	import axios from 'axios'
	import Chat from '../../chat/Chat.vue'

	export default {
		components: {
			Chat
		},
		data() {
			return {
				dadosDiligencia: '',
				mostrarDiligencia: false,
				urlChat: '',
				showChat: false,
				chatId: '',
				chatUrl: ''
			}
		},

		filters: {
			horaDaMensagem(val) {
				return moment(val).locale('pt-br').fromNow()
			}
		},

		methods: {
			openChat(id) {
				this.showChat = false
				axios.get(`${this.$store.getters.api}/api/v1/chats/${id}`)
					.then(res => {
						this.chatId = id;
						this.chatUrl = `${this.$store.getters.api}/api/v1/diligence/sent/reply/chat/${id}`
						this.showChat = true
					})
			}
		},

		mounted() {
			this.$store.commit('setVueLoad', true)
			axios.get(`${this.$store.getters.api}/api/v1/diligence/sent/${this.$route.params.id}`, { headers: { 'Authorization': `Bearer ${this.$store.getters.getToken}` } })
				.then(res => {
					this.$store.commit('setVueLoad', false)
					this.dadosDiligencia = res.data;
					this.mostrarDiligencia = true;
				})
				.catch(e => console.log(e))

		},
	}
</script>

<style scoped>
	.visualizar {
		display: flex;
		width: 100%;
		flex-direction: column;
	}

	.containerChat {
		display: flex;
		width: 100%;
	}
</style>