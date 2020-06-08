<template>
  <form @submit.prevent="handleSubmit(submit)">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/cotizaciones' }">Cotizaciones</el-breadcrumb-item>
        <el-breadcrumb-item>Nueva Cotización</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <div class="card-header">
        <h4 v-if="$route.params.id" class="card-title">Cotización #{{ $route.params.id }}</h4>
        <h4 v-else class="card-title">Nueva cotización</h4>
      </div>
      <div class="card-body">
        <div class="contacto-card">
          <div class="form-group contacto">
            <label>Contacto</label>
            <el-select class="select-default" placeholder="Contacto" v-model="cotizacion.contacto">
              <el-option
                v-for="option in selects"
                class="select-default select-opt"
                :value="option.value"
                :label="option.label"
                :key="option.label"
              ></el-option>
            </el-select>
          </div>
          <div class="form-group cliente">
            <label>Cliente</label>
            <fg-input name="cliente" v-model="cotizacion.cliente" disabled></fg-input>
          </div>
        </div>
        <div class="form-group moneda">
          <label>Moneda</label>
          <el-select class="select-default" placeholder="Moneda" v-model="cotizacion.moneda">
            <el-option class="select-default select-opt" value="¢" label="¢" key="¢"></el-option>
            <el-option class="select-default select-opt" value="$" label="$" key="$"></el-option>
          </el-select>
        </div>
        <h5 class="card-subheader">Nueva línea</h5>
        <div class="nueva-linea-container">
          <div class="form-group cantidad-linea">
            <label>Cantidad</label>
            <fg-input type="number" v-model="nuevaLinea.cantidad"></fg-input>
          </div>
          <div class="form-group unidad-linea">
            <label>Unidad</label>
            <fg-input v-model="nuevaLinea.unidad"></fg-input>
          </div>
          <div class="form-group precio-unitario-linea">
            <label>Precio Unitario</label>
            <fg-input v-model="nuevaLinea.precioUnitario" type="number"></fg-input>
          </div>
          <div class="form-group iva-linea">
            <label>IVA</label>
            <p-checkbox v-model="nuevaLinea.iva"></p-checkbox>
          </div>
          <div class="form-group descripcion-linea">
            <label>Descripción</label>
            <textarea
              rows="10"
              class="form-control border-input"
              placeholder="Descripción del trabajo"
              v-model="nuevaLinea.descripcion"
            ></textarea>
          </div>
          <div class="form-group descuento-linea">
            <label>Descuento</label>
            <fg-input v-model="nuevaLinea.descuento" type="number"></fg-input>
          </div>
          <p-button class="agregar-linea-btn" type="primary" @click="handleNuevaLinea()">
            <i class="nc-icon nc-simple-add"></i>
            Agregar línea
          </p-button>
        </div>
        <div class="lineas-table">
          <el-table :data="lineas">
            <el-table-column min-width="50" prop="cantidad" label="Cant."></el-table-column>
            <el-table-column min-width="60" prop="unidad" label="Unidad"></el-table-column>
            <el-table-column
              min-width="100"
              prop="precioUnitario"
              label="Precio Unitario"
              :formatter="formatPrecioUnitario"
            ></el-table-column>
            <el-table-column type="checkbox" min-width="50" prop="iva" label="IVA">
              <template slot-scope="props">
                <p-checkbox v-model="props.row.iva" disabled></p-checkbox>
              </template>
            </el-table-column>
            <el-table-column min-width="300" prop="descripcion" label="Descripción"></el-table-column>
            <el-table-column
              min-width="75"
              prop="descuento"
              label="Descuento"
              :formatter="formatDescuento"
            ></el-table-column>
            <el-table-column
              min-width="75"
              prop="impuestos"
              label="Impuestos"
              :formatter="formatImpuestos"
            ></el-table-column>
            <el-table-column
              min-width="90"
              prop="precioTotal"
              label="Precio Total"
              :formatter="formatPrecioTotal"
            ></el-table-column>
            <el-table-column min-width="75" header-align="right" label="Acciones">
              <div slot-scope="{row}" class="text-right">
                <el-tooltip content="Editar" :open-delay="300" placement="top">
                  <p-button
                    class="edit-btn"
                    type="primary"
                    size="sm"
                    icon
                    @click="handleEditLinea(row)"
                  >
                    <i class="nc-icon nc-settings"></i>
                  </p-button>
                </el-tooltip>
                <el-tooltip content="Eliminar" :open-delay="300" placement="top">
                  <p-button type="danger" size="sm" icon @click="handleDeleteLinea(row)">
                    <i class="nc-icon nc-simple-delete"></i>
                  </p-button>
                </el-tooltip>
              </div>
            </el-table-column>
          </el-table>
        </div>
        <div class="pull-right total-cotizacion">
          <table>
            <tr>
              <td>Subtotal</td>
              <td>{{cotizacion.moneda + subTotal}}</td>
            </tr>
            <tr>
              <td>Descuento</td>
              <td>{{cotizacion.moneda + descuentoTotal}}</td>
            </tr>
            <tr>
              <td>Impuestos</td>
              <td>{{cotizacion.moneda + impuestoTotal}}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{{cotizacion.moneda + montoTotal}}</td>
            </tr>
          </table>
        </div>
        <div class="notas">
          <div class="form-group precio-incluye">
            <label>Precio incluye:</label>
            <p-checkbox>M.O y cargas sociales</p-checkbox>
            <p-checkbox>Materiales</p-checkbox>
            <p-checkbox v-model="incluyeOtros">Otros</p-checkbox>
            <fg-input :class="['otros-incluye', incluyeOtros ? '' : 'visibility-hidden']"></fg-input>
          </div>
          <div class="form-group plazo-entrega">
            <label>Plazo de entrega</label>
            <fg-input></fg-input>
          </div>
          <div class="form-group forma-pago">
            <label>Forma de pago:</label>
            <p-checkbox>El usual</p-checkbox>
            <p-checkbox v-model="otrosFormaPago">Otro</p-checkbox>
            <fg-input :class="['otros-forma-pago', otrosFormaPago ? '' : 'visibility-hidden']"></fg-input>
          </div>
        </div>
        <div class="button-container">
          <p-button type="danger">Borrar formulario</p-button>
          <p-button type="primary">Guardar</p-button>
          <p-button type="success">Guardar y Enviar</p-button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { Button } from "src/components/UIComponents";
