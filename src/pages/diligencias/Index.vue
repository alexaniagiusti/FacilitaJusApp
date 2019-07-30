<template>
  <div>
    <h1>Diligencias</h1>
    <DiligenciasEnviadas/>
    <DiligenciasRespondidas/>
    <DiligenciasPorUsuario/>
    <ListarDiligencias/>
    <CadastrarDiligencia/>
    <ChatDeDiligencias/>
    <PegarDiligencia/>
  </div>
</template>

<script>
//Visualização de diligencias
import DiligenciasEnviadas from '../../components/diligencias/visualizarDiligencias/DiligenciasEnviadas'
import DiligenciasRespondidas from '../../components/diligencias/visualizarDiligencias/DiligenciasRespondidasPeloUsuario'
import DiligenciasPorUsuario from '../../components/diligencias/visualizarDiligencias/DiligenciasPorUsuario'
import ListarDiligencias from '../../components/diligencias/visualizarDiligencias/ListarDiligencias'

//Diligencias
import CadastrarDiligencia from '../../components/diligencias/CadastrarDiligencias'
import ChatDeDiligencias from '../../components/diligencias/ChatDeDiligencias'
import PegarDiligencia from '../../components/diligencias/PagarDiligencias'

export default {
  components: {
    DiligenciasEnviadas,
    DiligenciasRespondidas,
    DiligenciasPorUsuario,
    ListarDiligencias,
    CadastrarDiligencia,
    ChatDeDiligencias,
    PegarDiligencia
  }
}
</script>