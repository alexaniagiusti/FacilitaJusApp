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
						<th class="text-left blue--text hidden-sm-and-down"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="legalCase in legalCases" :key="legalCase.id" style="cursor: pointer" @click="showDiligence(legalCase.uuid)">
						<td>{{ legalCase.id }}</td>
						<td>{{ legalCase.name | nameFilter }}</td>
						<td>{{ legalCase.city.city }} - {{ legalCase.city.state }}</td>
						<td>{{ legalCase.actuation.actuation }}</td>
						<td class="hidden-sm-and-down">
								<v-btn class="ma-3" small color="primary">Visualizar</v-btn>
						</td>
					</tr>
				</tbody>
			</v-simple-table>
			<v-list three-line class="hidden-sm-and-up">
				<v-list-item v-for="legalCase in legalCases" :key="legalCase.id" @click="showDiligence(legalCase.uuid)">
					<v-avatar class="pr-2">
						<span>#{{legalCase.id}}</span>
					</v-avatar>
					<v-list-item-content>
						<v-list-item-title>
							<span class="font-weight-bold">{{legalCase.name | nameFilter}}</span>
						</v-list-item-title>
						<v-list-item-title>
							{{legalCase.actuation.actuation}}
						</v-list-item-title>
						<v-list-item-subtitle>
							<v-icon size="15">
								place
							</v-icon>
							<span>{{ legalCase.city.city }} - {{ legalCase.city.state }}</span>
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
import Helper from '../../../helper.js'

	export default {
		props: ['legalCases'],

  		methods: {
			showDiligence(idLegalCase) {
				this.$router.push({name: 'visualizarCasoRecebido', params:{id : idLegalCase}})
			}
		},
		filters: {
			nameFilter(val) {
				const firstName = new Helper().firstName(val)
				return firstName
			}
		}
	}
</script>