import {
  Breadcrumb,
  BreadcrumbItem,
  Tooltip,
  Table,
  TableColumn,
  Select,
  Option
} from "element-ui";
import { extend } from "vee-validate";
import { required, confirmed } from "vee-validate/dist/rules";
import { numberWithCommas } from "src/util/functions";

extend("required", required);
extend("confirmed", confirmed);

export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Tooltip.name]: Tooltip,
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem
  },
  data() {
    return {
      selects: [
        { label: "Opcion1", value: "Opcion1" },
        { label: "Opcion2", value: "Opcion2" },
        { label: "Opcion3", value: "Opcion3" },
        { label: "Opcion4", value: "Opcion4" },
        { label: "Opcion5", value: "Opcion5" },
        { label: "Opcion6", value: "Opcion6" }
      ],
      cotizacion: {
        contacto: "",
        cliente: "",
        moneda: "¢"
      },
      lineas: [
        {
          cantidad: 1,
          unidad: "ea",
          precioUnitario: 20000,
          iva: true,
          descripcion: "Limpieza y pintura de tanques en Manteca",
          descuento: 0,
          impuestos: 2600,
          precioTotal: 22600
        },
        {
          cantidad: 1,
          unidad: "ea",
          precioUnitario: 20000,
          iva: false,
          descripcion: "Limpieza y pintura de tanques en Margarina",
          descuento: 0,
          impuestos: 0,
          precioTotal: 20000
        }
      ],
      nuevaLinea: {
        descuento: 0,
        iva: true
      },
      lineasId: 0,
      incluyeOtros: false,
      otrosFormaPago: false
    };
  },
  computed: {
    subTotal() {
      let subTotal = 0;
      this.lineas.forEach(linea => {
        subTotal += linea.precioUnitario * linea.cantidad;
      });
      return numberWithCommas(subTotal);
    },
    impuestoTotal() {
      let impuestoTotal = 0;
      this.lineas.forEach(linea => {
        impuestoTotal += linea.impuestos;
      });
      return numberWithCommas(impuestoTotal);
    },
    descuentoTotal() {
      let descuentoTotal = 0;
      this.lineas.forEach(linea => {
        descuentoTotal += linea.descuento;
      });
      return numberWithCommas(descuentoTotal);
    },
    montoTotal() {
      let total = 0;
      this.lineas.forEach(linea => {
        total += linea.precioTotal;
      });
      return numberWithCommas(total);
    }
  },
  methods: {
    handleEditLinea(row) {
      this.nuevaLinea = row;
      this.lineas = this.lineas.filter(linea => linea.id !== row.id);
    },

    handleNuevaLinea() {
      this.nuevaLinea.id = this.lineasId;
      this.nuevaLinea.precioTotal =
        this.nuevaLinea.cantidad * this.nuevaLinea.precioUnitario;
      if (this.nuevaLinea.iva) {
        this.nuevaLinea.impuestos = this.nuevaLinea.precioTotal * 0.13;
        this.nuevaLinea.precioTotal = (
          this.nuevaLinea.precioTotal + this.nuevaLinea.impuestos
        ).toFixed(2);
      } else {
        this.nuevaLinea.impuestos = 0;
      }
      this.lineasId++;
      this.lineas.push(this.nuevaLinea);
      this.nuevaLinea = { iva: true, descuento: 0 };
    },

    handleDeleteLinea(row) {
      this.lineas = this.lineas.filter(linea => linea.id !== row.id);
    },

    formatPrecioUnitario(row, column) {
      return this.cotizacion.moneda + numberWithCommas(row.precioUnitario);
    },
    formatImpuestos(row, column) {
      return this.cotizacion.moneda + numberWithCommas(row.impuestos);
    },
    formatPrecioTotal(row, column) {
      return this.cotizacion.moneda + numberWithCommas(row.precioTotal);
    },
    formatDescuento(row, column) {
      return row.descuento + "%";
    }
  },
  mounted() {
    let i = 0;
    this.lineas.forEach(linea => {
      linea.id = i;
      i++;
    });
    this.lineasId = this.lineas.length;
  }
};
</script>

