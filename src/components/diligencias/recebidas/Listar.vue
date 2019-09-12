<template>
	<v-layout>
		<v-flex xs12>
			<v-simple-table class="hidden-sm-and-down">
				<thead>
					<tr>
						<th class="text-left blue--text">#</th>
						<th class="text-left blue--text">Nome</th>
						<th class="text-left blue--text">Cidade</th>
						<th class="text-left blue--text">Tipo</th>
						<th class="text-left blue--text">Data</th>
						<th class="text-left blue--text">Hora</th>
						<th class="text-left blue--text">Preço:</th>
						<th class="text-left blue--text hidden-sm-and-down"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="diligence in diligences" :key="diligence.id" style="cursor: pointer" @click="showDiligence(diligence.uuid, diligence.name)">
						<td>{{ diligence.id }}</td>
						<td>{{ diligence.name | nameFilter }}</td>
						<td>{{ diligence.city.city }} - {{ diligence.city.state }}</td>
						<td>{{ diligence.service.service }}</td>
						<td>{{ diligence.date | dateFilter }}</td>
						<td>{{ diligence.time }}</td>
						<td>R$ {{ diligence.price }}</td>
						<td class="hidden-sm-and-down"> 
							<v-btn class="ma-3" small color="primary">Visualizar</v-btn>
						</td>
					</tr>
				</tbody>
			</v-simple-table>
			<v-list three-line class="hidden-sm-and-up">
				<v-list-item v-for="diligence in diligences" :key="diligence.id" @click="showDiligence(diligence.uuid, diligence.name)">
					<v-avatar class="pr-2">
						<span>#{{diligence.id}}</span>
					</v-avatar>
					<v-list-item-content>
						<v-list-item-title>
							<span class="font-weight-bold">{{diligence.name | nameFilter}}</span>
						</v-list-item-title>
							{{ diligence.service.service }}
						<v-list-item-title>
							{{ diligence.date | dateFilter }} - 	{{ diligence.time }}
						</v-list-item-title>
						<v-list-item-subtitle>
							<v-icon size="15">
								place
							</v-icon>
							<span> {{ diligence.city.city }} - {{ diligence.city.state }}</span>
						</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn icon @click="showDiligence(legalCase.id)">
							<v-icon>
								visibility
							</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-list>
		</v-flex>
	</v-layout>
</template>

<script>
import Helper from  '../../../helper.js'

export default {
	props: ['diligences'],
	methods: {
		showDiligence(idDiligence, nameRemetent) {
			this.$router.push({name: 'visualizarDiligenciaRecebida', params:{id : idDiligence, remetent: nameRemetent}})
		}
	},
	filters: {
		nameFilter(val) {
			const firstName = new Helper().firstName(val)
			return firstName
		},
		dateFilter(val) {
			const dateFomatted = new Helper().dateFilter(val)
			return dateFomatted
		}
	}
}
</script>