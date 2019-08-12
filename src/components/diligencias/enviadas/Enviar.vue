<template>
  <v-container fluid>
    <div class="linhaSemQuebra">
      <h3 style="text-align:center">
        Envie sua diligência:
      </h3>
    </div>
    <v-card class="pa-3">
      <v-layout row>
        <v-flex xs12 md4 pa-2>
          <v-text-field
          label="Nome:"
          placeholder="Qual o seu nome?"
          filled
          >

          </v-text-field>
        </v-flex>
        <v-flex xs12 md4 pa-2>
          <v-text-field
          label="Celular:"
          placeholder="Qual o seu celular?"
          filled
          >

          </v-text-field>
        </v-flex>
        <v-flex xs12 md4 pa-2>
          <v-text-field
          label="E-mail:"
          placeholder="Qual o seu e-mail?"
          filled
          >

          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md3 pa-2>
          <v-autocomplete
          label="Serviços:"
          placeholder="Serviço que deseja solicitar"
          filled
          />

        </v-flex>
        <v-flex xs12 md3 pa-2>
         <v-autocomplete
          label="Cidades:"
          placeholder="Qual a sua cidade?"
          filled
          />
        </v-flex>
        <v-flex xs12 md3 pa-2>
          <v-text-field
          label="Data:"
          placeholder="Em que dia:"
          filled
          >

          </v-text-field>
        </v-flex>
        <v-flex xs12 md3 pa-2>
          <v-text-field
          label="Horário:"
          placeholder="Em qual horário?"
          filled
          >

          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md12 pa-2>
          <v-textarea
            filled
            label="Fale um pouco mais sobre sua diligência:"
          >

          </v-textarea>
        </v-flex>
        <v-flex xs12 md12 pa-2>
          <v-btn
            block
            color="green"
          >
            Enviar
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>