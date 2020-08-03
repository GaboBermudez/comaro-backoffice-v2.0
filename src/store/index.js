import Vue from "vue";
import Vuex from "vuex";
import clientes from "./modules/clientesModule";
import contactos from "./modules/contactosModule";
import usuarios from "./modules/usuariosModule";
import cotizaciones from "./modules/cotizacionesModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    clientes,
    contactos,
    cotizaciones,
    usuarios
  }
});
