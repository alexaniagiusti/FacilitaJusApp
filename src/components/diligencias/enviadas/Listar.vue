<template>
	<v-layout>
		<v-flex xs12>
			<v-simple-table>
				<thead>
					<tr>
						<th class="text-left blue--text">#</th>
						<th class="text-left blue--text">Cidade</th>
						<th class="text-left blue--text">Tipo</th>
						<th class="text-left blue--text"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="diligence in diligences" :key="diligence.id" style="cursor: pointer" @click="showDiligence(diligence.id)">
						<td>{{ diligence.id }}</td>
						<td>{{ diligence.city.city }}</td>
						<td>{{ diligence.service.service }}</td>
							<td>
								<v-btn class="ma-3" small color="primary">Visualizar</v-btn>
							</td>
						</router-link>
					</tr>
				</tbody>
			</v-simple-table>
		</v-flex>
	</v-layout>
</template>

<script>

	export default {
		props: ['diligences'],

  		methods: {
			showDiligence(idDiligence) {
				this.$router.push({name: 'visualizarDiligenciaEnviada', params:{id : idDiligence}})
			}
		},

	}
</script>