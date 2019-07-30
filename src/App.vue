<template>
  <v-app>
    <router-view></router-view>
    <SnackbarSuccess/>
    <SnackbarError/>
  </v-app>
</template>

<script>
import SnackbarSuccess from './components/core/SnackbarSucess'
import SnackbarError from './components/core/SnackbarError'

export default {
  name: 'App',
  components: {
    SnackbarSuccess,
    SnackbarError
  }
}
</script>

<style>
  .meio {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  .snack {
    animation-duration: 600ms;
  }
</style>
