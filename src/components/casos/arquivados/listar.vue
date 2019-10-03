<template>
	<v-container>
		<v-row>
			<v-col cols="12" xs="12" md="12">
				<v-simple-table>
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
          <tr v-for="item in casosarquivados" :key="item.name">
            <td>{{ item.id }}</td>
            <td>{{ item.nome }}</td>
            <td>{{ item.cidade }}</td>
            <td>{{ item.tipo }}</td>
          </tr>
        	</tbody>
      	</v-simple-table>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
  export default {
    data () {
      return {
        casosarquivados: [
          {
            id: '1',
            nome: 'Alexânia Giusti',
            cidade: 'Macapá',
            tipo: 'Administrativo',
          },
          {
            id: '1',
            nome: 'Alexânia Giusti',
            cidade: 'Macapá',
            tipo: 'Administrativo',
          },
          {
            id: '1',
            nome: 'Alexânia Giusti',
            cidade: 'Macapá',
            tipo: 'Administrativo',
          },
          {
            id: '1',
            nome: 'Alexânia Giusti',
            cidade: 'Macapá',
            tipo: 'Administrativo',
          },
        ],
      }
    },
  }
</script>