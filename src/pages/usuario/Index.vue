<template>
  <div>
    <h2>Usuarios</h2>
    <Atualizar/>
    <AreasDeAtuacao/>
    <CidadesAtendidas/>
    <Senha/>
    <ServicosAtendidos/>
  </div>
</template>

<script>
import Atualizar from '../../components/usuario/AtualizarPerfil'
import AreasDeAtuacao from '../../components/usuario/AreasDeAtuacao'
import CidadesAtendidas from '../../components/usuario/CidadesAtendidas'
import Senha from '../../components/usuario/Senha'
import ServicosAtendidos from '../../components/usuario/ServicosAtendidos'

export default {
  components: {
    Atualizar,
    AreasDeAtuacao,
    CidadesAtendidas,
    Senha,
    ServicosAtendidos
  }
}
</script>
