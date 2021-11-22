<template>
  <section>
    <h1>Compre ou Venda</h1>
    <produtos-buscar></produtos-buscar>
    <produtos-lista></produtos-lista>
  </section>
</template>

<script>
// @ is an alias to /src

import ProdutosLista from "@/components/ProdutosLista.vue";
import ProdutosBuscar from "@/components/ProdutosBuscar.vue";

export default {
  name: "home",
  components: {
    ProdutosLista,
    ProdutosBuscar,
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #b7f;
  margin-top: 40px;
  text-align: center;
}
</style>
