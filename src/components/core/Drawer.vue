<template>
	<div>
		<v-app-bar class="elevation-0" color="#061161" app fixed>
			<v-btn @click="drawer=!drawer" mt-1 icon>
				<v-icon color="white" size="20">menu</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<span class="white--text ml-3 mr-5"> {{ nome | first}} </span>
			<v-icon color="white">account_circle</v-icon>


			<v-menu
			transition="slide-y-transition"
			bottom
		>
			<template v-slot:activator="{ on }">
				<v-btn
					icon
					v-on="on"
				>
					<v-badge
						class="mr-2"
						color="green"
						overlap
					>
						<template v-slot:badge>
							<span>{{ notifies.length }}</span>
						</template>
						<v-icon
							size="27"
							color="white"
						>
							notifications
						</v-icon>
					</v-badge>
				</v-btn>
			</template>
			<!-- Aqui começa a lista de notificações que é exibida n badge -->
			<v-list style="max-height: 350px; overflow: auto;">
				<template v-for="(item, i) in notifies">
					<v-list-item
						:key="i"
						@click="openNotification(item)"
					>
						<v-avatar v-if="item.type_notification === 'Diligência' ? true : false">
							<v-icon>
								work
							</v-icon>
						</v-avatar>
						<v-avatar v-if="item.type_notification === 'Dúvida Jurídica' ? true : false">
							<v-icon>
								gavel
							</v-icon>
						</v-avatar>
						<v-list-item-content>
							<v-list-item-title>{{ item.type }}</v-list-item-title>
							<v-list-item-subtitle>{{ item.city }}</v-list-item-subtitle>
							<v-list-item-subtitle>#{{ item.id }}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<v-divider :key="i"></v-divider>
				</template>
			</v-list>
			<!-- Final da lista de notificações -->
		</v-menu>
	</v-app-bar>
		<v-navigation-drawer v-model="drawer" width="270" class="grey lighten-4" app>
			<div class="mb-5"
				style="border-bottom:1px solid #E0E0E0;background: linear-gradient(to right, #fff, #fff); display: flex; width: 100%; align-items: center; flex-direction: column">
				<div @click="$router.push({name: 'home'})" class="mt-3 mb-2" style="display: flex">
					<img class="mt-2 animated delay-1s fadeIn"
						src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/Untitled-1.png?alt=media&token=1ecc2ffb-2b00-492f-a05e-d5a7382990c7"
						height="40">
				</div>
			<!-- <h3 class="animated delay-1s fadeIn font-weight-light black--text">{{ nome | first }}</h3> -->
				<v-avatar style="bottom: -28px" color="white" v-if="masculino" size="70">
					<v-img style="border: 6px solid #fff"
						src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/avatar.png?alt=media&token=51d40592-131a-4f3c-939c-b08fc1613842">
					</v-img>
				</v-avatar>

				<v-avatar style="bottom: -28px" v-if="feminino" color="white" size="70">
					<v-img style="border: 1px solid #E0E0E0"
						src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/avatar2.png?alt=media&token=850d414f-4b73-4fe9-b63b-e79c8c01ac2f">
					</v-img>
				</v-avatar>

				<v-avatar style="bottom: -28px" v-if="semSexo" size="70">
					<v-img style="border: 6px solid #fff"
						src="https://firebasestorage.googleapis.com/v0/b/moneycareinvestment-01.appspot.com/o/cartoon-avatar.jpeg?alt=media&token=77a0ead3-2eff-41f0-a450-746368eac5e3">
					</v-img>
				</v-avatar>
			</div>
			<!-- Grupo com informações do perfil do usuário -->
			<v-list class="pa-3 mt-3" dense rounded>
				<!-- <v-subheader class="ml-3">
          INÍCIO
        </v-subheader> -->

				<v-list-item @click="$router.push({'name': 'Usuario'})">
					<v-icon class="mr-5">
						account_circle
					</v-icon>
					<v-list-item-content>
						<v-list-item-title class="ml-3">Dados Pessoais</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-group prepend-icon="work" no-action>
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title>Diligências</v-list-item-title>
						</v-list-item-content>
					</template>

					<v-list-item class="ml-2" @click="$router.push({'name':'enviarDiligencia'})">
						<v-list-item-content>
							<v-list-item-title>Enviar</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item class="ml-2" @click="$router.push({'name':'diligenciasEnviadas'})">
						<v-list-item-content>
							<v-list-item-title>Enviadas</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item class="ml-2" @click="$router.push({'name':'diligenciasRecebidas'})">
						<v-list-item-content>
							<v-list-item-title>Recebidas</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-group>
				<v-list-group prepend-icon="gavel" no-action>
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title>Casos Jurídicos</v-list-item-title>
						</v-list-item-content>
					</template>

					<v-list-item class="ml-2" @click="$router.push({'name': 'enviarCasoJuridico'})">
						<v-list-item-content>
							<v-list-item-title>Enviar</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item class="ml-2" @click="$router.push({'name': 'casosJuridicosEnviados'})">
						<v-list-item-content>
							<v-list-item-title>Enviados</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item class="ml-2" @click="$router.push({'name': 'casosJuridicosRecebidos'})">
						<v-list-item-content>
							<v-list-item-title>Recebidos</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-group>
				<v-list-item @click="sair">
					<v-icon class="mr-5">
						power_settings_new
					</v-icon>
					<v-list-item-content>
						<v-list-item-title class="ml-3">Sair</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
import Helper from '../../helper.js'
import { db } from '../../services/Firebase'

	export default {
		props: [
			'diligencesLength',
			'legalCaseLength'
		],
		data() {
			return {
				id: 0,
				notifies: [],
				nome: 'Carregando...',
				masculino: false,
				feminino: false,
				semSexo: true,
				drawer: true,
			}
		},
		filters: {
			first(val) {
				const helpers = new Helper()
				const fn = helpers.firstName(val)
				return fn
			}
		},
		methods: {
			openNotification(notification) {
				db.ref(`usuarios/${this.$store.getters.getUsuario.id}/${notification.key}`).remove()
					.then(() => this.redirecting(notification))
			},
			redirecting(notification) {
				if(notification.type_notification === 'Diligência') {
					this.$router.push(`/diligencia/recebida/${notification.id}`)
				} else {
					this.$router.push(`/casos-juridicos/recebido/${notification.id}`)
				}
			},
			irPara(rota) {
				console.log('fui chamada')
			},
			sair() {
				sessionStorage.clear()
				this.$store.commit('setUser', null)
				this.$router.push({'name': 'login'})
			},
		},
		created() {
			const usuario = JSON.parse(sessionStorage.usuario)
			this.id = usuario.id
			this.nome = usuario.name
			const sexo = usuario.sex
			if (sexo === 'Masculino') {
				this.masculino = true
				this.semSexo = false
			} else if (sexo === 'Feminino') {
				this.feminino = true
				this.semSexo = false
			} else {
				this.semSexo = true
			}
			const query = db.ref(`usuarios/${usuario.id}`)
			query.on('value', dataSnap => {
				let notifies = []
				dataSnap.forEach(dataChild => {
					let item = dataChild.val()
					item['key'] = dataChild.key
					notifies.push(item)
				})
				this.notifies = notifies
			})
		},
	}
</script>