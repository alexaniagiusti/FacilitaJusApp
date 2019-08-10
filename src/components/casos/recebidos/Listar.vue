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
					<tr v-for="legalCase in legalCases" :key="legalCase.id" style="cursor: pointer" @click="showDiligence(legalCase.id)">
						<td>{{ legalCase.id }}</td>
						<td>{{ legalCase.city.city }}</td>
						<td>{{ legalCase.service.service }}</td>
                        <td>
                            <v-btn class="ma-3" small color="primary">Visualizar</v-btn>
                        </td>
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
				this.$router.push({name: 'visualizarDiligenciaRecebida', params:{id : idDiligence}})
			}
		},

	}
</script>