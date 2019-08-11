<template>
  <v-app app>
    <SnackbarSuccess />
    <SnackbarError />
    <router-view></router-view>
  </v-app>
</template>

<script>
import SnackbarSuccess from "./components/core/SnackbarSucess.vue";
import SnackbarError from "./components/core/SnackbarError.vue";

export default {
  name: "App",
  components: {
    SnackbarSuccess,
    SnackbarError
  },

  mounted() {
    if (!this.$store.state.usuario) {
      return this.$router.push({ name: "login" });
    }
  }
};
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
.expandeDiv {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.linhaSemQuebra {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  align-items: center;
  height: 50px;
}
</style>
