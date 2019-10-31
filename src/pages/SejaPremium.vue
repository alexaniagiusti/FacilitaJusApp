<template>
	<v-container fluid>
		<v-alert
		border="left"
		colored-border
		color="success"
		elevation="2"
		>
			<p  class="black--text text-center font-weight-bold">Olá {{$helper.firstName($store.getters.getUsuario.name)}}. Excelente ter você conosco no FacilitaJus.</p>
		
			<p class="black--text text-center font-weight-light">Atenda os serviços da sua região, responda dúvidas jurídicas, ganhe experiência e renda extra, ative seu plano abaixo e ganhe vantagens exclusivas.</p>
		</v-alert>
		<v-row justify="center">
			<v-col cols="12" xs="12" md="6">
				<v-card outlined>
					<v-card-title>
						<v-spacer></v-spacer>
						<v-icon color="yellow" class="mr-2">
							star
						</v-icon>
						<span class="title">Plano Premium</span>
						<v-spacer></v-spacer>
					</v-card-title>
					<v-card-text>
					<div>
						<h1 class="text-center">R$ 49,90/Mês</h1> <br>
						
						<h3 class="pa-2"><v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> Audiências e Diligências</h3>
						<h3 class="pa-2"><v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> Recebimento Seguro</h3>
						<h3 class="pa-2"><v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> Perfil Profissional Completo</h3>
						<h3 class="pa-2"><v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> Selo Premium no Perfil</h3>
						<h3 class="pa-2"><v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> Profissional em destaque no diretório</h3>
						<h3 class="pa-2"><v-icon class="ml-5" color="blue" size="20">check_circle</v-icon> Benefícios Exclusivos</h3>
					</div>
					<p class="text-center">Cancele online, quando quiser, sem multas.</p>
					<v-spacer></v-spacer>
					</v-card-text>
					<v-card-actions>
						<v-btn @click="abrePagamento" color="success" block>Concluir Assinatura</v-btn>
					</v-card-actions>
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
