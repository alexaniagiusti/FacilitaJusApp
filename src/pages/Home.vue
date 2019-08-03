<template>
  <v-app>
    <Toolbar />
    <Drawer />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from '../components/core/Toolbar'
import Drawer from '../components/core/Drawer'
import Footer from '../components/core/Footer'
export default {
  data () {
    return {

    }
  },
  components: {
    Drawer,
    Toolbar,
    Footer
  }
}
</script> 
 