<template>
	<v-container fluid>
		<v-alert
      prominent
      text
    >
      <p  class="black--text text-center font-weight-bold">Olá Alexânia Giusti. Excelente ter você conosco no FacilitaJus.</p>
			<p class="black--text text-center font-weight-light">Atenda os serviços da sua região, responda dúvidas jurídicas, ganhe experiência e renda extra, ative seu plano abaixo e ganhe vantagens exclusivas.</p>
    </v-alert>
		<v-row justify="center">
			<v-col cols="12" xs="12" md="6">
				<v-card style="display:flex; flex-direction:column; border-top: 15px solid #1A237E;">
					<v-card-title>
						<v-spacer></v-spacer>
						<v-icon color="yellow" class="mr-2">
							star
						</v-icon>
						<span class="title">Plano Premium</span>
						<v-spacer></v-spacer>
					</v-card-title>
						<div>
							<p class="text-center font-weight-light">R$ 49,90 / Mês</p>
							<v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> 
							<span class="pa-2">Audiências e Diligências</span> <br>
							<v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> 
							<span class="pa-2">Recebimento Seguro</span> <br>
							<v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> 
							<span class="pa-2">Perfil Profissional Completo</span> <br>
							<v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> 
							<span class="pa-2">Selo Premium no Perfil</span> <br>
							<v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> 
							<span class="pa-2">Profissional em destaque no diretório</span> <br>
							<v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> 
							<span class="pa-2">Benefícios Exclusivos</span> <br>
						</div>
							<p class="mt-5 pa-4 text-center font-weight-bold">Cancele online, quando quiser, sem multas.</p>
							<v-spacer></v-spacer>
							<div>
								<v-btn @click="abrePagamento" color="green" block>
									<span class="white--text text-uppercase">Concluir Assinatura</span>
								</v-btn>
							</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	methods: {
		abrePagamento() {
			const payload = {
				pode_editar: false,
				item: {
					description: 'Assinatura de Plano Premium',
					amount: '1',
					price: 49.90
				}
			}
			this.$store.dispatch('abre_pagamento', payload)
		}
	}
}
</script>
