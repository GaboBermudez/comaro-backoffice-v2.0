<template>
  <div class="login-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <form @submit.prevent="login">
                <card type="login">
                  <h3 slot="header" class="header text-center">Iniciar sesión</h3>

                  <fg-input
                    v-model="email"
                    addon-left-icon="nc-icon nc-single-02"
                    placeholder="Email"
                  ></fg-input>

                  <fg-input
                    v-model="password"
                    addon-left-icon="nc-icon nc-key-25"
                    placeholder="Contraseña"
                    type="password"
                  ></fg-input>

                  <br />

                  <p-button
                    native-type="submit"
                    slot="footer"
                    type="warning"
                    round
                    block
                    class="mb-3"
                  >Ingresar</p-button>
                  <div class="error">{{ error }}</div>
                </card>
              </form>
            </div>
          </div>
        </div>
        <app-footer></app-footer>
        <div
          class="full-page-background"
          style="background-image: url(static/img/background/background-2.jpg) "
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Checkbox, Button } from "src/components/UIComponents";
import AppNavbar from "./Layout/AppNavbar";
import AppFooter from "./Layout/AppFooter";
import errorMessages from "src/firebase/errorCodesMap";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  components: {
    Card,
    AppNavbar,
    AppFooter,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button
  },
  methods: {
    closeMenu() {
      document.body.classList.remove("nav-open");
      document.body.classList.remove("off-canvas-sidebar");
    },
    login() {
      try {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(
            user => {
              console.log(user);
              this.$router.push("/");
            },
            err => {
              this.error = errorMessages.auth[err.code];
            }
          );
      } catch (err) {
        console.log(err);
      }
    }
  },
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.$router.push({ name: "Cotizaciones" });
    });
  },
  beforeDestroy() {
    this.closeMenu();
  }
};
</script>
<style lang="scss">
.error {
  color: $color-red-error;
}
</style>
