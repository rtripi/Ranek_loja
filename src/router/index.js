import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Produto from "../views/Produto.vue";
import Login from "../views/Login.vue";
import Usuario from "../views/Usuario/Usuario.vue";
import UsuarioProdutos from "../views/Usuario/UsuarioProdutos.vue";
import UsuarioCompras from "../views/Usuario/UsuarioCompras.vue";
import UsuarioEditar from "../views/Usuario/UsuarioEditar.vue";
import UsuarioVendas from "../views/Usuario/UsuarioVendas.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: NotFound,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/produto/:id",
    name: "Produto",
    component: Produto,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/usuario",

    component: Usuario,
    meta: {
      login: true,
    },
    children: [
      {
        path: "",
        name: "Usuario",
        component: UsuarioProdutos,
      },
      {
        path: "compras",
        name: "compras",
        component: UsuarioCompras,
      },
      {
        path: "editar",
        name: "User_editar",
        component: UsuarioEditar,
      },
      {
        path: "vendas",
        name: "vendas",
        component: UsuarioVendas,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({
      to: 0,
      behavior: "smooth",
    });
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.login)) {
    if (!window.localStorage.token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
