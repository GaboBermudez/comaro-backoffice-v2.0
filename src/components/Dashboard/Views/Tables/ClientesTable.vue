<template>
  <div class="row card-container">
    <div class="col-md-12">
      <h4 class="title">Clientes</h4>
    </div>
    <div class="col-md-12 card">
      <div class="card-body row">
        <div class="col-sm-6">
          <p-button type="success" @click="showModal = true">
            <i slot="label" class="nc-icon nc-simple-add"></i>
            Nuevo cliente
          </p-button>
        </div>
        <div class="col-sm-6">
          <div class="pull-right">
            <el-select class="select-default" v-model="pagination.perPage">
              <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <fg-input
              class="input-sm"
              placeholder="Buscar"
              v-model="searchQuery"
              addon-right-icon="nc-icon nc-zoom-split"
            ></fg-input>
          </div>
        </div>
        <div class="col-sm-12 mt-2">
          <el-table class="table-striped" :data="queriedData" border style="width: 100%">
            <el-table-column :min-width="300" prop="nombre" label="Nombre"></el-table-column>
            <el-table-column :min-width="60" fixed="right" class-name="td-actions" label="Acciones">
              <template slot-scope="props">
                <p-button
                  type="success"
                  size="sm"
                  icon
                  @click="handleEdit(props.$index, props.row)"
                >
                  <i class="fa fa-edit"></i>
                </p-button>
                <p-button
                  type="danger"
                  size="sm"
                  icon
                  @click="handleDelete(props.$index, props.row)"
                >
                  <i class="fa fa-times"></i>
                </p-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="col-sm-6 pagination-info">
          <p class="category">Mostrando desde {{from + 1}} hasta {{to}} de {{total}}</p>
        </div>
        <div class="col-sm-6">
          <p-pagination
            class="pull-right"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="pagination.total"
          ></p-pagination>
        </div>
      </div>
    </div>
    <Modal :show.sync="showModal" headerClasses="justify-content-center" :showClose="false">
      <h4 slot="header" class="title title-up">Agregar cliente</h4>
      <form @submit.prevent="agregarCliente()">
        <div class="form-group">
          <label>Nombre del cliente</label>
          <fg-input name="nombreCliente" v-model="nuevoCliente.nombre" type="text"></fg-input>
        </div>
      </form>
      <template slot="footer">
        <p-button type="danger" @click="showModal = false">Cancelar</p-button>
        <p-button native-type="submit" type="success">Guardar</p-button>
      </template>
    </Modal>
  </div>
</template>
<script>
import Vue from "vue";
import { Table, TableColumn, Select, Option } from "element-ui";
import { Modal, Button, Pagination } from "src/components/UIComponents";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
export default {
  components: {
    [Pagination.name]: Pagination,
    [Button.name]: Button,
    Modal
  },

  computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    /***
     * Searches through table data and returns a paginated array.
     * Note that this should not be used for table with a lot of data as it might be slow!
     * Do the search and the pagination on the server and display the data retrieved from server instead.
     * @returns {computed.pagedData}
     */
    queriedData() {
      if (!this.searchQuery) {
        this.pagination.total = this.tableData.length;
        return this.pagedData;
      }
      let result = this.tableData.filter(row => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });
      this.pagination.total = result.length;
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      this.pagination.total = this.tableData.length;
      return this.tableData.length;
    }
  },

  data() {
    return {
      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["nombre"],
      tableData: [
        { nombre: "Grupo Agroindustrial Numar S.A." },
        { nombre: "Grupo Agroindustrial Numar S.A." },
        { nombre: "Grupo Agroindustrial Numar S.A." },
        { nombre: "Grupo Agroindustrial Numar S.A." },
        { nombre: "Grupo Agroindustrial Numar S.A." },
        { nombre: "Grupo Agroindustrial Numar S.A." },
        { nombre: "Grupo Agroindustrial Numar S.A." },
        { nombre: "Grupo Agroindustrial Numar S.A." },
        { nombre: "Grupo Agroindustrial Numar S.A." },
        { nombre: "Grupo Agroindustrial Numar S.A." },
        { nombre: "Grupo Agroindustrial Numar S.A." },
        { nombre: "Grupo Agroindustrial Numar S.A." }
      ],
      showModal: false,
      nuevoCliente: { nombre: "" }
    };
  },

  methods: {
    handleEdit(index, row) {
      alert(`Your want to edit ${row.name}`);
    },
    handleDelete(index, row) {
      let indexToDelete = this.tableData.findIndex(
        tableRow => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },
    handleShowModal() {
      this.showModal = true;
    },
    agregarCliente() {
      this.tableData.unshift(this.nuevoCliente);
      this.showModal = false;
      this.nuevoCliente = {};
    }
  }
};
</script>
<style lang="scss">
.card-container {
  margin: 0 auto;
  width: 65%;
}
.el-table .td-actions {
  button.btn {
    margin-right: 5px;
  }
}

.pull-right {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.select-default {
  display: flex;
  width: 100px;
  margin-right: 10px;
}

.td-actions {
  text-align: center !important;
}

.input-sm {
  margin: 0px;
}

h4 {
  margin-top: 0px !important;
}
</style>
