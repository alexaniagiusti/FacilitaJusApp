<template>
	<v-container>
		<v-row>
			<v-col cols="12" xs="12" md="12">
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
          <tr v-for="item in diligenciasarquivadas" :key="item.name">
            <td>{{ item.id }}</td>
            <td>{{ item.nome }}</td>
            <td>{{ item.cidade }}</td>
            <td>{{ item.tipo }}</td>
            <td>{{ item.data }}</td>
            <td>{{ item.hora }}</td>
            <td>{{ item.preco }}</td>
          </tr>
        	</tbody>
      	</v-simple-table>
				<v-list three-line class="hidden-sm-and-up">
				<v-list-item>
					<v-avatar class="pr-2">
						<span>#</span>
					</v-avatar>
					<v-list-item-content>
						<v-list-item-title>
							<span class="font-weight-bold">Alexânia Giusti</span>
						</v-list-item-title>
							<span>Andamentos</span>
						<v-list-item-title>
							<span>03/10/2019</span> - <span>18:20:00</span>
						</v-list-item-title>
						<v-list-item-subtitle>
							<v-icon size="15">
								place
							</v-icon>
							<span> Macapá - AP</span>
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
  export default {
    data () {
      return {
        diligenciasarquivadas: [
          {
            id: '1',
            nome: 'Alexânia Giusti',
            cidade: 'Macapá',
            tipo: 'Acompanhamentos',
            data: '03/10/2019',
            hora: '18:15:00',
            preco: '900.000',
          },
          {
            id: '1',
            nome: 'Alexânia Giusti',
            cidade: 'Macapá',
            tipo: 'Acompanhamentos',
            data: '03/10/2019',
            hora: '18:15:00',
            preco: '900.000',
          },
          {
            id: '1',
            nome: 'Alexânia Giusti',
            cidade: 'Macapá',
            tipo: 'Acompanhamentos',
            data: '03/10/2019',
            hora: '18:15:00',
            preco: '900.000',
          },
        ],
      }
    },
  }
</script>