<style language="scss">
el-option {
  width: 100%;
}

td {
  padding-right: 20px;
  padding-top: 5px;
  color: #606266;
}

.agregar-linea-btn {
  margin-top: 25px;
}

.breadcrumb {
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0) !important;
}

.button-container {
  display: flex;
  justify-content: center;
}

.button-container > button {
  margin: 10px;
}

.card-body {
  padding: 15px 40px 10px 40px !important;
}

.card-subheader {
  font-size: 1.4em;
  color: rgb(121, 121, 121);
  margin-top: 75px;
  margin-left: 20px;
  margin-bottom: 25px;
}

.contacto-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.contacto-card .contacto {
  width: 300px;
  margin-right: 20px;
}

.contacto-card .cliente {
  width: 300px;
}

.edit-btn {
  margin-right: 5px !important;
}

.moneda {
  width: 70px;
}

.nueva-linea-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
}

.cantidad-linea {
  flex: 1;
  margin-right: 50px;
}

.lineas-table {
  margin-top: 30px;
}

.notas {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
}

.notas > div {
  flex: 1;
  padding-right: 50px;
}

.precio-unitario-linea {
  flex: 2;
  margin-right: 50px;
}

.unidad-linea {
  flex: 1;
  margin-right: 50px;
}

.iva-linea {
  flex: 1;
  margin-right: 50px;
}

.descripcion-linea {
  flex: 4;
  margin-right: 50px;
}

.descuento-linea {
  flex: 2;
  margin-right: 50px;
}

.select-opt {
  width: 100% !important;
}

.total-cotizacion {
  margin-top: 30px;
}

.visibility-hidden {
  visibility: hidden;
}
</style>
