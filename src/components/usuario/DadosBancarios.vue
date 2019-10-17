<template>
  <v-container class="geral" fluid>
    <v-row>
      <v-col cols="12" md="12" xs="12">
        <v-toolbar flat color="white" dark>
					<v-spacer></v-spacer>
					<v-toolbar-title class="font-weight-light black--text">Dados Bancários <span class="subtitle-2">(Para depósito de seus recebimentos, por serviços prestados através do FacilitaJus)</span></v-toolbar-title>
					<v-spacer></v-spacer>
				</v-toolbar>
        <v-divider></v-divider>
        <v-row class="pa-5" justify="center">
            <v-col cols="12" md="4" xs="12">
                <v-select label="Tipo de Cadastro" ></v-select>
            </v-col>
            <v-col cols="12" md="4" xs="12">
                <v-select label="Tipo de Conta" ></v-select>
            </v-col>
            <v-col cols="12" md="4" xs="12">
                <v-select label="Banco" ></v-select>
            </v-col>
            <v-row class="pa-5" justify="center">
              <v-col cols="12" md="3" xs="12">
                  <v-text-field label="Agência" ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" xs="12">
                  <v-text-field label="Conta " ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" xs="12">
                  <v-text-field label="Digíto " ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" xs="12">
                  <v-text-field label="CPF do Favorecido " ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" xs="12">
                <v-text-field label="Nome do Favorecido"></v-text-field>
              </v-col>
            </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

</template>
