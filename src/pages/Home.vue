<template>
  <v-app>
    <Drawer />
    <v-content>
      <router-view></router-view>
      <v-container v-if="$route.name === 'home'" fluid>
        <div class="cards">
          <v-flex class="pa-2" v-for="n in cards" :key="n" xs12 md4>
            <v-card
              class="mt-5 mb-5 mx-auto"
              max-width="400"
            >
              <v-sheet
                class="v-sheet--offset mx-auto"
                :color="n.color"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
                <v-sparkline
                  :labels="labels"
                  :value="value"
                  color="white"
                  line-width="2"
                  padding="12"
                ></v-sparkline>
              </v-sheet>

              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">User Registrations</div>
                <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
                <v-divider class="my-2"></v-divider>
                <v-icon
                  class="mr-2"
                  small
                >
                  mdi-clock
                </v-icon>
                <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
              </v-card-text>
            </v-card>
          </v-flex>
          
          <!-- Mini cards -->
          <v-flex class="pa-2" v-for="n in minicards" :key="n" xs12 md3>
            <v-card
              class="mt-5 mx-1"
              max-width="300"
            >
              <div class="linhaSemQuebra">
                <v-sheet
                  class="v-minisheet--offset ml-3 mr-3"
                  :color="n.color"
                  elevation="6"
                  max-width="80px"
                >
                  <v-icon color="white" size="50" class="ma-4">account_circle</v-icon>
                </v-sheet>
                <div class="linhaSemQuebra">
                  <v-spacer></v-spacer>
                  <div class="coluna pr-4 pt-4">
                    <h3 class="text-right font-weight-light grey--text">teste</h3>
                    <h2 class="font-weight-light">teste2</h2>
                  </div>
                </div>
              </div>
              <v-card-text class="pt-5">
                <v-divider class="mb-2"></v-divider>
                <v-icon
                  class="mr-2"
                  small
                >
                  mdi-clock
                </v-icon>
                <span class="pl-2 caption grey--text font-weight-light">last registration 26 minutes ago</span>
              </v-card-text>
            </v-card>
          </v-flex>
        </div>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Drawer from '../components/core/Drawer.vue';
import Footer from '../components/core/Footer.vue';

export default {
  data() {
    return {
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
      cards: [
        {color: 'blue'},
        {color: 'red'},
        {color: 'green'}
      ],
      minicards: [
        {color: 'blue'},
        {color: 'red'},
        {color: 'green'},
        {color: 'yellow darken-3'}
      ]
    };
  },
  components: {
    Drawer,
    Footer,
  },
};
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    height: 180px;
    position: relative;
  }
  
  .v-minisheet--offset {
    top: -4px;
    position: relative;
  }

  .cards {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
</style>