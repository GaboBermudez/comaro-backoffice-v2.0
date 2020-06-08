<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title">Contactos</h4>
    </div>
    <div class="col-md-12 card">
      <div class="card-body row">
        <div class="col-sm-6">
          <p-button type="success" @click="showModal = true">
            <i slot="label" class="nc-icon nc-simple-add"></i>
            Nuevo contacto
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
            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              :min-width="column.minWidth"
              :prop="column.prop"
              :label="column.label"
            ></el-table-column>
            <el-table-column :min-width="50" fixed="right" class-name="td-actions" label="Acciones">
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
      <h4 slot="header" class="title title-up">Agregar contacto</h4>
      <form @submit.prevent="agregarCliente()">
        <div class="form-group">
          <label>Cliente</label>
          <el-select class="select-default" placeholder="Cliente" v-model="nuevoContacto.cliente">
            <el-option
              v-for="option in selects"
              class="select-default select-opt"
              :value="option.value"
              :label="option.label"
              :key="option.label"
            ></el-option>
          </el-select>
        </div>
        <div class="form-group">
          <label>Nombre del contacto</label>
          <fg-input name="nombreCliente" v-model="nuevoContacto.nombre" type="text"></fg-input>
        </div>
        <div class="form-group">
          <label>Email</label>
          <fg-input name="nombreCliente" v-model="nuevoContacto.email" type="email"></fg-input>
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
import { Table, Select, TableColumn, Option } from "element-ui";
import { Modal, Button, Pagination } from "src/components/UIComponents";
import users from "./users";
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
      propsToSearch: ["name", "email", "age"],
      tableColumns: [
        {
          prop: "nombre",
          label: "Nombre",
          minWidth: 200
        },
        {
          prop: "email",
          label: "Email",
          minWidth: 200
        },
        {
          prop: "cliente",
          label: "Cliente",
          minWidth: 200
        }
      ],
      tableData: users,
      nuevoContacto: {},
      selects: [
        { label: "Grupo Agroindustrial Numar S.A.", value: "Numar" },
        { label: "Inolasa", value: "Inolasa" },
        { label: "Laboratorios Zepol S.A.", value: "Zepol" },
        { label: "Demasa", value: "Demasa" }
      ],
      showModal: false
    };
  },
  methods: {
    handleLike(index, row) {
      alert(`Your want to like ${row.name}`);
    },
    handleEdit(index = "", row = "") {
      alert(`Your want to edit ${row.name}`);
    },
    handleDelete(index, row) {
      let indexToDelete = this.tableData.findIndex(
        tableRow => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    }
  }
};
</script>
<style lang="scss">
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

.select-opt {
  width: 100% !important;
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
