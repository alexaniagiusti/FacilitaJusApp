<template>
  <v-app app>
    <VueLoad />
    <SnackbarSuccess />
    <SnackbarError />
    <SnackbarWarning />
    <SnackbarInfo />
    <Pagamento />
    <router-view></router-view>
  </v-app>
</template>

<script>
import SnackbarSuccess from "./components/core/SnackbarSucess.vue";
import SnackbarError from "./components/core/SnackbarError.vue";
import SnackbarWarning from "./components/core/SnackbarWarning.vue";
import SnackbarInfo from "./components/core/SnackbarInfo.vue";
import Pagamento from "./components/pagamento/Pagamento.vue";
import VueLoad from "./components/core/VueLoad";

export default {
  name: "App",
  components: {
    SnackbarSuccess,
    SnackbarError,
    VueLoad,
    SnackbarWarning,
    SnackbarInfo,
    Pagamento
  },
  created() {
    const usuario = sessionStorage.usuario;
    if (usuario === undefined && this.$route.name !== "login") {
      sessionStorage.redirectTo = window.location.href;
      this.$store.commit("setVueLoad", false);
      this.$router.push({ name: "login" });
    } else {
      console.log("Login Page :)");
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
