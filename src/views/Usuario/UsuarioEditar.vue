<template>
  <section>
    <usuario-form>
      <button class="btn" @click.prevent="AtualizarUser">
        Atualizar Cadastro
      </button>
    </usuario-form>
  </section>
</template>

<script>
import UsuarioForm from "../../components/UsuarioForm.vue";
import { api } from "@/services.js";
export default {
  name: "UsuarioEditar",
  components: { UsuarioForm },

  methods: {
    AtualizarUser() {
      api
        .put(
          `/usuario/${this.$store.state.usuario.id}`,
          this.$store.state.usuario
        )
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "Usuario" });
        })
        .catch((err) => console.log(err.response));
    },
  },
};
</script>

<style></style>
