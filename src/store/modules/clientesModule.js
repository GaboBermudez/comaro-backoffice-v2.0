// Initial State
const state = () => ({
  all: [
    { nombre: "Grupo Agroindustrial Numar S.A." },
    { nombre: "Inolasa" },
    { nombre: "Laboratorios Zepol S.A." },
    { nombre: "Unimar S.A." },
    { nombre: "Demasa" }
  ],
  item: {
    nombre: ""
  }
});

// Getters
const getters = {};

// actions
const actions = {
  agregarCliente({ commit }, nuevoCliente) {
    // TODO: API call
    commit("AGREGAR_CLIENTE", nuevoCliente);
  },

  editarCliente({ commit }, payload) {
    // TODO: API call
    commit("EDITAR_CLIENTE", payload);
  },

  eliminarCliente({ commit }, index) {
    // TODO: API call
    commit("ELIMINAR_CLIENTE", index);
  }
};

// Mutations
const mutations = {
  AGREGAR_CLIENTE(state, nuevoCliente) {
    state.all.unshift(nuevoCliente);
  },

  EDITAR_CLIENTE(state, payload) {
    state.all[payload.clienteSeleccionadoIndex].nombre =
      payload.nuevoCliente.nombre;
  },

  ELIMINAR_CLIENTE(state, index) {
    state.all.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
