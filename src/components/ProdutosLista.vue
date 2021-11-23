<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <div class="produtos" v-if="produtos && produtos.length" key="produtos">
        <div class="produto" v-for="(produto, index) in produtos" :key="index">
          <router-link :to="{ name: 'Produto', params: { id: produto.id } }">
            <img
              v-if="produto.fotos"
              :src="produto.fotos[0].src"
              :alt="produto.fotos[0].titulo"
            />
            <p class="preco">{{ produto.preco | numPreco }}</p>
            <h2 class="titulo">{{ produto.nome }}</h2>
            <p class="descricao">{{ produto.descricao }}</p>
          </router-link>
        </div>
        <produtos-paginar
          :produtosTotal="produtosTotal"
          :produtosPorPagina="produtosPorPagina"
        ></produtos-paginar>
      </div>

      <div
        v-else-if="produtos && produtos.length === 0"
        class="sem-resultado"
        key="sem-produtos"
      >
        <p>Busca sem resultados :(</p>
      </div>
      <div v-else key="loading">
        <PaginaCarregando />
      </div>
    </transition>
  </section>
</template>

<script>
import ProdutosPaginar from "@/components/ProdutosPaginar.vue";
import { api } from "@/services.js";
import { serialize } from "@/helpers.js";

export default {
  name: "ProdutosLista",
  components: {
    ProdutosPaginar,
  },
  data() {
    return {
      produtos: null,
      produtosPorPagina: 9,
      produtosTotal: 0,
    };
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);

      return `produto?_limit=${this.produtosPorPagina}${query}`;
    },
  },
  methods: {
    getProdutos() {
      this.produtos = null;
      setTimeout(() => {
        api.get(this.url).then((r) => {
          this.produtosTotal = Number(r.headers["x-total-count"]);
          this.produtos = r.data;
        });

        /* fetch("http://localhost:3000/produto")
          .then((r) => r.json())
          .then((r) => {
            this.produtos = r;
          }); */
      }, 500);
    },
  },
  watch: {
    url() {
      this.getProdutos();
    },
  },
  created() {
    this.getProdutos();
  },
};
</script>

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px;
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-block: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultado {
  margin: 50px auto;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  text-align: center;
}
</style>
