<template>
  <v-container fluid>
    <div class="linhaSemQuebra">
      <h3 class="pa-1 mt-3">
        Envie sua diligência:
      </h3>
    </div>
    <v-card class="pa-5 mt-3">
      <v-layout row>
        <v-flex xs12 md4 pa-2>
          <v-text-field
          label="Nome:"
          placeholder="Qual o seu nome?"
          >

          </v-text-field>
        </v-flex>
        <v-flex xs12 md4 pa-2>
          <v-text-field
          label="Celular:"
          placeholder="Qual o seu celular?"
          >

          </v-text-field>
        </v-flex>
        <v-flex xs12 md4 pa-2>
          <v-text-field
          label="E-mail:"
          placeholder="Qual o seu e-mail?"
          >

          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md3 pa-2>
          <v-autocomplete
          label="Serviços:"
          placeholder="Serviço que deseja solicitar"
          />

        </v-flex>
        <v-flex xs12 md3 pa-2>
         <v-autocomplete
          label="Cidades:"
          placeholder="Qual a sua cidade?"
          />
        </v-flex>
        <v-flex xs12 md3 pa-2>
          <v-text-field
          label="Data:"
          placeholder="Em que dia:"
          >

          </v-text-field>
        </v-flex>
        <v-flex xs12 md3 pa-2>
          <v-text-field
          label="Horário:"
          placeholder="Em qual horário?"
          >

          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md12 pa-2>
          <v-textarea
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
