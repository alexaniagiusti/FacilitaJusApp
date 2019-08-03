<template>
  <v-app>
    <Drawer />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Drawer from '../components/core/Drawer'
import Footer from '../components/core/Footer'
export default {
  data () {
    return {

    }
  },
  components: {
    Drawer,
    Footer
  }
}
</script> 
 