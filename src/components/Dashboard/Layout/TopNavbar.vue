<template>
  <navbar v-model="showNavbar">
    <div class="navbar-wrapper">
      <div class="navbar-minimize">
        <button id="minimizeSidebar" class="btn btn-icon btn-round" @click="minimizeSidebar">
          <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
          <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
        </button>
      </div>
      <div class="navbar-toggle">
        <navbar-toggle-button @click.native="toggleSidebar"></navbar-toggle-button>
      </div>
      <a class="navbar-brand" href="#">Gestión de cotizaciones</a>
    </div>

    <template slot="navbar-menu">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link logout" @click="logout()">
            Cerrar Sesión
            <i class="fa fa-sign-out" />
          </a>
        </li>
      </ul>
    </template>
  </navbar>
</template>
<script>
import { Navbar, NavbarToggleButton } from "src/components/UIComponents";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  components: {
    Navbar,
    NavbarToggleButton
  },
  data() {
    return {
      activeNotifications: false,
      showNavbar: false
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    minimizeSidebar() {
      this.$sidebar.toggleMinimize();
    },
    logout() {
      try {
        firebase
          .auth()
          .signOut()
          .then(
            value => {
              this.$router.push({ name: "Login" });
            },
            err => {
              console.log(err);
            }
          );
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style>
.logout {
  cursor: pointer !important;
}
</style>
