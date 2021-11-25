<template>
  <section>
    <usuario-form>
      <button class="btn" @click.prevent="AtualizarUser">
        Atualizar Cadastro
      </button>
      <ErroNotificacao :erros="erros" />
    </usuario-form>
  </section>
</template>

<script>
import UsuarioForm from "../../components/UsuarioForm.vue";
import { api } from "@/services.js";
export default {
  name: "UsuarioEditar",
  components: { UsuarioForm },
  data() {
    return {
      erros: [],
    };
  },

  methods: {
    AtualizarUser() {
      this.erros = [];
      api
        .put(`/usuario/`, this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "Usuario" });
        })
        .catch((err) => this.erros.push(err.response.data.message));
    },
  },
};
</script>

<style></style>
