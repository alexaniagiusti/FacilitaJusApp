<template>
	<v-layout>
		<v-flex xs12>
			<v-simple-table>
				<thead>
					<tr>
						<th class="text-left blue--text">#</th>
						<th class="text-left blue--text">Nome</th>
						<th class="text-left blue--text">Cidade</th>
						<th class="text-left blue--text">Tipo</th>
						<th class="text-left blue--text">Data</th>
						<th class="text-left blue--text">Hora</th>
						<th class="text-left blue--text hidden-sm-and-down"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="diligence in diligences" :key="diligence.id" style="cursor: pointer" @click="showDiligence(diligence.id, diligence.name)">
						<td>{{ diligence.user_id }}</td>
						<td>{{ diligence.name | nameFilter }}</td>
						<td>{{ diligence.city.city }}</td>
						<td>{{ diligence.service.service }}</td>
						<td>{{ diligence.date | dateFilter }}</td>
						<td>{{ diligence.time }}</td>
						<td class="hidden-sm-and-down"> 
							<v-btn class="ma-3" small color="primary">Visualizar</v-btn>
						</td>
					</tr>
				</tbody>
			</v-simple-table>
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