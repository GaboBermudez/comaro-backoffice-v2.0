import DashboardLayout from "../components/Dashboard/Layout/DashboardLayout.vue";
// GeneralViews
import NotFound from "../components/GeneralViews/NotFoundPage.vue";

// Pages
import User from "src/components/Dashboard/Views/Pages/UserProfile.vue";
import Login from "src/components/Dashboard/Views/Pages/Login.vue";

// Forms pages
const CotizacionForm = () =>
  import(
    /* webpackChunkName: "forms" */ "src/components/Dashboard/Views/Forms/CotizacionForm.vue"
  );

// Tables
const CotizacionesTable = () =>
  import(
    /* webpackChunkName: "tables" */ "src/components/Dashboard/Views/Tables/CotizacionesTable.vue"
  );
const ClientesTable = () =>
  import(
    /* webpackChunkName: "tables" */ "src/components/Dashboard/Views/Tables/ClientesTable.vue"
  );
const ContactosTable = () =>
  import(
    /* webpackChunkName: "tables" */ "src/components/Dashboard/Views/Tables/ContactosTable.vue"
  );

let cotizacionesPage = {
  path: "/cotizaciones",
  component: DashboardLayout,
  redirect: "/cotizaciones",
  children: [
    {
      path: "/",
      name: "Cotizaciones",
      component: CotizacionesTable,
      meta: { requiresAuth: true }
    },
    {
      path: "form/:id?",
      name: "Cotizacion Form",
      component: CotizacionForm,
      meta: { requiresAuth: true }
    }
  ]
};

let loginPage = {
  path: "/login",
  name: "Login",
  component: Login
};

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/cotizaciones",
    children: [
      {
        path: "clientes",
        name: "Clientes",
        component: ClientesTable,
        meta: { requiresAuth: true }
      },
      {
        path: "contactos",
        name: "Contactos",
        component: ContactosTable,
        meta: { requiresAuth: true }
      },
      {
        path: "cuenta",
        name: "Cuenta",
        component: User,
        meta: { requiresAuth: true }
      }
    ]
  },
  cotizacionesPage,
  loginPage,
  { path: "*", component: NotFound }
];

export default routes;
