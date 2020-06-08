<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title">Cotizaciones</h4>
    </div>
    <div class="col-md-12 card">
      <div class="card-body row">
        <div class="col-sm-6">
          <p-button type="success" @click="handleCotizacionForm()">
            <i slot="label" class="nc-icon nc-simple-add"></i>
            Nueva cotización
          </p-button>
        </div>
        <div class="col-sm-6">
          <div class="pull-right">
            <el-select class="select-default" v-model="pagination.perPage" placeholder="Per page">
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
            <el-table-column :min-width="70" fixed="right" class-name="td-actions" label="Acciones">
              <template slot-scope="props">
                <p-button
                  type="success"
                  size="sm"
                  icon
                  @click="handleCotizacionForm(props.$index, props.row)"
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
  </div>
</template>
<script>
import Vue from "vue";
import { Table, TableColumn, Select, Option } from "element-ui";
import { Button, Pagination } from "src/components/UIComponents";
import users from "./users";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
export default {
  components: {
    [Pagination.name]: Pagination,
    [Button.name]: Button
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
      propsToSearch: ["contacto", "descripcion", "precioTotal"],
      tableColumns: [
        {
          prop: "numero",
          label: "#",
          minWidth: 50
        },
        {
          prop: "contacto",
          label: "Contacto",
          minWidth: 100
        },
        {
          prop: "fecha",
          label: "Fecha",
          minWidth: 100
        },
        {
          prop: "descripcion",
          label: "Descripción",
          minWidth: 300
        },
        {
          prop: "precioTotal",
          label: "Precio Total",
          minWidth: 100
        }
      ],
      tableData: users
    };
  },
  methods: {
    handleLike(index, row) {
      alert(`Your want to like ${row.name}`);
    },
    handleCotizacionForm(index = {}, row = {}) {
      if (row.id) {
        this.$router.push({ name: "Cotizacion Form", params: { id: row.id } });
      } else {
        this.$router.push({ name: "Cotizacion Form" });
      }
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
